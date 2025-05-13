import { createFileRoute } from "@tanstack/react-router";
import { SignUp } from "../../features/auth/components/sign-up";
import { PageWrapper } from "@/components/page/page-wrapper";

export const Route = createFileRoute("/auth/sign-up")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <PageWrapper>
      <SignUp />
    </PageWrapper>
  );
}
