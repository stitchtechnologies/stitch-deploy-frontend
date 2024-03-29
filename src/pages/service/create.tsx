import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { FileCode, InfoIcon, Loader2, MinusCircle, PlusCircle } from "lucide-react";
import { useRouter } from "next/router";
import Head from "next/head";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useToast } from "@/components/ui/use-toast"
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useUser } from "@clerk/nextjs";
import { Vendor } from "@prisma/client";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import Image from "next/image";
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-bash';
import 'prismjs/themes/prism.css';
import { parseEnvString } from "@/lib/utils";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import Link from "next/link";
import { TooltipContent, TooltipProvider, Tooltip, TooltipTrigger } from "@/components/ui/tooltip";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const MDEditor = dynamic(
    () => import("@uiw/react-md-editor").then((mod) => mod.default),
    { ssr: false }
);

const DEFAULT_SLUG_PLACEHOLDER = "service-slug"

export type DockerPortMapping = {
    [port: string]: string;
}

export type CdkDeploymentMetadata = {
    repoUrl: string,
    auth?: {
        username?: string,
        accessToken?: string
    }
}

function DockerPortMappingCreator({ portMapping, setPortMapping }: { portMapping: DockerPortMapping, setPortMapping: (value: React.SetStateAction<DockerPortMapping>) => void }) {
    return (
        <div>
            <h2 className="text-sm">Docker Port Mappings</h2>
            <div className="text-sm text-slate-400 mb-3">Provide a mapping between the internal Docker container ports and the server ports.</div>
            <div className="flex flex-col gap-2">
                {
                    Object.keys(portMapping).map((key, index) => {
                        return (
                            <div key={index} className="flex items-center gap-3">
                                <Input type="text" name="containerPort" placeholder="Container port e.g. 8080" value={key} onChange={(e) => {
                                    const newPortMapping = { ...portMapping }
                                    newPortMapping[e.target.value] = newPortMapping[key]
                                    delete newPortMapping[key]
                                    setPortMapping(newPortMapping)
                                }} />
                                <Input type="text" name="serverPort" placeholder="Server port e.g. 80" value={portMapping[key]} onChange={(e) => {
                                    const newPortMapping = { ...portMapping }
                                    newPortMapping[key] = e.target.value
                                    setPortMapping(newPortMapping)
                                }} />
                                <Button variant={"ghost"}
                                    onClick={() => {
                                        const newPortMapping = { ...portMapping }
                                        delete newPortMapping[key]
                                        setPortMapping(newPortMapping)
                                    }}>
                                    <MinusCircle className="h-4 w-4" />
                                </Button>
                            </div>
                        )
                    })
                }
            </div>
            <div className="mt-2">
                <Button disabled={("" in portMapping)} className="flex items-center gap-2" variant={"outline"}
                    onClick={() => {
                        const newPortMapping = { ...portMapping }
                        newPortMapping[""] = ""
                        setPortMapping(newPortMapping)
                    }}>
                    <PlusCircle className="h-4 w-4" />
                    Add
                </Button>
            </div>
        </div>
    )
}

export type EnvironmentVariables = {
    [key: string]: string;
}

function EnvrionmentVariableParserDialog({ setEnvironmentVariables, open, setOpen }: { setEnvironmentVariables: (value: React.SetStateAction<EnvironmentVariables>) => void, open: boolean, setOpen: (value: React.SetStateAction<boolean>) => void }) {
    const [envString, setEnvString] = useState<string>("")

    const handleParse = () => {
        try {
            const parsedEnv = parseEnvString(envString)
            setEnvironmentVariables(prev => ({ ...prev, ...parsedEnv }))
            setOpen(false)
        } catch (error) {
            window.alert("Failed to parse your .env file. Please check the format and try again.")
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
                <div className="text-xs text-slate-600 hover:underline">Tip: Click here to paste your .env file and have it parsed!</div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Parse your .env</DialogTitle>
                    <DialogDescription>
                        <div className="my-4">Paste the contents of your .env file here and we will parse it for you.</div>
                        <Textarea placeholder={`KEY1=value1
KEY2=value2`}
                            value={envString}
                            onChange={(e) => setEnvString(e.target.value)}
                        />
                    </DialogDescription>
                    <DialogFooter>
                        <Button className="w-full mt-4" disabled={envString.length === 0} onClick={handleParse}>Parse</Button>
                    </DialogFooter>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

function EnvironmentVariablesCreator({ environmentVariables, setEnvironmentVariables }: { environmentVariables: EnvironmentVariables, setEnvironmentVariables: (value: React.SetStateAction<EnvironmentVariables>) => void }) {
    // state for the dialog
    const [open, setOpen] = useState(false)

    return (
        <div>
            <h2 className="text-sm">Environment Variables<span className="text-slate-400 italic">- optional</span></h2>
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
            <div className="mt-2 flex justify-between">
                <Button disabled={("" in environmentVariables)} className="flex items-center gap-2" variant={"outline"}
                    onClick={() => {
                        const newEnvironmentVariables = { ...environmentVariables }
                        newEnvironmentVariables[""] = ""
                        setEnvironmentVariables(newEnvironmentVariables)
                    }}>
                    <PlusCircle className="h-4 w-4" />
                    Add
                </Button>
                <EnvrionmentVariableParserDialog setEnvironmentVariables={setEnvironmentVariables} open={open} setOpen={setOpen} />
            </div>
        </div>
    )
}

export default function CreateService() {
    const router = useRouter();
    const { toast } = useToast()
    const { user } = useUser();
    const [tab, setTab] = useState<string>("next-js");
    const [sending, setSending] = useState(false);
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [externalUrl, setExternalUrl] = useState<string>("");
    const [port, setPort] = useState<string>("");
    const [script, setScript] = useState<string>("");
    const [imageUrl, setImageUrl] = useState<string>("");
    const [readMe, setReadMe] = useState<string>("");
    const [environmentVariables, setEnvironmentVariables] = useState<EnvironmentVariables>({});
    const [dockerPortMapping, setDockerPortMapping] = useState<DockerPortMapping>({});
    const [dockerImage, setDockerImage] = useState<string>("");
    const [dockerComposeScript, setDockerComposeScript] = useState<string>("")
    const [validationUrl, setValidationUrl] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [slugPlaceholder, setSlugPlaceholder] = useState<string>(DEFAULT_SLUG_PLACEHOLDER);
    const [loadingVendor, setLoadingVendor] = useState<boolean>(false);
    const [vendor, setVendor] = useState<Vendor>();
    const [cdkDeploymentMetadata, setCdkDeploymentMetadata] = useState<CdkDeploymentMetadata>();
    const [operatingSystem, setOperatingSystem] = useState<string>("ami-0440d3b780d96b29d");
    const [instanceType, setInstanceType] = useState<string>("t2.medium");
    const [storageVolumeSize, setStorageVolumeSize] = useState<string>("8");

    // Check if user already has a vendor account - otherwise redirect to create vendor page
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
                window.alert("There was an error checking if you already have a vendor account. Please try again.")
                router.push("/")
                return;
            })
    }, [router, user])

    useEffect(() => {
        // turn name into slug
        if (name === "") {
            setSlugPlaceholder(DEFAULT_SLUG_PLACEHOLDER)
        } else {
            let newSlug = name.toLowerCase().replace(/ /g, "-")
            // replace non-alphanumeric characters with a hyphen
            newSlug = newSlug.replace(/[^a-z0-9-]/g, "")
            setSlugPlaceholder(newSlug)
        }
    }, [name])

    const handleCreateVendorClick = async (e: any) => {
        e.preventDefault()
        setSending(true)
        let scriptV2 = {};

        if (tab === "docker") {
            scriptV2 = {
                type: "docker",
                image: dockerImage,
                portMappings: Object.entries(dockerPortMapping).map(([containerPort, serverPort]) => {
                    return {
                        containerPort,
                        serverPort,
                    }
                }),
            }
        } else if (tab === "shell") {
            scriptV2 = {
                type: "shell",
                script,
            }
        } else if (tab === "docker-compose") {
            scriptV2 = {
                type: "docker-compose",
                composeFile: dockerComposeScript,
            }
        } else if (tab === "next-js") {
            scriptV2 = {
                type: "next-js",
                image: dockerImage,
                portMappings: Object.entries(dockerPortMapping).map(([containerPort, serverPort]) => {
                    return {
                        containerPort,
                        serverPort,
                    }
                }),
            }
        } else if (tab === "cdk") {
            scriptV2 = {
                type: "cdk-ts-github",
                ...cdkDeploymentMetadata
            }
        }

        fetch("/api/create-service", {
            method: "POST",
            body: JSON.stringify({
                name,
                description,
                slug: slugPlaceholder,
                externalUrl,
                scriptV2,
                validationUrl,
                port,
                readMe,
                password,
                imageUrl,
                environmentVariables,
                operatingSystem,
                instanceType,
                storageVolumeSize,
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
                            <Link href={`https://deploy.stitch.tech/${vendor?.slug}/${data.service.slug}`} target="_blank">
                                <Button>Open installer</Button>
                            </Link>
                        ),
                    })
                    router.push(`/service`)
                    return
                } else {
                    toast({
                        title: "Error",
                        description: data.message ?? "There was an error creating your service. Please try again.",
                    })
                    setSending(false)
                }
            })
            .catch((error) => {
                console.error(error)
                setSending(false)
            })
    }

    const disableCreateService = !name || sending

    const selectedDockerOrNextJs = tab === "docker" || tab === "next-js"

    return (
        <Layout>
            <Head>
                <title>Stitch | New Service</title>
            </Head>
            <div className="flex items-center border-b-[rgba(0,0,0,0.10)] px-24 border-b border-solid">
                <div className="flex flex-col gap-4 my-12">
                    <div className="text-4xl">
                        New Service
                    </div>
                    <div className="text-slate-400">
                        Create an installer that customers can use to deploy your software to their cloud
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
                                    <h2 className="text-sm">Service name</h2>
                                    <div className="text-sm text-slate-400 mb-3">Users will be see this name when installing the service.</div>
                                    <Input type="text" name="name" placeholder="Enter name" onChange={(e) => setName(e.target.value)} value={name} />
                                </div>
                                <div>
                                    <h2 className="text-sm">Description <span className="text-slate-400 italic">- optional</span></h2>
                                    <div className="text-sm text-slate-400 mb-3">This will be visible to users when installing your application.</div>
                                    <Input type="text" name="description" placeholder="Enter description" onChange={(e) => setDescription(e.target.value)} value={description} />
                                </div>
                                <div>
                                    <h2 className="text-sm">External URL <span className="text-slate-400 italic">- optional</span></h2>
                                    <div className="text-sm text-slate-400 mb-3">This should be a link to the service website, documentation or repository.</div>
                                    <Input type="text" name="externalUrl" placeholder="https://stitch.tech/" onChange={(e) => setExternalUrl(e.target.value)} value={externalUrl} />
                                </div>
                                <div>
                                    <h2 className="mb-3 text-sm">Select deployment</h2>
                                    <Tabs className="w-full" value={tab} onValueChange={(newTab) => setTab(newTab)}>
                                        <TabsList className="w-full justify-between">
                                            <TabsTrigger value="next-js" className="w-full flex gap-2">
                                                <Image src={"/next-js.svg"} alt={"next-js"} width={16} height={6} />
                                                Next.js
                                            </TabsTrigger>
                                            <TabsTrigger value="docker" className="w-full flex gap-2">
                                                <Image src={"/docker.svg"} alt={"docker"} width={16} height={6} />
                                                Docker
                                            </TabsTrigger>
                                            <TabsTrigger value="cdk" className="w-full flex gap-2">
                                                <Image src={"/aws.png"} alt={"aws"} width={16} height={6} />
                                                Cloud Development Kit
                                            </TabsTrigger>
                                            <TabsTrigger value="shell" className="w-full flex gap-2">
                                                <FileCode className="h-4 w-4" />
                                                Shell Script
                                            </TabsTrigger>
                                            <TabsTrigger value="docker-compose" className="w-full flex gap-2">
                                                <Image src={"/docker.svg"} alt={"docker"} width={16} height={6} />
                                                Docker Compose
                                            </TabsTrigger>
                                            <TabsTrigger value="terraform" className="w-full flex gap-2">
                                                <Image src={"/terraform.png"} alt={"terraform"} width={16} height={6} />
                                                Terraform
                                            </TabsTrigger>

                                        </TabsList>
                                        <TabsContent value="docker">
                                            <div className="border border-1 p-4">
                                                <div className="text-sm text-slate-400 mb-3">Docker image to be used for this service.</div>
                                                <Input name="dockerImage" placeholder="grafana/promtail" onChange={(e) => setDockerImage(e.target.value)} value={dockerImage} />
                                            </div>
                                            <div className="border border-1 p-4">
                                                <DockerPortMappingCreator portMapping={dockerPortMapping} setPortMapping={setDockerPortMapping} />
                                            </div>
                                        </TabsContent>
                                        <TabsContent value="cdk">
                                            <div className="border border-1 p-4 flex flex-col gap-6">
                                                <div>
                                                    <h2 className="text-sm">Repository URL</h2>
                                                    <div className="text-sm text-slate-400 mb-3">The link to your github repo containing your CDK scripts</div>
                                                    <Input type="url" name="cdk-url" placeholder="Enter Github URL" value={cdkDeploymentMetadata?.repoUrl} onChange={e => setCdkDeploymentMetadata(prev => ({ ...prev, repoUrl: e.target.value }))} />
                                                </div>
                                                <div>
                                                    <h2 className="text-sm">Repository username</h2>
                                                    <div className="text-sm text-slate-400 mb-3">The username that stitch will use to clone the repo, this is only required for private repos.</div>
                                                    <Input type="text" name="gh-username" placeholder="Username" value={cdkDeploymentMetadata?.auth?.username}
                                                        onChange={e => setCdkDeploymentMetadata(prev => ({ ...prev, auth: { ...prev?.auth, username: e.target.value } } as CdkDeploymentMetadata))} />
                                                </div>
                                                <div>
                                                    <h2 className="text-sm">Personal access token</h2>
                                                    <div className="text-sm text-slate-400 mb-3">The personal access token that stitch will use to clone the repo, this is only required for private repos.</div>
                                                    <Input type="password" name="gh-username" placeholder="ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" value={cdkDeploymentMetadata?.auth?.accessToken}
                                                        onChange={e => setCdkDeploymentMetadata(prev => ({ ...prev, auth: { ...prev?.auth, accessToken: e.target.value } } as CdkDeploymentMetadata))} />
                                                </div>
                                            </div>
                                        </TabsContent>
                                        <TabsContent value="shell">
                                            <div className="border border-1 p-4">
                                                <div className="text-sm text-slate-400 mb-3">Install script that will be run on the provisioned environment.</div>
                                                <Editor
                                                    className="bg-white rounded border border-solid border-slate-400 min-h-32"
                                                    value={script}
                                                    placeholder="#!/bin/bash"
                                                    onValueChange={code => setScript(code)}
                                                    highlight={code => highlight(code, languages.bash, "bash")}
                                                    padding={10}
                                                    style={{
                                                        fontFamily: '"Fira code", "Fira Mono", monospace',
                                                        fontSize: 12,
                                                    }}
                                                />
                                            </div>
                                        </TabsContent>
                                        <TabsContent value="docker-compose">
                                            <div className="border border-1 p-4">
                                                <div className="text-sm text-slate-400 mb-3">Paste or write your Docker Compose script here.</div>
                                                <Editor
                                                    className="bg-white rounded border border-solid border-slate-400 min-h-32"
                                                    value={dockerComposeScript}
                                                    placeholder={`version: "3.5"
    services:`}
                                                    onValueChange={code => setDockerComposeScript(code)}
                                                    highlight={code => highlight(code, languages.bash, "bash")}
                                                    padding={10}
                                                    style={{
                                                        fontFamily: '"Fira code", "Fira Mono", monospace',
                                                        fontSize: 12,
                                                    }}
                                                />
                                            </div>
                                        </TabsContent>
                                        <TabsContent value="next-js">
                                            <Dialog>
                                                <DialogTrigger>
                                                    <Alert className="shadow cursor-pointer my-4">
                                                        <InfoIcon className="h-4 w-4" />
                                                        <AlertTitle>Click here to view instructions for Dockerising your Next.js app</AlertTitle>
                                                        <AlertDescription className="text-left">
                                                            Follow this guide to Dockerise your Next.js app for Stitch.
                                                        </AlertDescription>
                                                    </Alert>
                                                </DialogTrigger>
                                                <DialogContent>
                                                    <DialogHeader>
                                                        <DialogTitle>How to Dockerise your Next.js app</DialogTitle>
                                                        <DialogDescription>
                                                            <div className="my-4">To deploy your Next.js app with Stitch, you will need to create a Dockerfile in the root of your project. Here is an example of a Dockerfile for a Next.js app:</div>
                                                            <Editor
                                                                className="bg-white rounded border border-solid border-slate-400 text-black min-h-32"
                                                                readOnly
                                                                value={`FROM node:18-alpine AS base

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
RUN npm run build
CMD ["npm", "run", "start"]`}
                                                                onValueChange={code => { }}
                                                                highlight={code => highlight(code, languages.bash, "bash")}
                                                                padding={10}
                                                                style={{
                                                                    fontFamily: '"Fira code", "Fira Mono", monospace',
                                                                    fontSize: 12,
                                                                }}
                                                            />
                                                            <div className="my-4">You can then build and run your Docker container with the following commands:</div>
                                                            <Editor
                                                                className="bg-white rounded border border-solid border-slate-400 text-black min-h-8"
                                                                readOnly
                                                                value={`docker build -t my-next-app . --platform=linux/amd64`}
                                                                onValueChange={code => { }}
                                                                highlight={code => highlight(code, languages.bash, "bash")}
                                                                padding={10}
                                                                style={{
                                                                    fontFamily: '"Fira code", "Fira Mono", monospace',
                                                                    fontSize: 12,
                                                                }}
                                                            />
                                                            <div className="my-4">You can then run your container to test it works:</div>
                                                            <Editor
                                                                className="bg-white rounded border border-solid border-slate-400 text-black min-h-8"
                                                                readOnly
                                                                value={`docker run -p 3000:3000 my-next-app`}
                                                                onValueChange={code => { }}
                                                                highlight={code => highlight(code, languages.bash, "bash")}
                                                                padding={10}
                                                                style={{
                                                                    fontFamily: '"Fira code", "Fira Mono", monospace',
                                                                    fontSize: 12,
                                                                }}
                                                            />
                                                            <div className="my-4">
                                                                Once you have tested your container, you can push it to Docker Hub and use it with Stitch.
                                                                <br />
                                                                <Link href="https://docs.docker.com/guides/walkthroughs/publish-your-image/" target="_blank" className="text-blue-500 hover:underline">
                                                                    Learn more about pushing your image to Docker Hub.
                                                                </Link>
                                                            </div>
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                </DialogContent>
                                            </Dialog>
                                            <div className="border border-1 p-4">
                                                <div className="text-sm mb-3">Docker Image Name</div>
                                                <Input name="dockerImage" placeholder="pied-piper/algo" onChange={(e) => setDockerImage(e.target.value)} value={dockerImage} />
                                            </div>
                                            <div className="border border-1 p-4">
                                                <DockerPortMappingCreator portMapping={dockerPortMapping} setPortMapping={setDockerPortMapping} />
                                            </div>
                                        </TabsContent>
                                        <TabsContent value="terraform">
                                            <Alert className="shadow cursor-pointer my-4" onClick={() => {
                                                const slackUrl = "https://join.slack.com/t/stitchsupport/shared_invite/zt-2d839m41h-qYy7ZTJ1mRec7zYw4Pl9oQ";
                                                window.open(slackUrl, '_blank')?.focus();
                                            }}>
                                                <InfoIcon className="h-4 w-4" />
                                                <AlertTitle>Click here to join our Slack</AlertTitle>
                                                <AlertDescription className="text-left">
                                                    Terraform deployments are only avalible on paid plans, message the team to get started.
                                                </AlertDescription>
                                            </Alert>
                                        </TabsContent>
                                    </Tabs>
                                </div>
                                <div>
                                    <h2 className="text-sm">Validation URL<span className="text-slate-400 italic">- optional</span></h2>
                                    <div className="text-sm text-slate-400 mb-3">When your service is deployed, we will check using this URL to ensure that the deployment has succeeded. This should be like the homepage for your deployed service. If there is no specific route then leave this field empty. Use <span className="font-mono">{"{{HOSTNAME}}"}</span> for the main domain.</div>
                                    <Input type="text" name="validationUrl" placeholder="http://{{HOSTNAME}}/home" onChange={(e) => setValidationUrl(e.target.value)} value={validationUrl} />
                                </div>
                                <div>
                                    <h2 className="text-sm">Port<span className="text-slate-400 italic">- optional</span></h2>
                                    <div className="text-sm text-slate-400 mb-3">When your service is deployed, the link provided to the user will use this port. If it is the default port, just leave this empty.</div>
                                    <Input type="text" name="port" placeholder="8080" onChange={(e) => setPort(e.target.value)} value={port} />
                                </div>
                                {!selectedDockerOrNextJs && <EnvironmentVariablesCreator environmentVariables={environmentVariables} setEnvironmentVariables={setEnvironmentVariables} />}
                                <div>
                                    <h2 className="text-sm">README<span className="text-slate-400 italic">- optional</span></h2>
                                    <div className="text-sm text-slate-400 mb-3">This will be visible to users after installing your application. It should provide instructions for using your application after deployment.</div>
                                    <MDEditor value={readMe} onChange={(value) => setReadMe(value || "")} data-color-mode={"light"} highlightEnable={false} />
                                </div>
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
                                    <div className="text-sm text-slate-400 mb-3">This is a link to the image your want to display to users for your service.</div>
                                    <Input type="text" name="imageUrl" placeholder={"https://avatars.githubusercontent.com/u/19783067"} onChange={(e) => setImageUrl(e.target.value)} value={imageUrl} />
                                </div>
                                <div>
                                    <h2 className="text-sm">Operating system<span className="text-slate-400 italic">- optional</span></h2>
                                    <div className="text-sm text-slate-400 mb-3">Select the operating system to be used for the EC2 instance of this deployment.</div>
                                    <Select onValueChange={(newVal) => setOperatingSystem(newVal)}>
                                        <SelectTrigger>
                                            <SelectValue defaultValue={operatingSystem} placeholder={"Amazon Linux 2023 AMI"} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="ami-0440d3b780d96b29d">Amazon Linux 2023 AMI</SelectItem>
                                            <SelectItem value="ami-07d9b9ddc6cd8dd30">Ubuntu Server 22.04 LTS (HVM), SSD Volume Type</SelectItem>
                                            <SelectItem value="ami-0fe630eb857a6ec83">Red Hat Enterprise Linux 9 (HVM), SSD Volume Type</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <h2 className="text-sm">Instance type<span className="text-slate-400 italic">- optional</span></h2>
                                    <div className="text-sm text-slate-400 mb-3">Select the EC2 instance type with storage, memory and CPU configurations for this deployment.</div>
                                    <Select onValueChange={(newVal) => setInstanceType(newVal)}>
                                        <SelectTrigger>
                                            <SelectValue defaultValue={instanceType} placeholder={"t2.medium | 2vCPU | 4GiB memory"} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="t2.micro">t2.micro | 1vCPU | 1GiB memory</SelectItem>
                                            <SelectItem value="t2.small">t2.small | 1vCPU | 2GiB memory</SelectItem>
                                            <SelectItem value="t2.medium">t2.medium | 2vCPU | 4GiB memory</SelectItem>
                                            <SelectItem value="t2.large">t2.large | 2vCPU | 8GiB memory</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <h2 className="text-sm">Storage volume size<span className="text-slate-400 italic">- optional</span></h2>
                                    <div className="text-sm text-slate-400 mb-3">Select the size of the root volume for this deployment.</div>
                                    <Select onValueChange={(newVal) => setStorageVolumeSize(newVal)}>
                                        <SelectTrigger>
                                            <SelectValue defaultValue={storageVolumeSize} placeholder={"8 GiB"} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="8">8 GiB</SelectItem>
                                            <SelectItem value="16">16 GiB</SelectItem>
                                            <SelectItem value="32">32 GiB</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                {/* <div>
                                    <div>
                                        <h2 className="text-sm">Password<span className="text-slate-400 italic">- optional</span></h2>
                                        <div className="text-sm text-slate-400 mb-3">Users will only be able to open the deployment page if they have this password.</div>
                                        <Input type="password" name="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} />
                                    </div>
                                </div> */}
                            </div>
                        </div>
                        <div className="flex flex-col gap-6 py-12 px-24 border-b-[rgba(0,0,0,0.10)] border-b border-solid">
                            <TooltipProvider delayDuration={100}>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <span tabIndex={0}>
                                            <Button variant={"secondary"} type="button" disabled className="w-full">Add dependencies</Button>
                                        </span>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        Adding dependencies such as storage, databases and queues is available on our paid plan. Message the team on Slack to upgrade.
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                            <Button disabled={disableCreateService} type="submit">{sending ? <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Creating</> : "Create service"}</Button>
                        </div>
                    </form>
                )
            }
        </Layout >
    );
}