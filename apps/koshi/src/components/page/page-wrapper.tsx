import type { ComponentProps } from "react";

export function PageWrapper({ className, ...props }: ComponentProps<"div">) {
  return <div className="flex-auto grid place-items-center" {...props} />;
}
