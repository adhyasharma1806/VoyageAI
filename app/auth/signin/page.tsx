"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SignIn() {

  const router = useRouter()

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  const handleLogin = async (e:React.FormEvent) => {

    e.preventDefault()

    try{

      const res = await fetch("http://localhost:5000/api/auth/login",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          email,
          password
        })
      })

      const data = await res.json()

      if(res.ok){

        localStorage.setItem("token",data.token)
        localStorage.setItem("user",JSON.stringify(data))

        router.push("/dashboard")

      }else{

        alert(data.message)

      }

    }catch(err){

      console.error(err)

    }

  }

  return (

    <motion.div
      initial={{opacity:0}}
      animate={{opacity:1}}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-zinc-900 to-black"
    >

      <motion.div
        initial={{y:40,opacity:0}}
        animate={{y:0,opacity:1}}
        transition={{duration:0.5}}
      >

        <Card className="w-[420px] bg-white/5 backdrop-blur-xl border-white/10">

          <CardHeader>
            <CardTitle className="text-3xl text-center font-bold">
              Welcome Back
            </CardTitle>
          </CardHeader>

          <CardContent>

            <form onSubmit={handleLogin} className="space-y-5">

              <Input
                placeholder="Email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
              />

              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
              />

              <Button className="w-full">
                Sign In
              </Button>

            </form>

            <p className="text-center text-sm text-muted-foreground mt-6">
              Don’t have an account?{" "}
              <Link href="/auth/signup" className="text-blue-500 hover:underline">
                Sign Up
              </Link>
            </p>

          </CardContent>

        </Card>

      </motion.div>

    </motion.div>
  );
}