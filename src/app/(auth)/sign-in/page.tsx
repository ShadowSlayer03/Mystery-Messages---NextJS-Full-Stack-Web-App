"use client";

import { z } from "zod";
import React, { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signInZodSchema } from "@/schemas/signInZodSchema";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader2 } from "lucide-react";

const page = () => {
  const { toast } = useToast();
  const router = useRouter();

  const [isSubmitting,setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof signInZodSchema>>({
    resolver: zodResolver(signInZodSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signInZodSchema>) => {
    const result = await signIn("credentials", {
      redirect: false,
      identifier: data.identifier,
      password: data.password,
    });

    if (result?.error) {
      toast({
        title: "Login Failed!",
        description: "Incorrect Username or Password.",
        variant: "destructive",
      });
    }

    if (result?.url) {
      toast({
        title: "Login Successful!",
        description: "You will be redirected shortly.",
      });

      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold tracking-tight lg:text-5xl mb-6 text-black">
            Welcome Back to Mystery Messages
          </h1>
          <p className="mb-4 text-black">Sign in to continue your secret conversations...</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              name="identifier"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black">Email/Username</FormLabel>
                  <Input {...field} className="text-black bg-white" />
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
                  <Input type="password" {...field} className="text-black bg-white" />
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
                "Sign In"
              )}
            </Button>
          </form>
        </Form>
        <div className="text-center mt-4">
          <p className="text-black">
            Not a member yet?{" "}
            <Link href="/sign-up" className="text-blue-600 hover:text-blue-800">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;
