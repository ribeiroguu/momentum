import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { colors, typography } from "@/styles/global";
import { Task } from "@/types";

interface TaskCardProps {
  task: Task;
  onPress: () => void;
}

export const TaskCard = ({ task, onPress }: TaskCardProps) => {
  const completedCount = task.items.filter(item => item.completed).length;
  const totalCount = task.items.length;
  const progress = totalCount > 0 ? `${completedCount}/${totalCount}` : "0 itens";

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
        {task.title}
      </Text>
      <Text style={styles.progress}>
        {progress}
      </Text>
      {totalCount > 0 && (
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { width: `${(completedCount / totalCount) * 100}%` }
            ]} 
          />
        </View>
      )}
    </TouchableOpacity>
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
    justifyContent: 'space-between',
  },
  title: {
    ...typography.subtitle,
    color: "#000",
    marginBottom: 5,
    fontFamily: "Inter-Bold",
  },
  progress: {
    ...typography.context,
    color: colors.secondary,
    marginTop: 'auto',
    marginBottom: 10,
    fontFamily: "Inter-Regular",
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
});
