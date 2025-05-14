import { createAuthClient } from "better-auth/react";
import { adminClient, usernameClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  plugins: [usernameClient(), adminClient()],
});

export const {
  signIn,
  signOut,
  signUp,
  forgetPassword,
  resetPassword,
  useSession,
} = authClient;
