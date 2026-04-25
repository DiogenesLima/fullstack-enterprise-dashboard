import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            findAll: vi.fn(),
            findById: vi.fn(),
            create: vi.fn(),
            remove: vi.fn(),
          },
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return paginated users from service', async () => {
    const mockResult = {
      items: [{ id: '1', email: 'test@enterprise.uk', role: 'admin' }],
      total: 1,
      pages: 1,
      currentPage: 1,
    };

    vi.spyOn(service, 'findAll').mockResolvedValue(mockResult as any);

    const result = await controller.findAll('test', 1, 10);

    expect(result).toEqual(mockResult);
    expect(service.findAll).toHaveBeenCalledWith('test', 1, 10);
  });

  describe('create', () => {
    it('should call service.create and return the new user', async () => {
      const dto = { email: 'new@test.com', password: 'password123' };
      const expectedResult = { success: true, message: 'User created', id: 1 };
      
      vi.spyOn(service, 'create').mockResolvedValue(expectedResult as any);

      const result = await controller.create(dto);

      expect(result).toEqual(expectedResult);
      expect(service.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('getMe', () => {
    it('should return the profile of the authenticated user', async () => {
      const req = { user: { userId: 'user-123' } };
      const expectedUser = { id: 'user-123', email: 'me@test.com', role: 'admin' };
      
      vi.spyOn(service, 'findById').mockResolvedValue(expectedUser as any);

      const result = await controller.getMe(req);

      expect(result).toEqual(expectedUser);
      expect(service.findById).toHaveBeenCalledWith('user-123');
    });
  });

  describe('remove', () => {
    it('should call service.remove and return success message', async () => {
      const userId = '1';
      vi.spyOn(service, 'remove').mockResolvedValue({ id: userId } as any);

      const result = await controller.remove(userId);

      expect(result).toEqual({ success: true, message: 'User deleted' });
      expect(service.remove).toHaveBeenCalledWith(userId);
    });
  });

});
