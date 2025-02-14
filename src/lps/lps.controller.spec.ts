import { Test, TestingModule } from '@nestjs/testing';
import { LpsController } from './lps.controller';

describe('LpsController', () => {
  let controller: LpsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LpsController],
    }).compile();

    controller = module.get<LpsController>(LpsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
