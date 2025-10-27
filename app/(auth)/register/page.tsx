"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { EyeIcon, EyeOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Register = () => {
  const [isPassShowed, setIsPassShowed] = useState(false);

  return (
    <>
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-bold">Bergabung dengan Rakamin</h3>
        <p className="text-sm">
          Sudah punya akun?{" "}
          <Link href={"/login/with-password"} className="text-blue-400">
            Masuk
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
      <Button variant={"secondary"} className="text-black w-full">
        Daftar
      </Button>
      <div className="flex w-full justify-center items-center gap-2 ">
        <hr className="w-full border" />
        <p className="text-xs text-gray-400">or</p>
        <hr className="w-full border" />
      </div>
      <Button variant="outline" className="font-bold">
        <div className="flex gap-2.5 items-center">
          <Image
            src="/google.png"
            alt="google logo"
            width={24}
            height={24}
            loading="lazy"
          />
          <p>Masuk dengan Google</p>
        </div>
      </Button>
    </>
  );
};

export default Register;
