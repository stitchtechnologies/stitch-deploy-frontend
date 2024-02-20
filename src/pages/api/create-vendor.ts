// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/db"
import { v4 } from "uuid"
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

  const { name, description, slug, imageUrl } = req.body;

  const newVentor = await prisma.vendor.create({
    data: {
      id: v4(),
      userId,
      title: name,
      description,
      slug,
      image: imageUrl,
    }
  })

  if (!newVentor) {
    res.status(400).json({ vendor: undefined });
    return;
  }

  res.status(200).json({ vendor: newVentor });
}
