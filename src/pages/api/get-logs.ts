// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import AWS from 'aws-sdk';


// Create an S3 instance
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION,
});

type Data = {
  logs: string | null;
};

const bucketName = 'd174712b-8f46-4a97-84c0-044a03f465e1-logs';

export default async function GET(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {

  const installId = req.query.installId as string;

  const params = {
    Bucket: bucketName,
    Key: installId,
  };

  try {
    const { Body } = await s3.getObject(params).promise();
    if (!Body) {
      res.status(404);
      return;
    }
    const fileContent = Body.toString('utf-8');

    res.status(200).json({
      logs: fileContent,
    });
  } catch (error) {
    console.error('S3 getObject error:', error);
    res.status(500).json({ logs: null });
  }
}