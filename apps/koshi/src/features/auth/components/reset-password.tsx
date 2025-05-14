// TODO: example import ordering
import { useState } from "react";
import { Link, useSearch } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { resetPassword } from "@/lib/better-auth";
import { Button } from "@cire/ui/components/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@cire/ui/components/card";
import { Input } from "@cire/ui/components/input";
import { Label } from "@cire/ui/components/label";

import { Loader2 } from "lucide-react";


const resetPasswordSchema = z.object({
  newPassword: z.string().min(1),
});

type ResetPasswordData = z.infer<typeof resetPasswordSchema>;

export function ResetPasswordFormCard() {
  const { token, error } = useSearch({
    from: '/auth/reset-password'
  });
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: "",
    },
  });

  const onSubmit = async (data: ResetPasswordData) => {
    await resetPassword(
      {
        ...data,
        token,
      },
      {
        onRequest: () => {
          setLoading(true);
        },
        onResponse: () => {
          setLoading(false);
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
      },
    );
  };

  if (error === "INVALID_TOKEN" || !token) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg md:text-xl">Token Expired!</CardTitle>
          <CardDescription className="text-xs md:text-sm">
            Click the link below to try again
        </CardDescription>
        </CardHeader>
        <CardContent>
          <Link to="/auth/forgot-password">Reset Password</Link>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl">Reset Password</CardTitle>
        <CardDescription className="text-xs md:text-sm">
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="newPassword">New Password</Label>
            <Input
              id="newPassword"
              type="password"
              {...register("newPassword")}
              placeholder="password"
              autoComplete="password"
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <p> Submit </p>
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter>
        <div className="flex justify-center w-full border-t py-4">
          <p className="text-center text-xs text-neutral-500">
            Powered by{" "}
            <a
              href="https://better-auth.com"
              className="underline"
              target="_blank"
            >
              <span className="dark:text-orange-200/90">better-auth.</span>
            </a>
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}
