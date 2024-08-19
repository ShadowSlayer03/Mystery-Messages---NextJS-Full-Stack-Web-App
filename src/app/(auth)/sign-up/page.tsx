"use client";

import { z } from "zod";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDebounceCallback } from "usehooks-ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { signUpZodSchema } from "@/schemas/signupZodSchema";
import { ApiResponse } from "@/types/ApiResponse";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import GradientButton from "@/components/edil-ozi/gradient-button";

const Page = () => {
  // Stores the username from the form because it has to be debounced
  const [username, setUsername] = useState("");

  // Sets a message which is the result of /check-username backend route
  const [usernameMessage, setUsernameMessage] = useState("");

  // Sets a loading state as long as the user types the username and the uniqueness is being checked
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);

  // When the form is submitted, this state is set to true, for disabling and enabling the form submit button
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  // Here as the user types in his username, a request is sent
  // to the backend to check if the username typed is unique.
  // In order to prevent overload of requests, we can debounce which means that requests will be sent only after time intervals of a few milliseconds.
  const debounced = useDebounceCallback(setUsername, 400);

  // We will get methods like register, handleSubmit, control etc from here(React-Hook-Form)
  const form = useForm<z.infer<typeof signUpZodSchema>>({
    resolver: zodResolver(signUpZodSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    const checkUsernameUnique = async () => {
      if (username) {
        setIsCheckingUsername(true);
        setUsernameMessage("");
        try {
          const result = await axios.get(
            `/api/check-username?username=${username}`
          );
          console.log("Result of Sign In:", result.data);
          setUsernameMessage(result.data.message);
        } catch (error) {
          const axiosError = error as AxiosError<ApiResponse>;
          setUsernameMessage(
            axiosError.response?.data.message ?? "Error Checking Username!"
          );
        } finally {
          setIsCheckingUsername(false);
        }
      }
    };

    checkUsernameUnique();
  }, [username]);

  async function onSubmit(values: z.infer<typeof signUpZodSchema>) {
    console.log("Values from SignUp Form on submitting:", values);
    setIsSubmitting(true);
    try {
      const result = await axios.post("/api/sign-up", values);
      console.log("Result from SignUp Submission", result.data);

      if (result.data.success) {
        toast({
          title: "Success",
          description: result.data.message,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: result.data.message,
        });
      }

      setTimeout(() => {
        router.replace(`/verify/${username}`);
      }, 1000);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        variant: "destructive",
        description: axiosError?.response?.data?.message,
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-black">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold tracking-tight lg:text-5xl mb-6 text-black">
            Join Mystery Message
          </h1>
          <p className="mb-4 text-black">Sign up to start your anonymous adventure</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              name="username"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black">Username</FormLabel>
                  <Input
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      debounced(e.target.value);
                    }}
                    className="text-black bg-white"
                  />
                  {isCheckingUsername && <Loader2 className="animate-spin" />}
                  {!isCheckingUsername && usernameMessage && (
                    <p
                      className={`text-sm ${
                        usernameMessage === "Username is Unique!"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {usernameMessage}
                    </p>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black">Email</FormLabel>
                  <Input {...field} name="email" className="text-black bg-white" />
                  <p className="text-muted text-gray-500 text-sm">
                    We will send you a code for verification!
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black">Password</FormLabel>
                  <Input type="password" {...field} name="password" className="text-black bg-white" />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" variant="outline" className="w-full bg-black text-white" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>
        </Form>
        <div className="text-center mt-4">
          <p className="text-black">
            Already a member?{" "}
            <Link href="/sign-in" className="text-blue-600 hover:text-blue-800">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
