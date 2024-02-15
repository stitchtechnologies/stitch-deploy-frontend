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
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface Environment {
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
        <div className="flex gap-4 py-4 px-6 items-center justify-between">
            <div className="flex flex-col w-[320px]">
                <div className="flex gap-2">
                    <div>{environment.name}</div>
                    <div className="text-slate-400">{environment.id}</div>
                </div>
                <div className="text-slate-400 text-sm">{environment.provider} {environment.region}</div>
            </div>
            <div className="flex gap-2 items-center">
                <svg width="17" height="19" viewBox="0 0 17 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="0.5" y="1.5" width="16" height="16" rx="8" fill="#C0FFD2" />
                </svg>
                <div className="flex flex-col text-slate-400">
                    <div>Healthy</div>
                    <div className="font-thin">2m ago</div>
                </div>
            </div>
            <div className="text-slate-400">{environment.productsToUpgrade} product(s) to upgrade</div>
            <div className="text-slate-400">{environment.lastUpdate}</div>
            <Button variant="ghost" size="icon">
                <ChevronRight className="h-4 w-4" />
            </Button>
        </div>
    )
}

export default function Organizations() {
    const router = useRouter();
    const [deploying, setDeploying] = useState(false);
    const ORGANIZATION = ORGANIZATIONS.find((org) => org.id === router.query.id)!;
    const ENVIRONMENTS: Environment[] = [
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

    if (!ORGANIZATION) {
        return <div>Organization not found</div>
    }

    return (
        <Layout>
            <div className="flex items-center">
                <div className="flex items-center gap-4 my-12">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={ORGANIZATION.imageUrl} />
                        <AvatarFallback>{ORGANIZATION.fallbackName}</AvatarFallback>
                    </Avatar>
                    <div className="text-4xl">
                        {ORGANIZATION.organizationName}
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

            <div className="flex flex-col gap-6 my-12">
                <div className="flex">
                    <div className="text-4xl">
                        Environment
                    </div>

                    <Dialog>
                        <DialogTrigger className="ml-auto">
                            <Button>
                                Create new
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Enter credientials</DialogTitle>
                                <DialogDescription>
                                    <form className="flex flex-col gap-4 mt-2" onSubmit={(e: any) => {
                                        e.preventDefault()
                                        console.log("Deploying", JSON.stringify({
                                            accessKey: e.target["access-key"].value,
                                            secret: e.target["secret"].value,
                                        }))
                                        setDeploying(true)
                                        fetch("https:localhost:3001/", {
                                            method: "POST",
                                            body: JSON.stringify({
                                                accessKey: e.target["access-key"].value,
                                                secret: e.target["secret"].value,
                                            }),
                                        })
                                            .then((res) => res.json())
                                            .then((res) => console.log(res))
                                            .then(() => setDeploying(false))
                                            .catch((err) => console.error(err))
                                    }}>
                                        <Label htmlFor="access-key">Access key</Label>
                                        <Input type="text" name="access-key" placeholder="fnkwejnfwkjnkwecew" />
                                        <Label htmlFor="password">Secret</Label>
                                        <Input type="password" name="secret" placeholder="Secret" />
                                        <Button type={"submit"} disabled={deploying}>Deploy</Button>
                                    </form>
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                </div>
                <div className="bg-white rounded shadow">
                    {ENVIRONMENTS.length === 0 ?
                        <div className="p-6 text-center text-slate-400">
                            No environments created yet
                        </div>
                        :
                        ENVIRONMENTS.map((env, index) => <EnvironmentRow key={index} environment={env} />)
                    }
                </div>
            </div>
            {JSON.stringify(ORGANIZATION, null, 2)}
        </Layout>
    );
}