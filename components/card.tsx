import { View, Text, StyleSheet } from "react-native";
import { colors, spacing, typography } from "@/styles/global";

interface CardProps {
  title: string;
  text: string;
}

export const Card = ({ title, text }: CardProps) => {
  return (
    <View style={styles.container}>
      <Text style={[typography.subtitle, { marginBottom: spacing.small }]}>{title}</Text>
      <Text style={typography.context}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 25,
    padding: spacing.medium,
  },
});
