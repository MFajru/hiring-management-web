import { Button } from "@/components/ui/button";
import Image from "next/image";
import { KeyRound } from "lucide-react";
import Link from "next/link";
import InputLabel from "@/components/customUI/input-with-label";

const Login = () => {
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
      <InputLabel inputId="email" inputType="email" label="Alamat email" />
      <Button variant={"secondary"} className="text-black w-full">
        Kirim link
      </Button>
      <div className="flex w-full justify-center items-center gap-2 ">
        <hr className="w-full border" />
        <p className="text-xs text-gray-400">or</p>
        <hr className="w-full border" />
      </div>
      <div className="flex flex-col gap-4">
        <Link href="/login/with-password" className="w-full">
          <Button variant="outline" className="font-bold w-full">
            <div className="flex gap-2.5 items-center">
              <KeyRound strokeWidth={3} />
              <p>Masuk dengan kata sandi</p>
            </div>
          </Button>
        </Link>

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
      </div>
    </>
  );
};

export default Login;
