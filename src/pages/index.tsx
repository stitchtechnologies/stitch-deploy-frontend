import Layout from "@/components/layout";
import { ORGANIZATIONS, OrganizationCard } from "@/components/organization";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Head from "next/head";

export default function Organizations() {
  return (
    <Layout>
      <Head>
        <title>Stitch | Organizations</title>
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
          <Button className="px-6">Add new</Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {ORGANIZATIONS.map((org, index) => (
            <OrganizationCard
              key={org.id}
              link={org.link}
              imageUrl={org.imageUrl}
              fallbackName={org.fallbackName}
              organizationName={org.organizationName}
              lastUpdated={org.lastUpdated}
              badges={org.badges}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
}
