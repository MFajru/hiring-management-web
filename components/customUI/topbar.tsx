import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface ITopbar {
  src?: string;
  fallback?: string;
}

const Topbar = ({ src, fallback }: ITopbar) => {
  return (
    <div className="w-screen h-16 flex justify-between px-5 items-center border-b border-gray-300 bg-white shadow-sm">
      <h3 className="font-bold text-lg">Job List</h3>
      <Avatar>
        <AvatarImage
          src={src ? src : "https://github.com/shadcn.png"}
          alt="@shadcn"
        />
        <AvatarFallback>{fallback ? fallback : "AN"}</AvatarFallback>
      </Avatar>
    </div>
  );
};

export default Topbar;
