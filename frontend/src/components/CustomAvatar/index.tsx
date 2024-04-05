 
import { AvatarImageProps, AvatarProps } from "@radix-ui/react-avatar";
import { twMerge } from "tailwind-merge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

type CustomAvatarProps = AvatarProps & {
  name?: string | null;
  image?: AvatarImageProps;
};

export function CustomAvatar({
  image,
  name,
  className,
  ...props
}: CustomAvatarProps) {
  const fallback = image && image.alt ? image.alt : "US";
  const initials =
    name &&
    name
      .split(" ")
      .map((n) => n[0])
      .join("");
  return (
    <Avatar
      className={twMerge(
        "border-2 border-primary cursor-pointer select-none",
        className
      )}
      {...props}
    >
      {image && <AvatarImage {...image} />}
      <AvatarFallback className="font-medium">
        {initials ?? fallback}
      </AvatarFallback>
    </Avatar>
  );
}
