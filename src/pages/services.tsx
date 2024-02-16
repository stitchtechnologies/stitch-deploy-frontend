import CreateNewOrganization from "@/components/createNewOrganizationDialog";
import Layout from "@/components/layout";
import { OrganizationCard } from "@/components/organization";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Head from "next/head";

type Service = {
  id: string;
  link: string;
  imageUrl: string;
  fallbackName: string;
  serviceName: string;
  lastUpdated: string;
  badges: { variant: "default" | "secondary" | "destructive" | "outline"; text: string; }[];
}

const SERVICES: Service[] = [
  {
    id: "1",
    link: "/service/supabase",
    imageUrl: "/supabase.svg",
    fallbackName: "Supabase",
    serviceName: "Supabase",
    lastUpdated: "1 day ago",
    badges: [
      { variant: "destructive", text: "Recalled installation" },
      { variant: "secondary", text: "Production" },
    ],
  },
]

export default function Services() {
  return (
    <Layout>
      <Head>
        <title>Stitch | Services</title>
      </Head>
      <div className="flex flex-col gap-4 px-24 py-6">
        <div className="flex gap-2">
          <Input type="text" placeholder="Search" />
          <Select>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Sort by activity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="activity">Sort by activity</SelectItem>
              <SelectItem value="name">Sort by name</SelectItem>
              <SelectItem value="update">Sort by last update</SelectItem>
            </SelectContent>
          </Select>
          <CreateNewOrganization onCreated={(service) => console.log(service)} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {SERVICES.map((service, index) => (
            <OrganizationCard
              key={service.id}
              link={service.link}
              imageUrl={service.imageUrl}
              fallbackName={service.fallbackName}
              organizationName={service.serviceName}
              lastUpdated={service.lastUpdated}
              badges={service.badges}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
}
