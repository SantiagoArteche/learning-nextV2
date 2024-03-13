import Image from "next/image";
import Link from "next/link";
import { CiLogout } from "react-icons/ci";
import { SidebarItem } from "./SidebarItem";
import {
  IoBasketOutline,
  IoCalendarOutline,
  IoCheckboxOutline,
  IoCodeWorkingOutline,
  IoListOutline,
  IoPersonOutline,
} from "react-icons/io5";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { LogoutButton } from "./LogoutButton";

const menuItems = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: <IoCalendarOutline size={30} />,
  },
  {
    name: "Rest TODOS",
    path: "/dashboard/rest-todos",
    icon: <IoCheckboxOutline size={30} />,
  },
  {
    name: "Server Actions",
    path: "/dashboard/server-todos",
    icon: <IoListOutline size={30} />,
  },
  {
    name: "Cookies",
    path: "/dashboard/cookies",
    icon: <IoCodeWorkingOutline size={30} />,
  },
  {
    name: "Products",
    path: "/dashboard/products",
    icon: <IoBasketOutline size={30} />,
  },
  {
    name: "Profile",
    path: "/dashboard/profile",
    icon: <IoPersonOutline size={30} />,
  },
];

export const Sidebar = async () => {
  const session = await getServerSession(authOptions);

  const avatarUrl = session?.user?.image ? session?.user?.image : "/Messi.webp";
  return (
    <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
      <div>
        <div className="-mx-6 px-6 py-4">
          <Link href="/dashboard" title="home">
            <Image
              width={50}
              height={50}
              src="https://tailus.io/sources/blocks/stats-cards/preview/images/logo.svg"
              className="w-32"
              alt="tailus logo"
            />
          </Link>
        </div>

        <div className="mt-8 text-center">
          <Image
            width={150}
            height={150}
            src={avatarUrl}
            alt={avatarUrl}
            className=" max-w-[150px] max-h-[150px] m-auto rounded-full object-cover lg:w-28 lg:h-28"
          />
          <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">
            {session?.user?.name ?? "Messi"}
          </h5>
          <span className="hidden text-gray-400 lg:block capitalize">
            {session?.user?.rols ?? ["user"]}
          </span>
        </div>

        <ul className="space-y-2 tracking-wide mt-8">
          {menuItems.map((item) => (
            <SidebarItem key={item.path} {...item} />
          ))}
        </ul>
      </div>

      <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
        <LogoutButton />
      </div>
    </aside>
  );
};
