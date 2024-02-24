// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/db"
import { Service } from "@prisma/client";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

type Data = {
  service?: Service;
};

export default async function GET(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const serviceId = req.query.serviceId;

  const { userId } = getAuth(req);

  if (!userId) {
    res.status(401).json({ service: undefined });
    return;
  }

  const service = await prisma.service.findFirst({
    where: {
      slug: serviceId as string,
      Vendor: {
        userId,
      }
    },
    include: {
      EnvironmentVariable: true,
    }
  })

  if (!service) {
    res.status(404).json({ service: undefined });
    return;
  }

  res.status(200).json({ service });
}
