import { UserStore } from "../user-store";
import { WorkoutStore } from "../workout-store";

export class RootStore {
  workoutStore: WorkoutStore;
  userStore: UserStore;

  constructor() {
    this.workoutStore = new WorkoutStore(this);
    this.userStore = new UserStore(this);
  }
}

export const rootStore = new RootStore();
