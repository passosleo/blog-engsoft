import { redirect } from "next/navigation";

export default function CustomNotFound() {
  return redirect("/");
}
