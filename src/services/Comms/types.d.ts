export interface CommsService {
  getUser: () => Promise<User>;
  getUsers: (page: number = 1, results: number = 10) => Promise<User[]>;
}

export type Picture = {
  medium: string;
  large?: string;
  thumbnail?: string;
};

export type Coordinates = {
  latitude: string;
  longitude: string;
};

export type Street = {
  number: number;
  name: string;
};

export type Location = {
  coordinates: Coordinates;
  street: Street;
  city: string;
  state: string;
  postcode: string | number;
};

export type Contacts = {
  email: string;
  phone: string;
};

export type Name = {
  title: string;
  first: string;
  last: string;
};

export type User = {
  name: Name;
  picture: Picture;
  location: Location;
  contacts: Contacts;
};
