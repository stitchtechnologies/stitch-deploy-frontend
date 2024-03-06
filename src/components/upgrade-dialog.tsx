import { Button } from "./ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { useState } from "react";
import { Input } from "./ui/input";

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
                if (res.message) {
                    alert("Failed to send upgrade command");
                } else {
                    setOpen(false);
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
                        This action will send an upgrade command to the agent for this deployment. Enter the new tag for this Docker deployment.
                    </DialogDescription>
                </DialogHeader>
                <Input value={selectedVersion} onChange={(e) => setSelectedVersion(e.target.value)} placeholder="latest" />
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