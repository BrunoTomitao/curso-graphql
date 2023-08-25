import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { v4 as uuid } from 'uuid';

import { User } from '../user/schemas/user.schema';
import { AuthInput } from './input/auth.input';
import { SignUpInput } from './input/sign-up.input';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel('User') private readonly userModel: Model<User>,
  ) {}

  async signUp(signUpInput: SignUpInput) {
    let user = await this.userModel.findOne({
      email: signUpInput.email,
    });

    if (user) {
      throw new BadRequestException('Email já cadastrado');
    }

    user = new this.userModel({
      id: uuid(),
      nome: signUpInput.nome,
      email: signUpInput.email,
    });

    const salt = await bcrypt.genSalt();

    user.senha = await bcrypt.hash(signUpInput.senha, salt);

    await user.save();

    return 'Usuário cadastrado com sucesso!';
  }

  async signIn(authInput: AuthInput) {
    const user = await this.userModel.findOne({
      email: authInput.email,
    });

    if (!user) {
      throw new UnauthorizedException('Email inválido');
    }

    const senhaValida = bcrypt.compareSync(authInput.senha, user.senha);

    if (!senhaValida) {
      throw new UnauthorizedException('Senha inválida');
    }

    const token = this.jwtService.sign({
      id: user.id,
      username: user.nome,
      email: user.email,
    });

    return token;
  }
}
