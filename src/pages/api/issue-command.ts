// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/db"
import { v4 } from "uuid"
import { getAuth } from "@clerk/nextjs/server";
import { Command } from "@prisma/client";

type Data = {
    message?: string;
    command?: Command;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>,
) {
    const { userId } = getAuth(req);

    if (!userId) {
        res.status(401).json({});
        return;
    }

    const { commandType, data, deploymentId } = req.body;

    // Check that all existing commands for this deployment have status "COMPLETED" or "FAILED"
    const existingCommands = await prisma.command.findMany({
        where: {
            deploymentId,
            NOT: {
                OR: [{ status: "COMPLETED" }, { status: "FAILED" }]
            }
        }
    });

    if (existingCommands.length > 0) {
        res.status(400).json({ message: "There is already a command in progress for this deployment" });
        return;
    }

    const command = await prisma.command.create({
        data: {
            id: v4(),
            type: commandType,
            data,
            triggeredBy: userId,
            deploymentId,
            status: "NOT_ACKNOWLEGED",
        },
    });

    res.status(200).json({ command });
}
