"use client";

import { useToast } from "@/components/ui/use-toast";
import { Message } from "@/models/message.models";
import { User } from "@/models/user.models";
import { acceptMessageZodSchema } from "@/schemas/acceptMessageZodSchema";
import { ApiResponse } from "@/types/ApiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // Example path for ShadCN components
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Loader2, RefreshCcw, X } from "lucide-react";
import { MagicCard } from "@/components/magicui/magic-card";

const Page = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [areMessagesLoading, setAreMessagesLoading] = useState(false);
  const [isSwitchLoading, setIsSwitchLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { data: session } = useSession();

  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(acceptMessageZodSchema),
  });

  const acceptMessages = form.watch("acceptMessages");

  // Fetches the current isAcceptingMessage state
  const fetchAcceptMessage = useCallback(async () => {
    setIsSwitchLoading(true);

    try {
      const result = await axios.get("/api/accept-messages");

      if (result.data.success) {
        form.setValue("acceptMessages", result.data.isAcceptingMessages);
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      console.error(
        "Error occurred in getting the value of isAcceptingMessages -",
        axiosError
      );
    } finally {
      setIsSwitchLoading(false);
    }
  }, [form.setValue]);

  // Fetches all the anonymous messages to be displayed
  const fetchMessages = useCallback(
    async (refresh: boolean = false) => {
      setAreMessagesLoading(true);
      setIsSwitchLoading(true);

      try {
        const result = await axios.get("/api/get-messages");
        if (result.data.success) {
          toast({
            title: "Success!",
            description: result.data.message,
          });
          setMessages(result.data.returnedMessages);
        } else {
          toast({
            variant: "destructive",
            title: "Error!",
            description: result.data.message,
          });
        }
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;
        console.error("Error occurred while fetching messages -", axiosError);
        toast({
          title: "API Error!",
          description: axiosError.response?.data?.message,
        });
      } finally {
        setAreMessagesLoading(false);
        setIsSwitchLoading(false);
      }
    },
    [setAreMessagesLoading, setMessages]
  );

  // Calling all the above functions while mounting the component
  useEffect(() => {
    if (!session || !session.user) return;
    fetchMessages();
    fetchAcceptMessage();
  }, [session, form.setValue, fetchAcceptMessage, fetchMessages]);

  // Function to handle isAcceptingMessages toggle
  const handleSwitchChange = async () => {
    setIsSwitchLoading(true); // Begin loading state

    try {
      const result = await axios.post("/api/accept-messages");

      // Update the form value
      form.setValue("acceptMessages", result.data.isAcceptingMessages);

      // Re-fetch the state to ensure synchronization
      fetchAcceptMessage();
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      console.error("Error while toggling acceptMessages", axiosError);
      toast({
        title: "Error!",
        description: axiosError.response?.data?.message,
        variant: "destructive",
      });
    }
  };

  // Function to handle deleting of any anonymous message
  const handleDeleteMessage = async (messageId: string) => {
    setAreMessagesLoading(true);
    setIsDeleting(true);

    try {
      const result = await axios.delete(`/api/delete-message/${messageId}`);
      if (result.data.success) {
        toast({
          title: "Success!",
          description: result.data.message,
        });
        setMessages(messages.filter((message) => message._id != messageId));
      } else {
        toast({
          variant: "destructive",
          title: "Error!",
          description: result.data.message,
        });
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      console.error("Error occurred while deleting a message -", axiosError);
    } finally {
      setAreMessagesLoading(false);
      setIsDeleting(false);
    }
  };

  if (!session || !session.user) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <Card className="max-w-md p-6 shadow-lg">
          <CardHeader>
            <CardTitle className="text-center text-lg font-semibold">
              Please Login
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="mb-4 text-gray-600">
              You need to be logged in to access this content.
            </p>
            <Link href="/sign-in">
              <Button variant="outline">Login</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const { username } = session.user as User;
  const profileUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/u/${username}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(profileUrl);
    toast({
      title: "URL Copied!",
      description: "Profile URL has been copied to clipboard.",
    });
  };

  return (
    <div className="my-8 mx-4 md:mx-8 lg:mx-auto p-6 bg-white rounded max-w-6xl">
      <h1 className="text-4xl font-bold mb-4 text-black">User Dashboard</h1>

      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2 text-black">
          Copy Your Unique Link
        </h2>{" "}
        <div className="flex items-center">
          <input
            type="text"
            value={profileUrl}
            disabled
            className="input input-bordered w-full p-2 mr-2 text-black"
          />
          <Button variant="secondary" onClick={copyToClipboard}>
            Copy
          </Button>
        </div>
      </div>

      <div className="mb-4">
        <Switch
          {...form.register("acceptMessages")}
          checked={acceptMessages}
          onCheckedChange={handleSwitchChange}
          disabled={isSwitchLoading}
        />
        <span className="ml-2 text-black">
          Accept Messages: {acceptMessages ? "On" : "Off"}
        </span>
      </div>
      <Separator />

      <Button
        className="mt-4"
        variant="outline"
        onClick={(e) => {
          e.preventDefault();
          fetchMessages(true);
        }}
      >
        {areMessagesLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <RefreshCcw className="h-4 w-4" />
        )}
      </Button>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-10 bg-white p-2">
        {messages?.length > 0 ? (
          messages?.map((message, index) => (
            <MagicCard
              className="cursor-pointer flex-col items-center justify-center shadow-2xl whitespace-nowrap text-4xl h-[200px]"
              gradientColor="whitesmoke"
              gradientSize={100}
              gradientOpacity={0.4}
              onClickFn={()=>handleDeleteMessage(message._id as string)}
              isDeleting={isDeleting}
            >
              <span className="inline-block text-lg max-w-[60%]">{message.content}</span>
            </MagicCard>
          ))
        ) : (
          <p>No messages to display.</p>
        )}
      </div>
    </div>
  );
};

export default Page;
