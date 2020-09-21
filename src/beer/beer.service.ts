import { Injectable } from '@nestjs/common';
import { Beer } from "./entities/beer.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateBeerDTO } from "./dto/beer.dto";
import { createBrotliDecompress } from 'zlib';
import { BeerModule } from './beer.module';

@Injectable()
export class BeerService {

    constructor(
        @InjectRepository(Beer)
        private readonly beerRepository: Repository<Beer>,){}
        
        async getBeers(): Promise<Beer[]>{

            const beers = await this.beerRepository.find();
            return beers;
  
        }

        async getBeer(BeerId: number): Promise<Beer>{

            const beer = await this.beerRepository.findOne(BeerId);
            return beer;

        }

        async createBeer(beerNueva: CreateBeerDTO): Promise<Beer>{

            const nuevo = new Beer();
            nuevo.name = beerNueva.name;
            nuevo.description = beerNueva.description;
            nuevo.imageURL = beerNueva.imageURL;
            nuevo.price = beerNueva.price;

            return await this.beerRepository.save(nuevo);

        }

        async updateBeer(BeerId: number, beerUpdate:CreateBeerDTO): Promise<Beer>{
            var date = new Date(Date.now());
            const beeractualizada = await this.beerRepository.findOne(BeerId);
            beeractualizada.name = beerUpdate.name;
            beeractualizada.description = beerUpdate.description;
            beeractualizada.imageURL = beerUpdate.imageURL;
            beeractualizada.price = beerUpdate.price;
            date = beerUpdate.createdAt;
            
            return await this.beerRepository.save(beeractualizada);
             
        }

        async deleteBeer(BeerId: number): Promise<Beer>{

            const deletebeer = this.beerRepository.findOne(BeerId);
            await this.beerRepository.delete(BeerId);

            return deletebeer;


        }





}
