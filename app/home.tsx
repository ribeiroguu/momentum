import { View, Text, ScrollView } from 'react-native';
import { colors, spacing, typography } from "@/styles/global";
import { Card } from "@/components/card";

export default function Home() {
  return (
    <View>
      <Text>Minhas Notas</Text>

      <View>

      </View>

      <ScrollView>
        <Card
        title= "Olá mundo"
        text = "Oi"
        />
      </ScrollView>
    </View>
  );
}
