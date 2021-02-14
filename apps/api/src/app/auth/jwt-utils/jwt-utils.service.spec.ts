import { Test, TestingModule } from '@nestjs/testing';
import { JwtUtilsService } from './jwt-utils.service';

describe('JwtUtilsService', () => {
  let service: JwtUtilsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JwtUtilsService],
    }).compile();

    service = module.get<JwtUtilsService>(JwtUtilsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
