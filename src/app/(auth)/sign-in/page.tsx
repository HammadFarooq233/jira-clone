import { SignInCard } from "@/features/auth/components/sign-in-card";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jira Clone - Sign In",
};

export default function SignInPage() {
  return <SignInCard />;
}
