import { Test, TestingModule } from '@nestjs/testing';
import { CodyController } from './cody.controller';

describe('CodyController', () => {
  let controller: CodyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CodyController],
    }).compile();

    controller = module.get<CodyController>(CodyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
