export default function calculateTimeElapsed(date) {
  const timeinSeconds =
    (new Date().getTime() - new Date(date).getTime()) / 1000;
  if (timeinSeconds >= 86400)
    return Math.floor(timeinSeconds / 86400) > 1
      ? `${Math.floor(timeinSeconds / 86400)} days`
      : `${Math.floor(timeinSeconds / 86400)} day`;
  if (timeinSeconds >= 3600)
    return Math.floor(timeinSeconds / 3600) > 1
      ? `${Math.floor(timeinSeconds / 3600)} hours`
      : `${Math.floor(timeinSeconds / 3600)} hour`;
  if (timeinSeconds >= 60)
    return Math.floor(timeinSeconds / 60) > 1
      ? `${Math.floor(timeinSeconds / 60)} mins`
      : `${Math.floor(timeinSeconds / 60)} min`;
  return Math.floor(timeinSeconds) + " seconds";
}
