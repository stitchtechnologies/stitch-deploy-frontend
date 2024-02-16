import CreateNewOrganization from "@/components/createNewOrganizationDialog";
import Layout from "@/components/layout";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import Head from "next/head";
import { useRouter } from "next/router";

export default function Services() {
    const router = useRouter()
    const { id } = router.query

    return (
        <Layout>
            <Head>
                <title>Stitch | {id}</title>
            </Head>
            <div className="flex flex-col gap-4 px-24 py-6">
                service {id}
            </div>
        </Layout>
    );
}
