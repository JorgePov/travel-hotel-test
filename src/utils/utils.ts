import { Timestamp } from "firebase/firestore";

export function timestampToString(timestamp: {
  seconds: number;
  nanoseconds: number;
}): string {
  const fecha = new Date(timestamp.seconds * 1000);
  const mes = fecha.toLocaleString("default", { month: "short" });
  const dia = fecha.getDate().toString();
  return `${dia} ${mes}`;
}

export function timestampToStringFullDate(timestamp: Timestamp): string {
  const fecha = new Date(timestamp.seconds * 1000);

  const diasSemana = ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"];
  const diaSemana = diasSemana[fecha.getDay()];

  const dia = fecha.getDate();
  const mes = fecha.toLocaleString("default", { month: "short" });
  const año = fecha.getFullYear();

  return `${diaSemana}, ${dia} de ${mes} de ${año}`;
}

export function formatCurrency(amount: number): string {
  const formatter = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

  return formatter.format(amount).replace("$", "COP").replace(".", ",");
}

export function calculateDaysBetweenTimestamps(
  timestampStart: Timestamp,
  timestampEnd: Timestamp
): number {
  const dayToSeconds = 24 * 60 * 60;
  const secondsStart = timestampStart.seconds;
  const secondsEnd = timestampEnd.seconds;
  const diferenciaEnSegundos = Math.abs(secondsEnd - secondsStart);
  const countDays = Math.floor(diferenciaEnSegundos / dayToSeconds);
  console.log(countDays);
  return countDays;
}

export const roomTypeInvert = {
  shared: "Compartida",
  simple: "Sencilla",
  double: "Doble",
  family: "Familiar",
  suit: "Suit",
};

export const hours = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export const HotelImages = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmguiXZ0HrCNMjz0eLCvg1YSJjzodwBlOgmQ&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_ufHUNXdoiM4fV1rEsd-mQh5hFjuk4_0_-w&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPgNCg4C6nxruDxO4-MgDPe7e-EeMmir0OVA&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmguiXZ0HrCNMjz0eLCvg1YSJjzodwBlOgmQ&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPgNCg4C6nxruDxO4-MgDPe7e-EeMmir0OVA&usqp=CAU",
];

export const RoomImages = {
  shared:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrBCWqh7abKXxwXlLSETHl9CfDkOoaYT3vCg&usqp=CAU",
  simple:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFDSmsxrbehq7bFD_r8v1qHBI6rCHOO1eU9g&usqp=CAU",
  double:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThkzyDQfobop9FBCFJnlnVJrjqaSkkau94pA&usqp=CAU",
  family:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT69gYYDjLD3uSuL8buSQrEoJoEb_SbYY1z2g&usqp=CAU",
  suit: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPoJ6gwKSA3JVmn3pl8d_iIC04ryuGoNteMQ&usqp=CAU",
};
