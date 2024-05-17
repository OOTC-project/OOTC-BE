import { Module } from '@nestjs/common';
import { CategoryController } from './controller/category.controller';
import { CategoryService } from './service/category.service';
import { CATEGORY_INBOUND_PORT } from './inbound-port/category.inbound-port';
import { CATEGORY_OUTBOUND_PORT } from './outbound-port/category.outbound-port';
import { CategoryRepository } from './outbound-adapter/category.repository';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [CategoryController],
    providers: [
        {
            provide: CATEGORY_INBOUND_PORT,
            useClass: CategoryService,
        },
        {
            provide: CATEGORY_OUTBOUND_PORT,
            useClass: CategoryRepository,
        },
    ],
    exports: [CATEGORY_OUTBOUND_PORT],
})
export class CategoryModule {}
