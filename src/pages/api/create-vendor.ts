// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/db"
import { v4 } from "uuid"
import { Vendor } from "@prisma/client";

type Data = {
  vendor: Vendor;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const { userId, vendorTitle, vendorSlug, vendorImage } = req.body

  const newVentor = await prisma.vendor.create({
    data: {
      id: v4(),
      userId,
      title: vendorTitle,
      slug: vendorSlug,
      image: vendorImage,
    }
  })

  res.status(200).json({ vendor: newVentor });
}
