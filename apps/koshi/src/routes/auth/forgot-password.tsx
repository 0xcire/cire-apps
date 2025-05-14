import { createFileRoute } from '@tanstack/react-router'
import { PageWrapper } from '@/components/page/page-wrapper'
import { ForgotPasswordFormCard } from '@/features/auth/components/forgot-password'

export const Route = createFileRoute('/auth/forgot-password')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <PageWrapper>
        <ForgotPasswordFormCard /> 
    </PageWrapper>
  )
}
