import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { colors, spacing, typography } from "@/styles/global";
import { Link } from "expo-router";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={typography.title}>Seja
      criativo
      com o seu
      Dia a Dia</Text>

      <Link asChild href="/home">
        <TouchableOpacity
          onPress={() => console.log("Button pressed")}
          style={styles.button}
        >
          <Text style={[typography.letter, {fontFamily: "Inter-Bold"}]}>Começar agora</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: colors.background,
    paddingHorizontal: spacing.medium,
    paddingBottom: spacing.large,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.medium,
    borderRadius: 1000,
    width: "100%",
    alignItems: "center",
    marginBottom: spacing.medium,
  },
});
