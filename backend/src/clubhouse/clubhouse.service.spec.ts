import { Test, TestingModule } from '@nestjs/testing';
import { ClubhouseService } from './clubhouse.service';

describe('ClubhouseService', () => {
  let service: ClubhouseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClubhouseService],
    }).compile();

    service = module.get<ClubhouseService>(ClubhouseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
