import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { MongoModule } from './common/base/Service/mongo.service';

@Module({
  imports:[UserModule,AuthModule,MongoModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
