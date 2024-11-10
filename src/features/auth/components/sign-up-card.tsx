"use client";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

import { DottedSeparator } from "@/components/dotted-separator";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";

import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormField,
  FormItem,
  FormMessage,
  FormControl,
} from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../schemas";
import { useRegister } from "../api/use-register";

export function SignUpCard() {
  const { mutate, isPending } = useRegister();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof registerSchema>) => {
    console.log("values", values);

    mutate({ json: values });
  };

  return (
    <Card className="mx-auto h-full w-full border-none shadow-none md:w-[487px]">
      <CardHeader className="flex items-center justify-center p-7 text-center">
        <CardTitle className="text-2xl">Sign Up</CardTitle>

        <CardDescription>
          By signing up, you agree to our{" "}
          <Link href="/privacy" className="text-blue-700">
            Privacy Policy{" "}
          </Link>
          and{" "}
          <Link href="/terms" className="text-blue-700">
            Terms of Service
          </Link>
        </CardDescription>
      </CardHeader>

      <div className="px-7">
        <DottedSeparator />
      </div>

      <CardContent className="p-7">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter your name"
                      type="text"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter email address"
                      type="email"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter password"
                      type="password"
                      min={8}
                      max={256}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={isPending} size={"lg"} className="w-full">
              Signup
            </Button>
          </form>
        </Form>
      </CardContent>

      <div className="px-7">
        <DottedSeparator />
      </div>

      <CardContent className="flex flex-col items-center gap-y-4 p-7">
        <Button
          variant={"secondary"}
          size={"lg"}
          className="w-full border"
          disabled={isPending}
        >
          <FcGoogle className="mr-2 size-5" />
          Signup with Google
        </Button>

        <Button
          variant={"secondary"}
          size={"lg"}
          className="w-full border"
          disabled={isPending}
        >
          <FaGithub className="mr-2 size-5" />
          Signup with GitHub
        </Button>
      </CardContent>

      <div className="px-7">
        <DottedSeparator />
      </div>

      <CardFooter className="flex items-center justify-center p-7">
        <p>
          Already have an account?{" "}
          <Link href="/sign-in" className="text-blue-700">
            Sign in
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
