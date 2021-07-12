export class SaveUserReq {
    constructor(
      public name: string,
      public surname: string,
      public password: string,
      public email: string,
      public phoneNumber:string,
      public authorities:string[]
    ){ }
}