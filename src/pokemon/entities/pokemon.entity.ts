import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Pokemon extends Document {
  //id: string MOngo lo da
  @Prop({
    unique: true,
    index: true,
  })
  name: string;
  @Prop({
    unique: true,
    index: true,
  })
  no: number;
}

//se exportara un esquema
//este esquema basicamente le va a adecir
//cuando se esta iniciando la base de datos
//estas son las definiciones que quiero que uses
//estas son las columnas y otras cosas
export const PokemonSchema = SchemaFactory.createForClass(Pokemon);
