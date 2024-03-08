import { Button } from "./ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { useCallback, useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileStack, History, PackagePlus, PowerCircle, RotateCw, StopCircle } from "lucide-react";
import { Command } from "@prisma/client";
import { cn } from "@/lib/utils";

const CommandHistory = ({ commands, updateCommands }: { commands: Command[], updateCommands: () => void }) => {
    return (
        <div className="flex flex-col gap-2">
            <p className="text-sm text-slate-400">This is a list of all commands issued for this deployment.</p>
            <Button onClick={updateCommands} className="flex gap-2" variant={"ghost"}>
                <RotateCw className="h-4 w-4" />
                Refresh
            </Button>
            <table className="w-full">
                <thead className="text-left">
                    <tr>
                        <th>Created at</th>
                        <th>Status</th>
                        <th>Type</th>
                        <th>Data</th>
                        {/* <th>Triggered by</th> */}
                    </tr>
                </thead>
                <tbody>
                    {commands.map((command) => {
                        return (
                            <tr key={command.id} className={cn("rounded-md bg-slate-50 hover:opacity-70 cursor-pointer", {
                                "bg-green-100": command.status === "COMPLETED",
                                "bg-red-100": command.status === "FAILED"
                            })}>
                                <td>{new Date(command.createdAt).toUTCString()}</td>
                                <td>{command.status}</td>
                                <td>{command.type}</td>
                                <td><pre>{JSON.stringify(command.data)}</pre></td>
                                {/* <td>{command.triggeredBy}</td> */}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

const Upgrade = ({ commandData, setCommandData }: { commandData: { [key: string]: any }, setCommandData: (data: { version: string }) => void }) => {
    const [selectedVersion, setSelectedVersion] = useState<string>("");

    useEffect(() => {
        setCommandData({ version: selectedVersion })
    }, [selectedVersion, setCommandData])

    return (
        <div className="flex flex-col gap-2">
            <p className="text-sm text-slate-400">This action will send a command to the agent for this deployment. Enter the new tag for this Docker deployment.</p>
            <Input value={selectedVersion} onChange={(e) => setSelectedVersion(e.target.value)} placeholder="latest" />
        </div>
    )
}

type Tab = "history" | "upgrade" | "rollback" | "start" | "stop" | "restart";

const CommandDialog = ({ open, setOpen, deploymentId }: { open: boolean, setOpen: (open: boolean) => void, deploymentId: string }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [commandType, setCommandType] = useState<"UPGRADE" | "ROLLBACK" | "DESTROY" | "RESTART" | "STOP" | "START">("UPGRADE");
    const [commandData, setCommandData] = useState<{ [key: string]: any }>({});
    const [commands, setCommands] = useState<Command[]>([]);
    const [tab, setTab] = useState<Tab>("history");

    const updateCommands = useCallback(() => {
        // get all commands for this deployment
        fetch(`/api/get-commands?deploymentId=${deploymentId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setCommands(data.commands);
            })
            .catch((error) => {
                console.error(error)
                window.alert("There was an error checking if you already have a vendor account. Please try again.")
                return;
            })
    }, [deploymentId])

    useEffect(() => {
        updateCommands()
        const interval = setInterval(updateCommands, 15000);
        return () => clearInterval(interval);
    }, [updateCommands])

    const handleIssueCommandClick = () => {
        setLoading(true);
        fetch("/api/issue-command", {
            method: "POST",
            body: JSON.stringify({
                commandType: commandType,
                data: commandData,
                deploymentId,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.message) {
                    alert("Failed to issue command");
                } else {
                    updateCommands();
                    setTab("history");
                }
                setLoading(false);
            }).catch((error) => {
                console.error(error)
                setLoading(false);
                window.alert("There was an error issuing the command. Please try again.")
                return;
            })
    }

    return (
        <Dialog open={open} onOpenChange={(o) => setOpen(o)}>
            <DialogContent className="min-w-[700px]">
                <DialogHeader>
                    <DialogTitle>Send Command to this deployment</DialogTitle>
                    <DialogDescription>
                        <p>ID: {deploymentId}</p>
                    </DialogDescription>
                </DialogHeader>
                <Tabs value={tab} onValueChange={(t) => setTab(t as Tab)}>
                    <TabsList>
                        <TabsTrigger value="history" className="flex gap-2">
                            <FileStack className="h-4 w-4" />
                            History
                        </TabsTrigger>
                        <TabsTrigger value="upgrade" className="flex gap-2" onClick={() => setCommandType("UPGRADE")}>
                            <PackagePlus className="h-4 w-4" />
                            Upgrade
                        </TabsTrigger>
                        <TabsTrigger value="rollback" className="flex gap-2" disabled>
                            <History className="h-4 w-4" />
                            Rollback
                        </TabsTrigger>
                        <TabsTrigger value="start" className="flex gap-2" disabled>
                            <PowerCircle className="h-4 w-4" />
                            Start
                        </TabsTrigger>
                        <TabsTrigger value="stop" className="flex gap-2" disabled>
                            <StopCircle className="h-4 w-4" />
                            Stop
                        </TabsTrigger>
                        <TabsTrigger value="restart" className="flex gap-2" disabled>
                            <RotateCw className="h-4 w-4" />
                            Restart
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="history">
                        <CommandHistory commands={commands} updateCommands={updateCommands} />
                    </TabsContent>
                    <TabsContent value="upgrade">
                        <Upgrade commandData={commandData} setCommandData={setCommandData} />
                    </TabsContent>
                </Tabs>
                <DialogFooter>
                    {
                        tab !== "history" && (
                            <Button className="w-full" disabled={loading} onClick={handleIssueCommandClick}>
                                Issue command
                            </Button>
                        )
                    }
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default CommandDialog;