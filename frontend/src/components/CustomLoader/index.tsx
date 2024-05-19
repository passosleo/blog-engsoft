import { twMerge } from "tailwind-merge";

export function CustomLoader({
  className,
  ...props
}: React.ComponentProps<"svg">) {

  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={twMerge("animate-spin lucide lucide-loader-circle text-primary", className)}><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg>
  );
}
