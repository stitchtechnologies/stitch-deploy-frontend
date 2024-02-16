import Image from "next/image"
import { useRouter } from "next/router"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Head from "next/head"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { CalendarIcon, ClockIcon, Loader2 } from "lucide-react"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"

export default function OrganizationOnboarding() {
    const router = useRouter()
    const { organizationId } = router.query

    return (
        <div className="flex flex-row items-center h-[100vh] overscroll-none">
            <Head>
                <title>Aperture x Acme | Onboarding</title>
            </Head>

            {/* Left view */}
            <div className="flex flex-col flex-1 items-center justify-center h-[100vh] overscroll-none">
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
            <div className="flex flex-col flex-1 bg-[#00000005] h-[100vh] px-6 pt-12 overflow-y-auto overscroll-none">
                <div>
                    <h1 className="text-3xl font-medium mb-12">Deploy Aperture Science to Acme Corp.</h1>
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
                            <AWSForm />
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
        </div>
    )
}

type Day = "Sunday" | "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday"
type Time = "12:00 AM" | "1:00 AM" | "2:00 AM" | "3:00 AM" | "4:00 AM" | "5:00 AM" | "6:00 AM" | "7:00 AM" | "8:00 AM" | "9:00 AM" | "10:00 AM" | "11:00 AM" | "12:00 PM" | "1:00 PM" | "2:00 PM" | "3:00 PM" | "4:00 PM" | "5:00 PM" | "6:00 PM" | "7:00 PM" | "8:00 PM" | "9:00 PM" | "10:00 PM" | "11:00 PM"

const AWSForm = () => {
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
        fetch("http://localhost:3001/", {
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
                console.log(res)
                window.alert(res.url)
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
                <div className="text-sm text-slate-400 mb-3">The key will not be shared with Amazing Corp and is encrypted before its stored.</div>
                <Input type="text" name="access-key" placeholder="AKIAIOSFODNN7EXAMPLE" />
            </div>
            <div>
                <h2 className="text-sm">AWS Secret</h2>
                <div className="text-sm text-slate-400 mb-3">The secret will not be shared with Amazing Corp and is encrypted before its stored.</div>
                <Input type="password" name="secret" placeholder="wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY" />
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
                                    <ClockIcon className="mr-2 h-4 w-4" />
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
                <div className="text-sm text-slate-400 mb-3">The services collect usage logs which Aperture Science can use to improve their products or resolve problems more easily. If you choose to not share logs with Aperture Science, logs are still being collected and can be retrieved manually but do not leave your servers.</div>
                <div className="flex items-center space-x-2">
                    <Switch id="share-logs" />
                    <Label htmlFor="share-logs">Share logs with Aperture Science</Label>
                </div>
            </div>
            {/* <hr className="w-full h-[1px] bg-[#E2E8F0] border-0" />
            <div>
                <h2 className="text-sm">Projected running costs</h2>
                <div className="text-sm text-slate-400 mb-3">A projection of the costs to run the service above. The projections were provided by Aperture Science and may vary heavily depending on your usage and can change over time.</div>
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
        </form>
    )
}