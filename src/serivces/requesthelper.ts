/* istanbul ignore file */

import rp from 'request-promise-native';
import { Injectable } from '@nestjs/common';
import { Message } from '../models/message.model';

@Injectable()
export class RequestHelper {
  async request(options: any): Promise<Message> {
    return rp(options)
      .then(function (response) {
        return new Message(200, JSON.parse(response));
      })
      .catch(function (err) {
        return new Message(err['statusCode'], JSON.parse(err['error']).error);
      });
  }
}
