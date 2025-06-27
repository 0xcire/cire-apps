import { PageWrapper } from "@/components/page/page-wrapper";
import { SignInFormCard } from "@/features/auth/components/sign-in";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

export const Route = createFileRoute("/auth/sign-in")({
  component: RouteComponent,
  validateSearch: z.object({
    redirect: z.union([z.string(), z.undefined()])
  })
});

function RouteComponent() {
  return (
    <PageWrapper>
      <SignInFormCard />
    </PageWrapper>
  );
}
