import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useRouter } from "next/router"
import Link from "next/link"
import { ExternalLink } from "lucide-react"
import Head from "next/head"

export default function OrganizationOnboarding() {
    const router = useRouter()
    const { organizationId } = router.query

    return (
        <div className="flex flex-col items-center h-[100vh] bg-[#00000005]">
            <Head>
                <title>Aperture x Acme | Onboarding</title>
            </Head>

            <div className="flex gap-20 mt-[256px] mb-[128px]">
                <Image src="/aperture.svg" alt="aperture" width={160} height={160} />
                <Image src="/acme.svg" alt="acme" width={160} height={160} />
            </div>

            <div className="flex flex-col gap-4 w-[280px] items-center">
                <Input type="password" placeholder="Enter your passkey" />
                <Link href={`/onboarding/${organizationId}/begin`} className="w-full">
                    <Button className="w-full">Start deployment</Button>
                </Link>
                <Link href={"/no-key"} className="text-blue-600 text-sm hover:text-blue-700">Did not recieve a passkey?</Link>
                <hr className="w-full h-[1px] bg-[#E2E8F0] border-0" />
                <Link href={`/onboarding/${organizationId}/begin`} className="text-slate-400 text-sm flex gap-1 items-center">Learn more about deployments <ExternalLink className="h-4 w-4" /></Link>
            </div>

            <footer className="flex gap-10 text-sm font-normal mt-auto mb-4">
                <Link href={"/privacy-policy"}>Privacy Policy</Link>
                <Link href={"/documentation"}>Documentation</Link>
                <Link href={"/legal"}>Legal</Link>
                <Link href={"/pricing"}>Pricing</Link>
                <Link href={"/help"}>Help</Link>
            </footer>
        </div>
    )
}