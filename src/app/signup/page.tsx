"use client"
import Link from "next/link"
import { useState } from "react"; // Import useState hook
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import logo from "../../../public/logo.png";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function SignUpForm() {
    const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });

  const handleInputChange = (e:any) => { 
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleSignUp = async () => {
    try {
      const response = await fetch('https://tbl-nodeserver.vercel.app/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      console.log(formData);
      if (!response.ok) {
        throw new Error('Failed to sign up');
      }
      const data = await response.json();
      console.log('Sign up successful:', data);
      router.push('/');
    } catch (error:any) {
      console.error('Error signing up:', error.message);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center px-4 bg-gradient-to-l from-slate-300 via-slate-50 to-slate-300">  
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <div className="flex items-center mb-8">
              <div className="w-16 rounded">
                <Image src={logo} alt={""} />
              </div>
              <div className="font-bold text-xl mt-4 ml-4 max-w-[150px]">
                <div className="text-xs font-light">
                  <p>Welcome to</p>
                </div>
                <p>Journal & Trial Balance App</p>
              </div>
            </div>
            <CardTitle className="text-xl">Sign Up</CardTitle>
            <CardDescription>
              Enter your information to create an account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="firstName">First name</Label>
                  <Input id="firstName" placeholder="Max" required onChange={handleInputChange} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="lastName">Last name</Label>
                  <Input id="lastName" placeholder="Robinson" required onChange={handleInputChange} />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required onChange={handleInputChange} />
              </div>
              <Button onClick={handleSignUp} className="w-full">
                Create an account
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link href="/" className="underline">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
    </div>
  );
}
