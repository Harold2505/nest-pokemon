import { Injectable } from '@nestjs/common';
import { PokeResponse } from './interfaces/poke-response.interface';
import { PokemonService } from 'src/pokemon/pokemon.service';
import { CreatePokemonDto } from 'src/pokemon/dto/create-pokemon.dto';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {
  constructor(
    private pokemonService: PokemonService,
    private _http: AxiosAdapter,
  ) {}

  async executeSeed() {
    const data = await this._http.get<PokeResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=1000',
    );
    const newData = data.results.map<CreatePokemonDto>(({ name, url }) => {
      const segments = url.split('/');
      //penultima posicion es el numero
      const no: number = +segments[segments.length - 2];
      return { name, no };
    });
    await this.pokemonService.removeAll();
    await this.pokemonService.createMany(newData);
    return 'Seed executed';
  }
}
