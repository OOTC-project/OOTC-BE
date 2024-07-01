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
            transform: true, // 요청 객체를 DTO 클래스 인스턴스로 자동 변환합니다. 이를 통해 컨트롤러에서 타입 검사를 할 수 있게 됩니다.
            forbidNonWhitelisted: true, // 요청 객체에 DTO에 정의되지 않은 속성이 포함된 경우 예외를 발생시킵니다. 이는 잘못된 속성이나 허용되지 않은 데이터를 포함한 요청을 차단하는 데 유용합니다.
            whitelist: true, // DTO에 정의된 속성만 요청 객체에 남기고 나머지는 제거합니다. 즉, DTO에 명시되지 않은 속성이 요청에 포함되어 있다면 이를 자동으로 제거합니다.
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

    const configBuilder = new DocumentBuilder()
        .setTitle('OOTC')
        .setDescription('description')
        .setVersion('1.0')
        .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'access-token')
        .build();

    const document: OpenAPIObject = SwaggerModule.createDocument(app, configBuilder);
    SwaggerModule.setup('docs', app, document);
    await app.listen(configAdapter.getConfigByKey('PORT'), '0.0.0.0');
    console.log(`ENV :::: ${configAdapter.getConfigByKey('PORT')}`);
}

bootstrap();
