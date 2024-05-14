export function autocapitalize(name: string): string {
  const words = name.toLowerCase().split(" ");
  const formattedName = words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  return formattedName;
}
