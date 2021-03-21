import { Injectable } from '@nestjs/common';
import { Message } from 'src/models/message.model';
import { RequestHelper } from './requesthelper';

@Injectable()
export class OxfordApiService {
  endpoint: string;
  appid: any;
  appkey: any;

  constructor(private requestHelper: RequestHelper) {
    this.endpoint = process.env.endpoint;
    this.appid = process.env.appid;
    this.appkey = process.env.appkey;
  }

  getWordOrigin(word: string, fields = 'etymologies'): Promise<Message> {
    const options = {
      method: 'GET',
      url: `${this.endpoint}/entries/en-gb/${word}?fields=${fields}&strictMatch=false`,
      headers: {
        Accept: 'application/json',
        app_id: this.appid,
        app_key: this.appkey,
      },
    };
    return this.requestHelper.request(options);
  }

  translateWordByLan(
    word: string,
    targetLen: string,
    fields = 'definitions',
  ): Promise<Message> {
    const options = {
      method: 'GET',
      url: `${this.endpoint}/entries/${targetLen}/${word}?fields=${fields}&strictMatch=false`,
      headers: {
        Accept: 'application/json',
        app_id: this.appid,
        app_key: this.appkey,
      },
    };
    return this.requestHelper.request(options);
  }
}
