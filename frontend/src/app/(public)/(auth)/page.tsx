"use client"
import { useAuth } from "@/context/AuthContext";
import Welcome from "../(welcome)/page";
import Home from "@/app/(private)/home/page";
import { redirect } from "next/navigation";

export default function AuthCondicional() {
  const { authentication } = useAuth();

  if (authentication.authenticated) {
    redirect("/home");
  }
  
  return <Welcome />;
}
