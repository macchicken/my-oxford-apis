import { Message } from '../src/models/message.model';
import { AppService } from '../src/serivces/app.service';
import { OxfordApiService } from '../src/serivces/oxfordapi.service';
import { RequestHelper } from '../src/serivces/requesthelper';
require('dotenv').config();

describe('AppService', () => {
  beforeEach(() => {
    jest.setTimeout(60000);
  });

  describe('success cases', () => {
    let oxfordApiClient: OxfordApiService;
    let appService: AppService;

    beforeEach(() => {
      oxfordApiClient = new OxfordApiService(new RequestHelper());
      appService = new AppService(oxfordApiClient);
    });

    it('get word origin success', async () => {
      jest.spyOn(oxfordApiClient, 'getWordOrigin').mockImplementation(
        async () =>
          new Message(200, {
            results: [
              {
                id: 'apple',
                lexicalEntries: [{ entries: [{ etymologies: ['1', '2'] }] }],
              },
            ],
          }),
      );

      let result = await appService.getWordOrigin('apple', 'etymologies');
      expect(result.content).toBe('12');
      expect(result.status).toBe(200);

      result = await appService.getWordOrigin('apple');
      expect(result.content).toBe('12');
      expect(result.status).toBe(200);
    });

    it('get word translattion success', async () => {
      jest.spyOn(oxfordApiClient, 'translateWordByLan').mockImplementation(
        async () =>
          new Message(200, {
            results: [
              {
                id: 'apple',
                lexicalEntries: [
                  {
                    entries: [
                      {
                        senses: [
                          { definitions: ['3', '5'] },
                          { definitions: ['7,8'] },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          }),
      );
      const result = await appService.translateWord(
        'apple',
        'fr',
        'definitions',
      );
      expect(result.content).toBe('357,8');
      expect(result.status).toBe(200);
    });
  });
});
