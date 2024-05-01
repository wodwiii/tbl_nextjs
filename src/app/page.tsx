
"use client"
import { LoginForm } from "./Login";
import { Toaster } from "@/components/ui/toaster";
import RouteCheck from "@/services/RouteCheck";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const routeCheck = RouteCheck();
  if(routeCheck){
    router.push('/home');
  }
  return (
    <main className="h-screen flex items-center justify-center px-4 bg-gradient-to-l from-slate-300 via-slate-50 to-slate-300">
      <Toaster/>
      <LoginForm/>

    </main>
  );
}
