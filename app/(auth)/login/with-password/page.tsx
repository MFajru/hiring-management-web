"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EyeIcon, EyeOff, Mail } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";

const LoginPassword = () => {
  const [isPassShowed, setIsPassShowed] = useState(false);

  return (
    <>
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-bold">Masuk ke Rakamin</h3>
        <p className="text-sm">
          Belum punya akun?{" "}
          <Link href={"/register"} className="text-blue-400">
            Daftar menggunakan email
          </Link>
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="email" className="font-normal text-xs">
          Alamat email
        </Label>
        <Input type="email" id="email"></Input>
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="password" className="font-normal text-xs">
          Kata sandi
        </Label>
        <InputGroup>
          <InputGroupInput
            id="password"
            type={isPassShowed ? "text" : "password"}
            className="pl-3!"
          />
          <InputGroupAddon align="inline-end">
            <Tooltip>
              <TooltipTrigger asChild>
                <InputGroupButton
                  className="rounded-full hover:cursor-pointer"
                  size="icon-xs"
                  onClick={() => setIsPassShowed(!isPassShowed)}
                >
                  {isPassShowed ? <EyeIcon /> : <EyeOff />}
                </InputGroupButton>
              </TooltipTrigger>
              <TooltipContent>Tampilkan sandi</TooltipContent>
            </Tooltip>
          </InputGroupAddon>
        </InputGroup>
      </div>
      <div className="flex justify-end w-full">
        <Link href={""} className="text-blue-400 text-sm">
          Lupa kata sandi?
        </Link>
      </div>
      <Button className="bg-[#fbc037] text-black w-full">Masuk</Button>
      <div className="flex w-full justify-center items-center gap-2 ">
        <hr className="w-full border" />
        <p className="text-xs text-gray-400">or</p>
        <hr className="w-full border" />
      </div>
      <div className="flex flex-col gap-4">
        <Link href="/login" className="w-full">
          <Button variant="outline" className="font-bold w-full">
            <div className="flex gap-2.5 items-center">
              <Mail strokeWidth={3} />
              <p>Kirim link login melalui email</p>
            </div>
          </Button>
        </Link>
        <Button variant="outline" className="font-bold">
          <div className="flex gap-2.5 items-center">
            <Image src="/google.png" alt="google logo" width={24} height={24} />
            <p>Masuk dengan Google</p>
          </div>
        </Button>
      </div>
    </>
  );
};

export default LoginPassword;
