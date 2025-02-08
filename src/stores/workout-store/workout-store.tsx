import { makeAutoObservable, runInAction } from "mobx";
import { Workout } from "@/models";
import { RootStore } from "../root-store";

const apiUrl =
  "https://liberalmark-eu.backendless.app/api/209E82E3-2C42-4261-B6E6-6670F3414FB8/525F90F5-A7F0-44B5-A738-F8D7D8AAAF08/data/workouts";

export class WorkoutStore {
  rootStore: RootStore;
  workouts: Workout[] = [];
  isLoading: boolean = false;
  error: string = "";

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  async fetchWorkouts() {
    this.isLoading = true;
    this.error = "";
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      runInAction(() => {
        this.workouts = data;
        this.isLoading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.error = (error as Error).message;
      });
    }
  }
}
