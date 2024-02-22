// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/db"
import { v4 } from "uuid"
import { Vendor } from "@prisma/client";
import { getAuth } from "@clerk/nextjs/server";

type Data = {
  vendor?: Vendor;
  message?: string;
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

  const { name, description, imageUrl } = req.body;

  // check that none of these fields are empty
  if (!name) {
    res.status(400).json({ vendor: undefined, message: "Organization name is a required field" });
    return;
  }

  // convert name into slug
  const slug = name.toLowerCase().replace(/ /g, "-");

  // check if slug is taken
  const existingVendor = await prisma.vendor.findFirst({
    where: {
      slug,
    }
  });
  if (existingVendor) {
    res.status(400).json({ vendor: undefined, message: "This organization name is already taken, please try another name or reach out to ali@stitch.tech" });
    return;
  }

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
    res.status(400).json({ vendor: undefined, message: "Failed to create vendor" });
    return;
  }

  res.status(200).json({ vendor: newVentor });
}
