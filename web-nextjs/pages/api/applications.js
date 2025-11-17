import prisma from '@/lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const apps = await prisma.application.findMany({
      orderBy: { createdAt: 'desc' },
      include: { opportunity: true },
    });
    return res.status(200).json(apps);
  }

  if (req.method === 'POST') {
    const { opportunityId, name, email, phone, note } = req.body || {};
    if (!opportunityId || !name || !email || !phone) {
      return res.status(400).json({ error: 'missing fields' });
    }
    const app = await prisma.application.create({
      data: {
        opportunityId: Number(opportunityId),
        name,
        email,
        phone,
        note,
        status: 'PENDING',
      },
    });
    return res.status(201).json(app);
  }

  if (req.method === 'PATCH') {
    const { id, status } = req.body || {};
    if (!id || !status) return res.status(400).json({ error: 'missing fields' });
    const app = await prisma.application.update({
      where: { id: Number(id) },
      data: { status },
    });
    return res.status(200).json(app);
  }

  if (req.method === 'DELETE') {
    const { id } = req.body || {};
    if (!id) return res.status(400).json({ error: 'id required' });
    await prisma.applicationMessage.deleteMany({
      where: { applicationId: Number(id) },
    });
    await prisma.application.delete({ where: { id: Number(id) } });
    return res.status(204).end();
  }

  return res.status(405).end();
}
