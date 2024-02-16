import CreateNewOrganization from "@/components/createNewOrganizationDialog";
import Layout from "@/components/layout";
import { OrganizationCard } from "@/components/organization";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Head from "next/head";
import Link from "next/link";

type Service = {
  id: string;
  link: string;
  imageUrl: string;
  fallbackName: string;
  serviceName: string;
  lastUpdated: string;
  version: string;
  badges: { variant: "default" | "secondary" | "destructive" | "outline"; text: string; }[];
}

const SERVICES: Service[] = [
  {
    id: "1",
    link: "/service/supabase",
    imageUrl: "/supabase.svg",
    fallbackName: "Supabase",
    serviceName: "Supabase",
    version: "v3.8.0",
    lastUpdated: "Updated 1d ago",
    badges: [
      { variant: "destructive", text: "Recalled installation" },
      { variant: "secondary", text: "Production" },
    ],
  },
]

type ServiceCardProps = Omit<Service, "id">;

export const ServiceCard: React.FC<ServiceCardProps> = ({ link, imageUrl, version, fallbackName, serviceName, lastUpdated, badges }) => {
  return (
    <Link href={link} className="flex flex-col gap-4 bg-white rounded-md border-[color:var(--slate-200,#E2E8F0)] p-6 text-sm shadow-[0px_2px_6px_0px_rgba(0,0,0,0.09)] hover:shadow-md">
      <div className="flex gap-3 items-center">
        <Avatar className="h-6 w-6">
          <AvatarImage src={imageUrl} />
          <AvatarFallback>{fallbackName}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <div>{serviceName}</div>
          <div className="text-slate-400">{lastUpdated}</div>
        </div>
        <div className="ml-auto font-light">{version}</div>
      </div>
      <div className="flex gap-2">
        {badges.map((badge, index) => (
          <Badge key={index} variant={badge.variant} className="font-normal">{badge.text}</Badge>
        ))}
      </div>
    </Link>
  )
}

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
            <ServiceCard
              key={service.id}
              link={service.link}
              imageUrl={service.imageUrl}
              version={service.version}
              fallbackName={service.fallbackName}
              serviceName={service.serviceName}
              lastUpdated={service.lastUpdated}
              badges={service.badges}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
}
