import { twMerge } from "tailwind-merge";
import { CustomLoader } from "../CustomLoader";

export type LoadingProps = React.ComponentProps<"div"> & {
  isLoading: boolean | undefined;
  children?: React.ReactNode;
  disableScroll?: boolean;
  fullScreen?: boolean;
};

export function CustomLoading({
  isLoading,
  children,
  disableScroll,
  className,
  fullScreen,
  ...props
}: LoadingProps) {
  return (
    <div
      {...props}
      className={twMerge(isLoading && !fullScreen && "p-1", className)}
      style={{ position: "relative" }}
    >
      {isLoading && (
        <div
          className={twMerge(
            "absolute inset-0 items-center justify-center bg-black z-10",
            fullScreen ? "flex fixed" : "flex bg-opacity-75"
          )}
          style={{
            width: "100%",
            height: isLoading && disableScroll ? "100vh" : "100%",
          }}
        >
          <CustomLoader />
        </div>
      )}
      {children}
    </div>
  );
}
