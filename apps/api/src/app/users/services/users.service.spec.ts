import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Observable, of } from 'rxjs';
import { Repository } from 'typeorm';
import { JwtUtilsService } from '../../auth/jwt-utils/jwt-utils.service';
import { User } from '../models/user.entity';
import { UsersService } from './users.service';
import DoneCallback = jest.DoneCallback;

describe('UsersService', () => {
  let service: UsersService;
  let repo: Repository<User>;
  const mockUser = new User();
  mockUser.id = 1234;
  mockUser.email = 'mock@mail.com';
  mockUser.password = 'password1234';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
        {
          provide: JwtUtilsService,
          useFactory: jest.fn(),
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repo = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should findAll return all data', (done: DoneCallback) => {
    const mockData = of([{ username: 'user123' }, { username: 'user545' }, { username: 'user867' }]) as Observable<Array<User>>;
    jest.spyOn(repo, 'find').mockResolvedValueOnce(mockData.toPromise());

    service.findAll().subscribe((allUsers) => {
      expect(allUsers).toHaveLength(3);
      done();
    });
  });

  it('should findOne call repository findOne method', (done: DoneCallback) => {
    jest.spyOn(repo, 'findOne').mockResolvedValueOnce(null);

    service.findOne(null).subscribe(() => {
      expect(repo.findOne).toBeCalledTimes(1);
      done();
    });
  });

  it('should findOneByUsername call repository findOneOrFail method', (done: DoneCallback) => {
    jest.spyOn(repo, 'findOneOrFail').mockResolvedValueOnce(null);

    service.findOneByUsername(null).subscribe(() => {
      expect(repo.findOneOrFail).toBeCalledTimes(1);
      done();
    });
  });

  it('should findOneByEmail call repository findOneOrFail method', (done: DoneCallback) => {
    jest.spyOn(repo, 'findOneOrFail').mockResolvedValueOnce(null);

    service.findOneByEmail('mock@mail.com').subscribe(() => {
      expect(repo.findOneOrFail).toBeCalledTimes(1);
      done();
    });
  });

  it('should delete call repository delete method', (done: DoneCallback) => {
    jest.spyOn(repo, 'delete').mockResolvedValueOnce(null);

    service.delete(1234).subscribe(() => {
      expect(repo.delete).toBeCalledTimes(1);
      done();
    });
  });

  it('should updateOne call repository update method', (done: DoneCallback) => {
    jest.spyOn(repo, 'update').mockResolvedValueOnce(null);

    service.updateOne(mockUser.id, mockUser).subscribe(() => {
      expect(repo.update).toBeCalledTimes(1);
      done();
    });
  });

  it('should updateOne method remove password property', (done: DoneCallback) => {
    jest.spyOn(repo, 'update').mockResolvedValueOnce(null);

    service.updateOne(mockUser.id, mockUser).subscribe(() => {
      const noSensitiveValueMockUser = { ...mockUser };
      delete noSensitiveValueMockUser.password;
      expect(repo.update).toHaveBeenCalledWith(mockUser.id, noSensitiveValueMockUser);
      done();
    });
  });
});
