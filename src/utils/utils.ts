export function timestampToString(timestamp: {
  seconds: number;
  nanoseconds: number;
}): string {
  const fecha = new Date(timestamp.seconds * 1000);
  const mes = fecha.toLocaleString("default", { month: "short" });
  const dia = fecha.getDate().toString();
  return `${dia} ${mes}`;
}
