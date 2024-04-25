//creamos una funcion para mapear las variables de entorno
//regresara un objeto
export const EnvConfiguration = () => ({
  environment: process.env.NODE_ENV || 'dev',
  mongodb: process.env.MONGODB,
  port: process.env.PORT || 3001,
  defaultLimit: process.env.DEFAULT_LIMIT || 7,
});
//esta es una funcion que anda flotando en mi aplicacion
//de alguna manera tengo que decirle a Nest
//y especificamente al modulo de las variables de entorno
//hey vas a usar este archivo para validar nuestras variables entorno
