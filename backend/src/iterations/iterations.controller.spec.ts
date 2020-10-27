import { Test, TestingModule } from '@nestjs/testing';
import { IterationsController } from './iterations.controller';

describe('Iterations Controller', () => {
  let controller: IterationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IterationsController],
    }).compile();

    controller = module.get<IterationsController>(IterationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
