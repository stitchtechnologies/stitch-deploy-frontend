// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/db"
import { v4 } from "uuid"
import { Service, Vendor } from "@prisma/client";
import { getAuth } from "@clerk/nextjs/server";
import { EnvironmentVariables } from "../service/create";

type Data = {
  vendor?: Vendor;
  service?: Service;
  message?: string;
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

  const { name, description, slug, externalUrl, scriptV2, port, validationUrl, imageUrl, environmentVariables } = req.body;

  // check that none of these fields are empty
  if (!name || !description || !slug || !externalUrl || !imageUrl) {
    res.status(400).json({ vendor: undefined, message: "Some required fields are missing" });
    return;
  }

  // check if slug is taken
  const existingService = await prisma.service.findFirst({
    where: {
      slug,
    }
  });
  if (existingService) {
    res.status(400).json({ vendor: undefined, message: "This service name is already taken, please try another name or reach out to ali@stitch.tech" });
    return;
  }

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

  // create environment variables
  const envVars = environmentVariables as EnvironmentVariables;
  const envVarsArray = Object.keys(envVars).map((key) => {
    return {
      id: v4(),
      key,
      value: envVars[key],
    };
  });
  const newEnvVars = await prisma.environmentVariable.createMany({
    data: envVarsArray,
  });

  // create service for this vendor
  const newService = await prisma.service.create({
    data: {
      id: v4(),
      vendorId: vendor.id,
      title: name,
      description,
      slug,
      externalUrl,
      scriptV2,
      script: "",
      validationUrl,
      port,
      readMe: "## Welcome to your new service",
      image: imageUrl,
      EnvironmentVariable: {
        connect: envVarsArray.map((envVar) => {
          return {
            id: envVar.id,
          };
        }),
      },
    }
  })

  res.status(200).json({ vendor, service: newService });
}
