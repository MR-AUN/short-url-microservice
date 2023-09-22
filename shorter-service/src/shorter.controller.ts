import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ShorterService } from './shorter.service';
import { CreateShorterDto } from './dto/create-shorter.dto';
import { UpdateShorterDto } from './dto/update-shorter.dto';
import { GetUserId } from './common/decorators/get-user-id.decorator';
import { Public } from './common/decorators';

@Controller('shorter')
export class ShorterController {
  constructor(private readonly shorterService: ShorterService) {}

  @Post()
  create(@GetUserId() userId: string,@Body() createShorterDto: CreateShorterDto ) {
    return this.shorterService.create(createShorterDto, userId);
  }

  @Get()
  findAllByUser(@GetUserId() userId: string) {
    return this.shorterService.findAllByUser(userId);
  }

  @Public()
  @Get(':url')
  findOne(@Param('url') url: string) {
    return this.shorterService.findOne(url);
  }

}
