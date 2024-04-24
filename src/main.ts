import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';
import { HttpExceptionFilter } from './common/exception/exception.filter';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { ConfigAdapter } from './config/outbound-adapter/config.adapter';
import { CONFIG_OUTBOUND_PORT } from './config/outbound-port/config.outbound-port';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const configAdapter = app.get<ConfigAdapter>(CONFIG_OUTBOUND_PORT);

    app.useGlobalFilters(new HttpExceptionFilter());
    const prismaService = app.get(PrismaService);
    await prismaService.enableShutdownHooks(app);

    const config = new DocumentBuilder().setTitle('OOTC').setDescription('description').setVersion('1.0').build();

    const document: OpenAPIObject = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);
    await app.listen(3000, '0.0.0.0');
}

bootstrap();
