import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TooltipContentProps, TooltipProps } from "@radix-ui/react-tooltip";
import { twMerge } from "tailwind-merge";

type Props = TooltipContentProps & {
  text: string;
  className?: string;
};

export function CustomTooltip({ text, children, className, ...props }: Props) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent
          {...props}
          className={twMerge(
            "p-1 px-2 bg-black border-none text-white",
            className
          )}
        >
          {text}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
