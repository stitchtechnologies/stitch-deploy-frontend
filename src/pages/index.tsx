import Layout from "@/components/layout"
import { useUser } from "@clerk/nextjs"
import Head from "next/head"
import Image from "next/image"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

export default function Home() {
    const router = useRouter();
    const { user, isLoaded } = useUser();
    const [hasVendorAccount, setHasVendorAccount] = useState(false)
    const [vendorTitle, setVendorTitle] = useState("")
    const [vendorSlug, setVendorSlug] = useState("")
    const [vendorImage, setVendorImage] = useState("")

    useEffect(() => {
        if (!user) return;
        fetch("/api/get-vendor", {
            method: "POST",
            body: JSON.stringify({
                userId: user.id,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => res.json())
            .then((data) => {
                if (data.vendor) {
                    setHasVendorAccount(true)
                }
            })
            .catch((error) => console.error(error))
    }, [user])

    useEffect(() => {
        if (hasVendorAccount) {
            router.push("/service")
        }
    }, [router, hasVendorAccount])

    const handleCreateVendor = async (e: any) => {
        e.preventDefault();
        if (!user) return;

        fetch("/api/create-vendor", {
            method: "POST",
            body: JSON.stringify({
                userId: user.id,
                vendorTitle,
                vendorSlug,
                vendorImage,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => res.json())
            .then((data) => {
                console.log(data)
            })
            .then(() => router.push("/service"))
            .catch((error) => console.error(error))
    }

    if (!isLoaded || hasVendorAccount) {
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

    // User doesnt have vendor account
    return (
        <Layout>
            <Head>
                <title>Stitch Deploy | Create Vendor</title>
            </Head>
            <div className="flex flex-col items-center justify-center h-screen overscroll-none overflow-hidden">
                <form onSubmit={handleCreateVendor}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Hey, you dont have a vendor account!</CardTitle>
                            <CardDescription>Make one before you can create a service.</CardDescription>
                        </CardHeader>
                        <CardContent className="px-6">
                            <div className="flex flex-col gap-2">
                                <div>
                                    <Label htmlFor="title">Title</Label>
                                    <Input type="text" placeholder="supabase-hq" value={vendorTitle} onChange={(e) => setVendorTitle(e.target.value)} />
                                </div>
                                <div>
                                    <Label htmlFor="slug">Slug</Label>
                                    <Input type="text" placeholder="supabase-hq" value={vendorSlug} onChange={(e) => setVendorSlug(e.target.value)} />
                                </div>
                                <div>
                                    <Label htmlFor="image">Image URL</Label>
                                    <Input type="text" placeholder="https://avatars.githubusercontent.com/u/54469796" value={vendorImage} onChange={(e) => setVendorImage(e.target.value)} />
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button type="submit" className="w-full">Create Vendor</Button>
                        </CardFooter>
                    </Card>
                </form>
            </div>
        </Layout>
    )
}