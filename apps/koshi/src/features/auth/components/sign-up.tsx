import { useState } from "react";
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
import { signUp } from "@/lib/better-auth";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Typography } from "@cire/ui/components/typography";

const signUpSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(1),
  confirmPassword: z.string().min(1)
})
.refine(({ password, confirmPassword }) => password === confirmPassword, {
  path: ["confirmPassword"],
  message: 'Passwords do not match'
})
.transform(({ confirmPassword, ...data }) => data)

type SignUpData = z.infer<typeof signUpSchema>;


// TODO: lot's of commented code related to image upload. need to establish s3 connection or configure minio on server
export function SignUpFormCard() {
  // const [image, setImage] = useState<File | null>(null);
  // const [imagePreview, setImagePreview] = useState<string | null>(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: "",
      password: "",
      confirmPassword: ""
    }
  })

  // const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     setImage(file);
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setImagePreview(reader.result as string);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  const onSubmit = async (data: SignUpData) => {
    await signUp.email({
      ...data,
      name: `${data.firstName} ${data.lastName}`,
      // image: image ? await convertImageToBase64(image) : "",
      callbackURL: `${import.meta.env.VITE_CLIENT_BASE_URL}`,
      fetchOptions: {
        onResponse: () => {
          setLoading(false);
        },
        onRequest: () => {
          setLoading(true);
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
        onSuccess: async () => {
          navigate({ to: "/" });
        },
      },
    });
  }

  return (
    <Card className="z-50 rounded-md rounded-t-none max-w-md">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl">Sign Up</CardTitle>
        <CardDescription className="text-xs md:text-sm">
          Enter your information to create an account
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
        <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="first-name">First name</Label>

              <Input
                id="first-name"
                placeholder="Max"
                required
                {...register('firstName')}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="last-name">Last name</Label>

              <Input
                id="last-name"
                placeholder="Robinson"
                required
                {...register('lastName')}
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>

            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              {...register('email')}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>

            <Input
              id="password"
              type="password"
              {...register('password')}
              autoComplete="new-password"
              placeholder="Password"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password">Confirm Password</Label>

            <Input
              id="password_confirmation"
              type="password"
              {...register('confirmPassword')}
              autoComplete="new-password"
              placeholder="Confirm Password"
            />
            { errors.confirmPassword && (
              <Typography className="text-muted-foreground" variant='small'>{errors.confirmPassword.message}</Typography>
            )}
          </div>

          {/* <div className="grid gap-2">
            <Label htmlFor="image">Profile Image (optional)</Label>

            <div className="flex items-end gap-4">
              {imagePreview && (
                <div className="relative w-16 h-16 rounded-sm overflow-hidden">
                  <Image
                    src={imagePreview}
                    alt="Profile preview"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              )}

              <div className="flex items-center gap-2 w-full">
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full"
                />

                {imagePreview && (
                  <X
                    className="cursor-pointer"
                    onClick={() => {
                      setImage(null);
                      setImagePreview(null);
                    }}
                  />
                )}
              </div>
            </div>
          </div> */}

          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              "Create an account"
            )}
          </Button>
        </form> 
      </CardContent>

      <CardFooter>
        <div className="flex justify-center w-full border-t py-4">
          <p className="text-center text-xs text-neutral-500">
            Secured by{" "}
            <a
              href="https://better-auth.com"
              className="text-orange-400"
              target="_blank"
            >
              better-auth.
            </a>
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}
