import { Button } from '@cire/ui/components/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@cire/ui/components/card';
import { Input } from '@cire/ui/components/input';
import { Label } from '@cire/ui/components/label';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { forgetPassword } from '@/lib/better-auth';
import { toast } from '@cire/ui/components/sonner';

const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>;

export function ForgotPasswordFormCard() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    // formState: { errors, defaultValues },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: ForgotPasswordData) => {
    await forgetPassword(
      {
        ...data,
        redirectTo: `${import.meta.env.VITE_CLIENT_BASE_URL}/auth/reset-password`,
      },
      {
        onRequest: () => {
          setLoading(true);
        },
        onResponse: () => {
          setLoading(false);
          toast.success('Check your email');
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
      },
    );
  };

  return (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl">Forgot Password</CardTitle>
        <CardDescription className="text-xs md:text-sm">
          Enter your email below to recover your password
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              {...register('email')}
              placeholder="m@example.com"
              required
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
            Powered by{' '}
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
