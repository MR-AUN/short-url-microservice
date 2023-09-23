import { Injectable, NotFoundException} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) { }
  async me(userId: string) {
    
    const user = await this.usersRepository.findOne({ user_id: userId })
    if (!user) throw new NotFoundException("User not found.")
    return user
  }
}
