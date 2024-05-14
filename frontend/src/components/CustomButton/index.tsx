import { twMerge } from "tailwind-merge";
import { Button, ButtonProps } from "../ui/button";

type CustomButtonProps = ButtonProps & {
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
};

export function CustomButton({
  className,
  rightIcon,
  leftIcon,
  children,
  ...props
}: CustomButtonProps) {
  return (
    <Button className={twMerge(className)} {...props}>
      {leftIcon && <span className="mr-2">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="ml-2">{rightIcon}</span>}
    </Button>
  );
}
