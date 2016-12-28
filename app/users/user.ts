export class Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
}

export class IUser {
  id: number;
  name: string;
  email: string;
  phone: string;
  address = new Address();
}
