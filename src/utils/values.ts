import { Workout } from "@/models";
import { isEqual, omitBy } from "lodash";

export const emailToName = (email: string) => {
  const nameParts = email.split("@")[0].split(".");

  return nameParts
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(" ");
};

export const calculatePace = (time: string, distance: number) => {
  const [hours, minutes] = time.split(":").map(Number);
  const totalMinutes = hours * 60 + minutes;
  const paceMinutes = totalMinutes / distance;
  const paceMin = Math.floor(paceMinutes);
  const paceSec = Math.round((paceMinutes - paceMin) * 60);

  return paceMin
    ? `${paceMin}:${paceSec.toString().padStart(2, "0")}`
    : undefined;
};

export const getTotalDistance = (workouts: Workout[]) =>
  workouts.reduce((acc, item) => acc + (item.distance || 0), 0);

export const getLongestDistance = (workouts: Workout[]) =>
  workouts.reduce((max, item) => {
    return !!item.distance && item.distance > max ? item.distance : max;
  }, 0);

const convertPaceToSeconds = (pace: string) => {
  const [minutes, seconds] = pace.split(":").map(Number);
  return minutes * 60 + seconds;
};

export const getBestPace = (workouts: Workout[]) =>
  workouts.reduce((best, item) => {
    const currentPaceInSeconds = convertPaceToSeconds(item.pace || "0:00");
    const bestPaceInSeconds = convertPaceToSeconds(best);
    if (!!item.pace && bestPaceInSeconds === 0) {
      return item.pace;
    } else {
      return !!item.pace && currentPaceInSeconds < bestPaceInSeconds
        ? item.pace
        : best;
    }
  }, "0:00");

export const getObjectDifferences = (obj1: Workout, obj2: Workout) =>
  omitBy(obj2, (value, key) => isEqual(value, obj1[key as keyof Workout]));

export const getEndWorkout = (start: string | Date, duration: string) => {
  const startDate = new Date(start);
  const [hours, minutes] = duration.split(":").map(Number);
  startDate.setHours(startDate.getHours() + hours);
  startDate.setMinutes(startDate.getMinutes() + minutes);

  return startDate.toISOString().slice(0, 19);
};
