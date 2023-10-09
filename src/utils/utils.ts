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

export const HotelImages = ['https://res.cloudinary.com/simpleview/image/upload/v1654733490/clients/orlandofl/5900_pool_b92df465-0c67-4161-b8bb-67f9fc301094.jpg', 'https://amenitiz.com/wp-content/uploads/2022/10/dbnsfzkttcktgyk78guu.jpg', 'https://e00-elmundo.uecdn.es/assets/multimedia/imagenes/2022/06/15/16552986712590.jpg', 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/19/a7/df/d7/melia-cartagena-karmairi.jpg?w=1200&h=-1&s=1', 'https://content.r9cdn.net/himg/70/f9/2b/leonardo-1127329-Swimming_Pool_Night1_O-818158.jpg']

