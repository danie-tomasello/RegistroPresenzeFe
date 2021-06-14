export class User {
    constructor(
      public id:number,
      public username: string,
      public name: string,
      public surname: string,
      public email: string,
      public phoneNumber:string,
      public creationDate:string,
      public authorities:string[]
    ){ }
}