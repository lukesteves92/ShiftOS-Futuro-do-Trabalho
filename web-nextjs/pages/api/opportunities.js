import prisma from '@/lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const ops = await prisma.opportunity.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return res.status(200).json(ops);
  }

  if (req.method === 'POST') {
    const { title, description, pay, image } = req.body || {};
    if (!title) return res.status(400).json({ error: 'title required' });
    const op = await prisma.opportunity.create({
      data: { title, description, pay, image },
    });
    return res.status(201).json(op);
  }

  return res.status(405).end();
}
