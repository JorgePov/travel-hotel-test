import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  initialColorMode: "light",
  useSystemColorMode: false,
  colors: {
    primary: {
      0: "#d4ecf7",
      50: "#9ed9f5",
      100: "#00b0e6",
      150: "#0084d1",
      200: "#013b93",
    },
    fontColor: {
      white: "#fff",
      black: '#000'
    },
    secundary: {
      0: '#ffb700'
    }
  },
});

export default theme;
