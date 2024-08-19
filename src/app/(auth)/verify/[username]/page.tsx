"use client";

import { z } from "zod";
import React from "react";
import axios, { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { ApiResponse } from "@/types/ApiResponse";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { verifyZodSchema } from "@/schemas/verifyZodSchema";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";

const Page = ({ params }: { params: { username: string } }) => {
  const router = useRouter();
  const { username } = params;
  const { toast } = useToast();

  const form = useForm<z.infer<typeof verifyZodSchema>>({
    resolver: zodResolver(verifyZodSchema),
  });

  const onSubmit = async (data: z.infer<typeof verifyZodSchema>) => {
    try {
      console.log("code", data.code);

      const result = await axios.post("/api/verify-code", {
        username,
        code: data?.code,
      });
      console.log("Result from /verify-code:", result.data);

      if (result.data.success) {
        toast({
          title: "Success",
          description: result.data.message,
        });

        router.replace("/sign-in");
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: result.data.message,
        });
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      console.error(
        "Error occurred on submitting verify code form - ",
        axiosError
      );
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6 text-black">
            Verify Your Account
          </h1>
          <p className="mb-4 text-black">
            Enter the verification code sent to your email!
          </p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 flex flex-col items-center justify-center"
          >
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    {/* InputOTPPattern used here */}
                    <InputOTP
                      color="black"
                      maxLength={8}
                      pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                      {...field}
                    >
                      <InputOTPGroup className="text-black">
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                        <InputOTPSlot index={6} />
                        <InputOTPSlot index={7} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button variant="secondary" type="submit">
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Page;
