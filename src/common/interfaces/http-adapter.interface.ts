//La definicion de lo que necesito
//de una clase adaptadora
//en este caso una clase HttpAdapter
//tenga que implementar
//para que yo la pueda implementar seguramente
//en cualquier otro servicio
export interface HttpAdapter {
  //toda clase que implemente el httpadapter
  //va a tener que realizar el get
  //se define que el GET es de tipo generico <T> y regresare una promesa de tipo <T>
  get<T>(url: string): Promise<T>;
}
