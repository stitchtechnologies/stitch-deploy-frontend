import Image from "next/image"
import { useRouter } from "next/router"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Head from "next/head"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
import { BadgeCheckIcon, CalendarIcon, Clock1, Code, Eye, Loader2 } from "lucide-react"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import { EnvironmentVariable } from "@/components/environmentVariablesTable"
import { Toggle } from "@/components/ui/toggle"
import { CardContent, Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { url } from "inspector"


export default function OrganizationOnboarding() {
    const router = useRouter()
    const { organizationId } = router.query

    const [showProgess, setShowProgress] = useState(false);
    const [id, setId] = useState("");
    return (
        <div className="flex flex-row items-center h-screen overscroll-none overflow-hidden">
            <Head>
                <title>Aperture x Acme | Onboarding</title>
            </Head>

            {/* Left view */}
            <div className="flex flex-col flex-1 items-center justify-center h-screen overscroll-none overflow-hidden">
                <div className="flex gap-12 bg-white items-center m-auto">
                    <Image src="/aperture.svg" alt="aperture" width={160} height={160} />
                    <svg width="79" height="72" viewBox="0 0 79 72" fill="none" xmlns="http://www.w3.org/2000/svg" className="animate-pulse">
                        <path d="M35.2574 64.2422C36.3826 65.3674 37.9087 65.9995 39.5 65.9995C41.0913 65.9995 42.6174 65.3674 43.7426 64.2422L62.3878 45.597C66.3475 41.7151 72.1667 35.4809 72.1667 26.6662C72.1667 21.185 69.9893 15.9284 66.1135 12.0526C62.2378 8.17689 56.9811 5.99951 51.5 5.99951C48.5522 5.99951 45.6943 6.42395 42.8441 7.66528C41.6705 8.17644 40.5628 8.7981 39.5 9.5193C38.4373 8.7981 37.3295 8.17644 36.1559 7.66528C33.3058 6.42395 30.4478 5.99951 27.5 5.99951C22.0189 5.99951 16.7622 8.17689 12.8865 12.0526C9.01072 15.9284 6.83334 21.185 6.83334 26.6662C6.83334 35.4912 12.5937 41.709 16.6261 45.6109L35.2574 64.2422Z" fill="#EF4444" stroke="#FEE2E2" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <Image src="/acme.svg" alt="acme" width={160} height={160} />
                </div>
                <footer className="text-sm text-slate-500 mb-4">
                    Powered by Stitch
                </footer>
            </div>

            {/* Right view */}
            {!showProgess &&
                <div className="flex flex-col flex-1 bg-[#00000005] h-screen px-6 pt-12 overflow-y-auto overscroll-none">
                    <div>
                        <h1 className="text-3xl font-medium mb-12">Deploy Aperture Labs to Acme Corp.</h1>
                        <div className="mb-3 text-sm">Select Platform</div>
                        <Tabs defaultValue="aws" className="w-full">
                            <TabsList className="w-full justify-between">
                                <TabsTrigger value="aws" className="w-full flex gap-2"><Image src={"/aws.png"} alt={"aws"} width={14} height={14} />AWS</TabsTrigger>
                                <TabsTrigger value="azure" className="w-full flex gap-2"><Image src={"/azure.png"} alt={"azure"} width={14} height={14} />Azure</TabsTrigger>
                                <TabsTrigger value="gcp" className="w-full flex gap-2"><Image src={"/gcp.png"} alt={"gcp"} width={14} height={14} />GCP</TabsTrigger>
                                <TabsTrigger value="custom" className="w-full">Custom</TabsTrigger>
                            </TabsList>
                            <hr className="w-full my-6 h-[1px] bg-[#E2E8F0] border-0" />
                            <TabsContent value="aws">
                                <AWSForm done={(id) => {
                                    setId(id);
                                    setShowProgress(true);
                                }} />
                            </TabsContent>
                            <TabsContent value="azure">Azure support coming really soon...</TabsContent>
                            <TabsContent value="gcp">GCP support coming soon...</TabsContent>
                            <TabsContent value="custom">Custom support coming sooner than you would think!</TabsContent>
                        </Tabs>
                    </div>
                    <footer className="text-slate-500 flex gap-10 text-sm justify-center font-normal my-4">
                        <Link href={"/privacy-policy"}>Privacy Policy</Link>
                        <Link href={"/documentation"}>Documentation</Link>
                        <Link href={"/legal"}>Legal</Link>
                        <Link href={"/pricing"}>Pricing</Link>
                        <Link href={"/help"}>Help</Link>
                    </footer>
                </div>
            }
            {showProgess &&
                <div className="flex flex-col flex-1 bg-[#00000005] h-[100vh] px-6 pt-12 overflow-y-auto overscroll-none">
                    <div>
                        <h1 className="text-3xl font-medium mb-12">Deploy Aperture Labs to Acme Corp.</h1>
                        {/* <div className="mb-3 text-sm">Select Platform</div> */}
                        <Tabs defaultValue="aws" className="w-full">
                            {/* <TabsList className="w-full justify-between">
                                <TabsTrigger value="aws" className="w-full flex gap-2"><Image src={"/aws.png"} alt={"aws"} width={14} height={14} />AWS</TabsTrigger>
                                <TabsTrigger value="azure" className="w-full flex gap-2"><Image src={"/azure.png"} alt={"azure"} width={14} height={14} />Azure</TabsTrigger>
                                <TabsTrigger value="gcp" className="w-full flex gap-2"><Image src={"/gcp.png"} alt={"gcp"} width={14} height={14} />GCP</TabsTrigger>
                                <TabsTrigger value="custom" className="w-full">Custom</TabsTrigger>
                            </TabsList> */}
                            {/* <hr className="w-full my-6 h-[1px] bg-[#E2E8F0] border-0" /> */}
                            <TabsContent value="aws">
                                <ProgressView id={id} />
                            </TabsContent>
                            <TabsContent value="azure">Azure support coming really soon...</TabsContent>
                            <TabsContent value="gcp">GCP support coming soon...</TabsContent>
                            <TabsContent value="custom">Custom support coming sooner than you would think!</TabsContent>
                        </Tabs>
                    </div>
                    <footer className="text-slate-500 flex gap-10 text-sm justify-center font-normal my-4">
                        <Link href={"/privacy-policy"}>Privacy Policy</Link>
                        <Link href={"/documentation"}>Documentation</Link>
                        <Link href={"/legal"}>Legal</Link>
                        <Link href={"/pricing"}>Pricing</Link>
                        <Link href={"/help"}>Help</Link>
                    </footer>
                </div>}

        </div>
    )
}

const EnvironmentVariableItem = ({ envVar }: { envVar: EnvironmentVariable }) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)
    const [value, setValue] = useState<string>("")
    return (
        <div className="flex gap-4">
            <div className="font-bold font-robotomono flex flex-1 gap-2 items-center"><Code width={14} height={14} /> {envVar.key}</div>
            <div className="flex gap-2 items-center flex-1 min-w-[70%]">
                <Toggle aria-label="toggle password visability" pressed={isPasswordVisible} onPressedChange={(press) => setIsPasswordVisible(press)} >
                    <Eye width={14} height={14} />
                </Toggle>
                <Input type={isPasswordVisible ? "text" : "password"} placeholder={envVar.value} value={value} onChange={(e) => setValue(e.target.value)} />
            </div>
        </div>
    )
}

type Day = "Sunday" | "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday"
type Time = "12:00 AM" | "1:00 AM" | "2:00 AM" | "3:00 AM" | "4:00 AM" | "5:00 AM" | "6:00 AM" | "7:00 AM" | "8:00 AM" | "9:00 AM" | "10:00 AM" | "11:00 AM" | "12:00 PM" | "1:00 PM" | "2:00 PM" | "3:00 PM" | "4:00 PM" | "5:00 PM" | "6:00 PM" | "7:00 PM" | "8:00 PM" | "9:00 PM" | "10:00 PM" | "11:00 PM"

const ProgressView = (props: { id: string }) => {
    const [status, setStatus] = useState();
    const [url, setUrl] = useState();
    useEffect(() => {
        const getStatus = () => {
            if (status === "COMPLETE") {
                return;
            }
            fetch("http://localhost:3001/status", {
                method: "POST",
                headers: new Headers({
                    "Content-Type": "application/json",
                }),
                body: JSON.stringify({
                    id: props.id
                }),
            })
                .then((res) => res.json())
                .then((res) => {
                    setStatus(res.status)
                    if (res.status !== "COMPLETE") {
                        setTimeout(getStatus, 2 * 1000);
                    } else {
                        setUrl(res.url)
                    }
                    console.log(res)
                    // window.alert(res.url)
                })
                .catch((err) => {
                    console.error(err)
                    // window.alert(err)
                })
        }
        getStatus();
    }, []);

    // return <Component status={"STARTED"} />
    return <Component status={status} url={url} />
}

const AWSForm = (props: { done: (id: string) => void }) => {
    const [day, setDay] = useState<Day | undefined>(undefined)
    const [time, setTime] = useState<Time | undefined>(undefined)
    const [deploying, setDeploying] = useState(false);

    const handleSubmit = (e: any) => {
        e.preventDefault()
        console.log("Deploying", JSON.stringify({
            accessKey: e.target["access-key"].value,
            secret: e.target["secret"].value,
        }))
        setDeploying(true)
        fetch("http://localhost:3001/start", {
            method: "POST",
            headers: new Headers({
                "Content-Type": "application/json",
            }),
            body: JSON.stringify({
                accessKey: e.target["access-key"].value,
                secret: e.target["secret"].value,
            }),
        })
            .then((res) => res.json())
            .then((res) => {
                props.done(res.id);
                // debugger;
                // console.log(res)
                // window.alert(res.url)
            })
            .then(() => setDeploying(false))
            .catch((err) => {
                console.error(err)
                window.alert(err)
                setDeploying(false)
            })
    }



    return (
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <div>
                <h2 className="text-sm">Services being deployed</h2>
                <div className="text-sm text-slate-400 mb-3">A list of services which will be deployed after completing this form. Deploying additional services require additional confirmation from your side.</div>
                <div className="gap-x-3 gap-y-3 grid grid-cols-2 xs:grid-cols-2">
                    <div className="flex w-[330px] flex-col gap-2 border border-slate-300 p-3 rounded-md border-solid cursor-pointer hover:shadow">
                        <h3 className="text-slate-900 text-base font-semibold flex gap-1">
                            <Image src={"/supabase.svg"} alt={"supabase"} width={14} height={14} />
                            Supabase
                        </h3>
                        <p className="text-slate-500 text-sm font-normal">Supabase is an open source Firebase alternative, including Postgres database, Authentication, instant APIs, Edge Functions, Realtime subscriptions, Storage, and Vector embeddings.</p>
                    </div>
                </div>
            </div>
            <hr className="w-full h-[1px] bg-[#E2E8F0] border-0" />
            <div>
                <h2 className="text-sm">System requirements</h2>
                <div className="text-sm text-slate-400 mb-3">A list of services which will be deployed after completing this form. Deploying additional services require additional confirmation from your side.</div>
                <div className="gap-x-3 gap-y-3 grid grid-cols-2 xs:grid-cols-2">
                    <div className="flex w-[330px] flex-col gap-2 border border-slate-300 p-3 rounded-md border-solid cursor-pointer hover:shadow">
                        <h3 className="text-slate-900 text-base font-semibold">CPU</h3>
                        <p className="text-slate-500 text-sm font-normal">This deployment is configured to utilise 1 vCPU.</p>
                    </div>
                    <div className="flex w-[330px] flex-col gap-2 border border-slate-300 p-3 rounded-md border-solid cursor-pointer hover:shadow">
                        <h3 className="text-slate-900 text-base font-semibold">GPU</h3>
                        <p className="text-slate-500 text-sm font-normal">This deployment is not configured to include a GPU.</p>
                    </div>
                    <div className="flex w-[330px] flex-col gap-2 border border-slate-300 p-3 rounded-md border-solid cursor-pointer hover:shadow">
                        <h3 className="text-slate-900 text-base font-semibold">Memory</h3>
                        <p className="text-slate-500 text-sm font-normal">This deployment is configured to utilise 2 GiB.</p>
                    </div>
                    <div className="flex w-[330px] flex-col gap-2 border border-slate-300 p-3 rounded-md border-solid cursor-pointer hover:shadow">
                        <h3 className="text-slate-900 text-base font-semibold">Storage</h3>
                        <p className="text-slate-500 text-sm font-normal">This deployment is configured to utilise 1x8 GiB.</p>
                    </div>
                </div>
            </div>
            <hr className="w-full h-[1px] bg-[#E2E8F0] border-0" />
            <div>
                <h2 className="text-sm">AWS key</h2>
                <div className="text-sm text-slate-400 mb-3">The key will not be shared with Aperture Labs and is encrypted before its stored.</div>
                <Input type="text" name="access-key" placeholder="AKIAIOSFODNN7EXAMPLE" />
            </div>
            <div>
                <h2 className="text-sm">AWS Secret</h2>
                <div className="text-sm text-slate-400 mb-3">The secret will not be shared with Aperture Labs and is encrypted before its stored.</div>
                <Input type="password" name="secret" placeholder="wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY" />
            </div>
            <hr className="w-full h-[1px] bg-[#E2E8F0] border-0" />
            <div>
                <h2 className="text-sm">Environment variables</h2>
                <div className="text-sm text-slate-400 mb-3">Variables below were defined by Aperture Labs. All variables stay on your environment and are not reported back to Aperture Labs.</div>
                <div className="flex flex-col gap-2">
                    {
                        [
                            {
                                key: "DATABASE_URL",
                                value: "postgres://"
                            },
                            {
                                key: "SECRET_KEY",
                                value: "supersecret"
                            }
                        ].map((envVar: EnvironmentVariable, index) => <EnvironmentVariableItem key={envVar.key} envVar={envVar} />)
                    }
                </div>
            </div>
            <hr className="w-full h-[1px] bg-[#E2E8F0] border-0" />
            <div>
                <h2 className="text-sm">Maintenance window</h2>
                <div className="text-sm text-slate-400 mb-3">Specify upgrade/downgrade times for automatic new version deployments, which may cause service outages. You can adjust these windows permanently or temporarily at any time. Windows are 2 hours long.</div>
                <div>
                    <div className="flex gap-3">
                        <Select>
                            <SelectTrigger className={cn("w-[200px]", !day && "text-muted-foreground")}>
                                <SelectValue placeholder={<span className="flex items-center">
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {day ? <span>{day}</span> : <span>Select a day</span>}
                                </span>} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="sunday">Sunday</SelectItem>
                                    <SelectItem value="monday">Monday</SelectItem>
                                    <SelectItem value="tuesday">Tuesday</SelectItem>
                                    <SelectItem value="wednesday">Wednesday</SelectItem>
                                    <SelectItem value="thursday">Thursday</SelectItem>
                                    <SelectItem value="friday">Friday</SelectItem>
                                    <SelectItem value="saturday">Saturday</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <Select>
                            <SelectTrigger className={cn("w-[200px]", !time && "text-muted-foreground")}>
                                <SelectValue placeholder={<span className="flex items-center">
                                    <Clock1 className="mr-2 h-4 w-4" />
                                    {time ? <span>{time}</span> : <span>Select a time</span>}
                                </span>} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="12:00 AM">12:00 AM</SelectItem>
                                    <SelectItem value="1:00 AM">1:00 AM</SelectItem>
                                    <SelectItem value="2:00 AM">2:00 AM</SelectItem>
                                    <SelectItem value="3:00 AM">3:00 AM</SelectItem>
                                    <SelectItem value="4:00 AM">4:00 AM</SelectItem>
                                    <SelectItem value="5:00 AM">5:00 AM</SelectItem>
                                    <SelectItem value="6:00 AM">6:00 AM</SelectItem>
                                    <SelectItem value="7:00 AM">7:00 AM</SelectItem>
                                    <SelectItem value="8:00 AM">8:00 AM</SelectItem>
                                    <SelectItem value="9:00 AM">9:00 AM</SelectItem>
                                    <SelectItem value="10:00 AM">10:00 AM</SelectItem>
                                    <SelectItem value="11:00 AM">11:00 AM</SelectItem>
                                    <SelectItem value="12:00 PM">12:00 PM</SelectItem>
                                    <SelectItem value="1:00 PM">1:00 PM</SelectItem>
                                    <SelectItem value="2:00 PM">2:00 PM</SelectItem>
                                    <SelectItem value="3:00 PM">3:00 PM</SelectItem>
                                    <SelectItem value="4:00 PM">4:00 PM</SelectItem>
                                    <SelectItem value="5:00 PM">5:00 PM</SelectItem>
                                    <SelectItem value="6:00 PM">6:00 PM</SelectItem>
                                    <SelectItem value="7:00 PM">7:00 PM</SelectItem>
                                    <SelectItem value="8:00 PM">8:00 PM</SelectItem>
                                    <SelectItem value="9:00 PM">9:00 PM</SelectItem>
                                    <SelectItem value="10:00 PM">10:00 PM</SelectItem>
                                    <SelectItem value="11:00 PM">11:00 PM</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>
            <div>
                <h2 className="text-sm">Hydration period</h2>
                <div className="text-sm text-slate-400 mb-3">Choose a time period you want for new version of the service to be stable before its deployed to your environment.</div>
                <Input type="text" name="hydration" placeholder="Number of days..." />
            </div>
            <div>
                <h2 className="text-sm">Share logs</h2>
                <div className="text-sm text-slate-400 mb-3">The services collect usage logs which Aperture Labs can use to improve their products or resolve problems more easily. If you choose to not share logs with Aperture Labs, logs are still being collected and can be retrieved manually but do not leave your servers.</div>
                <div className="flex items-center space-x-2">
                    <Switch id="share-logs" />
                    <Label htmlFor="share-logs">Share logs with Aperture Labs</Label>
                </div>
            </div>
            {/* <hr className="w-full h-[1px] bg-[#E2E8F0] border-0" />
            <div>
                <h2 className="text-sm">Projected running costs</h2>
                <div className="text-sm text-slate-400 mb-3">A projection of the costs to run the service above. The projections were provided by Aperture Labs and may vary heavily depending on your usage and can change over time.</div>
            </div> */}
            <hr className="w-full h-[1px] bg-[#E2E8F0] border-0" />
            <div>
                <div className="flex items-center space-x-2">
                    <Checkbox id="terms" />
                    <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Deploying the services will start immediately after clicking the button below.
                    </label>
                </div>
            </div>
            <Button type={"submit"} disabled={deploying}>{deploying ? <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Deploying services</> : "Deploy services"}</Button>
        </form >
    )
}

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/eZCmNR029fw
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

function Component(props: { status?: string, url?: string }) {
    const statuses = ["STARTING", "STARTED", "DEPLOYED", "COMPLETE"];
    if (props.status === "COMPLETE") {
        return <div className="grid gap-6 max-w-3xl w-full mx-auto">
            <Card>
                <CardHeader>
                    <CardTitle>Successfully deployed</CardTitle>
                    <CardDescription>View your application at the following URL</CardDescription>
                </CardHeader>
                <CardContent className="p-6">

                    <div>
                        <a target="_blank" href={`http://${props.url}:8000`}>{`http://${props.url}:8000`}</a>
                    </div>
                </CardContent>
            </Card>
        </div>
    }
    return (
        <div className="grid gap-6 max-w-3xl w-full mx-auto">
            <Card>
                <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                        <CodeIcon className="w-6 h-6" />

                        <div className="grid gap-1">
                            <div className="font-semibold">Pulling repository</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">Loading the container image</div>
                        </div>
                    </div>
                    <div className="mt-6 grid gap-2">
                        <div className="text-sm flex items-center gap-2">
                            {statuses.indexOf(props.status || "") === 0 && <>
                                <ClockIcon className="w-4 h-4 text-gray-500" />
                                <span className="text-gray-500">In progress</span>
                            </>}
                            {statuses.indexOf(props.status || "") > 0 && <>
                                <CheckCircleIcon className="w-4 h-4 inline-flex text-emerald-500" />
                                <span className="text-emerald-500">Complete</span>
                            </>}
                        </div>
                        {/* <Progress className="h-2 rounded-full" value={25} /> */}
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                        <ServerIcon className="w-6 h-6" />

                        <div className="grid gap-1">
                            <div className="font-semibold">Provisioning infrastructure</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">Creating aws services</div>
                        </div>
                    </div>
                    <div className="mt-6 grid gap-2">
                        <div className="text-sm flex items-center gap-2">
                            {statuses.indexOf(props.status || "") === 1 && <>
                                <ClockIcon className="w-4 h-4 text-gray-500" />
                                <span className="text-gray-500">In progress</span>
                            </>}
                            {statuses.indexOf(props.status || "") > 1 && <>
                                <CheckCircleIcon className="w-4 h-4 inline-flex text-emerald-500" />
                                <span className="text-emerald-500">Complete</span>
                            </>}
                        </div>
                        {/* <Progress className="h-2 rounded-full" value={25} /> */}
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                        <CodeIcon className="w-6 h-6" />
                        <div className="grid gap-1">
                            <div className="font-semibold">Deploying application code</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">Publishing the app</div>
                        </div>
                    </div>
                    <div className="mt-6 grid gap-2">
                        <div className="text-sm flex items-center gap-2">
                            {statuses.indexOf(props.status || "") === 1 && <>
                                <ClockIcon className="w-4 h-4 text-gray-500" />
                                <span className="text-gray-500">In progress</span>
                            </>}
                            {statuses.indexOf(props.status || "") > 1 && <>
                                <CheckCircleIcon className="w-4 h-4 inline-flex text-emerald-500" />
                                <span className="text-emerald-500">Complete</span>
                            </>}
                        </div>
                        {/* <Progress className="h-2 rounded-full" value={75} /> */}
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                        <BadgeCheckIcon className="w-6 h-6" />
                        <div className="grid gap-1">
                            <div className="font-semibold">Verifying install</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">Waiting for the server to come online</div>
                        </div>
                    </div>
                    <div className="mt-6 grid gap-2">
                        <div className="text-sm flex items-center gap-2">
                            {statuses.indexOf(props.status || "") === 2 && <>
                                <ClockIcon className="w-4 h-4 text-gray-500" />
                                <span className="text-gray-500">In progress</span>
                            </>}
                            {statuses.indexOf(props.status || "") > 2 && <>
                                <CheckCircleIcon className="w-4 h-4 inline-flex text-emerald-500" />
                                <span className="text-emerald-500">Complete</span>
                            </>}
                        </div>
                        {/* <Progress className="h-2 rounded-full" value={25} /> */}
                    </div>
                </CardContent>
            </Card>

        </div>
    )
}

function ActivityIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
    )
}


function CheckCircleIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
    )
}


function ClockIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
        </svg>
    )
}


function CodeIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
        </svg>
    )
}


function DatabaseIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <ellipse cx="12" cy="5" rx="9" ry="3" />
            <path d="M3 5V19A9 3 0 0 0 21 19V5" />
            <path d="M3 12A9 3 0 0 0 21 12" />
        </svg>
    )
}


function PackageIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m7.5 4.27 9 5.15" />
            <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
            <path d="m3.3 7 8.7 5 8.7-5" />
            <path d="M12 22V12" />
        </svg>
    )
}


function ServerIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect width="20" height="8" x="2" y="2" rx="2" ry="2" />
            <rect width="20" height="8" x="2" y="14" rx="2" ry="2" />
            <line x1="6" x2="6.01" y1="6" y2="6" />
            <line x1="6" x2="6.01" y1="18" y2="18" />
        </svg>
    )
}


function SettingsIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
            <circle cx="12" cy="12" r="3" />
        </svg>
    )
}
