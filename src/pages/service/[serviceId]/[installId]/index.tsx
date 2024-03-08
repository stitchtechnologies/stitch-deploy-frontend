'use-client'

import Layout from "@/components/layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import CommandDialog from "@/components/command-dialog";
import { ServiceWithVendorAndInstalls } from "@/pages/api/get-service";
import { useUser } from "@clerk/nextjs";
import { ArrowUpCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function Install() {
    const [logs, setLogs] = useState([]);
    const router = useRouter();
    const installId = router.query.installId;
    const { user } = useUser();
    const [loadingService, setLoadingService] = useState<boolean>(false);
    const [service, setService] = useState<ServiceWithVendorAndInstalls>();
    const [upgradeDialogOpen, setUpgradeDialogOpen] = useState(false);
    const serviceId = router.query.serviceId;

    // Check if user already has a vendor account - otherwise redirect to create vendor page
    useEffect(() => {
        if (!user) return;
        setLoadingService(true)
        fetch(`/api/get-service?serviceId=${encodeURIComponent(serviceId as string)}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => res.json())
            .then((data) => {
                if (!data.service) {
                    router.push("/")
                    return;
                }
                setService(data.service)
                setLoadingService(false)
            })
            .catch((error) => {
                console.error(error)
                window.alert("There was an error checking if you already have a vendor account. Please try again.")
                router.push("/")
                return;
            })
    }, [router, serviceId, user])

    useEffect(() => {
        if (!installId) {
            return;
        }
        const fetchLogs = async () => {
            try {
                const response = await fetch(`/api/get-logs?installId=${installId}`);
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                const data = await response.json();
                setLogs(data.logs);
            } catch (error) {
                console.error('Failed to fetch logs:', error);
            }
        };

        fetchLogs();
    }, [installId]);

    const LoadingState = (
        <Layout>
            <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        </Layout>
    )

    if (!service || loadingService) {
        return LoadingState
    };

    const deployment = service.Deployments.find((d) => d.id === installId);

    if (!deployment) {
        return LoadingState
    }

    return (
        <Layout>
            <CommandDialog open={upgradeDialogOpen} setOpen={setUpgradeDialogOpen} deploymentId={installId as string} />
            <div className="flex items-center border-b-[rgba(0,0,0,0.10)] px-24 border-b border-solid">
                <div className="flex items-center gap-4 my-12">
                    <Link href={`/service/${service.slug}`}>
                        {service.image &&
                            <Avatar className="h-8 w-8">
                                <AvatarImage src={service.image} />
                                <AvatarFallback>{service.slug}</AvatarFallback>
                            </Avatar>
                        }
                    </Link>
                    <Link href={`/service/${service.slug}`}>
                        <div className="text-4xl">
                            {service.title}
                        </div>
                    </Link>
                </div>
                <div className="ml-auto flex gap-2">
                    <Link href={`https://deploy.stitch.tech/${service.Vendor.slug}/${service.slug}?did=${installId}`} target="_blank">
                        <Button>Open Deploy Page</Button>
                    </Link>
                    <Button className="flex gap-2" onClick={() => setUpgradeDialogOpen(true)}>
                        <ArrowUpCircle className="h-4 w-4" />
                        <span>Issue command</span>
                    </Button>
                </div>
            </div>
            <div className="flex flex-col gap-6 py-12 px-24 border-b-[rgba(0,0,0,0.10)] border-b border-solid">
                <div className="text-2xl">
                    Information
                </div>
                <div>
                    <pre>
                        {deployment.info == undefined ? "Waiting for information to be sent by deployment..." : JSON.stringify(deployment.info, null, 2)}
                    </pre>
                </div>
            </div>
            <div className="flex flex-col gap-6 py-12 px-24 border-b-[rgba(0,0,0,0.10)] border-b border-solid">
                <div className="text-2xl">
                    Logs
                </div>
                <div>
                    <pre>
                        {logs.length === 0 ? "Waiting for logs from this deployment..." : logs}
                    </pre>
                </div>
            </div>
        </Layout>
    );
}