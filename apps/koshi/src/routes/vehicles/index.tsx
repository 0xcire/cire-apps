import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/vehicles/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/vehicles/"!</div>;
}
