import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { PrismaService } from 'src/prisma/prisma.service';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  const categories = [
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

    await prisma.category.createMany({
      data: [...categories],
    });
  });

  //#region Categories testing
  describe('GET /categories', () => {
    it('returns a list of all categories', async () => {
      const response = await request(app.getHttpServer()).get('/categories');

      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(6);
    });
  });

  describe('GET /categories/3', () => {
    it('returns category at id 3', async () => {
      const response = await request(app.getHttpServer()).get('/categories/3');

      expect(response.status).toBe(200);
      expect(typeof response.body == 'object').toBe(true);
      expect(response.body.id).toEqual(3);
      expect(response.body.name).toEqual('Loisir');
    });
  });

  describe('POST /categories', () => {
    it('creates a category', async () => {
      const response = await request(app.getHttpServer())
        .post('/categories')
        .set('Content-Type', 'application/json')
        .send({ name: 'Business' });

      expect(response.status).toBe(201);
      expect(typeof response.body == 'object').toBe(true);
      expect(response.body.name).toEqual('Business');
    });

    it('returns a list of all categories after creating a category', async () => {
      const response = await request(app.getHttpServer()).get('/categories');

      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(7);
    });
  });

  describe('PUT /categories/7', () => {
    it('updates the category at id 7', async () => {
      const response = await request(app.getHttpServer())
        .put('/categories/7')
        .set('Content-Type', 'application/json')
        .send({ name: 'Investissement' });

      expect(response.status).toBe(200);
      expect(response.body.name).not.toEqual('Business');
      expect(response.body.name).toEqual('Investissement');
      expect(response.body.id).toEqual(7);
    });

    it('returns a list of all categories after updating a category', async () => {
      const response = await request(app.getHttpServer()).get('/categories');

      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(7);
    });
  });

  describe('DELETE /categories/7', () => {
    it('deletes the category at id 7', async () => {
      const response = await request(app.getHttpServer()).delete(
        '/categories/7',
      );

      expect(response.status).toBe(200);
      expect(response.body.name).toEqual('Investissement');
      expect(response.body.id).toEqual(7);
    });

    it('returns a list of all categories after deleting a category', async () => {
      const response = await request(app.getHttpServer()).get('/categories');

      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(6);
    });
  });
  //#endregion

  describe('Links CRUD', () => {
    it('returns all links (no links already created)', async () => {
      const response = await request(app.getHttpServer()).get('/links');

      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(0);
    });

    it('creates a link associated with category 1', async () => {
      const response = await request(app.getHttpServer())
        .post('/links')
        .set('Content-Type', 'application/json')
        .send({
          name: 'Documentation NestJS',
          url: 'https://docs.nestjs.com/',
          categoryId: 1,
        });

      expect(response.status).toBe(201);
      expect(typeof response.body == 'object').toBe(true);
      expect(response.body.id).toEqual(1);
      expect(response.body.name).toEqual('Documentation NestJS');
      expect(response.body.url).toEqual('https://docs.nestjs.com/');
      expect(response.body.categoryId).toEqual(1);
      expect(response.body.category.name).toEqual('Tech');
    });

    it('updates the links previously created', async () => {
      const response = await request(app.getHttpServer())
        .put('/links/1')
        .set('Content-Type', 'application/json')
        .send({
          name: 'Documentation NestJs',
          categoryId: 2,
        });

      expect(response.status).toBe(200);
      expect(typeof response.body == 'object').toBe(true);
      expect(response.body.id).toEqual(1);
      expect(response.body.name).not.toEqual('Documentation NestJS');
      expect(response.body.name).toEqual('Documentation NestJs');
      expect(response.body.url).toEqual('https://docs.nestjs.com/');
      expect(response.body.categoryId).not.toEqual(1);
      expect(response.body.category.name).not.toEqual('Tech');
      expect(response.body.categoryId).toEqual(2);
      expect(response.body.category.name).toEqual('Sport');
    });

    it('returns the link previously updated', async () => {
      const response = await request(app.getHttpServer()).get('/links/1');

      expect(response.status).toBe(200);
      expect(typeof response.body == 'object').toBe(true);
      expect(response.body.id).toEqual(1);
      expect(response.body.name).toEqual('Documentation NestJs');
      expect(response.body.url).toEqual('https://docs.nestjs.com/');
      expect(response.body.categoryId).toEqual(2);
      expect(response.body.category.name).toEqual('Sport');
    });

    it('deletes the links previously created', async () => {
      const response = await request(app.getHttpServer()).delete('/links/1');

      expect(response.status).toBe(200);
      expect(typeof response.body == 'object').toBe(true);
      expect(response.body.id).toEqual(1);
      expect(response.body.name).toEqual('Documentation NestJs');
      expect(response.body.url).toEqual('https://docs.nestjs.com/');
      expect(response.body.categoryId).toEqual(2);
      expect(response.body.category.name).toEqual('Sport');
    });

    it('returns all links (all links deleted)', async () => {
      const response = await request(app.getHttpServer()).get('/links');

      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(0);
    });
  });
});
