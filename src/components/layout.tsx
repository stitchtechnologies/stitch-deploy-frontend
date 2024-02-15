import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useRouter } from "next/router";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils";

export default function Layout({ children }: any) {
  const router = useRouter()

  const NAVBAR_ITEMS = [
    // Organization is the default route
    { name: "Organizations", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Settings", href: "/settings" },
  ]

  return (
    <div>
      <div className="pt-6 px-10 text-sm">
        <div className="flex flex-col gap-6">
          <div className="flex">
            <div className="flex gap-4">
              <Link href="/">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 4C8.8 4 11.6 16 4 16V20C15.2 20 12.4 8 20 8V4Z" fill="black" />
                  <path d="M20 8V18C20 19.1046 19.1046 20 18 20H12V24H18C21.3137 24 24 21.3137 24 18V8L20 8Z" fill="black" />
                  <path d="M12 0V4H6C4.89543 4 4 4.89543 4 6V16L0 16V6C0 2.68629 2.68629 0 6 0H12Z" fill="black" />
                </svg>
              </Link>
              <svg width="16" height="25" viewBox="0 0 16 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="0.576001" y1="24.735" x2="15.576" y2="0.735002" stroke="#E2E8F0" />
              </svg>
              <Avatar className="h-6 w-6">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              Amazing Corp
            </div>
            <div className="flex gap-4 text-slate-400 ml-auto">
              <Link href="/help">Help</Link>
              <Link href="/documentation">Docs</Link>
              <Avatar className="h-6 w-6">
                <AvatarImage src="https://github.com/zaini.png" />
                <AvatarFallback>zaini</AvatarFallback>
              </Avatar>
            </div>
          </div>
          <div className="flex gap-8">
            <NavigationMenu>
              <NavigationMenuList>
                {NAVBAR_ITEMS.map((item, index) => {
                  const isSelectedRoute = router.pathname === item.href
                  return <NavigationMenuItem key={index} className={cn({
                    "border-b-2 border-black": isSelectedRoute,
                    "mb-[2px] text-slate-400": !isSelectedRoute,
                  })}>
                    <Link href={item.href} legacyBehavior passHref>
                      <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "font-normal")}>
                        {item.name}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                })}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
      </div>
      <main className="bg-[#00000005] h-[100vh] shadow-inner">
        {children}
      </main>
    </div>
  );
}
