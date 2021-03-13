import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import { LoginDto } from '../models/login.dto';
import { AuthService } from '../services/auth.service';
import { AuthController } from './auth.controller';
import DoneCallback = jest.DoneCallback;

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useFactory: jest.fn(() => ({login: () => of(null)})),
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  xit('should login method validate loginDto correctly', async (done: DoneCallback) => {
    const invalidLoginDto: LoginDto = {username: null, password: null, email: 'invalid-email'};
    // TODO: jest ile bir observable'dan throw edilen hata nasil yakalanir???
    controller.login(invalidLoginDto).subscribe(loginResource => {
      expect(loginResource).not.toBeDefined();
      done();
    });
  });
});
