import { makeAutoObservable, runInAction } from "mobx";
import { Workout } from "@/models";
import { RootStore } from "../root-store";
import { getEndWorkout } from "@/utils/values";

const apiUrl =
  "https://liberalmark-eu.backendless.app/api/209E82E3-2C42-4261-B6E6-6670F3414FB8/525F90F5-A7F0-44B5-A738-F8D7D8AAAF08/data/workouts";

export class WorkoutStore {
  rootStore: RootStore;
  workouts: Workout[] = [];
  isLoading: boolean = false;
  userWorkouts: Workout[] = [];
  error: string = "";

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
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
        this.rootStore.workoutStore.addWorkoutToCalendar(workout);
      }
    } catch (error) {
      runInAction(() => {
        this.error = (error as Error).message;
      });
    }
  }

  async addWorkoutToCalendar(workout?: Workout) {
    const start =
      workout && workout.dateWorkout
        ? workout.timeWorkout
          ? `${workout.dateWorkout}T${workout.timeWorkout}:00`
          : new Date(workout.dateWorkout)
        : new Date();

    const event = {
      subject: "Running practice",
      start: {
        dateTime: start,
        timeZone: "Europe/Warsaw",
      },
      end: {
        dateTime: workout?.duration
          ? getEndWorkout(`${start}Z`, workout?.duration)
          : new Date(),
        timeZone: "Europe/Warsaw",
      },
      body: {
        contentType: "HTML",
        content: `Type: ${workout?.typeWorkout || "Run"}<br>Description: Follow the rules of the chosen type of workout.`,
      },
      reminderMinutesBeforeStart: 15,
    };

    const accessToken = localStorage.getItem("accessToken");

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
}
