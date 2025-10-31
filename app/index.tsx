import { View, Text } from "react-native";
import { typography } from "@/styles/global"

export default function Index() {
  return (
    <View>
      <Text
        style={typography.context}
      >
        Olá mundo!
      </Text>
    </View>
  );
}
