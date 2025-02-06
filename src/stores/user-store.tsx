import { makeAutoObservable } from "mobx";
import { RootStore } from "./root-store";

export class UserStore {
  rootStore: RootStore;
  user = null;
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
    this.user = null;
    this.isAuthenticated = false;
  }
}
