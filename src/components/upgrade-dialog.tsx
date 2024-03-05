import { Button } from "./ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const UpgradeDialog = ({ open, setOpen }: { open: boolean, setOpen: (open: boolean) => void }) => {
    return (
        <Dialog open={open} onOpenChange={(o) => setOpen(o)}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Send Upgrade Command</DialogTitle>
                    <DialogDescription>
                        This action will send an upgrade command to the agent for this deployment.
                    </DialogDescription>
                </DialogHeader>
                <div>
                    <Select>
                        <SelectTrigger className="">
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
                    <Button className="w-full">Send Upgrade</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default UpgradeDialog;