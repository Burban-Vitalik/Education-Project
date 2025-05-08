/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, user) {
    // Якщо є помилка або користувача немає — кидаємо помилку
    if (err || !user) {
      throw err || new Error('Unauthorized');
    }
    return user;
  }
}
