import { extendTheme } from "@chakra-ui/react";
import { Theme } from "../types/setting-context";

export const getThemeValue = (theme: Theme): Record<string, any> => {
  switch (theme) {
    case('dark'): {
      return extendTheme(DarkTheme);
    }
    case('light'): {
      return extendTheme(LightTheme);
    }
    case('high-contrast'): {
      return extendTheme(HighContrastTheme);
    }
    default: {
      return extendTheme(LightTheme);
    }
  }
}

export const LightTheme = {
  initialColorMode: 'light',
  styles: {}
};

export const DarkTheme = {
  initialColorMode: 'dark',
  styles: {}
};

export const HighContrastTheme = {
  initialColorMode: 'dark',
  colors: {
    white: "black",
    teal: {
      400: "aqua",
      500: "yellow",
      600: "yellow",
    },
    gray: {
      100: "transparent"
    }
  },
  components: {
    Button: {
      variants: {
        solid: {
          color: "aqua",
          bg: "transparent",
          border: "1px solid aqua",
          _active: {
            bg: "transparent",
            color: "orange",
            border: "1px solid orange",
          },
          _hover: {
            bg: "transparent",
            color: "yellow",
            borderColor: "yellow"
          },
        },
        outline: {
          color: "aqua",
          bg: "transparent",
          border: "1px solid aqua",
          _active: {
            bg: "transparent",
            color: "orange",
            border: "1px solid orange",
          },
          _hover: {
            bg: "transparent",
            color: "yellow",
            borderColor: "yellow"
          },
        },
        ghost: {
          color: "aqua",
          border: "1px solid transparent",
          _active: {
            bg: "transparent",
            color: "orange",
            border: "1px solid orange",
          },
          _hover: {
            bg: "transparent",
            color: "yellow",
            borderColor: "yellow"
          },
        }
      }
    },
  },
  styles: {
    global: () => ({
      body: {
        bg: "#000000",
        color: "#ffffff"
      }
    })
  }
};