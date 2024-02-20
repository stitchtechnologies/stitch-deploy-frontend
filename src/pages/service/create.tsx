import Layout from "@/components/layout";
import { ORGANIZATIONS } from "@/components/organization";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Loader2, MoreHorizontal } from "lucide-react";
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
import { useEffect, useState } from "react";
import NewUserDialog from "@/components/createNewUserDialog";
import UsersTable, { User } from "@/components/usersTable";
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import { set } from "date-fns";
import { useUser } from "@clerk/nextjs";

export default function CreateService() {
    const router = useRouter();
    const { toast } = useToast()
    const { user } = useUser();
    const [sending, setSending] = useState(false);
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [slug, setSlug] = useState<string>("");
    const [imageUrl, setImageUrl] = useState<string>("");
    const [slugPlaceholder, setSlugPlaceholder] = useState<string>("Enter slug");

    useEffect(() => {
        // turn name into slug
        if (name === "") {
            setSlugPlaceholder("Enter slug")
        } else {
            setSlugPlaceholder(name.toLowerCase().replace(/ /g, "-"))
        }
    }, [name])

    const handleCreateVendorClick = async () => {
        setSending(true)

        fetch("/api/create-vendor", {
            method: "POST",
            body: JSON.stringify({
                name,
                description,
                slug,
                imageUrl,
                userId: user?.id || ""
            }),
        }).then((res) => res.json())
            .then((data) => {
                if (data.vendor) {
                    toast({
                        title: "Created vendor",
                        description: "Your vendor has been created. You can now create services for this vendor.",
                        action: (
                            <ToastAction altText="Create service" onClick={() => window.open(`/service/create`)}>Create service</ToastAction>
                        ),
                    })
                } else {
                    toast({
                        title: "Error",
                        description: "There was an error creating your vendor. Please try again.",
                    })
                }
                setSending(false)
            })
            .catch((error) => {
                console.error(error)
                setSending(false)
            })
    }

    return (
        <Layout>
            <Head>
                <title>Stitch | New Service</title>
            </Head>
            <div className="flex items-center border-b-[rgba(0,0,0,0.10)] px-24 border-b border-solid">
                <div className="flex items-center gap-4 my-12">
                    <div className="text-4xl">
                        New Service
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-6 py-12 px-24 border-b-[rgba(0,0,0,0.10)] border-b border-solid">
                <div className="text-2xl">
                    Details
                </div>
                <div className="flex flex-col gap-6">
                    <div>
                        <h2 className="text-sm">Service name</h2>
                        <div className="text-sm text-slate-400 mb-3">This is the name of your organization. Users will be see this name when installing services from this vendor.</div>
                        <Input type="text" name="name" placeholder="Enter name" onChange={(e) => setName(e.target.value)} value={name} />
                    </div>
                    <div>
                        <h2 className="text-sm">Description</h2>
                        <div className="text-sm text-slate-400 mb-3">Description for this vendor.</div>
                        <Input type="text" name="description" placeholder="Enter description" onChange={(e) => setDescription(e.target.value)} value={description} />
                    </div>
                    <div>
                        <h2 className="text-sm">URL Slug</h2>
                        <div className="text-sm text-slate-400 mb-3">This is the first part of the URL for your installer. The installer URL will be `/[vendor_slug]/[service_slug]`.</div>
                        <Input type="text" name="slug" placeholder={slugPlaceholder} onChange={(e) => setSlug(e.target.value)} value={slug} />
                    </div>
                    <div>
                        <h2 className="text-sm">Image URL</h2>
                        <div className="text-sm text-slate-400 mb-3">This is a link to the image your want to display for your vendor.</div>
                        <Input type="text" name="imageUrl" placeholder={"https://avatars.githubusercontent.com/u/146327003"} onChange={(e) => setImageUrl(e.target.value)} value={imageUrl} />
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-6 py-12 px-24 border-b-[rgba(0,0,0,0.10)] border-b border-solid">
                {/* <Button variant={"outline"} disabled={true}>Preview deployment form</Button> */}
                <Button disabled={sending} onClick={handleCreateVendorClick}>{sending ? <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Sending</> : "Create vendor"}</Button>
            </div>
        </Layout>
    );
}