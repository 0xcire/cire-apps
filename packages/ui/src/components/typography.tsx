// reference: https://ui.shadcn.com/docs/components/typography
import { JSX } from "react/jsx-runtime";
import { twMerge } from "tailwind-merge";

type TypographyProps = {
  variant:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "p"
    | "blockquote"
    | "table-head"
    | "table-row"
    | "inline-code"
    | "lead"
    | "large"
    | "small"
    | "muted";
  children: string | Array<string>;
  className?: string;
};

const classValueMap: Record<TypographyProps["variant"], string> = {
  h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
  h2: "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
  h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
  h4: "scroll-m-20 text-xl font-semibold tracking-tight",
  p: "leading-7 [&:not(:first-child)]:mt-6",
  blockquote: "mt-6 border-l-2 pl-6 italic",
  "table-head":
    "border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right",
  "table-row":
    "border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",
  "inline-code":
    "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
  lead: "text-xl text-muted-foreground",
  large: "text-lg font-semibold",
  small: "text-sm font-medium leading-none",
  muted: "text-sm text-muted-foreground",
};

const variantToElement: Record<
  TypographyProps["variant"],
  keyof JSX.IntrinsicElements
> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  p: "p",
  blockquote: "blockquote",
  "table-head": "th",
  "table-row": "td",
  "inline-code": "code",
  lead: "p",
  large: "div",
  small: "small",
  muted: "p",
};

export const Typography = ({
  variant,
  children,
  className,
}: TypographyProps) => {
  const Comp = variantToElement[variant];

  return (
    <Comp className={twMerge(classValueMap[variant], className)}>
      {children}
    </Comp>
  );
};
