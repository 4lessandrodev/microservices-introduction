import { Module } from '@nestjs/common';
import { PlayerModule } from './player/player.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://mongo_user:mongo_pass@localhost:27017/player_db?authSource=admin',
      {
        connectTimeoutMS: 300,
        useNewUrlParser: true,
        useCreateIndex: true,
      },
    ),
    PlayerModule,
    CategoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
