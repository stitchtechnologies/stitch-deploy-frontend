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
import { Textarea } from "./ui/textarea";
import { Service } from "@prisma/client";
import { v4 } from "uuid";

const CreateNewServiceDialog = ({ onCreated: handleCreated }: { onCreated: (service: Service) => void }) => {
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
                    <DialogTitle>Create a new service</DialogTitle>
                    <DialogDescription>
                        <form className="flex flex-col gap-6 mt-6" onSubmit={(e: any) => {
                            e.preventDefault()
                            setCreating(true)
                            // sleep for 2 seconds then setcreating to false
                            setTimeout(() => {
                                setCreating(false)
                                setOpen(false)
                                handleCreated({
                                    id: v4(),
                                    title: e.target.name.value as string,
                                    description: e.target.description.value as string,
                                    externalUrl: e.target['external-url'].value as string,
                                    script: e.target.script.value as string,
                                    port: e.target.port.value as string,
                                    image: e.target.image.value as string,
                                    readMe: "",
                                    createdAt: new Date(),
                                    organizationId: "",
                                    vendorId: "",
                                })
                            }, 2000)
                        }}>
                            <div className="grid w-full items-center gap-1.5">
                                <Label className="font-normal" htmlFor="name">Service name</Label>
                                <Input type="text" name="name" placeholder="Enter name..." />
                            </div>
                            <div className="grid w-full items-center gap-1.5">
                                <Label className="font-normal" htmlFor="description">Description</Label>
                                <Input type="text" name="description" placeholder="Enter description..." />
                            </div>
                            <div className="grid w-full items-center gap-1.5">
                                <Label className="font-normal" htmlFor="external-url">External URL</Label>
                                <Input type="text" name="external-url" placeholder="Enter link to website or repo..." />
                            </div>
                            <div className="grid w-full items-center gap-1.5">
                                <Label className="font-normal" htmlFor="script">Script</Label>
                                <Textarea name="script" placeholder="Enter script..." />
                            </div>
                            <div className="grid w-full items-center gap-1.5">
                                <Label className="font-normal" htmlFor="port">Port (optional)</Label>
                                <Input type="text" name="port" placeholder="Enter port to open application (optional)..." />
                            </div>
                            <div className="grid w-full items-center gap-1.5">
                                <Label className="font-normal" htmlFor="image">Image</Label>
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

export default CreateNewServiceDialog;