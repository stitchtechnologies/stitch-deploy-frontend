import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useRouter } from "next/router";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils";
import { Toaster } from "./ui/toaster";
import { UserButton } from "@clerk/nextjs";
import { ScrollArea } from "./ui/scroll-area";
import { Button } from "./ui/button";
import { SlackIcon } from "lucide-react";

export default function Layout({ children }: any) {
  const router = useRouter()

  const NAVBAR_ITEMS = [
    // TODO this is bad
    // { name: "Organizations", href: "/", altHref: "/organization" },
    { name: "Services", href: "/", altHref: "/service" },
    // { name: "Settings", href: "/settings", altHref: "/settings" },
  ]

  return (
    <div>
      <div className="pt-6 px-10 text-sm border border-solid border-b-[rgba(0,0,0,0.10)]">
        <div className="flex flex-col gap-6">
          <div className="flex">
            <div className="flex gap-4 items-center">
              <Link href="/">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 4C8.8 4 11.6 16 4 16V20C15.2 20 12.4 8 20 8V4Z" fill="black" />
                  <path d="M20 8V18C20 19.1046 19.1046 20 18 20H12V24H18C21.3137 24 24 21.3137 24 18V8L20 8Z" fill="black" />
                  <path d="M12 0V4H6C4.89543 4 4 4.89543 4 6V16L0 16V6C0 2.68629 2.68629 0 6 0H12Z" fill="black" />
                </svg>
              </Link>
              {/* <svg width="16" height="25" viewBox="0 0 16 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="0.576001" y1="24.735" x2="15.576" y2="0.735002" stroke="#E2E8F0" />
              </svg> */}
              {/* <Avatar className="h-6 w-6">
                <AvatarImage src={vendor?.image} />
                <AvatarFallback>{vendor?.slug}</AvatarFallback>
              </Avatar> */}
              {/* {vendor?.title} */}
            </div>
            <div className="flex gap-6 text-slate-400 ml-auto items-center">
              <Link target="_blank" href="https://join.slack.com/t/stitchsupport/shared_invite/zt-2d839m41h-qYy7ZTJ1mRec7zYw4Pl9oQ">
                <Button className="text-md flex gap-2"> <SlackIcon height={20} /> Join our Slack channel</Button>
              </Link>
              <Link href="https://docs.stitch.tech/">Docs</Link>
              <UserButton />
            </div>
          </div>
          <div className="flex gap-8">
            <NavigationMenu>
              <NavigationMenuList>
                {NAVBAR_ITEMS.map((item, index) => {
                  const isSelectedRoute = router.pathname === item.href || router.pathname.includes(item.altHref)
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
      <main className="bg-[#00000005] min-h-screen flex flex-col justify-between">
        <div>
          {children}
        </div>
        <footer className="flex gap-10 text-sm text-slate-500 font-normal justify-center py-4">
          <Link href={"https://docs.stitch.tech/"}>Documentation</Link>
          <Link href={"https://join.slack.com/t/stitchsupport/shared_invite/zt-2d839m41h-qYy7ZTJ1mRec7zYw4Pl9oQ"}>Help</Link>
          <Dialog>
            <DialogTrigger>
              <a>Privacy Policy</a>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Privacy Policy</DialogTitle>
                <DialogDescription>
                  <ScrollArea className="mt-4 p-2 h-[600px] rounded-md border">
                    {/* TODO get real privacy policy that has been checked */}
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
                  </ScrollArea>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </footer>
      </main>
      <Toaster />
    </div>
  );
}
