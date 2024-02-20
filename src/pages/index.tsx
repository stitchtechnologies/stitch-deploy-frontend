import Layout from "@/components/layout"
import Head from "next/head"
import Image from "next/image"
import { useRouter } from "next/router"
import { useEffect } from "react"

export default function Home() {
    const router = useRouter();

    useEffect(() => {
        router.push("/service")
    }, [router])

    return (
        <Layout>
            <Head>
                <title>Stitch Deploy</title>
            </Head>
            <div className="flex flex-row items-center justify-center h-screen overscroll-none overflow-hidden">
                <div className="flex gap-2">
                    <Image src="/favicon-dark.svg" alt="Stitch Deploy" width={32} height={32} />
                    <span className="text-4xl font-bold">Stitch</span>
                </div>
            </div>
        </Layout>
    )
}