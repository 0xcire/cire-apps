import { createFileRoute } from '@tanstack/react-router'
import { PageWrapper } from '@/components/page/page-wrapper'
import { ResetPasswordFormCard } from '@/features/auth/components/reset-password'
import { z } from 'zod'

export const Route = createFileRoute('/auth/reset-password')({
  component: RouteComponent,
  validateSearch: z.object({
    token: z.union([z.string(), z.undefined()]),
    error: z.union([z.string(), z.undefined()])
  })
})

function RouteComponent() {
  return (
    <PageWrapper>
        <ResetPasswordFormCard />
    </PageWrapper>
  )
}
