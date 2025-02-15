export interface User {
  objectId?: string;
  name: string;
  email: string;
  password?: string;
  photo?: any;
}

export interface Workout {
  objectId?: string;
  userId?: string;
  typeWorkout?: string;
  dateWorkout?: string;
  timeWorkout?: string;
  distance?: number;
  duration?: string;
  pace?: string;
}
