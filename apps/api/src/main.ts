import { NestFactory } from '@nestjs/core';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Defines the global prefix
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1', // Defines v1 as default for all endpoints
  });

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Enterprise Dashboard API')
    .setDescription('Fullstack Monorepo Showcase - UK Market Standards')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // Define a rota da documentação
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT ?? 3001);

  const url = await app.getUrl();

  console.log(`
  🚀 Application is running on: ${url}/${globalPrefix}/v1
  📖 Documentation available at: ${url}/docs
  `);
}
bootstrap();
