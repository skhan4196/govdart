"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ForgotPasswordPage() {
  return (
    <div className="dark w-full">
      <Card className="border-white/[0.08] bg-[#111827] text-white shadow-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-xl text-white">
            Reset your password
          </CardTitle>
          <CardDescription className="text-slate-400">
            Enter your email and we&apos;ll send you a reset link
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          <form
            className="flex flex-col gap-4"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="flex flex-col gap-2">
              <Label htmlFor="email" className="text-slate-300">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@company.com"
                className="border-white/[0.1] bg-white/[0.04] text-white placeholder:text-slate-500 focus-visible:border-blue-500 focus-visible:ring-blue-500/20"
              />
            </div>

            <Button
              type="submit"
              className="mt-1 w-full bg-blue-600 text-white hover:bg-blue-500"
            >
              Send reset link
            </Button>
          </form>

          {/* Back to sign in */}
          <Link
            href="/sign-in"
            className="flex items-center justify-center gap-1.5 text-sm text-slate-400 transition-colors hover:text-white"
          >
            <ArrowLeft className="size-3.5" />
            Back to sign in
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
