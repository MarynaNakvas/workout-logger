import { makeAutoObservable } from "mobx";
import { RootStore } from "./root-store";

interface User {
  objectId: string;
  name: string;
  email: string;
}

export class UserStore {
  rootStore: RootStore;
  user?: User = undefined;
  isAuthenticated = false;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  setUser(user: any) {
    this.user = user;
    this.isAuthenticated = true;
  }

  logout() {
    this.user = undefined;
    this.isAuthenticated = false;
  }
}
