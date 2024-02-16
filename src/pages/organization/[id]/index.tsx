import Layout from "@/components/layout";
import { ORGANIZATIONS } from "@/components/organization";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ChevronRight, MoreHorizontal } from "lucide-react";
import { useRouter } from "next/router";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Head from "next/head";
import { ACME_ORG } from "@/components/createNewOrganizationDialog";
import Link from "next/link";

export interface Environment {
    id: string;
    name: string;
    status: string;
    installedProducts: number;
    productsToUpgrade: number;
    provider: string;
    region: string;
    lastUpdate: string;
}

const EnvironmentRow = ({ environment }: { environment: Environment }) => {
    return (
        <div className="flex gap-4 py-4 px-6 items-center justify-between text-sm border-b-slate-200 last:border-b-0 border-b border-solid">
            <div className="flex flex-col w-[320px]">
                <div className="flex gap-2">
                    <div className="font-medium">{environment.name}</div>
                    <div className="text-slate-500">{environment.id}</div>
                </div>
                <div className="text-slate-500 text-sm">{environment.provider} {environment.region}</div>
            </div>
            <div className="flex gap-2 items-center">
                <svg width="17" height="19" viewBox="0 0 17 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="0.5" y="1.5" width="16" height="16" rx="8" fill="#C0FFD2" />
                </svg>
                <div className="flex flex-col text-slate-500">
                    <div className="font-medium">Healthy</div>
                    <div className="font-normal">2m ago</div>
                </div>
            </div>
            <div className="text-slate-500 font-normal">{environment.productsToUpgrade} deployed services</div>
            <div className="text-slate-500 font-normal">{environment.lastUpdate}</div>
            <Button variant="ghost" size="icon">
                <ChevronRight className="h-4 w-4" />
            </Button>
        </div>
    )
}

export default function Organizations() {
    const router = useRouter();
    const ORGANIZATION = [...ORGANIZATIONS, ACME_ORG].find((org) => org.id === router.query.id)!;
    if (!ORGANIZATION) {
        return <div>Organization not found</div>
    }
    const ENVIRONMENTS: Environment[] = ORGANIZATION.id === ACME_ORG.id ? [] : [
        {
            id: "474br8r8f7s8u13ju9vuavf",
            name: "Production",
            status: "Healthy",
            installedProducts: 4,
            productsToUpgrade: 3,
            provider: "aws",
            region: "us-east-1",
            lastUpdate: "2d to upgrade"
        },
        {
            id: "474br8r8f7s8u13ju9vuavf",
            name: "Staging",
            status: "Healthy",
            installedProducts: 4,
            productsToUpgrade: 3,
            provider: "aws",
            region: "us-east-1",
            lastUpdate: "2d to upgrade"
        },
        {
            id: "474br8r8f7s8u13ju9vuavf",
            name: "Development",
            status: "Healthy",
            installedProducts: 4,
            productsToUpgrade: 3,
            provider: "aws",
            region: "us-east-1",
            lastUpdate: "2d to upgrade"
        },
    ]

    return (
        <Layout>
            <Head>
                <title>Stitch | {ORGANIZATION.organizationName}</title>
            </Head>
            <div className="flex items-center border-b-[rgba(0,0,0,0.10)] px-24 border-b border-solid">
                <div className="flex items-center gap-4 my-12">
                    <Link href={`/organization/${ORGANIZATION.id}`}>
                        <Avatar className="h-8 w-8">
                            <AvatarImage src={ORGANIZATION.imageUrl} />
                            <AvatarFallback>{ORGANIZATION.fallbackName}</AvatarFallback>
                        </Avatar>
                    </Link>
                    <Link href={`/organization/${ORGANIZATION.id}`}>
                        <div className="text-4xl">
                            {ORGANIZATION.organizationName}
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
                <div className="flex">
                    <div className="text-2xl">
                        Environments
                    </div>
                    {/* <CreateNewEnvironmentDialog organization={ORGANIZATION} /> */}
                    <Link href={`/organization/${ORGANIZATION.id}/environment/new`} className="ml-auto">
                        <Button>
                            Create new
                        </Button>
                    </Link>
                </div>
                    {ENVIRONMENTS.length === 0 ?
                        <div className="rounded border-dashed border-2 border-slate-400 flex justify-center items-center gap-3 self-stretch px-6 py-4 text-slate-500 text-sm">
                            Create their first environment
                        </div>
                        :
                        <div className="rounded-md bg-white border border-slate-200">
                            {ENVIRONMENTS.map((env, index) => <EnvironmentRow key={index} environment={env} />)}
                        </div>
                    }
            </div>
        </Layout>
    );
}