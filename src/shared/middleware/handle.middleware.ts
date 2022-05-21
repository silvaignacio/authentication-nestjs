import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response } from 'express';
import { decryptAesCbc, decryptRSAPrivateKey } from '../crypto/utils.crypto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class HandleMiddleware implements NestMiddleware {
  constructor(private readonly configService: ConfigService) {}
  use(req: any, res: Response, next: (error?: any) => void): any {
    try {
      req.sessionKey = decryptRSAPrivateKey(
        req.headers['x-session-key'],
        this.configService.get<string>('rsa.privateKey'),
      );
    } catch (error) {
      return next(error);
    }

    try {
      const session = JSON.parse(req.sessionKey);
      const decryptedBody = decryptAesCbc(
        req.body.userData,
        session.AESKey,
        session.iv,
      );
      if (!decryptedBody) {
      }
      req.body = JSON.parse(decryptedBody);
      return next();
    } catch ({ message }) {
      return next('error');
    }
  }
}
