import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";

const page = () => {
  return (
    <>
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-bold">Bergabung dengan Rakamin</h3>
        <p className="text-sm">
          Sudah punya akun?{" "}
          <Link href={"/login"} className="text-blue-400">
            Masuk
          </Link>
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="email" className="font-normal text-xs">
          Alamat email
        </Label>
        <Input id="email"></Input>
      </div>
      <Button className="bg-[#FBC037] text-black w-full">
        Daftar dengan email
      </Button>
      <div className="flex w-full justify-center items-center gap-2 ">
        <hr className="w-full border" />
        <p className="text-xs text-gray-400">or</p>
        <hr className="w-full border" />
      </div>
      <Button variant="outline" className="font-bold">
        <div className="flex gap-2.5 items-center">
          <Image src="/google.png" alt="google logo" width={24} height={24} />
          <p>Masuk dengan Google</p>
        </div>
      </Button>
    </>
  );
};

export default page;
