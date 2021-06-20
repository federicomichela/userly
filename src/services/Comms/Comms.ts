import _Vue, { App } from "vue";
import axios from "axios";
import { CommsService, Contacts, User } from "@/services/Comms/types";
import { GenericObject } from "@/services/Utils/types";

export class Comms implements CommsService {
  public async getUser(): Promise<User> {
    const response: any = await axios.get("https://randomuser.me/api/");
    const user = response.data.results[0];

    return Comms.formatUser(user);
  }

  public async getUsers(results = 3): Promise<User[]> {
    const response: any = await axios.get(`https://randomuser.me/api/?results=${results}`);
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
