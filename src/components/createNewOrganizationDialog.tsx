import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "./ui/button";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Organization } from "./organization";

export const ACME_ORG = {
    id: "acme",
    link: "/organization/acme",
    imageUrl: "/acme.svg",
    fallbackName: "Acme Corp.",
    organizationName: "Acme Corp.",
    lastUpdated: "now",
    badges: []
}

const CreateNewOrganization = ({ onCreated: handleCreated }: { onCreated: (org: Organization) => void }) => {
    const [open, setOpen] = useState(false);
    const [creating, setCreating] = useState(false);

    return (
        <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
            <DialogTrigger className="ml-auto" asChild>
                <Button className="px-6" onClick={() => setOpen(true)}>
                    Create new
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create an organization</DialogTitle>
                    <DialogDescription>
                        <form className="flex flex-col gap-4 mt-2" onSubmit={(e: any) => {
                            e.preventDefault()
                            setCreating(true)
                            // sleep for 2 seconds then setcreating to false
                            setTimeout(() => {
                                setCreating(false)
                                setOpen(false)
                                handleCreated(ACME_ORG)
                            }, 2000)
                        }}>
                            <div className="grid w-full items-center gap-1.5">
                                <Label htmlFor="name">Organization name</Label>
                                <Input type="text" name="name" placeholder="Acme Corp." />
                            </div>
                            <div className="grid w-full items-center gap-1.5">
                                <Label htmlFor="image">Image</Label>
                                <Input name="image" type="file" />
                            </div>
                            <Button type={"submit"} disabled={creating}>{creating ? <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Creating</> : "Create"}</Button>
                        </form>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default CreateNewOrganization;