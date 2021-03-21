import { Injectable } from '@nestjs/common';
import { Message } from '../models/message.model';
import { OxfordApiService } from './oxfordapi.service';
const _ = require('lodash');

@Injectable()
export class AppService {
  constructor(private oxfordApiClient: OxfordApiService) {}

  async getWordOrigin(word: string, fields = 'etymologies'): Promise<Message> {
    const result: Message = await this.oxfordApiClient.getWordOrigin(
      word,
      fields,
    );
    if (result.status === 200) {
      const temp = _.flatMap(
        result.content['results'],
        (o: { lexicalEntries: any }) => o.lexicalEntries,
      )
        .flatMap((o: any[]) => o.entries)
        .flatMap((o: { etymologies: any }) => o.etymologies);
      return new Message(200, temp.join(''));
    }
    return result;
  }

  async translateWord(
    word: string,
    targetLen: string,
    fields: string,
  ): Promise<Message> {
    const result = await this.oxfordApiClient.translateWordByLan(
      word,
      targetLen,
      fields,
    );
    if (result.status === 200) {
      const temp = _.flatMap(
        result.content['results'],
        (o: { lexicalEntries: any }) => o.lexicalEntries,
      )
        .flatMap((o: any[]) => o.entries)
        .flatMap((o: { senses: any }) => o.senses)
        .flatMap((o: { definitions: any }) => o.definitions);
      return new Message(200, temp.join(''));
    }
    return result;
  }
}
