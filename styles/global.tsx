import { StyleSheet } from "react-native";

export const colors = {
  primary: "#302489",
  secondary: "#4F4F4F",
  shadow: "#393939",
  background: "#282828",
  text: "#fff",
  error: "#D90000",
};

export const spacing = {
  small: 8,
  medium: 16,
  large: 24,
};

export const typography = StyleSheet.create({
  title: {
    color: colors.text,
    fontSize: 64,
    fontFamily: "Inter-Bold",
  },
  subtitle: {
    color: colors.text,
    fontSize: 32,
    fontFamily: "Inter-Bold",
  },
  context: {
    color: colors.text,
    fontSize: 16,
    fontFamily: "Inter-Regular",
  },
  letter: {
    color: colors.text,
    fontSize: 20,
    fontFamily: "Inter-Regular",
  },
});
