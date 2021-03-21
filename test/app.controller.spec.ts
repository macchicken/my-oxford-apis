import { HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '../src/app.controller';
import { Message } from '../src/models/message.model';
import { AppService } from '../src/serivces/app.service';
import { OxfordApiService } from '../src/serivces/oxfordapi.service';
import { RequestHelper } from '../src/serivces/requesthelper';
require('dotenv').config();

describe('AppController', () => {
  beforeEach(() => {
    jest.setTimeout(60000);
  });

  describe('error cases', () => {
    it('get word origin status 400 and 404 by mocking the dependencies', async () => {
      const requesthelper = new RequestHelper();
      const oxfordApiClient = new OxfordApiService(requesthelper);
      const appService = new AppService(oxfordApiClient);

      const testData = [
        {
          status: 400,
          content: 'Unknown field requested: definitions2',
        },
        {
          status: 404,
          content:
            'No entry found matching supplied source_lang, word and provided filters etc',
        },
      ];
      for (let i = 0; i < testData.length; i++) {
        jest
          .spyOn(requesthelper, 'request')
          .mockImplementation(
            async () => new Message(testData[i].status, testData[i].content),
          );
        let result = await oxfordApiClient.getWordOrigin(
          'test',
          'definitions2',
        );
        expect(result.content).toBe(testData[i].content);
        expect(result.status).toBe(testData[i].status);
        result = await appService.getWordOrigin('test222', 'definitions');
        expect(result.content).toBe(testData[i].content);
        expect(result.status).toBe(testData[i].status);
      }
    });

    it('translate word status 400 and 404 by mocking the dependencies', async () => {
      const requesthelper = new RequestHelper();
      const oxfordApiClient = new OxfordApiService(requesthelper);
      const appService = new AppService(oxfordApiClient);

      const testData = [
        {
          status: 400,
          content: 'Unknown field requested: definitions3',
        },
        {
          status: 404,
          content:
            'No entry found matching supplied source_lang, word and provided filters',
        },
      ];
      for (let i = 0; i < testData.length; i++) {
        jest
          .spyOn(requesthelper, 'request')
          .mockImplementation(
            async () => new Message(testData[i].status, testData[i].content),
          );
        let result = await oxfordApiClient.translateWordByLan(
          'test',
          'fr',
          'definitions2',
        );
        expect(result.content).toBe(testData[i].content);
        expect(result.status).toBe(testData[i].status);
        result = await appService.translateWord('test222', 'fr', 'definitions');
        expect(result.content).toBe(testData[i].content);
        expect(result.status).toBe(testData[i].status);
      }
    });
  });

  describe('app controller sucess and error cases', () => {
    let app: TestingModule;
    let appService: AppService;
    let appController: AppController;

    beforeEach(async () => {
      app = await Test.createTestingModule({
        controllers: [AppController],
        providers: [AppService, OxfordApiService, RequestHelper],
      }).compile();
      appService = app.get<AppService>(AppService);
      appController = app.get<AppController>(AppController);
    });

    it('get word origin by mocking AppService', async () => {
      const returnData = { origin: 'aus' };
      jest
        .spyOn(appService, 'getWordOrigin')
        .mockImplementation(async () => new Message(200, returnData));
      let result = await appController.getWordOrigin('apple', 'etymologies');
      expect(result.data).toBe(returnData);
      result = await appController.getWordOrigin('apple');
      expect(result.data).toBe(returnData);

      const returnData2 = { error: 'nop' };
      jest
        .spyOn(appService, 'getWordOrigin')
        .mockImplementation(async () => new Message(400, returnData2));
      expect(async () => {
        await appController.getWordOrigin('apple', 'etymologies2');
      }).rejects.toThrow(HttpException);
    });

    it('translate word by mocking AppService', async () => {
      const returnData = { definitions: 'definitions' };
      jest
        .spyOn(appService, 'translateWord')
        .mockImplementation(async () => new Message(200, returnData));
      let result = await appController.getWordTranslation(
        'apple',
        'fr',
        'definitions',
      );
      expect(result.data).toBe(returnData);
      result = await appController.getWordTranslation('apple', 'fr');
      expect(result.data).toBe(returnData);

      const returnData2 = { error: 'nop' };
      jest
        .spyOn(appService, 'translateWord')
        .mockImplementation(async () => new Message(400, returnData2));
      expect(async () => {
        await appController.getWordTranslation('apple', 'fr');
      }).rejects.toThrow(HttpException);
    });
  });
});
