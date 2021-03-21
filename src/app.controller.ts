import { Controller, Get, HttpException, Query } from '@nestjs/common';
import { MyValidationPipe } from './pipes/MyValidator';
import { AppService } from './serivces/app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('origin')
  async getWordOrigin(
    @Query('word', new MyValidationPipe()) word: string,
    @Query('fields') fields = 'etymologies',
  ): Promise<Record<string, unknown>> {
    const result = await this.appService.getWordOrigin(
      word.toLocaleLowerCase(),
      fields,
    );
    if (result.status === 200) {
      return {
        data: result.content,
      };
    }
    throw new HttpException(result.content, result.status);
  }

  @Get('translate')
  async getWordTranslation(
    @Query('word', new MyValidationPipe()) word: string,
    @Query('targetLan', new MyValidationPipe()) targetLan: string,
    @Query('fields') fields = 'definitions',
  ): Promise<Record<string, unknown>> {
    const result = await this.appService.translateWord(word, targetLan, fields);
    if (result.status === 200) {
      return {
        data: result.content,
      };
    }
    throw new HttpException(result.content, result.status);
  }
}
