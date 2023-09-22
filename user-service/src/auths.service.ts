import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { SigninAuthDto } from './dto/auth-signin.dto';
import ShortUniqueId from 'short-unique-id';
import { SignupAuthDto } from './dto/auth-signup.dto';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcryptjs';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from 'src/interfaces';
import { JwtPayload } from 'src/interfaces/jwt-payload.interface';
import { UsersRepository } from './users/users.repository';
import { Response } from 'express';

@Injectable()
export class AuthsService {
  private readonly uid = new ShortUniqueId();
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService<EnvironmentVariables>,
    private readonly usersRepository: UsersRepository
  ) { }

  async signup(data: SignupAuthDto, res: Response) {
    try {
      const { email, password } = data
      const user = await this.usersRepository.findOne({ email })

      if (user) throw new HttpException('Email is already exist.', HttpStatus.BAD_REQUEST);

      const hash = await this.hashPassword(password)

      const newUser = await this.usersRepository.create({ ...data, user_id: `user_${this.uid.stamp(15)}`, password: hash })

      const accessToken = await this.signToken({ email: newUser.email, sub: newUser.user_id })

      res.cookie("token", accessToken, {
        httpOnly: false
      })
      return { accessToken }
    } catch (error) {
      console.log(error);
    }
  }

  async signin(data: SigninAuthDto, res: Response) {
    try {
      const { email, password } = data
      console.log(email, password);

      const user = await this.usersRepository.findOne({ email })

      console.log(user);


      if (!user) throw new HttpException('not find user.', HttpStatus.BAD_REQUEST);

      if (!await this.comparePassword(password, user.password))
        throw new HttpException('Password not match.', HttpStatus.BAD_REQUEST);

      const accessToken = await this.signToken({ email: user.email, sub: user.user_id })
      res.cookie("token", accessToken, {
        httpOnly: false
      })
      return { accessToken }
    } catch (error) {
      console.log(error);
    }
  }

  async signout(res: any) {
    res.clearCookie("token")
  }


  async signToken(jwtPayload: JwtPayload) {
    return this.jwtService.signAsync(jwtPayload, {
      secret: this.configService.get('JWT_SECRET', { infer: true }),
      expiresIn: '15h',
    })
  }

  // * function service
  async hashPassword(password: string) {
    const saltOrRounds = 10;
    return bcrypt.hash(password, saltOrRounds);

  }
  async comparePassword(password: string, hash: string) {
    return bcrypt.compare(password, hash)
  }

  all() {
    return "success"
  }
}


