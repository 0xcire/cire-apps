import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/stations/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/stations/"!</div>;
}
