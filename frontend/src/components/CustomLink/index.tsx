import Link, { LinkProps } from "next/link";

type Props = LinkProps & {
  children: React.ReactNode;
};

export function CustomLink({ children, ...rest }: Props) {
  return <Link {...rest}>{children}</Link>;
}
