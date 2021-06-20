import _Vue from "vue";
import axios from "axios";
import { setup } from "axios-cache-adapter";
import { CommsService, Contacts, User } from "@/services/Comms/types";
import { GenericObject } from "@/services/Utils/types";

export class Comms implements CommsService {
  private cacheMaxAge = 5 * 1000; // for testing purposes keeping this low
  private api = setup({ cache: { maxAge: 1 * 60 * 1000 , exclude: { query: false } } });

  public async getUser(): Promise<User> {
    const response: any = await this.api.get("https://randomuser.me/api/");
    const user = response.data.results[0];

    return Comms.formatUser(user);
  }

  public async getUsers(page = 1, results = 10): Promise<User[]> {
    const response: any = await this.api.get(`https://randomuser.me/api/?page=${page}&results=${results}&seed=userly`);
    const users = response.data.results;

    return users.map((user: GenericObject) => Comms.formatUser(user));
  }

  private static formatUser(user: GenericObject): User {
    return {
      picture: JSON.parse(JSON.stringify(user.picture)),
      name: JSON.parse(JSON.stringify(user.name)),
      location: JSON.parse(JSON.stringify(user.location)),
      contacts: {
        email: user.email,
        phone: user.phone,
      } as Contacts,
    };
  }
}

export default function CommsPlugin(app: _Vue.App<Element>): void {
  app.provide("$comms", new Comms());
}
