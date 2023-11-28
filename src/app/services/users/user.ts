export interface ProfileUser {
    uid: string;
    email?: string;
    firstname?: string;
    midname?:string
    lastname?: string;
    displayname?: string;
    phone?: string;
    address?: string;
    city?:string;
    brgy?:string;
    street?:string;
    province?:string;
    photourl?: string;
    age?: string;
    gender?:string;
    password?: string;
    emailverified?: boolean;
    isAdmin?: boolean;
    isOnline?: boolean;
  }
  