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
        id: "apple",
        link: "/organization/apple",
        imageUrl: "https://github.com/apple.png",
        fallbackName: "Apple",
        organizationName: "Apple",
        lastUpdated: "Updated 2d ago",
        badges: [
            { variant: "destructive", text: "Recalled installation", icon: <AlertCircle size={16} /> },
            { variant: "secondary", text: "Production", icon: <Cloud size={16} /> },
        ],
    },
    {
        id: "google",
        link: "/organization/google",
        imageUrl: "https://github.com/google.png",
        fallbackName: "Google",
        organizationName: "Google",
        lastUpdated: "Updated 1d ago",
        badges: [
            { variant: "blue", text: "Updating", icon: <RefreshCw size={16} /> },
            { variant: "secondary", text: "Production", icon: <Cloud size={16} /> },
            { variant: "secondary", text: "Staging", icon: <Cloud size={16} /> },
        ],
    },
    {
        id: "microsoft",
        link: "/organization/microsoft",
        imageUrl: "https://github.com/microsoft.png",
        fallbackName: "Microsoft",
        organizationName: "Microsoft",
        lastUpdated: "Updated 3d ago",
        badges: [
            { variant: "secondary", text: "Production", icon: <Cloud size={16} /> },
        ],
    },
    {
        id: "facebook",
        link: "/organization/facebook",
        imageUrl: "https://github.com/facebook.png",
        fallbackName: "Facebook",
        organizationName: "Facebook",
        lastUpdated: "Updated 4d ago",
        badges: [
            { variant: "secondary", text: "Production", icon: <Cloud size={16} /> },
            { variant: "secondary", text: "Staging", icon: <Cloud size={16} /> },
        ],
    },
    {
        id: "amazon",
        link: "/organization/amazon",
        imageUrl: "https://github.com/amzn.png",
        fallbackName: "Amazon",
        organizationName: "Amazon",
        lastUpdated: "Updated 5d ago",
        badges: [
            { variant: "secondary", text: "In progress", icon: <Hammer size={16} /> },
        ],
    },
];