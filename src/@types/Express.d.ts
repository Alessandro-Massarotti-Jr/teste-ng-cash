declare namespace Express {
    export interface Request {
      AuthUser?: {
        id: string
        username: string;
        password: string;
        account_id?:string;
      }
    }
  }