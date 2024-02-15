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

const CreatenewEnvironmentDialog = ({ organization }: { organization: Organization }) => {
    const [deploying, setDeploying] = useState(false);

    return (
        <Dialog>
            <DialogTrigger className="ml-auto">
                <Button>
                    Create new
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Enter credientials</DialogTitle>
                    <DialogDescription>
                        <form className="flex flex-col gap-4 mt-2" onSubmit={(e: any) => {
                            e.preventDefault()
                            console.log("Deploying", JSON.stringify({
                                accessKey: e.target["access-key"].value,
                                secret: e.target["secret"].value,
                            }))
                            setDeploying(true)
                            fetch("http://localhost:3001/", {
                                method: "POST",
                                headers: new Headers({
                                    "Content-Type": "application/json",
                                }),
                                body: JSON.stringify({
                                    accessKey: e.target["access-key"].value,
                                    secret: e.target["secret"].value,
                                }),
                            })
                                .then((res) => res.json())
                                .then((res) => {
                                    console.log(res)
                                    window.alert(res.url)
                                })
                                .then(() => setDeploying(false))
                                .catch((err) => {
                                    console.error(err)
                                    window.alert(err)
                                    setDeploying(false)
                                })
                        }}>
                            <Label htmlFor="access-key">Access key</Label>
                            <Input type="text" name="access-key" placeholder="AKIAIOSFODNN7EXAMPLE" />
                            <Label htmlFor="password">Secret</Label>
                            <Input type="password" name="secret" placeholder="wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY" />
                            <Button type={"submit"} disabled={deploying}>{deploying ? <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Deploying</> : "Deploy"}</Button>
                        </form>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default CreatenewEnvironmentDialog;