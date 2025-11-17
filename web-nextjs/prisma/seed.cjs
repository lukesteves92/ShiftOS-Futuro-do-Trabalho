const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  // limpa oportunidades (e candidaturas ligadas, se estiverem com `onDelete: Cascade`)
  await prisma.application?.deleteMany().catch(() => {});
  await prisma.opportunity.deleteMany();

  // cria oportunidades base
  await prisma.opportunity.createMany({
    data: [
      {
        title: 'Suporte Noturno via Chat',
        description: 'Responda dúvidas rápidas de clientes usando base de conhecimento.',
        pay: 'R$ 120/noite',
        image: '/company/acme.svg',
      },
      {
        title: 'Curadoria de Conteúdo com IA',
        description: 'Revise conteúdos sugeridos por IA para um portal de educação.',
        pay: 'R$ 90/tarefa',
        image: '/company/neo.svg',
      },
      {
        title: 'Organização de Planilhas Financeiras',
        description: 'Limpeza e categorização de dados em planilhas.',
        pay: 'R$ 160/projeto',
        image: '/company/aurora.svg',
      },
    ],
  });

  console.log('✅ Seed concluído com sucesso.');
}

main()
  .catch((e) => {
    console.error('Erro no seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
