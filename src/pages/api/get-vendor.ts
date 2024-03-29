// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/db"
import { Vendor } from "@prisma/client";
import { getAuth } from "@clerk/nextjs/server";

type Data = {
  vendor?: Vendor;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const { userId } = getAuth(req);

  if (!userId) {
    res.status(401).json({ vendor: undefined });
    return;
  }

  const vendor = await prisma.vendor.findFirst({
    where: {
      userId,
    },
    include: {
      Service: true
    }
  })

  if (!vendor) {
    res.status(404).json({ vendor: undefined });
    return;
  }

  res.status(200).json({ vendor });
}
