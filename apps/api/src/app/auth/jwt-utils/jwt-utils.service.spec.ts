import { JwtModule, JwtService } from '@nestjs/jwt';
import { JWT_MODULE_OPTIONS } from '@nestjs/jwt/dist/jwt.constants';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../../users/models/user.entity';
import { JwtUtilsService } from './jwt-utils.service';

describe('JwtUtilsService', () => {
  let jwtUtilsService: JwtUtilsService;
  let jwtService: JwtService;

  const mockSecret = 'immino-secret';
  const mockUser = new User();
  mockUser.username = 'mockUser1234';
  mockUser.password = 'mockUserPassword';
  mockUser.email = 'mock@mail.com';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PassportModule, JwtModule.register({ secret: mockSecret })],
      providers: [
        { provide: JWT_MODULE_OPTIONS, useValue: { secret: mockSecret } }, // ALLAH BUNUN BELASINI VERSIN 1 SAAT ARADIM BUNU
        JwtService,
        JwtUtilsService,
      ],
    }).compile();

    jwtUtilsService = module.get<JwtUtilsService>(JwtUtilsService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(jwtUtilsService).toBeDefined();
  });

  it('should generate JWT token', (done) => {
    jwtUtilsService.generateJWT(mockUser).subscribe((jwtToken) => {
      expect(jwtToken).toBeDefined();
      done();
    });
  });

  it('should generate JWT token with valid payload', (done) => {
    jwtUtilsService.generateJWT(mockUser).subscribe((jwtToken: string) => {
      const decodedToken = jwtService.decode(jwtToken, { json: true }) as { user: User };
      expect(decodedToken.user).toBeDefined();
      expect(decodedToken.user.username).toBe(mockUser.username);
      expect(decodedToken.user.password).toBe(mockUser.password);
      expect(decodedToken.user.email).toBe(mockUser.email);
      done();
    });
  });

  it('should hash password works correctly', (done) => {
    jwtUtilsService.hashPassword(mockUser.password).subscribe((hashedPassword: string) => {
      expect(hashedPassword).toBeDefined();
      jwtUtilsService.comparePasswords(mockUser.password, hashedPassword).subscribe((isPasswordsEqual) => {
        expect(isPasswordsEqual).toBeTruthy();
        done();
      });
    });
  });

  it('should hash password sync works correctly', (done) => {
    const hashedPassword = jwtUtilsService.hashPasswordSync(mockUser.password);
    expect(hashedPassword).toBeDefined();

    jwtUtilsService.comparePasswords(mockUser.password, hashedPassword).subscribe((isPasswordsEqual) => {
      expect(isPasswordsEqual).toBeTruthy();
      done();
    });
  });
});
