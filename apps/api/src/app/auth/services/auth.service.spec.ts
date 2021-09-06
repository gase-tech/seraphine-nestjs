import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import { UsersService } from '../../users/services/users.service';
import { JwtUtilsService } from '../jwt-utils/jwt-utils.service';
import { LoginDto } from '../models/login.dto';
import { AuthService } from './auth.service';
import DoneCallback = jest.DoneCallback;

function mockValidateUserWithValidResponse() {
  return jest.fn(() => of({}));
}

function mockValidateUserWithInvalidResponse() {
  return jest.fn(() => of(null));
}

function generateMockLoginDto(): LoginDto {
  const mockLoginDto = new LoginDto();
  mockLoginDto.username = 'mockUser';
  mockLoginDto.email = 'mock@mail.com';
  mockLoginDto.password = 'mockPassword';

  return mockLoginDto;
}

const mockJWTToken = 'imminoJWTToken';

describe('AuthService valid user tests', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: UsersService,
          useFactory: () => ({
            validateUser: mockValidateUserWithValidResponse(),
          }),
        },
        {
          provide: JwtUtilsService,
          useFactory: () => ({
            hashPassword: jest.fn(() => of({})),
            comparePasswords: jest.fn(() => of(true)),
            generateJWT: jest.fn(() => of(mockJWTToken)),
          }),
        },
        AuthService,
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be logged in successfully', (done: DoneCallback) => {
    const mockLoginDto = generateMockLoginDto();
    service.login(mockLoginDto).subscribe((loginResource) => {
      expect(loginResource).toBeDefined();
      expect(loginResource.access_token).toBe(mockJWTToken);
      done();
    });
  });
});

describe('AuthService invalid user tests', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: UsersService,
          useFactory: () => ({
            validateUser: mockValidateUserWithInvalidResponse(),
          }),
        },
        {
          provide: JwtUtilsService,
          useFactory: () => ({
            hashPassword: jest.fn(() => of({})),
            comparePasswords: jest.fn(() => of(true)),
            generateJWT: jest.fn(() => of(mockJWTToken)),
          }),
        },
        AuthService,
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should throw Error with correct message', () => {
    const mockLoginDto = generateMockLoginDto();
    expect(() => service.login(mockLoginDto).subscribe()).toThrow(new Error('User Validation Error'));
  });
});
