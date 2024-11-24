import { Body, Controller, Get, Param, Put, Query } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@ApiTags('Usuários')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profile')
  @ApiOperation({
    summary: 'Obter o perfil do usuário atual',
    description:
      'Este endpoint retorna as informações do usuário autenticado com base no token fornecido. Útil para exibir ou validar os dados do perfil.',
  })
  getProfile(@CurrentUser() user: User) {
    return user;
  }

  @Put('')
  @ApiOperation({
    summary: 'Atualizar dados do usuário',
    description:
      'Permite que um usuário atualize suas informações. É necessário enviar os dados no formato especificado no corpo da requisição.',
  })
  update(@Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(updateUserDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Obter todos os usuários',
    description:
      'Este endpoint retorna todos os usuários cadastrados no sistema. Útil para fins administrativos.',
  })
  async getAll(): Promise<User[]> {
    return this.usersService.getAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obter usuário por ID',
    description:
      'Este endpoint retorna as informações de um usuário específico com base no ID fornecido.',
  })
  async getById(@Param('id') id: string): Promise<User> {
    return this.usersService.getById(id);
  }

  @Get('username/:username')
  @ApiOperation({
    summary: 'Obter usuário por nome de usuário (username)',
    description:
      'Este endpoint retorna as informações de um usuário específico com base no nome de usuário fornecido.',
  })
  async getByUsername(@Param('username') username: string): Promise<User> {
    return this.usersService.getByUsername(username);
  }

  @Get('email/:email')
  @ApiOperation({
    summary: 'Obter usuário por e-mail',
    description:
      'Este endpoint retorna as informações de um usuário específico com base no e-mail fornecido.',
  })
  async getByEmail(@Param('email') email: string): Promise<User> {
    return this.usersService.getByEmail(email);
  }

  @Get('filters')
  @ApiOperation({
    summary: 'Obter todos os usuários com filtros opcionais',
    description:
      'Permite filtrar usuários pelo username, email ou status ativo (0 para inativo, 1 para ativo). Se nenhum filtro for aplicado, retorna todos os usuários.',
  })
  @ApiQuery({
    name: 'username',
    required: false,
    description: 'Filtrar pelo username',
  })
  @ApiQuery({
    name: 'email',
    required: false,
    description: 'Filtrar pelo email',
  })
  @ApiQuery({
    name: 'isActive',
    required: false,
    description: 'Filtrar pelo status ativo (0 para inativo, 1 para ativo)',
  })
  async getAllWithFilters(
    @Query('username') username?: string,
    @Query('email') email?: string,
    @Query('isActive') isActive?: string,
  ): Promise<User[]> {
    const filters = {
      username,
      email,
      isActive: isActive !== undefined ? isActive === '1' : undefined,
    };

    return this.usersService.getAllWithFilters(filters);
  }
}
