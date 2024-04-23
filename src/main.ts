import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';
import { HttpExceptionFilter } from './common/exception/exception.filter';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalFilters(new HttpExceptionFilter());
    const prismaService = app.get(PrismaService);
    await prismaService.enableShutdownHooks(app);
    await app.listen(3000, '0.0.0.0');
}
bootstrap();
