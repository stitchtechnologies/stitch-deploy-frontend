import Layout from "@/components/layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import Head from "next/head";
import Link from "next/link";
import { Cloud, Loader2 } from "lucide-react"
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { Service, Vendor } from "@prisma/client";
import { Button } from "@/components/ui/button";

export type VenderWithServices = Vendor & {
    Service: Service[];
}

export const ServiceCard: React.FC<{ service: Service, vendorSlug: string }> = ({ service, vendorSlug }) => {
    return (
        <Link href={`https://deploy.stitch.tech/${vendorSlug}/${service.slug}`} target="_blank" className="flex flex-col gap-4 bg-white rounded-md border-[color:var(--slate-200,#E2E8F0)] border-solid border p-6 text-sm shadow-[0px_2px_6px_0px_rgba(0,0,0,0.09)] hover:shadow-md">
            <div className="flex gap-3 items-center">
                <Avatar className="h-6 w-6">
                    <AvatarImage src={service.image} />
                    <AvatarFallback>{service.slug}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                    <div>{service.title}</div>
                    {/* <div className="text-slate-400">{lastUpdated}</div> */}
                </div>
                <div className="ml-auto font-regular text-slate-500">v1.0.0</div>
            </div>
            <Badge variant={"default"} className="font-normal flex gap-1"><Cloud /> Available</Badge>
            {/* <div className="flex gap-2">
                {badges.map((badge, index) => (
                    <Badge key={index} variant={badge.variant} className="font-normal flex gap-1">{badge.icon} {badge.text}</Badge>
                ))}
            </div> */}
        </Link>
    )
}

export default function Services() {
    const router = useRouter();
    const { user } = useUser();
    const [vendor, setVendor] = useState<VenderWithServices>();
    const [loadingVendor, setLoadingVendor] = useState<boolean>(false);
    const services = vendor?.Service;

    useEffect(() => {
        if (!user) return;
        setLoadingVendor(true)
        fetch(`/api/get-vendor`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => res.json())
            .then((data) => {
                if (!data.vendor) {
                    router.push("/vendor/create")
                    return;
                }
                setVendor(data.vendor)
                setLoadingVendor(false)
            })
            .catch((error) => {
                console.error(error)
                setLoadingVendor(false)
            })
    }, [router, user])

    return (
        <Layout>
            <Head>
                <title>Stitch | Services</title>
            </Head>
            <div className="flex flex-col gap-4 px-24 py-6">
                <div className="flex gap-2">
                    <Input type="text" placeholder="Search" />
                    <Select>
                        <SelectTrigger className="w-[200px]">
                            <SelectValue placeholder="Sort by activity" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="update">Sort by last update</SelectItem>
                            <SelectItem value="activity">Sort by activity</SelectItem>
                            <SelectItem value="name">Sort by name</SelectItem>
                        </SelectContent>
                    </Select>
                    <Link href="/service/create">
                        <Button className="px-6">
                            Create new
                        </Button>
                    </Link>
                </div>
                <div className="flex justify-center">
                    {loadingVendor && (
                        <Loader2 className="h-8 w-8 animate-spin" />
                    )}
                    {!loadingVendor && services?.length === 0 && (
                        <p>You have no services.</p>
                    )}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {services?.map((service) => (
                        <ServiceCard
                            key={service.id}
                            service={service}
                            vendorSlug={vendor?.slug || ""}
                        />
                    ))}
                </div>
            </div>
        </Layout>
    );
}
