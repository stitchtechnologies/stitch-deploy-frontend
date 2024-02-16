import Layout from "@/components/layout";
import { ORGANIZATIONS } from "@/components/organization";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
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
import { Input } from "@/components/ui/input";
import { ServicesTable } from "@/components/servicesTable";
import { Textarea } from "@/components/ui/textarea";
import EnvironmentVariablesTable, { EnvironmentVariable } from "@/components/environmentVariablesTable";
import NewEnvironmentVariableDialog from "@/components/createNewEnvironmentVariableDialog";
import { useState } from "react";
import NewUserDialog from "@/components/createNewUserDialog";
import UsersTable, { User } from "@/components/usersTable";

export default function NewOrganizationEnvironment() {
    const router = useRouter();
    const [envVariables, setEnvVariables] = useState<EnvironmentVariable[]>([{
        key: "DASHBOARD_USERNAME",
        value: "supabase"
    },
    {
        key: "DASHBOARD_PASSWORD",
        value: "supabase_password"
    }]);
    const [users, setUsers] = useState<User[]>([
        {
            name: "Sam Altman",
            email: "sama@openai.com"
        },
    ])

    const ORGANIZATION = [...ORGANIZATIONS, ACME_ORG].find((org) => org.id === router.query.id)!;
    if (!ORGANIZATION) {
        return <div>Organization not found</div>
    }

    return (
        <Layout>
            <Head>
                <title>Stitch | {ORGANIZATION.organizationName} | New Environment</title>
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
                        <div className="text-sm text-slate-400 mb-3">Enter a name under which this environment will appear. This name is not visible to outside of your organization.</div>
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

            <div className="flex flex-col gap-6 py-12 px-24 border-b-[rgba(0,0,0,0.10)] border-b border-solid">
                <div className="flex flex-col gap-2">
                    <div className="text-2xl">Select services</div>
                    <div className="text-sm text-slate-400 mb-3">All services selected below will be deployed to the environment. The recipient will see an overview of the services before they deploy them.</div>
                </div>
                <div className="flex items-center justify-center">
                    <ServicesTable />
                </div>
            </div>

            {/* <div className="flex flex-col gap-6 py-12 px-24 border-b-[rgba(0,0,0,0.10)] border-b border-solid">
                <div className="flex flex-col gap-2">
                    <div className="text-2xl">Projected costs</div>
                    <div className="text-sm text-slate-400 mb-3">You can inform the recipient about the projected cost of running the services. The costs should not include your license fees, but solely the storage and compute costs.</div>
                </div>
                <div className="flex items-center justify-center">
                    <Textarea placeholder="Describe the projected costs of the services..." />
                </div>
            </div> */}

            <div className="flex flex-col gap-6 py-12 px-24 border-b-[rgba(0,0,0,0.10)] border-b border-solid">
                <div className="flex">
                    <div className="text-2xl">Environment variables</div>
                    <NewEnvironmentVariableDialog onCreated={(envVar) => setEnvVariables(prev => [...prev, envVar])} />
                </div>
                <div className="flex items-center justify-center">
                    <EnvironmentVariablesTable environmentVariables={envVariables} />
                </div>
            </div>

            <div className="flex flex-col gap-6 py-12 px-24 border-b-[rgba(0,0,0,0.10)] border-b border-solid">
                <div className="flex">
                    <div className="flex flex-col gap-2">
                        <div className="text-2xl">Users</div>
                        <div className="text-sm text-slate-400 mb-3">Enter the emails of you recipient contacts responsible for setting up the environment. Only users with access to that email can deploy your product. Additional email addresses can be added later on.</div>
                    </div>
                    <NewUserDialog onCreated={(user) => setUsers(prev => [...prev, user])} />
                </div>
                <div className="flex items-center justify-center">
                    <UsersTable users={users} />
                </div>
            </div>

            <div className="flex flex-col gap-6 py-12 px-24 border-b-[rgba(0,0,0,0.10)] border-b border-solid">
                <Button variant={"outline"} disabled={true}>Preview deployment form</Button>
                <Button>Send environment creation request</Button>
            </div>
        </Layout>
    );
}