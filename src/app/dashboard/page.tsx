"use client";

import { FC } from "react";
import Head from "next/head";
import WorkoutList from "@/components/workout-list";

const Dashboard: FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <Head>
        <title>Workout Logger - Login</title>
        <meta name="description" content="Login to Workout Logger" />
      </Head>

      <WorkoutList />
    </div>
  );
};

export default Dashboard;
