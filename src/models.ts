export interface User {
  objectId?: string;
  name: string;
  email: string;
  password?: string;
  idToken?: string;
  photo?: any;
}

export interface Workout {
  objectId?: string;
  userId?: string;
  dateWorkout?: string;
  distance?: number;
  duration?: string;
  pace?: string;
}
