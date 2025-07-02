import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/blend-calculator/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/blend-calculator/"!</div>;
}
