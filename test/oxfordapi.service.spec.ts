import { Message } from '../src/models/message.model';
import { OxfordApiService } from '../src/serivces/oxfordapi.service';
import { RequestHelper } from '../src/serivces/requesthelper';
require('dotenv').config();

describe('OxfordApiService', () => {
  beforeEach(() => {
    jest.setTimeout(60000);
  });

  describe('success cases', () => {
    let requhestHelper: RequestHelper;
    let oxfordApiClient: OxfordApiService;

    beforeEach(() => {
      requhestHelper = new RequestHelper();
      oxfordApiClient = new OxfordApiService(requhestHelper);
    });

    it('api client get word origin success', async () => {
      const returnData = {
        results: [
          {
            id: 'apple',
            lexicalEntries: [{ entries: [{ etymologies: ['1', '2'] }] }],
          },
        ],
      };
      jest
        .spyOn(requhestHelper, 'request')
        .mockImplementation(async () => new Message(200, returnData));

      let result = await oxfordApiClient.getWordOrigin('apple', 'etymologies');
      expect(result.content).toBe(returnData);
      expect(result.status).toBe(200);

      result = await oxfordApiClient.getWordOrigin('apple');
      expect(result.content).toBe(returnData);
      expect(result.status).toBe(200);

      result.status = 201;
      result.content = '201';
      expect(result.content).toBe('201');
      expect(result.status).toBe(201);
    });

    it('api client word translattion success', async () => {
      const returnData = {
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
      };
      jest
        .spyOn(requhestHelper, 'request')
        .mockImplementation(async () => new Message(200, returnData));

      let result = await oxfordApiClient.translateWordByLan(
        'apple',
        'fr',
        'definitions',
      );
      expect(result.content).toBe(returnData);
      expect(result.status).toBe(200);

      result = await oxfordApiClient.translateWordByLan('apple', 'fr');
      expect(result.content).toBe(returnData);
      expect(result.status).toBe(200);
    });
  });
});
