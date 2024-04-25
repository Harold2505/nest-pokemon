import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';

import { Model, isValidObjectId } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';

import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class PokemonService {
  private defaultLimit: number;

  constructor(
    @InjectModel(Pokemon.name) //Hecho por nest para inyectar modelos en este servicio
    private readonly pokemonModel: Model<Pokemon>, //Este modelo por si solo no es injectable no es propiamente un servicio (provider)
    private readonly configService: ConfigService,
  ) {
    this.defaultLimit = configService.get('defaultLimit');
    console.log(this.defaultLimit);
  }

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLowerCase();
    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;
    } catch (error) {
      this.handleException(error);
    }
  }

  findAll(paginatioDto: PaginationDto) {
    //el destrucracion si no llega le indicamos que le asigne un valor
    const { limit = this.defaultLimit, offset = 0 } = paginatioDto;
    return this.pokemonModel
      .find()
      .limit(limit) //cantidad de pokemon a listar
      .skip(offset) //paginatio
      .sort({ no: 1 }) //ordena ascendente
      .select('-__v'); //quita el valor __v del select
  }

  async findOne(term: string) {
    let pokemon: Pokemon;
    //isNaN indica si el valor no es numero
    // numero
    if (!isNaN(+term)) pokemon = await this.pokemonModel.findOne({ no: term });
    // Mongo ID
    if (!pokemon && isValidObjectId(term))
      pokemon = await this.pokemonModel.findById(term);
    // Name
    if (!pokemon) pokemon = await this.pokemonModel.findOne({ name: term });

    if (!pokemon)
      throw new NotFoundException(
        `Pokemon with ID, name or no ${term} not found`,
      );
    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon = await this.findOne(term);
    if (updatePokemonDto.name)
      updatePokemonDto.name = updatePokemonDto.name.toLocaleLowerCase();
    try {
      await pokemon.updateOne(updatePokemonDto, {
        new: true,
      }); //new en true es para que devuelva el valor actualizado
      return { ...pokemon.toJSON(), ...updatePokemonDto };
    } catch (error) {
      this.handleException(error);
    }
  }

  async remove(id: string) {
    // const pokemon = await this.findOne(id);
    // await pokemon.deleteOne();
    const { deletedCount, acknowledged } = await this.pokemonModel.deleteOne({
      _id: id,
    });
    if (deletedCount === 0) {
      throw new BadRequestException(`Pokemon with id ${id} not found`);
    }

    return;
  }

  async removeAll() {
    await this.pokemonModel.deleteMany({});
  }

  async createMany(pokemons: CreatePokemonDto[]) {
    console.log(pokemons);
    const results = await this.pokemonModel.insertMany(pokemons);
    console.log(results);
  }

  private handleException(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(
        `Pokemon exist in DB ${JSON.stringify(error.keyValue)}`,
      );
    }
    throw new InternalServerErrorException(
      `Can't create Pokemon - Check server logs.`,
    );
  }
}
