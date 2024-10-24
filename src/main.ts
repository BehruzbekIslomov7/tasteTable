import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function start() {
  try {
    const PORT = process.env.PORT || 3030;
    console.log(PORT);

    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix("api")
    app.useGlobalPipes(new ValidationPipe())

    const config = new DocumentBuilder()
       .setTitle("Household service project")
       .setDescription("Household service project REST API")
       .setVersion("1.0")
       .addTag("NESTJS, validation, swagger, guard, sequelize, pg, mailer, bot, sms, cookie")
       .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("api/docs", app, document);
    await app.listen(PORT, () => {
      console.log(`Server started at: ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}
start();