import { PageWrapper } from "@/components/page/page-wrapper";
import { SignInFormCard } from "@/features/auth/components/sign-in";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/sign-in")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <PageWrapper>
      <SignInFormCard />
    </PageWrapper>
  );
}
