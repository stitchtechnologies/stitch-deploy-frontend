// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/db"
import { Install, Service, Vendor } from "@prisma/client";
import { getAuth } from "@clerk/nextjs/server";

export type ServiceWithVendorAndInstalls = Service & {
  Vendor: Vendor;
  Installs: Install[];
}

type Data = {
  service?: ServiceWithVendorAndInstalls;
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
      },
    },
    include: {
      EnvironmentVariable: true,
      Vendor: true,
      Install: true,
    },
  })

  if (!service || !service.Vendor) {
    res.status(404).json({ service: undefined });
    return;
  }

  res.status(200).json({
    service: {
      ...service,
      Vendor: { ...service.Vendor },
      Installs: service.Install,
    }
  });
}
