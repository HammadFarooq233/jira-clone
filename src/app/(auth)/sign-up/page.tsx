import { SignUpCard } from "@/features/auth/components/sign-up-card";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jira Clone - Sign Up",
};

export default function SignUpPage() {
  return <SignUpCard />;
}
