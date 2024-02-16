import Layout from "@/components/layout";
import { ORGANIZATIONS } from "@/components/organization";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ChevronRight, GitBranch, MoreHorizontal } from "lucide-react";
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
import { SERVICES } from "..";
import { Input } from "@/components/ui/input";

export default function Services() {
    const router = useRouter()
    const { id } = router.query
    const SERVICE = SERVICES.find((service) => service.id === id)!;

    if (!SERVICE) return <div>Service not found</div>;

    return (
        <Layout>
            <Head>
                <title>Stitch | {id}</title>
            </Head>
            <div className="flex items-center border-b-[rgba(0,0,0,0.10)] px-24 border-b border-solid">
                <div className="flex items-center gap-4 my-12">
                    <Link href={`/organization/${id}`}>
                        <Avatar className="h-8 w-8">
                            <AvatarImage src={SERVICE.imageUrl} />
                            <AvatarFallback>{SERVICE.fallbackName}</AvatarFallback>
                        </Avatar>
                    </Link>
                    <Link href={`/organization/${id}`}>
                        <div className="text-4xl">
                            {SERVICE.serviceName}
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
                <div className="grid grid-cols-3 space-y-2 bg-white rounded shadow p-6">
                    <div className="flex flex-col gap-1">
                        <h2 className="text-sm text-slate-500">Source</h2>
                        <div className="text-sm mb-3 font-robotomono"><span className="text-slate-400">supabase/</span>supabase</div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <h2 className="text-sm text-slate-500">Branch</h2>
                        <div className="text-sm mb-3 font-robotomono flex gap-2 items-center"><GitBranch className="h-4 w-4" />main</div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <h2 className="text-sm text-slate-500">Created</h2>
                        <div className="text-sm mb-3">1d ago by joshenlim</div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <h2 className="text-sm text-slate-500">ID</h2>
                        <div className="text-sm mb-3">99a60bdd3c8195867dc187eb5bfa5e814661b4fa</div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
