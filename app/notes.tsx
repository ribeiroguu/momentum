import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, typography } from "@/styles/global";
import { Card } from "@/components/card";
import { Link } from "expo-router"

export default function Home() {
  return (
    <View style={styles.container}>
      <View style={styles.contentWrapper}>
        <Text style={[typography.title, { marginBottom: -15, marginTop: 35 }]}>
          Minhas Notas
        </Text>

        <View style={styles.containerSwitch}>
          <Link asChild href="/notes">
            <TouchableOpacity
              onPress={() => console.log("Notas pressionado")}
              style={styles.switchCurrent}
            >
              <Text style={[typography.letter, styles.switchTextCurrent]}>
                Notas
              </Text>
            </TouchableOpacity>
          </Link>

          <Link asChild href="/tasks">
            <TouchableOpacity
              onPress={() => console.log("Tarefas pressionado")}
              style={styles.switch}
            >
              <Text style={[typography.letter, styles.switchText]}>
                Tarefas
              </Text>
            </TouchableOpacity>
          </Link>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.cardsRow}>
            <Card
              title="Olá mundo e todos"
              text="kdawkdhawkdjhawkdhakwhdakwhdakwdhakwdhakwdhawkdhawkdhawkdhawkdhakwdhakwdhakwjhdkawhdakwdh"
            />
            <Card
              title="Segunda nota"
              text="Conteúdo da segunda nota com informações importantes"
            />
          </View>

          <View style={styles.cardsRow}>
            <Card
              title="Terceira nota"
              text="Mais conteúdo interessante aqui"
            />
            <Card
              title="Quarta nota"
              text="Última nota de exemplo"
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  contentWrapper: {
    width: "90%",
    gap: 15,
    flex: 1,
  },
  containerSwitch: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 15,
  },
  switch: {
    flex: 1,
    borderRadius: 1000,
    backgroundColor: colors.background,
    borderColor: colors.white,
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 10,
    alignItems: "center",
  },
  switchCurrent: {
    flex: 1,
    borderRadius: 1000,
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 10,
    alignItems: "center",
  },
  switchText: {
    fontFamily: "Inter-Regular",
    textAlign: "center",
  },
  switchTextCurrent: {
    fontFamily: "Inter-Bold",
    textAlign: "center",
  },
  scrollContent: {
    paddingBottom: 20,
    gap: 15,
  },
  cardsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 15,
    width: "100%",
    flexWrap: "nowrap",
  },
});
