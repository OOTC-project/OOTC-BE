import { Test, TestingModule } from '@nestjs/testing';
import { CodyService } from './cody.service';

describe('CodyService', () => {
    let service: CodyService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [CodyService],
        }).compile();

        service = module.get<CodyService>(CodyService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
