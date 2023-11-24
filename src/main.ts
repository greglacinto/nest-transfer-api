import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //add versioning setup
  app.enableVersioning({
    type: VersioningType.URI,
  });
  // bootstrapping swagger documentation
  const config = new DocumentBuilder()
  .setTitle('Transaction API')
  .setDescription('The Transaction API description')
  .setVersion('2.0')
  .build();
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document);
  // application port
  const port = process.env.PORT || 3000
  await app.listen(port, () => {console.log(`transfer-api up and running on port ${port}`)});
}
bootstrap();
