export function timestampToString(timestamp: {
  seconds: number;
  nanoseconds: number;
}): string {
  const fecha = new Date(timestamp.seconds * 1000);
  const mes = fecha.toLocaleString("default", { month: "short" });
  const dia = fecha.getDate().toString();
  return `${dia} ${mes}`;
}


export const hours = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

