//Este debe ser un envoltorio de mi codigo

import axios, { AxiosInstance } from 'axios';
import { HttpAdapter } from '../interfaces/http-adapter.interface';
import { Injectable } from '@nestjs/common';
import * as https from 'https';

//el cual va ayudarme a que si axios cambia solo cambio la clase
//Recordar si queremos injectar esta clase debemos usar el decorador
//@Injectable
@Injectable()
export class AxiosAdapter implements HttpAdapter {
  private readonly axios: AxiosInstance = axios;

  async get<T>(url: string): Promise<T> {
    const httpsAgent = new https.Agent({
      rejectUnauthorized: false,
    });
    try {
      const { data } = await this.axios.get<T>(url, { httpsAgent });
      return data;
    } catch (err) {
      throw new Error('This is an error - checks logs');
    }
  }
}
