import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '../src/app.controller';
import { AppService } from '../src/serivces/app.service';
import { OxfordApiService } from '../src/serivces/oxfordapi.service';
import { RequestHelper } from '../src/serivces/requesthelper';
require('dotenv').config();

describe('AppController oxford api 404 and 400 response', () => {
  beforeEach(() => {
    jest.setTimeout(60000);
  });

  describe('real requests', () => {
    let app: TestingModule;
    let appService: AppService;

    beforeEach(async () => {
      app = await Test.createTestingModule({
        controllers: [AppController],
        providers: [AppService, OxfordApiService, RequestHelper],
      }).compile();
      appService = app.get<AppService>(AppService);
    });

    it('translate word status 400 and 404 by real requests', async () => {
      const testData = [
        {
          word: 'test',
          targetLen: 'fr',
          fields: 'definitions2',
          status: 400,
          content: 'Unknown field requested: definitions2',
        },
        {
          word: 'test2222',
          targetLen: 'fr',
          fields: 'definitions',
          status: 404,
          content:
            'No entry found matching supplied source_lang, word and provided filters',
        },
      ];
      for (let i = 0; i < testData.length; i++) {
        const result = await appService.translateWord(
          testData[i].word,
          testData[i].targetLen,
          testData[i].fields,
        );
        expect(result.content).toBe(testData[i].content);
        expect(result.status).toBe(testData[i].status);
      }
    });

    it('get word origin 400 and 404 by real requests', async () => {
      const testData = [
        {
          word: 'test',
          fields: 'etymologies222',
          status: 400,
          content: 'Unknown field requested: etymologies222',
        },
        {
          word: 'test2222',
          fields: 'etymologies',
          status: 404,
          content:
            'No entry found matching supplied source_lang, word and provided filters',
        },
      ];
      for (let i = 0; i < testData.length; i++) {
        const result = await appService.getWordOrigin(
          testData[i].word,
          testData[i].fields,
        );
        expect(result.content).toBe(testData[i].content);
        expect(result.status).toBe(testData[i].status);
      }
    });
  });
});
