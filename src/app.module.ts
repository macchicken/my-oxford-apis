/* istanbul ignore file */

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './serivces/app.service';
import { OxfordApiService } from './serivces/oxfordapi.service';
import { RequestHelper } from './serivces/requesthelper';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, RequestHelper, OxfordApiService],
})
export class AppModule {}
