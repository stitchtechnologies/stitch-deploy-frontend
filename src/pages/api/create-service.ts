// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/db"
import { v4 } from "uuid"
import { Service, Vendor } from "@prisma/client";
import { getAuth } from "@clerk/nextjs/server";

type Data = {
  vendor?: Vendor;
  service?: Service;
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

  const { name, description, slug, externalUrl, script, port, imageUrl, } = req.body;

  // find users vendor
  const vendor = await prisma.vendor.findFirst({
    where: {
      userId,
    },
  });

  if (!vendor) {
    res.status(400).json({ vendor: undefined });
    return;
  }

  // create service for this vendor
  const newService = await prisma.service.create({
    data: {
      id: v4(),
      vendorId: vendor.id,
      title: name,
      description,
      slug,
      externalUrl,
      script,
      port,
      readMe: "## Welcome to your new service",
      image: imageUrl,
    }
  })

  res.status(200).json({ vendor, service: newService });
}
