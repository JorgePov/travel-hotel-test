export function timestampToString(timestamp: {
  seconds: number;
  nanoseconds: number;
}): string {
  const fecha = new Date(timestamp.seconds * 1000);
  const mes = fecha.toLocaleString("default", { month: "short" });
  const dia = fecha.getDate().toString();
  return `${dia} ${mes}`;
}

export const hours = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export const HotelImages = [
  "https://amenitiz.com/wp-content/uploads/2022/10/dbnsfzkttcktgyk78guu.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmguiXZ0HrCNMjz0eLCvg1YSJjzodwBlOgmQ&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_ufHUNXdoiM4fV1rEsd-mQh5hFjuk4_0_-w&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPgNCg4C6nxruDxO4-MgDPe7e-EeMmir0OVA&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmguiXZ0HrCNMjz0eLCvg1YSJjzodwBlOgmQ&usqp=CAU",
];
