import { AccountInfo, IPublicClientApplication } from "@azure/msal-browser";
import { makeAutoObservable, runInAction } from "mobx";

import { loginRequest } from "@/lib/msal/msal-config";
import { User } from "@/models";
import { emailToName } from "@/utils/values";

import { RootStore } from "../root-store";

const apiUrl =
  "https://liberalmark-eu.backendless.app/api/209E82E3-2C42-4261-B6E6-6670F3414FB8/525F90F5-A7F0-44B5-A738-F8D7D8AAAF08/data/workoutUsers";

export class UserStore {
  rootStore: RootStore;
  isUsersFetching: boolean = false;
  users: User[] = [];
  isUserFetching: boolean = false;
  user?: User = undefined;
  userPhoto?: string;
  accessToken?: string;
  isAuthenticated?: boolean = undefined;
  error?: string = undefined;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
    this.loadUser();
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

  async getAccessToken(
    instance: IPublicClientApplication,
    account: AccountInfo
  ) {
    try {
      const response = await instance.acquireTokenSilent({
        ...loginRequest,
        account,
      });
      runInAction(() => {
        this.accessToken = response.accessToken;
      });

      localStorage.setItem("accessToken", JSON.stringify(response.accessToken));
    } catch (error) {
      runInAction(() => {
        this.error = (error as Error).message;
      });
    }
  }

  checkIsNewUser(email: string) {
    return this.rootStore.userStore.users.find((item) => item.email === email);
  }

  setUser(user: User) {
    runInAction(() => {
      this.user = user;
      this.isAuthenticated = true;
    });

    localStorage.setItem("user", JSON.stringify(user));
  }

  async addUser(user: User) {
    this.isUserFetching = true;
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
        this.isUserFetching = false;
      });
    } catch (error) {
      runInAction(() => {
        this.error = (error as Error).message;
      });
    }
  }

  async getUserPhoto() {
    try {
      const headers = new Headers({
        Authorization: `Bearer ${this.rootStore.userStore.accessToken}`,
      });
      const response = await fetch(
        "https://graph.microsoft.com/v1.0/me/photo/$value",
        {
          method: "GET",
          headers,
        }
      );
      if (response.ok) {
        const blob = await response.blob();
        runInAction(() => {
          this.userPhoto = URL.createObjectURL(blob);
        });
      }
    } catch (error) {
      runInAction(() => {
        this.error = (error as Error).message;
      });
    }
  }

  loadUser() {
    if (typeof window !== "undefined") {
      const savedUser = localStorage.getItem("user");
      const accessToken = localStorage.getItem("accessToken");
      if (savedUser) {
        runInAction(() => {
          this.user = JSON.parse(savedUser);
          this.isAuthenticated = true;
        });
      }
      if (accessToken) {
        runInAction(() => {
          this.accessToken = JSON.parse(accessToken);
        });
      }
    }
  }

  logout() {
    runInAction(() => {
      this.user = undefined;
      this.isAuthenticated = undefined;
    });
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("account");
  }
}
