import { View, Text, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { colors, typography } from "@/styles/global";
import { TaskCard } from "@/components/task-card";
import { Link, router } from "expo-router";
import { useTasks } from "@/hooks/useTasks";
import { Plus } from "lucide-react-native";

export default function TasksScreen() {
  const { tasks, loading, addTask } = useTasks();

  const handleCreateTask = async () => {
    const newTask = await addTask("Nova Tarefa");
    router.push(`/task-page?id=${newTask.id}`);
  };

  const handleTaskPress = (id: string) => {
    router.push(`/task-page?id=${id}`);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  // Organizar tarefas em pares para exibição em grade
  const taskRows: typeof tasks[] = [];
  for (let i = 0; i < tasks.length; i += 2) {
    taskRows.push(tasks.slice(i, i + 2));
  }

  return (
    <View style={styles.container}>
      <View style={styles.contentWrapper}>
        <Text style={[typography.title, { marginBottom: -15, marginTop: 35 }]}>
          Minhas Tarefas
        </Text>

        <View style={styles.containerSwitch}>
          <Link asChild href="/notes">
            <TouchableOpacity
              style={styles.switch}
            >
              <Text style={[typography.letter, styles.switchText]}>
                Notas
              </Text>
            </TouchableOpacity>
          </Link>

          <Link asChild href="/tasks">
            <TouchableOpacity
              style={styles.switchCurrent}
            >
              <Text style={[typography.letter, styles.switchTextCurrent]}>
                Tarefas
              </Text>
            </TouchableOpacity>
          </Link>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {tasks.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Nenhuma tarefa ainda</Text>
              <Text style={styles.emptySubtext}>Toque no botão + para criar sua primeira tarefa</Text>
            </View>
          ) : (
            taskRows.map((row, rowIndex) => (
              <View key={rowIndex} style={styles.cardsRow}>
                {row.map((task) => (
                  <TaskCard 
                    key={task.id} 
                    task={task}
                    onPress={() => handleTaskPress(task.id)}
                  />
                ))}
                {row.length === 1 && <View style={{ flex: 1 }} />}
              </View>
            ))
          )}
        </ScrollView>

        <TouchableOpacity style={styles.fab} onPress={handleCreateTask}>
          <Plus size={28} color={colors.text} />
        </TouchableOpacity>
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
    justifyContent: 'center',
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
    paddingBottom: 100,
    gap: 15,
    flexGrow: 1,
  },
  cardsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 15,
    width: "100%",
    flexWrap: "nowrap",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    ...typography.subtitle,
    color: colors.white,
    fontFamily: "Inter-Bold",
    marginBottom: 10,
  },
  emptySubtext: {
    ...typography.context,
    color: colors.white,
    fontFamily: "Inter-Regular",
    textAlign: 'center',
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
