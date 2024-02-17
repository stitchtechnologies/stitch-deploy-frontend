import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, RefreshCw, Cloud, Hammer } from "lucide-react"

export interface Organization {
    id: string;
    link: string;
    imageUrl: string;
    fallbackName: string;
    organizationName: string;
    lastUpdated: string;
    badges: { variant: "default" | "secondary" | "blue" | "destructive" | "outline"; text: string; icon?: any}[];
}

type OrganizationCardProps = Omit<Organization, "id">;

export const OrganizationCard: React.FC<OrganizationCardProps> = ({ link, imageUrl, fallbackName, organizationName, lastUpdated, badges }) => {
    return (
        <Link href={link} className="flex flex-col gap-4 bg-white rounded-md border-slate-200 border-solid border p-6 text-sm shadow-[0px_2px_6px_0px_rgba(0,0,0,0.09)] hover:shadow-md">
            <div className="flex gap-3 items-center">
                <Avatar className="h-6 w-6">
                    <AvatarImage src={imageUrl} />
                    <AvatarFallback>{fallbackName}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                    <div className="font-medium">{organizationName}</div>
                    <div className="text-slate-400">{lastUpdated}</div>
                </div>
            </div>
            <div className="flex gap-2">
                {badges.map((badge, index) => (
                    <Badge key={index} variant={badge.variant} className="font-normal flex gap-1">{badge.icon} {badge.text}</Badge>
                ))}
            </div>
        </Link>
    )
}

// TODO use a DB for this
export const ORGANIZATIONS: Organization[] = [
    {
        id: "nike",
        link: "/organization/nike",
        imageUrl: "https://avatars.githubusercontent.com/u/1435711?s=200&v=4",
        fallbackName: "Nike",
        organizationName: "Nike",
        lastUpdated: "Updated 2d ago",
        badges: [
            { variant: "destructive", text: "Recalled installation", icon: <AlertCircle size={16} /> },
            { variant: "secondary", text: "Production", icon: <Cloud size={16} /> },
        ],
    },
    {
        id: "walmart",
        link: "/organization/walmart",
        imageUrl: "https://avatars.githubusercontent.com/u/768298?s=200&v=4",
        fallbackName: "Walmart",
        organizationName: "Walmart",
        lastUpdated: "Updated 1d ago",
        badges: [
            { variant: "blue", text: "Updating", icon: <RefreshCw size={16} /> },
            { variant: "secondary", text: "Production", icon: <Cloud size={16} /> },
            { variant: "secondary", text: "Staging", icon: <Cloud size={16} /> },
        ],
    },
    {
        id: "coke",
        link: "/organization/coke",
        imageUrl: "https://avatars.githubusercontent.com/u/65602748?s=200&v=4",
        fallbackName: "Coca-Cola",
        organizationName: "Coca-Cola",
        lastUpdated: "Updated 3d ago",
        badges: [
            { variant: "secondary", text: "Production", icon: <Cloud size={16} /> },
        ],
    },
    {
        id: "mercedes",
        link: "/organization/mercedes",
        imageUrl: "https://avatars.githubusercontent.com/u/34240465?s=200&v=4",
        fallbackName: "Mercedes-Benz",
        organizationName: "Mercedes-Benz",
        lastUpdated: "Updated 4d ago",
        badges: [
            { variant: "secondary", text: "Production", icon: <Cloud size={16} /> },
            { variant: "secondary", text: "Staging", icon: <Cloud size={16} /> },
        ],
    },
    {
        id: "homedepot",
        link: "/organization/homedepot",
        imageUrl: "https://avatars.githubusercontent.com/u/8459218?s=200&v=4",
        fallbackName: "Home Depot",
        organizationName: "Home Depot",
        lastUpdated: "Updated 5d ago",
        badges: [
            { variant: "secondary", text: "In progress", icon: <Hammer size={16} /> },
        ],
    },
];