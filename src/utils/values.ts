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
