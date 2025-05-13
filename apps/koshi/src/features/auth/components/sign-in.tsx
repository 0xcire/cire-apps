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
import { Checkbox } from "@cire/ui/components/checkbox";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { signIn } from "@/lib/better-auth";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";

export function SignIn() {
  //TODO: this should be a form
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl">Sign In</CardTitle>
        <CardDescription className="text-xs md:text-sm">
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
            />
          </div>

          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              {/*<Link href="#" className="ml-auto inline-block text-sm underline">
                Forgot your password?
              </Link>*/}
            </div>

            <Input
              id="password"
              type="password"
              placeholder="password"
              autoComplete="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              id="remember"
              onClick={() => {
                setRememberMe(!rememberMe);
              }}
            />
            <Label htmlFor="remember">Remember me</Label>
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={loading}
            onClick={async () => {
              await signIn.email(
                {
                  email,
                  password,
                  callbackURL: "/",
                },
                {
                  onRequest: (ctx) => {
                    setLoading(true);
                  },
                  onResponse: (ctx) => {
                    setLoading(false);
                  },
                  onError: (ctx) => {
                    toast(ctx.error);
                  },
                },
              );
            }}
          >
            {loading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <p> Login </p>
            )}
          </Button>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex justify-center w-full border-t py-4">
          <p className="text-center text-xs text-neutral-500">
            Powered by{" "}
            {/*<Link
              href="https://better-auth.com"
              className="underline"
              target="_blank"
            >
              <span className="dark:text-orange-200/90">better-auth.</span>
            </Link>*/}
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}
