"use client";

import { z } from "zod";
import { useEffect, useState } from "react";
import { useCompletion } from "ai/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { messageZodSchema } from "@/schemas/messageZodSchema";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { toast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import BlurIn from "@/components/magicui/blur-in";
import { MessageSquare, Smile, Lightbulb, Send } from "lucide-react"; // Importing the icons
import ShimmerButton from "@/components/magicui/shimmer-button";
import Ripple from "@/components/magicui/ripple";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";

function Page() {
  const { complete, isLoading } = useCompletion({
    api: "/api/suggest-messages",
  });
  const [isMessageSubmitting, setIsMessageSubmitting] = useState(false);
  const [username, setUsername] = useState("");
  const [AIMessages, setAIMessages] = useState<string[]>([]); // Explicitly type as an array of strings

  useEffect(() => {
    const url = new URL(window.location.href);
    const usernameFromPath = url.pathname.split("/")[2];
    setUsername(usernameFromPath);
  }, []);

  const form = useForm<z.infer<typeof messageZodSchema>>({
    resolver: zodResolver(messageZodSchema),
  });

  const handleGenerateMessage = async () => {
    const result = await complete(
      "Generate four unique and engaging questions that users could anonymously send in a messaging app. Each question should be designed to spark conversation, bring a smile, or provoke thought in a light-hearted manner. The questions should be diverse in theme, covering topics like personal preferences, funny hypotheticals, or casual icebreakers. Ensure each question is concise, relatable, and easy to answer, steering clear of topics that are too complex or serious. Combine the four questions into one string, separated by ' || '. Prioritize variety in each generation, avoiding repetition and ensuring each set feels fresh and different."
    );
    
    if (!result) throw new Error("Error generating messages from Gemini!");

    const messages = result.split("||");
    setAIMessages(messages);
  };

  const onSubmit = async (data: z.infer<typeof messageZodSchema>) => {
    console.log("Submitted data:", data);
    setIsMessageSubmitting(true);

    try {
      const result = await axios.get("/api/accept-messages");
      if (result.data.isAcceptingMessages) {
        toast({
          title: "Status Fetched!",
          description: "The user is accepting messages...",
        });
      } else {
        toast({
          title: "Cannot Send the Message!",
          description: "The user is not accepting messages.",
          variant: "destructive",
        });
        return;
      }
    } catch (error) {
      const apiError = error as AxiosError<ApiResponse>;
      console.error(
        "Error occurred while fetching isAcceptingMessages value -",
        apiError
      );
    }

    try {
      const result = await axios.post("/api/send-message", {
        username,
        content: data.content,
      });

      if (result.data.success) {
        toast({
          title: "Success!",
          description: result.data.message,
        });
      } else {
        toast({
          title: "Error!",
          description: result.data.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      console.error(
        "Error occurred while sending message to the user -",
        axiosError
      );
      toast({
        title: "Error!",
        description: axiosError.response?.data?.message,
        variant: "destructive",
      });
    }finally{
      form.setValue("content","");
      setIsMessageSubmitting(false);
    }
  };

  const handleMessageClick = (index: number) => {
    form.setValue("content", AIMessages[index]);
  };

  // Array of icons corresponding to each message
  const icons = [MessageSquare, Smile, Lightbulb, Send];

  return (
    <div className="container my-8 mx-4 md:mx-8 lg:mx-auto p-6 rounded max-w-6xl">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-[90%] space-y-6"
        >
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <BlurIn
                    word="Messages"
                    className="text-3xl font-bold text-black dark:text-white"
                  />
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Share your thoughts anonymously..."
                    className="resize-none"
                    rows={6}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Your message will be sent anonymously. Feel free to express
                  yourself!
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="buttons flex gap-5">
            <ShimmerButton
              className="shadow-3xl"
              shimmerColor="#000"
              shimmerSize="0.12em"
              background="#fff"
              type="submit"
            >
              <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-black lg:text-sm">
                {isMessageSubmitting ? "Submitting..." : "Submit"}
              </span>
            </ShimmerButton>
            <ShimmerButton
              className="shadow-2xl"
              type="button"
              onClick={handleGenerateMessage}
            >
              <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-sm">
                Generate AI Message
              </span>
            </ShimmerButton>
          </div>
        </form>
      </Form>

      <div className="ai-messages bg-background mt-6 text-white rounded-md p-4">
        <BlurIn
          word="AI Generated Messages"
          className="text-2xl font-bold text-black dark:text-white text-center mb-6"
        />
        {AIMessages.length > 0 ? (
          AIMessages.map((message, index) => {
            const Icon = icons[index % icons.length];
            return (
              <Alert
                key={index}
                className="flex items-start mb-4 cursor-pointer"
                onClick={() => handleMessageClick(index)}
              >
                <Icon className="h-5 w-5 mr-32 text-black dark:text-white" />
                <div>
                  <AlertTitle>Random Message {index + 1}</AlertTitle>
                  <AlertDescription>{message}</AlertDescription>
                </div>
              </Alert>
            );
          })
        ) : (
          <div className="text-center mb-6">
            {isLoading ? (
              <div className="relative flex h-[350px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border md:shadow-xl">
                <p className="z-10 whitespace-pre-wrap text-center text-3xl font-medium tracking-tighter text-white">
                  Thinking...
                </p>
                <Ripple mainCircleSize={60} numCircles={5} />
              </div>
            ) : (
              <BlurIn
                duration={1.5}
                word="Click on the button to generate some random messages!"
                className="text-xl font-semibold text-black dark:text-white"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Page;
