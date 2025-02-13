import { makeAutoObservable, runInAction } from "mobx";
import { Workout } from "@/models";
import { RootStore } from "../root-store";

const apiUrl =
  "https://liberalmark-eu.backendless.app/api/209E82E3-2C42-4261-B6E6-6670F3414FB8/525F90F5-A7F0-44B5-A738-F8D7D8AAAF08/data/workouts";

export class WorkoutStore {
  rootStore: RootStore;
  workouts: Workout[] = [];
  isLoading: boolean = false;
  userWorkouts: Workout[] = [];
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

  getUserWorkouts(userId: string) {
    runInAction(() => {
      this.userWorkouts = this.rootStore.workoutStore.workouts.filter(
        (item) => item.userId === userId
      );
    });
  }

  async addWorkout(workout: Workout) {
    this.error = "";

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...workout,
          userId: this.rootStore.userStore.user?.objectId,
        }),
      });
      if (response.ok) {
        this.rootStore.workoutStore.fetchWorkouts();
        this.rootStore.workoutStore.addWorkoutToCalendar();
      }
    } catch (error) {
      runInAction(() => {
        this.error = (error as Error).message;
      });
    }
  }

  async updateWorkout(workout: Workout, workoutId?: string) {
    this.error = "";

    try {
      const response = await fetch(`${apiUrl}/${workoutId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(workout),
      });
      if (response.ok) {
        this.rootStore.workoutStore.fetchWorkouts();
      }
    } catch (error) {
      runInAction(() => {
        this.error = (error as Error).message;
      });
    }
  }

  async deleteWorkout(workoutId: string) {
    this.error = "";
    try {
      const response = await fetch(`${apiUrl}/${workoutId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        this.rootStore.workoutStore.fetchWorkouts();
      }
    } catch (error) {
      runInAction(() => {
        this.error = (error as Error).message;
      });
    }
  }

  async addWorkoutToCalendar(workout?: Workout) {
    const event = {
      subject: "Running practice",
      start: {
        dateTime: "2025-02-13T12:30:00",
        timeZone: "Europe/Warsaw",
      },
      end: {
        dateTime: "2025-02-13T13:10:00",
        timeZone: "Europe/Warsaw",
      },
      body: {
        contentType: "HTML",
        content: `Type: Easy run<br>Description: Keep your pace easy and your intensity low`,
      },
      reminderMinutesBeforeStart: 15,
    };
    const accessToken = localStorage.getItem("accessToken");
    console.log("accessToken", accessToken);
    console.log("accessToken 22", this.rootStore.userStore.accessToken);
    const response = await fetch("https://graph.microsoft.com/v1.0/me/events", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${JSON.parse(accessToken || "")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(event),
    });

    return response.json();
  }
}
