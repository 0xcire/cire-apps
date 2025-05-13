import { PageWrapper } from "@/components/page/page-wrapper";
import { SignOut } from "@/features/auth/components/sign-out";
import { useSession } from "@/lib/better-auth";
import { Typography } from "@cire/ui/components/typography";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: App,
});

// TODO: obviously going to change
function App() {
  const session = useSession();
  const user = session.data?.user;

  return (
    <PageWrapper>
      <Typography variant="lead">You can just go places</Typography>
      {user && (
        <>
          <div>hello {user.name}</div>
          <SignOut />
        </>
      )}
    </PageWrapper>
  );
}
