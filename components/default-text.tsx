import { Text, TextProps } from "react-native";

export function DefaultText(props: TextProps) {
  return (
    <Text
      {...props}
      style={[
        {
          color: "#fff",
          fontFamily: "sans-serif",
        },
        props.style,
      ]}
    />
  );
}
