import { background, extendTheme, ThemeConfig } from "@chakra-ui/react";
import { mode, StyleFunctionProps } from "@chakra-ui/theme-tools";

// const config = {
//   initialColorMode: "dark",
//   useSystemColorMode: false,
// };

const switchColorScheme = "#0066FF";

export const colors = {
  white: "#F4F5F6",
  accent: "#75fbfd",
  meta: "#777E90",
  primaryBg: {
    light: "#fff",
    dark: "#141416",
  },
  secondaryBg: {
    light: "#777E90",
    dark: "#23262F",
  },
  primaryText: {
    light: "#23262F",
    dark: "#FCFCFD",
  },
  secondaryText: {
    light: "#b1b5c3",
    dark: "#b1b0b1",
  },
  selectedSwitch: {
    50: switchColorScheme,
    100: switchColorScheme,
    200: switchColorScheme,
    300: switchColorScheme,
    400: switchColorScheme,
    500: switchColorScheme,
    600: switchColorScheme,
    700: switchColorScheme,
    800: switchColorScheme,
    900: switchColorScheme,
  },
  selected: "#0066FF",
  "selected-alt": "#15FDC0",
  error: "#FF5050",
  link: "#40a9ff",
  border: "#353945",
};

const layerStyles = {
  gradient: {
    background:
      "linear-gradient(71deg, rgba(0, 0, 0, 0.325) 44.24%, rgba(95, 99, 101, 0.0014453) 71.79%)",
  },
  card: {
    overflow: "hidden",
    borderRadius: "lg",
  },
  pill: {
    height: "30px",
    borderRadius: "2xl",
    bg: "accent",
    color: "primaryText.light",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "xs",
    px: 4,
    py: 2,
  },
  coverImage: {
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height: "100%",
  },
  outlined: {
    borderRadius: "lg",
    borderColor: "border",
    borderWidth: "1px",
    borderStyle: "solid",
  },
};

const TEXT_MARGIN = "0 0 1em 0 !important";

const radii = {
  none: "0",
  sx: "1px",
  sm: "2px",
  md: "4px",
  lg: "6px",
  xl: "12px",
  "2xl": "24px",
  "3xl": "90px",
};

export const theme = extendTheme({
  colors,
  layerStyles,
  //   config,
  radii,
});
