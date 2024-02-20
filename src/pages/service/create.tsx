import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Loader2, Minus, MinusCircle, PlusCircle } from "lucide-react";
import { useRouter } from "next/router";
import Head from "next/head";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"

const DEFAULT_SLUG_PLACEHOLDER = "Enter slug"

export type EnvironmentVariables = {
    [key: string]: string;
}

function EnvironmentVariablesCreator({ environmentVariables, setEnvironmentVariables }: { environmentVariables: EnvironmentVariables, setEnvironmentVariables: (value: React.SetStateAction<EnvironmentVariables>) => void }) {
    return (
        <div>
            <h2 className="text-sm">Environment Variables</h2>
            <div className="text-sm text-slate-400 mb-3">Add environment variables that will be used in the deployment script. You can provide default values and users will be expected to provide their own values.</div>
            <div className="flex flex-col gap-2">
                {
                    Object.keys(environmentVariables).map((key, index) => {
                        return (
                            <div key={index} className="flex items-center gap-3">
                                <Input type="text" name="key" placeholder="Key" value={key} onChange={(e) => {
                                    const newEnvironmentVariables = { ...environmentVariables }
                                    newEnvironmentVariables[e.target.value] = newEnvironmentVariables[key]
                                    delete newEnvironmentVariables[key]
                                    setEnvironmentVariables(newEnvironmentVariables)
                                }} />
                                <Input type="text" name="value" placeholder="Default value" value={environmentVariables[key]} onChange={(e) => {
                                    const newEnvironmentVariables = { ...environmentVariables }
                                    newEnvironmentVariables[key] = e.target.value
                                    setEnvironmentVariables(newEnvironmentVariables)
                                }} />
                                <Button variant={"ghost"}
                                    onClick={() => {
                                        const newEnvironmentVariables = { ...environmentVariables }
                                        delete newEnvironmentVariables[key]
                                        setEnvironmentVariables(newEnvironmentVariables)
                                    }}>
                                    <MinusCircle className="h-4 w-4" />
                                </Button>
                            </div>
                        )
                    })
                }
            </div>
            <div className="mt-2">
                <Button disabled={("" in environmentVariables)} className="flex items-center gap-2" variant={"outline"}
                    onClick={() => {
                        const newEnvironmentVariables = { ...environmentVariables }
                        newEnvironmentVariables[""] = ""
                        setEnvironmentVariables(newEnvironmentVariables)
                    }}>
                    <PlusCircle className="h-4 w-4" />
                    Add
                </Button>
            </div>
        </div>
    )

}

export default function CreateService() {
    const router = useRouter();
    const { toast } = useToast()
    const [sending, setSending] = useState(false);
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [slug, setSlug] = useState<string>("");
    const [externalUrl, setExternalUrl] = useState<string>("");
    const [port, setPort] = useState<string>("");
    const [script, setScript] = useState<string>("");
    const [imageUrl, setImageUrl] = useState<string>("");
    const [environmentVariables, setEnvironmentVariables] = useState<EnvironmentVariables>({});
    const [slugPlaceholder, setSlugPlaceholder] = useState<string>(DEFAULT_SLUG_PLACEHOLDER);

    useEffect(() => {
        // turn name into slug
        if (name === "") {
            setSlugPlaceholder(DEFAULT_SLUG_PLACEHOLDER)
        } else {
            setSlugPlaceholder(name.toLowerCase().replace(/ /g, "-"))
        }
    }, [name])

    const handleUseSuggestedSlugClick = () => {
        setSlug(slugPlaceholder)
    }

    const handleCreateVendorClick = async () => {
        setSending(true)
        fetch("/api/create-service", {
            method: "POST",
            body: JSON.stringify({
                name,
                description,
                slug,
                externalUrl,
                script,
                port,
                imageUrl,
                environmentVariables,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => res.json())
            .then((data) => {
                if (data.service) {
                    toast({
                        title: "Created service",
                        description: "Your service has been created. You can now share the installer.",
                        action: (
                            <ToastAction altText="Create service" onClick={() => window.open()}>Open installer</ToastAction>
                        ),
                    })
                    router.push(`/service`)
                    return
                } else {
                    toast({
                        title: "Error",
                        description: "There was an error creating your service. Please try again.",
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
                        <div className="text-sm text-slate-400 mb-3">This is the name of your organization. Users will be see this name when installing the service.</div>
                        <Input type="text" name="name" placeholder="Enter name" onChange={(e) => setName(e.target.value)} value={name} />
                    </div>
                    <div>
                        <h2 className="text-sm">Description</h2>
                        <div className="text-sm text-slate-400 mb-3">Description for this service. This will be visible to users when installing your application.</div>
                        <Input type="text" name="description" placeholder="Enter description" onChange={(e) => setDescription(e.target.value)} value={description} />
                    </div>
                    <div>
                        <h2 className="text-sm">URL Slug</h2>
                        <div className="text-sm text-slate-400 mb-2">This is the second part of the URL for your installer. The installer URL will be `/[vendor_slug]/[service_slug]`.</div>
                        <Input type="text" name="slug" placeholder={slugPlaceholder} onChange={(e) => setSlug(e.target.value)} value={slug} />
                        {(slugPlaceholder !== DEFAULT_SLUG_PLACEHOLDER && slug !== slugPlaceholder) && <div className="text-xs text-blue-400 hover:text-blue-500 hover:underline hover:cursor-pointer mt-1" onClick={handleUseSuggestedSlugClick}>Use suggested slug</div>}
                    </div>
                    <div>
                        <h2 className="text-sm">External URL</h2>
                        <div className="text-sm text-slate-400 mb-3">This should be a link to the service website, documentation or repository.</div>
                        <Input type="text" name="externalUrl" placeholder="https://stitch.tech/" onChange={(e) => setExternalUrl(e.target.value)} value={externalUrl} />
                    </div>
                    {/* TODO add README with preview later */}
                    {/* <div>
                        <h2 className="text-sm">README</h2>
                        <div className="text-sm text-slate-400 mb-3">This should be a link to the service website, documentation or repository.</div>
                        <Input type="text" name="externalUrl" placeholder="https://stitch.tech/" onChange={(e) => setExternalUrl(e.target.value)} value={externalUrl} />
                    </div> */}
                    <div>
                        <h2 className="text-sm">Script</h2>
                        <div className="text-sm text-slate-400 mb-3">Install script that will be run on the provisioned environment.</div>
                        <Input type="text" name="script" placeholder="Enter deployment script here" onChange={(e) => setScript(e.target.value)} value={script} />
                    </div>
                    <div>
                        <h2 className="text-sm">Port</h2>
                        <div className="text-sm text-slate-400 mb-3">When your service is deployed, the link provided to the user will use this port. If it is the default port, just leave this empty.</div>
                        <Input type="text" name="port" placeholder="8080" onChange={(e) => setPort(e.target.value)} value={port} />
                    </div>
                    <div>
                        <h2 className="text-sm">Image URL</h2>
                        <div className="text-sm text-slate-400 mb-3">This is a link to the image you want to display for the service.</div>
                        <Input type="text" name="imageUrl" placeholder={"https://avatars.githubusercontent.com/u/146327003"} onChange={(e) => setImageUrl(e.target.value)} value={imageUrl} />
                    </div>
                    <EnvironmentVariablesCreator environmentVariables={environmentVariables} setEnvironmentVariables={setEnvironmentVariables} />
                </div>
            </div>

            <div className="flex flex-col gap-6 py-12 px-24 border-b-[rgba(0,0,0,0.10)] border-b border-solid">
                {/* <Button variant={"outline"} disabled={true}>Preview deployment form</Button> */}
                <Button disabled={sending} onClick={handleCreateVendorClick}>{sending ? <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Sending</> : "Create vendor"}</Button>
            </div>
        </Layout>
    );
}