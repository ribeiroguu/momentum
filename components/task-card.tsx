import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { colors, typography } from "@/styles/global";

interface TaskCardProps {
  tasks: Array<{ id: string; title: string; completed: boolean }>;
}

export const TaskCard = ({ tasks }: TaskCardProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tarefas do dia</Text>

      <View style={styles.tasksList}>
        {tasks.map((task) => (
          <TouchableOpacity
            key={task.id}
            style={styles.taskItem}
            onPress={() => console.log(`Tarefa ${task.id} pressionada`)}
          >
            <View style={[
              styles.checkbox,
              task.completed && styles.checkboxCompleted
            ]} />
            <Text style={[
              styles.taskText,
              task.completed && styles.taskTextCompleted
            ]}>
              {task.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 25,
    padding: 15,
    flex: 1,
    minHeight: 260,
    overflow: 'hidden',
  },
  title: {
    fontSize: 20,
    fontFamily: "Inter-Bold",
    color: "#000",
    marginBottom: 15,
  },
  tasksList: {
    gap: 10,
  },
  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E5E5E5",
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 15,
    gap: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#000",
    backgroundColor: "transparent",
  },
  checkboxCompleted: {
    backgroundColor: "#4CAF50",
    borderColor: "#4CAF50",
  },
  taskText: {
    fontSize: 16,
    fontFamily: "Inter-Regular",
    color: "#000",
    flex: 1,
  },
  taskTextCompleted: {
    textDecorationLine: "line-through",
    color: "#666",
  },
});
