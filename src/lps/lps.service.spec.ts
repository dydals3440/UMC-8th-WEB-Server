import { Test, TestingModule } from '@nestjs/testing';
import { LpsService } from './lps.service';

describe('LpsService', () => {
  let service: LpsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LpsService],
    }).compile();

    service = module.get<LpsService>(LpsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
