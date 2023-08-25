import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async atualizarFotoPerfil(id: string, urlFotoPerfil: string) {
    const user = await this.userModel.findOne({ id }).exec();

    user.urlFotoPerfil = urlFotoPerfil;

    return user.save();
  }
}
