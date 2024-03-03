'use-client'

import Layout from "@/components/layout";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";


export default function Install() {
    const [logs, setLogs] = useState([]);
    const router = useRouter()
    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const response = await fetch(`/api/get-logs?installId=prod1`);
                // const response = await fetch(`/api/get-logs?installId=${router.query.installId}`); 
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                const data = await response.json();
                setLogs(data.logs);
            } catch (error) {
                console.error('Failed to fetch logs:', error);
            }
        };

        fetchLogs();
    }, []);

    return (
        <Layout>
            <div className="flex flex-col gap-6 py-12 px-24 border-b-[rgba(0,0,0,0.10)] border-b border-solid">
                <div className="text-2xl">
                    Logs
                </div>
                <div>
                    <pre>
                        {logs}
                    </pre>
                </div>
            </div>
        </Layout>
    );
}