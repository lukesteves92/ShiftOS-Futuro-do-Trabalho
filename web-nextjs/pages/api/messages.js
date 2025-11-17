import prisma from '@/lib/prisma';

export default async function handler(req, res) {
  const { applicationId } = req.query;

  if (req.method === 'GET') {
    if (!applicationId) return res.status(400).json([]);
    const messages = await prisma.applicationMessage.findMany({
      where: { applicationId: Number(applicationId) },
      orderBy: { createdAt: 'asc' },
    });
    return res.status(200).json(messages);
  }

  if (req.method === 'POST') {
    const { applicationId: bodyId, text } = req.body || {};
    if (!bodyId || !text) return res.status(400).json({ error: 'missing fields' });
    const message = await prisma.applicationMessage.create({
      data: {
        applicationId: Number(bodyId),
        text,
      },
    });
    return res.status(201).json(message);
  }

  return res.status(405).end();
}
