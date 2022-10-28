import { PrismaClient } from '@prisma/client';
import { CreateCategoriesDto } from 'src/categories/dto';
import { CreateLinksDto } from 'src/links/dto';

const prisma = new PrismaClient();

async function main() {
  const categories: CreateCategoriesDto[] = [
    { name: 'Tech' },
    { name: 'Sport' },
    { name: 'Loisir' },
    { name: 'Voyage' },
    { name: 'Automobile' },
    { name: 'Crypto' },
  ];

  await prisma.category.createMany({
    data: [...categories],
  });

  const links: CreateLinksDto[] = [
    {
      name: 'Documentation NestJS',
      url: 'https://docs.nestjs.com/',
      categoryId: 1,
    },
    {
      name: 'Documentation Prisma',
      url: 'https://www.prisma.io/',
      categoryId: 1,
    },
    {
      name: 'Parlons Basket - Actus Basket',
      url: 'https://www.parlons-basket.com/',
      categoryId: 2,
    },
    {
      name: 'Leclerc Voyage',
      url: 'https://www.leclercvoyages.com/',
      categoryId: 4,
    },
    {
      name: 'GOVoyage',
      url: 'https://www.govoyages.com/',
      categoryId: 4,
    },
    {
      name: 'Journal Du Coin',
      url: 'https://journalducoin.com/',
      categoryId: 6,
    },
    {
      name: 'Cryptoast',
      url: 'https://cryptoast.fr/',
      categoryId: 6,
    },
    {
      name: "L'équipe",
      url: 'https://www.lequipe.fr/',
      categoryId: 2,
    },
    {
      name: "L'Automobile Magazine",
      url: 'https://www.automobile-magazine.fr/',
      categoryId: 5,
    },
  ];

  await prisma.link.createMany({
    data: [...links],
  });

  console.log({ categories, links });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
