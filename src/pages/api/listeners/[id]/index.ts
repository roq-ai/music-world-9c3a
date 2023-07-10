import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { listenerValidationSchema } from 'validationSchema/listeners';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.listener
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getListenerById();
    case 'PUT':
      return updateListenerById();
    case 'DELETE':
      return deleteListenerById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getListenerById() {
    const data = await prisma.listener.findFirst(convertQueryToPrismaUtil(req.query, 'listener'));
    return res.status(200).json(data);
  }

  async function updateListenerById() {
    await listenerValidationSchema.validate(req.body);
    const data = await prisma.listener.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteListenerById() {
    const data = await prisma.listener.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
