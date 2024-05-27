import { Module } from '@nestjs/common';
import { CodyController } from './cody.controller';
import { CodyService } from './cody.service';

@Module({
  controllers: [CodyController],
  providers: [CodyService]
})
export class CodyModule {}
