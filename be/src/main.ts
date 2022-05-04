import { NestFactory } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle("Memories Api")
    .setDescription("The Memories API description")
    .setVersion("1.0")
    .addTag("memories")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("memories/docs", app, document);

  app.enableCors();

  await app.listen(3000);
}
bootstrap();
