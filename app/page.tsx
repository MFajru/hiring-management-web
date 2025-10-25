import { redirect } from "next/navigation";

export default function Home() {
  redirect("/login/with-password");
  return <div></div>;
}
