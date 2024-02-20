import Image from "next/image"
import Layout from "@/components/layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { GitBranch, MoreHorizontal } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { VenderWithServices } from "..";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export default function Services() {
    const router = useRouter()
    const { id } = router.query
    const { user } = useUser();
    const [vendor, setVendor] = useState<VenderWithServices>();
    const [loadingVendor, setLoadingVendor] = useState<boolean>(false);
    const services = vendor?.Service;

    useEffect(() => {
        if (!user) return;
        setLoadingVendor(true)
        fetch("/api/get-vendor", {
            method: "POST",
            body: JSON.stringify({
                userId: user.id,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => res.json())
            .then((data) => {
                console.log(data)
                if (!data.vendor.Service || data.vendor.Service.length === 0) {
                    router.push("/service")
                }
                setVendor(data.vendor)
                setLoadingVendor(false)
            })
            .catch((error) => {
                console.error(error)
                setLoadingVendor(false)
            })
    }, [user])

    if (!services || services?.length === 0) {
        return <div>Service not found</div>
    };

    const service = services![0];

    return (
        <Layout>
            <Head>
                <title>Stitch | {id}</title>
            </Head>
            <div className="flex items-center border-b-[rgba(0,0,0,0.10)] px-24 border-b border-solid">
                <div className="flex items-center gap-4 my-12">
                    <Link href={`/service/${id}`}>
                        <Avatar className="h-8 w-8">
                            <AvatarImage src={service.image} />
                            <AvatarFallback>{service.title}</AvatarFallback>
                        </Avatar>
                    </Link>
                    <Link href={`/service/${id}`}>
                        <div className="text-4xl">
                            {service.title}
                        </div>
                    </Link>
                </div>
                <div className="ml-auto">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            <DropdownMenuLabel>Appearance</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuCheckboxItem>
                                Status Bar
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem>
                                Activity Bar
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem>
                                Panel
                            </DropdownMenuCheckboxItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            <div className="flex flex-col gap-6 py-12 px-24 border-b-[rgba(0,0,0,0.10)] border-b border-solid">
                <div className="text-2xl">
                    Overview
                </div>
                <div className="grid grid-cols-3 bg-white gap-6 rounded-md border-color-slate-200 border border-solid p-6">
                    <div className="flex flex-col gap-1">
                        <h2 className="text-sm text-slate-500">Source</h2>
                        <div className="text-sm font-robotomono flex gap-2 items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                            <span><span className="text-slate-400">{vendor?.title}/</span>{service.title}</span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <h2 className="text-sm text-slate-500">Branch</h2>
                        <div className="text-sm font-robotomono flex gap-2 items-center"><GitBranch className="h-4 w-4" />main</div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <h2 className="text-sm text-slate-500">Created</h2>
                        <div className="text-sm">1d ago by joshenlim</div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <h2 className="text-sm text-slate-500">ID</h2>
                        <div className="text-sm">99a60bdd3c8195867dc187eb5bfa5e814661b4fa</div>
                    </div>
                </div>
            </div>
            <Image src={"/services-test.png"} alt="Service" width={1920} height={1080} />
        </Layout>
    );
}
