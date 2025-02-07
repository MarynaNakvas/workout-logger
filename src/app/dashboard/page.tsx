"use client";

import { FC } from "react";
import WorkoutList from "./workout-list";

const Dashboard: FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <WorkoutList />
    </div>
  );
};

export default Dashboard;
