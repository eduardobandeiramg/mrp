import { UsersService } from '../users/users.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(() => {
    const mockAuthService = {}; // Mock vazio para AuthService
    const mockUsersService = {}; // Mock vazio para UsersService

    // Instancia o AuthController com os mocks necessários
    controller = new AuthController(
      mockAuthService as AuthService,
      mockUsersService as UsersService,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
