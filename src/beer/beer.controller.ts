import { Controller, Get, Post, Put, Delete, Res, HttpStatus, Body, Param, NotFoundException, Query } from '@nestjs/common';
import { CreateBeerDTO } from './dto/beer.dto'
import { BeerService } from "./beer.service";
import { get } from 'http';
import { query } from 'express';

@Controller('beer')
export class BeerController {
    
    constructor(private beerService: BeerService){

    }

    @Post('/create')
    async createPost(@Res() res, @Body() createBeerDTO: CreateBeerDTO){
        const beer = await this.beerService.createBeer(createBeerDTO);
        res.status(HttpStatus.OK).json({
            message: 'beer successfully',
            beer
        })
    }
    
    @Get('/')
    async getBeers(@Res() res){

       const beers= await this.beerService.getBeers();

      return res.status(HttpStatus.OK).json({
           beers
       })

    }

    @Get('/:beerID')
    async getBeer(@Res() res, @Param('beerID') beerID){

       const beer= await this.beerService.getBeer(beerID);

       if(!beer) throw new NotFoundException('beer does not exist');

       return res.status(HttpStatus.OK).json({
           beer
       });

    }


    @Delete('/delete/:beerID')
    async deletebeer(@Res() res, @Param('beerID') beerID){

        const beerdeleted = await this.beerService.deleteBeer(beerID);

        if(!beerdeleted) throw new NotFoundException('beer does not exist');
        return res.status(HttpStatus.OK).json({
            message: 'Beer deleted successfully',
            beerdeleted
        });

    }
    

    @Put('/update/:beerID')
    updatebeer(@Res() res, @Body() createBeerDTO: CreateBeerDTO, @Param('beerID') beerID){

        const beerupdate = this.beerService.updateBeer(beerID,createBeerDTO);

        if(!beerupdate) throw new NotFoundException('beer does not exist');
        return res.status(HttpStatus.OK).json({
            message: 'Beer update successfully',
            beerupdate
        });

        

    }

}
