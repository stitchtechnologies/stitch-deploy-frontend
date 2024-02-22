import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { InfoIcon, Loader2 } from "lucide-react";
import { useRouter } from "next/router";
import Head from "next/head";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import { useUser } from "@clerk/nextjs";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import Image from "next/image";

// const DEFAULT_SLUG_PLACEHOLDER = "pied-piper"

export default function CreateVendor() {
    const router = useRouter();
    const { toast } = useToast()
    const [sending, setSending] = useState(false);
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [slug, setSlug] = useState<string>("");
    const [imageUrl, setImageUrl] = useState<string>("");
    // const [slugPlaceholder, setSlugPlaceholder] = useState<string>(DEFAULT_SLUG_PLACEHOLDER);
    const { user } = useUser();
    const [loadingVendor, setLoadingVendor] = useState<boolean>(false);

    // Check if user already has a vendor account
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
                if (data.vendor) {
                    router.push("/service/create")
                    return;
                }
                setLoadingVendor(false)
            })
            .catch((error) => {
                console.error(error)
                window.alert("There was an error checking if you already have an organization account. Please try again.")
                router.push("/")
                return;
            })
    }, [router, user])

    // useEffect(() => {
    //     // turn name into slug
    //     if (name === "") {
    //         setSlugPlaceholder(DEFAULT_SLUG_PLACEHOLDER)
    //     } else {
    //         setSlugPlaceholder(name.toLowerCase().replace(/ /g, "-"))
    //     }
    // }, [name])

    // const handleUseSuggestedSlugClick = () => {
    //     setSlug(slugPlaceholder)
    // }

    const disableCreateButton = name === "" || sending

    const handleCreateVendorClick = async (e: any) => {
        e.preventDefault()
        setSending(true)
        fetch("/api/create-vendor", {
            method: "POST",
            body: JSON.stringify({
                name,
                description,
                imageUrl
            }),
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => res.json())
            .then((data) => {
                if (data.vendor) {
                    toast({
                        title: "Created organization",
                        description: "Your organization has been created. You can now create services for this organization.",
                        action: (
                            <ToastAction altText="Create service" onClick={() => window.open(`/service/create`)}>Create service</ToastAction>
                        ),
                    })
                    router.push(`/service/create`)
                    return
                } else {
                    toast({
                        title: "Error",
                        description: data.message ?? "There was an error creating your organization. Please try again.",
                    })
                    setSending(false)
                }
            })
            .catch((error) => {
                console.error(error)
                setSending(false)
            })
    }

    return (
        <Layout>
            <Head>
                <title>Stitch | New account</title>
            </Head>
            <div className="flex items-center border-b-[rgba(0,0,0,0.10)] px-24 border-b border-solid">
                <div className="flex items-center gap-4 my-12">
                    <div className="text-4xl">
                        Create your organization
                    </div>
                </div>
            </div>
            {
                loadingVendor && (
                    <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
                        <Loader2 className="h-8 w-8 animate-spin" />
                    </div>
                )
            }
            {
                !loadingVendor && (
                    <form onSubmit={handleCreateVendorClick}>
                        <div className="flex flex-col gap-6 py-12 px-24 border-b-[rgba(0,0,0,0.10)] border-b border-solid">
                            <div className="text-2xl">
                                Details
                            </div>
                            <div className="flex flex-col gap-6">
                                <div>
                                    <h2 className="text-sm">Organization name</h2>
                                    <div className="text-sm text-slate-400 mb-3">Users will be see this name when installing services from this organization.</div>
                                    <Input type="text" name="name" placeholder="Pied Piper" onChange={(e) => setName(e.target.value)} value={name} />
                                </div>
                                <div>
                                    <h2 className="text-sm mb-3">Description<span className="text-slate-400 italic">- optional</span></h2>
                                    {/* <div className="text-sm text-slate-400 mb-3">Description for this organization.</div> */}
                                    <Input type="text" name="description" placeholder="Piped Piper has the highest Weissman score in history. We provide the best algorithm libraries in the world." onChange={(e) => setDescription(e.target.value)} value={description} />
                                </div>
                                {/* <div>
                                    <h2 className="text-sm">URL Slug</h2>
                                    <div className="text-sm text-slate-400 mb-2">This is the first part of the URL for your installer. The installer URL will be `/[vendor_slug]/[service_slug]`.</div>
                                    <Input type="text" name="slug" placeholder={slugPlaceholder} onChange={(e) => setSlug(e.target.value)} value={slug} />
                                    {(slugPlaceholder !== DEFAULT_SLUG_PLACEHOLDER && slug !== slugPlaceholder) && <div className="text-xs text-blue-400 hover:text-blue-500 hover:underline hover:cursor-pointer mt-1" onClick={handleUseSuggestedSlugClick}>Use suggested slug</div>}
                                </div> */}
                                <div>
                                    <div className="flex gap-2 items-center">
                                        <h2 className="text-sm">Image URL<span className="text-slate-400 italic">- optional</span></h2>
                                        <Dialog>
                                            <DialogTrigger>
                                                <InfoIcon className="h-4 w-4 text-slate-400 hover:text-slate-500 hover:cursor-pointer" />
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>How to get an image from GitHub</DialogTitle>
                                                    <DialogDescription>
                                                        <div className="my-4">This should be a URL to an image, ideally a square image. You can use the image URL from your GitHub profile. Go to your GitHub profile, right click on your profile picture and click &quot;Copy image address&quot;. Paste that URL here.</div>
                                                        <Image src="/how-to-get-image.gif" alt="GitHub profile image" width={1200} height={900} />
                                                    </DialogDescription>
                                                </DialogHeader>
                                            </DialogContent>
                                        </Dialog>
                                    </div>
                                    <div className="text-sm text-slate-400 mb-3">This is a link to the image your want to display to users for your organization.</div>
                                    <Input type="text" name="imageUrl" placeholder={"https://avatars.githubusercontent.com/u/19783067"} onChange={(e) => setImageUrl(e.target.value)} value={imageUrl} />
                                </div>
                            </div>

                            <div className="flex flex-col gap-6 py-6">
                                {/* <Button variant={"outline"} disabled={true}>Preview deployment form</Button> */}
                                <Button disabled={disableCreateButton} type="submit">{sending ? <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Creating</> : "Create organization"}</Button>
                            </div>
                        </div>
                    </form>
                )
            }
        </Layout>
    );
}