import { Module } from '@nestjs/common';
import { BeerController } from './beer.controller';
import { BeerService } from './beer.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Beer } from "./entities/beer.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Beer
    ])
  ],
  controllers: [BeerController],
  providers: [BeerService]
})
export class BeerModule {}
