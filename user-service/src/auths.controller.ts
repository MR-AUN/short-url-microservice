import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpCode } from '@nestjs/common';
import { AuthsService } from './auths.service';
import { SignupAuthDto } from './dto/auth-signup.dto';
import { SigninAuthDto } from './dto/auth-signin.dto';
import { Public } from 'src/common/decorators';


@Controller('auths')
export class AuthsController {
  constructor(private readonly authsService: AuthsService) {}

  @Public()
  @Post('signup')
  signup(@Res({ passthrough: true }) res, @Body() data: SignupAuthDto) {
    return this.authsService.signup(data, res)
  }

  @Public()
  @Post('signin')
  signin(@Res({ passthrough: true }) res, @Body() data: SigninAuthDto) {
    return this.authsService.signin(data, res)
  }

  @Public()
  @Post('signout')
  @HttpCode(204)
  signOut(@Res({ passthrough: true }) res) {
    return this.authsService.signout(res)
  }

  @Public()
  @Get()
  all() {
    return this.authsService.all()
  }
}
