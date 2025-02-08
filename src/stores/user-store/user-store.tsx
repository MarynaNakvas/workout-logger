import { makeAutoObservable, runInAction } from "mobx";
import { RootStore } from "../root-store";
import { emailToName } from "@/utils/values";
import { User } from "@/models";

const apiUrl =
  "https://liberalmark-eu.backendless.app/api/209E82E3-2C42-4261-B6E6-6670F3414FB8/525F90F5-A7F0-44B5-A738-F8D7D8AAAF08/data/workoutUsers";

export class UserStore {
  rootStore: RootStore;
  isUsersFetching: boolean = false;
  users: User[] = [];
  user?: User = undefined;
  isAuthenticated: boolean = false;
  error?: string = undefined;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  async fetchUsers() {
    this.isUsersFetching = true;
    this.error = "";
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      runInAction(() => {
        this.users = data;
        this.isUsersFetching = false;
      });
    } catch (error) {
      runInAction(() => {
        this.error = (error as Error).message;
      });
    }
  }

  async addUser(user: User) {
    const updatedUserInfo = {
      ...user,
      name: user.name ? user.name : emailToName(user.email),
    };

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUserInfo),
      });
      const data = await response.json();
      runInAction(() => {
        this.rootStore.userStore.setUser(data);
      });
    } catch (error) {
      runInAction(() => {
        this.error = (error as Error).message;
      });
    }
  }

  checkIsNewUser(email: string) {
    const currentUser = this.rootStore.userStore.users.find(
      (item) => item.email === email
    );
    return !currentUser?.objectId;
  }

  setUser(user: User) {
    this.user = user;
    this.isAuthenticated = true;
  }

  logout() {
    this.user = undefined;
    this.isAuthenticated = false;
  }
}
