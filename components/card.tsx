import { View, Text, StyleSheet } from "react-native";
import { colors, typography } from "@/styles/global";

interface CardProps {
  title: string;
  text: string;
}

export const Card = ({ title, text }: CardProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
        {title}
      </Text>
      <Text style={styles.text} numberOfLines={8} ellipsizeMode="tail">
        {text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 25,
    padding: 15,
    flex: 1,
    height: 260,
    overflow: 'hidden',
  },
  title: {
    ...typography.subtitle,
    color: "#000",
    marginBottom: 5,
    fontFamily: "Inter-Bold",
  },
  text: {
    ...typography.context,
    color: "#000",
    lineHeight: 20,
    flexShrink: 1,
  },
});
