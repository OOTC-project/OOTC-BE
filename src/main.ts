import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';
import { HttpExceptionFilter } from './common/exception/exception.filter';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { ConfigAdapter } from './config/outbound-adapter/config.adapter';
import { CONFIG_OUTBOUND_PORT } from './config/outbound-port/config.outbound-port';
import { config } from 'aws-sdk';
import { ValidationPipe } from '@nestjs/common';
import { TrimPipe } from './common/pipe/trim.pipe';
import { PrismaClientExceptionFilter } from './common/exception/prisma_client_exception.filter';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const configAdapter = app.get<ConfigAdapter>(CONFIG_OUTBOUND_PORT);

    config.update({
        accessKeyId: configAdapter.getConfigByKey('AWS_ACCESS_KEY'),
        secretAccessKey: configAdapter.getConfigByKey('AWS_SECRET_ACCESS_KEY'),
        region: configAdapter.getConfigByKey('AWS_REGION'),
        logger: console,
    });

    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
        }),
        new TrimPipe(),
    );

    app.enableCors({
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        origin: true,
        credentials: true,
        exposedHeaders: 'Authorization',
    });

    app.useGlobalFilters(new HttpExceptionFilter(), new PrismaClientExceptionFilter());
    const prismaService = app.get(PrismaService);
    await prismaService.enableShutdownHooks(app);

    const configBuilder = new DocumentBuilder().setTitle('OOTC').setDescription('description').setVersion('1.0').build();

    const document: OpenAPIObject = SwaggerModule.createDocument(app, configBuilder);
    SwaggerModule.setup('docs', app, document);
    await app.listen(3000, '0.0.0.0');
}

bootstrap();
