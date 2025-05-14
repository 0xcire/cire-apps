import { signOut } from "@/lib/better-auth";
import { Button } from "@cire/ui/components/button";
import { useNavigate } from "@tanstack/react-router";

export function SignOutButton() {
  const navigate = useNavigate();
  return (
    <Button
      variant={"default"}
      onClick={async () => {
        await signOut({
          fetchOptions: {
            onSuccess: () => {
              navigate({ to: "/" });
            },
          },
        });
      }}
    >
      Sign Out
    </Button>
  );
}
