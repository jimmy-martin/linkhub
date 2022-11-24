import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUsersDto } from 'src/users/dto';
import { CreateCategoriesDto } from 'src/categories/dto';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  const users: CreateUsersDto[] = [
    {
      username: 'jimmy',
      password: 'test',
    },
    {
      username: 'oceane',
      password: 'test',
    },
    {
      username: 'lizea',
      password: 'test',
    },
  ];

  const categories: CreateCategoriesDto[] = [
    { name: 'Tech' },
    { name: 'Sport' },
    { name: 'Loisir' },
    { name: 'Voyage' },
    { name: 'Automobile' },
    { name: 'Crypto' },
  ];

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    prisma = app.get<PrismaService>(PrismaService);

    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

    await app.init();

    await prisma.user.createMany({
      data: [...users],
    });

    await prisma.category.createMany({
      data: [...categories],
    });
  });

  afterAll(async () => {
    // On rajoute ce code au cas où,
    // même si on a prévu le reset de la bdd lors dans la commande npm run test:e2e
    const deleteCategory = prisma.category.deleteMany();
    const deleteLink = prisma.link.deleteMany();

    await prisma.$transaction([deleteCategory, deleteLink]);

    await prisma.$disconnect();
  });

  //#region CATEGORIES CRUD
  describe('Categories CRUD', () => {
    it('returns a list of all categories', async () => {
      const response = await request(app.getHttpServer()).get('/categories');

      expect(response.status).toBe(HttpStatus.OK);
      expect(response.body).toHaveLength(6);
    });

    it('should returns an error trying to get a category with wrong parameter (string instead of int)', async () => {
      const response = await request(app.getHttpServer()).get(
        '/categories/error',
      );

      expect(response.status).not.toBe(HttpStatus.INTERNAL_SERVER_ERROR);
      expect(response.status).toBe(HttpStatus.BAD_REQUEST);
    });

    it('returns category at id 3', async () => {
      const response = await request(app.getHttpServer()).get('/categories/3');

      expect(response.status).toBe(HttpStatus.OK);
      expect(typeof response.body == 'object').toBe(true);
      expect(response.body.id).toEqual(3);
      expect(response.body.name).toEqual('Loisir');
    });

    it('creates a category', async () => {
      const response = await request(app.getHttpServer())
        .post('/categories')
        .set('Content-Type', 'application/json')
        .send({ name: 'Business' });

      expect(response.status).toBe(HttpStatus.CREATED);
      expect(typeof response.body == 'object').toBe(true);
      expect(response.body.name).toEqual('Business');
    });

    it('returns a list of all categories after creating a category', async () => {
      const response = await request(app.getHttpServer()).get('/categories');

      expect(response.status).toBe(HttpStatus.OK);
      expect(response.body).toHaveLength(7);
    });

    it('updates the category at id 7', async () => {
      const response = await request(app.getHttpServer())
        .put('/categories/7')
        .set('Content-Type', 'application/json')
        .send({ name: 'Investissement' });

      expect(response.status).toBe(HttpStatus.OK);
      expect(response.body.name).not.toEqual('Business');
      expect(response.body.name).toEqual('Investissement');
      expect(response.body.id).toEqual(7);
    });

    it('should return an error trying to get a category with wrong parameter (string instead of int)', async () => {
      const response = await request(app.getHttpServer())
        .put('/categories/error')
        .set('Content-Type', 'application/json')
        .send({ name: 'Investissement' });

      expect(response.status).toBe(HttpStatus.BAD_REQUEST);
      expect(response.status).not.toBe(HttpStatus.INTERNAL_SERVER_ERROR);
    });

    it('returns a list of all categories after updating a category', async () => {
      const response = await request(app.getHttpServer()).get('/categories');

      expect(response.status).toBe(HttpStatus.OK);
      expect(response.body).toHaveLength(7);
    });

    it('deletes the category at id 7', async () => {
      const response = await request(app.getHttpServer()).delete(
        '/categories/7',
      );

      expect(response.status).toBe(HttpStatus.OK);
      expect(response.body.name).toEqual('Investissement');
      expect(response.body.id).toEqual(7);
    });

    it('returns a list of all categories after deleting a category', async () => {
      const response = await request(app.getHttpServer()).get('/categories');

      expect(response.status).toBe(HttpStatus.OK);
      expect(response.body).toHaveLength(6);
    });
  });
  //#endregion

  //#region LINKS CRUD
  describe('Links CRUD', () => {
    it('returns all links (no links already created)', async () => {
      const response = await request(app.getHttpServer()).get('/links');

      expect(response.status).toBe(HttpStatus.OK);
      expect(response.body).toHaveLength(0);
    });

    it('should return an error trying to get a link with wrong parameter (string instead of int)', async () => {
      const response = await request(app.getHttpServer()).get('/links/error');

      expect(response.status).not.toBe(HttpStatus.INTERNAL_SERVER_ERROR);
      expect(response.status).toBe(HttpStatus.BAD_REQUEST);
    });

    it('creates a link with a category error', async () => {
      const response = await request(app.getHttpServer())
        .post('/links')
        .set('Content-Type', 'application/json')
        .send({
          name: 'Documentation NestJS',
          url: 'https://docs.nestjs.com/',
          categoryId: 'error',
          userId: 1,
        });

      expect(response.status).toBe(HttpStatus.BAD_REQUEST);
      expect(response.text).toContain('categoryId');
    });

    it('creates a link associated with category 1 and user 2', async () => {
      const response = await request(app.getHttpServer())
        .post('/links')
        .set('Content-Type', 'application/json')
        .send({
          name: 'Documentation NestJS',
          url: 'https://docs.nestjs.com/',
          categoryId: 1,
          userId: 2,
        });

      expect(response.status).toBe(HttpStatus.CREATED);
      expect(typeof response.body == 'object').toBe(true);
      expect(response.body.id).toEqual(1);
      expect(response.body.name).toEqual('Documentation NestJS');
      expect(response.body.url).toEqual('https://docs.nestjs.com/');
      expect(response.body.categoryId).toEqual(1);
      expect(response.body.category.name).toEqual('Tech');
      expect(response.body.userId).toEqual(2);
    });

    it('updates the links previously created', async () => {
      const response = await request(app.getHttpServer())
        .put('/links/1')
        .set('Content-Type', 'application/json')
        .send({
          name: 'Documentation NestJs',
          categoryId: 2,
        });

      expect(response.status).toBe(HttpStatus.OK);
      expect(typeof response.body == 'object').toBe(true);
      expect(response.body.id).toEqual(1);
      expect(response.body.name).not.toEqual('Documentation NestJS');
      expect(response.body.name).toEqual('Documentation NestJs');
      expect(response.body.url).toEqual('https://docs.nestjs.com/');
      expect(response.body.categoryId).not.toEqual(1);
      expect(response.body.category.name).not.toEqual('Tech');
      expect(response.body.categoryId).toEqual(2);
      expect(response.body.category.name).toEqual('Sport');
      expect(response.body.userId).toEqual(2);
    });

    it('should return an error trying to get a link with wrong parameter (string instead of int)', async () => {
      const response = await request(app.getHttpServer())
        .put('/links/error')
        .set('Content-Type', 'application/json')
        .send({
          name: 'Documentation NestJs',
          categoryId: 2,
        });

      expect(response.status).toBe(HttpStatus.BAD_REQUEST);
      expect(response.status).not.toBe(HttpStatus.INTERNAL_SERVER_ERROR);
    });

    it('returns the link previously updated', async () => {
      const response = await request(app.getHttpServer()).get('/links/1');

      expect(response.status).toBe(HttpStatus.OK);
      expect(typeof response.body == 'object').toBe(true);
      expect(response.body.id).toEqual(1);
      expect(response.body.name).toEqual('Documentation NestJs');
      expect(response.body.url).toEqual('https://docs.nestjs.com/');
      expect(response.body.categoryId).toEqual(2);
      expect(response.body.category.name).toEqual('Sport');
      expect(response.body.userId).toEqual(2);
    });

    it('deletes the links previously created', async () => {
      const response = await request(app.getHttpServer()).delete('/links/1');

      expect(response.status).toBe(HttpStatus.OK);
      expect(typeof response.body == 'object').toBe(true);
      expect(response.body.id).toEqual(1);
      expect(response.body.name).toEqual('Documentation NestJs');
      expect(response.body.url).toEqual('https://docs.nestjs.com/');
      expect(response.body.categoryId).toEqual(2);
      expect(response.body.category.name).toEqual('Sport');
      expect(response.body.userId).toEqual(2);
    });

    it('returns all links (all links deleted)', async () => {
      const response = await request(app.getHttpServer()).get('/links');

      expect(response.status).toBe(HttpStatus.OK);
      expect(response.body).toHaveLength(0);
    });
  });
  //#endregion
});
