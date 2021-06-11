export class Evento {
    constructor(
      public id:string,
      public idUser:string,
      public username:string,
      public data: string,
      public input1: string,
      public output1: string,
      public input2: string,
      public output2: string,
      public dayOfWeek: string
    ){ }
}