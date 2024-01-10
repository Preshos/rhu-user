export interface ProfileUser {
    uid: string;
    email?: string;
    firstname?: string;
    midname?:string
    lastname?: string;
    displayname?: string;
    phone?: number;
    address?: string;
    city?:string;
    brgy?:string;
    street?:string;
    province?:string;
    photourl?: string;
    age?: number;
    gender?:string;
    password?: string;
    isAdmin?: boolean;
    isOnline?: boolean;
  }
  