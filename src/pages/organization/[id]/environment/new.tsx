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
import { Environment } from "..";
import { Input } from "@/components/ui/input";

const EnvironmentRow = ({ environment }: { environment: Environment }) => {
    return (
        <div className="flex gap-4 py-4 px-6 items-center justify-between text-sm border-b-[rgba(0,0,0,0.10)] border-b border-solid">
            <div className="flex flex-col w-[320px]">
                <div className="flex gap-2">
                    <div>{environment.name}</div>
                    <div className="text-slate-500">{environment.id}</div>
                </div>
                <div className="text-slate-500 text-sm">{environment.provider} {environment.region}</div>
            </div>
            <div className="flex gap-2 items-center">
                <svg width="17" height="19" viewBox="0 0 17 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="0.5" y="1.5" width="16" height="16" rx="8" fill="#C0FFD2" />
                </svg>
                <div className="flex flex-col text-slate-500">
                    <div>Healthy</div>
                    <div className="font-thin">2m ago</div>
                </div>
            </div>
            <div className="text-slate-500 font-thin">{environment.productsToUpgrade} deployed services</div>
            <div className="text-slate-500 font-thin">{environment.lastUpdate}</div>
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
                        <div className="text-slate-500 text-4xl">
                            {ORGANIZATION.organizationName}
                        </div>
                    </Link>
                    <div className="text-slate-500 text-3xl font-medium">/</div>
                    <div className="text-4xl">
                        New environment
                    </div>
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
                    Details
                </div>
                <div className="flex flex-col gap-6">
                    <div>
                        <h2 className="text-sm">Environment name</h2>
                        <div className="text-sm text-slate-400 mb-3">A short name for this environment</div>
                        <Input type="text" name="access-key" placeholder="Enter name" />
                    </div>
                    <div>
                        <h2 className="text-sm">Description</h2>
                        <div className="text-sm text-slate-400 mb-3">Description for this environment</div>
                        <Input type="text" name="access-key" placeholder="Enter description" />
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-6 py-12 px-24 border-b-[rgba(0,0,0,0.10)] border-b border-solid">
                <div className="text-2xl">
                    Import Terraform
                </div>
                <div className="flex items-center justify-center">
                    <Button className="flex gap-1">
                        <svg className="invert" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                        Connect to GitHub
                    </Button>
                </div>
            </div>
        </Layout>
    );
}