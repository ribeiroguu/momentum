import { StatusBar } from 'expo-status-bar';
import { Plus, ArrowLeft } from 'lucide-react-native'
import React, { useState, useCallback, memo, FC } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ListRenderItem,
} from 'react-native';

type Task = {
  id: number;
  text: string;
  done: boolean;
};

interface TaskItemProps {
  task: Task;
  onToggle: (id: number) => void;
}

const TaskItem: FC<TaskItemProps> = memo(function TaskItem({ task, onToggle }) {
  console.log('Renderizando TaskItem:', task.id);

  return (
    <TouchableOpacity
      style={styles.taskButton}
      onPress={() => onToggle(task.id)}
    >
      <View style={[styles.circle, task.done && styles.circleDone]}>
        {task.done && <View style={styles.innerCircle} />}
      </View>
      <Text style={[styles.taskText, task.done && styles.taskTextDone]}>
        {task.text}
      </Text>
    </TouchableOpacity>
  );
});

export function TaskPage() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const toggleTask = useCallback((id: number) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  }, []);

  const addTask = useCallback(() => {
    setTasks(prevTasks => {
      const newId = Date.now();
      const newTask: Task = {
        id: newId,
        text: `Tarefa #${prevTasks.length + 1}`,
        done: false
      };
      return [...prevTasks, newTask];
    });
  }, []);

  const renderItem: ListRenderItem<Task> = useCallback(({ item }) => (
    <TaskItem task={item} onToggle={toggleTask} />
  ), [toggleTask]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <ArrowLeft size={26} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Título da tarefa</Text>

      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.taskContainer}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhuma tarefa ainda :c</Text>
        }
        contentContainerStyle={tasks.length === 0 ? { flex: 1, justifyContent: 'center' } : {}}
      />

      <TouchableOpacity style={styles.addButton} onPress={addTask}>
        <Plus size={36} color="#FFFFFF" />
      </TouchableOpacity>

      <StatusBar style="light" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#3C3C3C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 40,
    marginBottom: 30,
    lineHeight: 45,
  },
  taskContainer: {
    flex: 1,
  },
  taskButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3C3C3C',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginBottom: 12,
  },
  circle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleDone: {
    borderColor: '#8F8F8F',
  },
  innerCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#8F8F8F',
  },
  taskText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  taskTextDone: {
    color: '#8F8F8F',
    textDecorationLine: 'line-through',
  },
  addButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#3C3C3C',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  emptyText: {
    color: '#888',
    fontSize: 16,
    textAlign: 'center',
  },
});
