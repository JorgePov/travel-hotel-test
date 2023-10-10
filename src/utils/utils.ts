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
