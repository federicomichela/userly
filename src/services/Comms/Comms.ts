import _Vue, { App } from "vue";
import axios from "axios";
import { CommsService, Contacts, User } from "@/services/Comms/types";

export class Comms implements CommsService {
  public async getUser(): Promise<User> {
    const response: any = await axios.get("https://randomuser.me/api/");
    const user = response.data.results[0];

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
