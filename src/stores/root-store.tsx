import { WorkoutStore } from "./workout-store";
import { UserStore } from "./user-store";

export class RootStore {
  workoutStore: WorkoutStore;
  userStore: UserStore;

  constructor() {
    this.workoutStore = new WorkoutStore(this);
    this.userStore = new UserStore(this);
  }
}

export const rootStore = new RootStore();
