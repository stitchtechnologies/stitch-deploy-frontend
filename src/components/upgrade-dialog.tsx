import { Button } from "./ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useState } from "react";

const UpgradeDialog = ({ open, setOpen, deploymentId }: { open: boolean, setOpen: (open: boolean) => void, deploymentId: string }) => {
    const [selectedVersion, setSelectedVersion] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const handleUpgradeClick = () => {
        setLoading(true);
        fetch("/api/issue-command", {
            method: "POST",
            body: JSON.stringify({
                commandType: "UPGRADE",
                data: { version: selectedVersion },
                deploymentId,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
                if (res.ok) {
                    setOpen(false);
                } else {
                    alert("Failed to send upgrade command");
                }
                setLoading(false);
            })
    }

    return (
        <Dialog open={open} onOpenChange={(o) => setOpen(o)}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Send Upgrade Command {deploymentId}</DialogTitle>
                    <DialogDescription>
                        This action will send an upgrade command to the agent for this deployment.
                    </DialogDescription>
                </DialogHeader>
                <div>
                    <Select onValueChange={(v) => setSelectedVersion(v)} value={selectedVersion}>
                        <SelectTrigger>
                            <SelectValue placeholder="New version" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="1.0.0">1.0.0</SelectItem>
                            <SelectItem value="1.0.1">1.0.1</SelectItem>
                            <SelectItem value="1.0.2">1.0.2</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <DialogFooter>
                    <Button className="w-full" disabled={selectedVersion === "" || loading} onClick={handleUpgradeClick}>
                        Send Upgrade
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default UpgradeDialog;