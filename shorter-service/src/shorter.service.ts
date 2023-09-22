import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateShorterDto } from './dto/create-shorter.dto';
import ShortUniqueId from 'short-unique-id';
import { ShorterRepository } from './shorter.repository';
import * as dns from "dns"

@Injectable()
export class ShorterService {
  private readonly uid = new ShortUniqueId();
  constructor(private readonly shorterRepository: ShorterRepository) { }

  async create(createShorterDto: CreateShorterDto, user_id: string) {
    try {
      const { long_url } = createShorterDto

      const urlObject = new URL(long_url)

      await dns.lookup(urlObject.hostname, (error, address, f) => {
        ;

        if (!address) {
          throw new NotFoundException("invalid url")
        }
      })


      const original_url = urlObject.href
      const short_url = this.uid.stamp(10)




      const shorter = await this.shorterRepository.create({ long_url: original_url, short_id: `short_${this.uid.stamp(15)}`, shorter_url: short_url, user_id, view_count: 0 })

      return shorter

    } catch (error) {
      console.log(error);

    }
  }

  async findAllByUser(user_id: string) {
    try {
      const short = await this.shorterRepository.find({ user_id })

      return short
    } catch (error) {
      console.log(error);

    }
  }

  async findOne(url: string) {
    try {
      const shorter = await this.shorterRepository.findOne({ shorter_url: url })

      if (shorter) {
        await this.shorterRepository.updateOne({ short_id: shorter.short_id }, { $set: { view_count: shorter.view_count + 1 } })
      }
      return shorter
    } catch (error) {
      console.log(error);

    }
  }


}
