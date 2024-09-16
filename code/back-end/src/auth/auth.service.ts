import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs'

@Injectable()
export class AuthService {

  constructor (
    private usersService : UsersService,
    private jwtService: JwtService
  ){}

  async login(user: any) {
    const payload = {username: user.username, sub: user.id};
    return {
      token: this.jwtService.sign(payload)
    }
  }

  async validateUser({username, password}: LoginDto) {
    const user = await this.usersService.findOne(username);

    if(!user){
      return null;
    }

    try {
      const isMatch = await bcrypt.compare(password, user.password)
      if(!isMatch){
        return null;
      }
    }catch (e) {
      return null;
    }

    return user;
  }
}
