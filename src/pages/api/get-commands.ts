// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Command } from "@prisma/client";
import prisma from "@/lib/db"
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  commands: Command[];
}

export default async function GET(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {

  const deploymentId = req.query.deploymentId as string;

  const commands = await prisma.command.findMany({
    where: {
      deploymentId,
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  res.status(200).json({ commands });
}