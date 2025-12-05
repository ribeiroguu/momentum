import React, { useState, useEffect, useCallback, memo, FC } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Plus, ArrowLeft, Trash2, X } from 'lucide-react-native';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ListRenderItem,
  TextInput,
  Alert,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useTasks } from '@/hooks/useTasks';
import { colors, typography } from '@/styles/global';
import { TaskItem as TaskItemType } from '@/types';

interface TaskItemProps {
  item: TaskItemType;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const TaskItem: FC<TaskItemProps> = memo(function TaskItem({ item, onToggle, onDelete }) {
  return (
    <View style={styles.taskButton}>
      <TouchableOpacity
        style={styles.taskContent}
        onPress={() => onToggle(item.id)}
      >
        <View style={[styles.circle, item.completed && styles.circleDone]}>
          {item.completed && <View style={styles.innerCircle} />}
        </View>
        <Text style={[styles.taskText, item.completed && styles.taskTextDone]}>
          {item.text}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onDelete(item.id)} style={styles.deleteButton}>
        <X size={20} color={colors.secondary} />
      </TouchableOpacity>
    </View>
  );
});

export default function TaskPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getTask, updateTask, deleteTask, addTaskItem, toggleTaskItem, deleteTaskItem } = useTasks();
  
  const [task, setTask] = useState<ReturnType<typeof getTask>>(undefined);
  const [title, setTitle] = useState('');
  const [newItemText, setNewItemText] = useState('');
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  useEffect(() => {
    if (id) {
      const currentTask = getTask(id);
      if (currentTask) {
        setTask(currentTask);
        setTitle(currentTask.title);
      }
    }
  }, [id, getTask]);


  useEffect(() => {
    if (id) {
      const currentTask = getTask(id);
      setTask(currentTask);
    }
  }, [id, getTask]);

  const handleSaveTitle = async () => {
    if (id && task) {
      await updateTask(id, title || 'Tarefa sem título', task.items);
      setIsEditingTitle(false);
    }
  };

  const handleAddItem = async () => {
    if (id && newItemText.trim()) {
      await addTaskItem(id, newItemText.trim());
      setNewItemText('');
      const updatedTask = getTask(id);
      setTask(updatedTask);
    }
  };

  const handleToggleItem = useCallback(async (itemId: string) => {
    if (id) {
      await toggleTaskItem(id, itemId);
      const updatedTask = getTask(id);
      setTask(updatedTask);
    }
  }, [id, toggleTaskItem, getTask]);

  const handleDeleteItem = useCallback(async (itemId: string) => {
    if (id) {
      await deleteTaskItem(id, itemId);
      const updatedTask = getTask(id);
      setTask(updatedTask);
    }
  }, [id, deleteTaskItem, getTask]);

  const handleDeleteTask = () => {
    Alert.alert(
      'Apagar tarefa',
      'Tem certeza que deseja apagar esta tarefa?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Apagar',
          style: 'destructive',
          onPress: async () => {
            if (id) {
              await deleteTask(id);
              router.back();
            }
          },
        },
      ]
    );
  };

  const renderItem: ListRenderItem<TaskItemType> = useCallback(({ item }) => (
    <TaskItem item={item} onToggle={handleToggleItem} onDelete={handleDeleteItem} />
  ), [handleToggleItem, handleDeleteItem]);

  if (!task) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyText}>Nenhuma tarefa encontrada</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={26} color={colors.text} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleDeleteTask} style={styles.backButton}>
          <Trash2 size={24} color={colors.error} />
        </TouchableOpacity>
      </View>

      {isEditingTitle ? (
        <View style={styles.titleEditContainer}>
          <TextInput
            style={styles.titleInput}
            value={title}
            onChangeText={setTitle}
            onBlur={handleSaveTitle}
            autoFocus
            placeholder="Título da tarefa"
            placeholderTextColor={colors.secondary}
          />
        </View>
      ) : (
        <TouchableOpacity onPress={() => setIsEditingTitle(true)}>
          <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
      )}

      <View style={styles.addItemContainer}>
        <TextInput
          style={styles.addItemInput}
          value={newItemText}
          onChangeText={setNewItemText}
          placeholder="Nova tarefa..."
          placeholderTextColor={colors.secondary}
          onSubmitEditing={handleAddItem}
          returnKeyType="done"
        />
        <TouchableOpacity onPress={handleAddItem} style={styles.addItemButton}>
          <Plus size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={task.items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.taskContainer}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhum item adicionado</Text>
        }
        contentContainerStyle={task.items.length === 0 ? { flex: 1, justifyContent: 'center' } : { paddingBottom: 20 }}
      />

      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 10,
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  backButton: {
    width: 50,
    height: 50,
    borderRadius: 15,
    backgroundColor: colors.shadow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    ...typography.subtitle,
    color: colors.text,
    marginTop: 10,
    marginBottom: 10,
    lineHeight: 45,
    fontFamily: 'Inter-Bold',
  },
  titleEditContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  titleInput: {
    ...typography.subtitle,
    color: colors.text,
    fontFamily: 'Inter-Bold',
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
  },
  addItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.shadow,
    borderRadius: 20,
    paddingHorizontal: 15,
    marginBottom: 20,
    gap: 10,
  },
  addItemInput: {
    flex: 1,
    ...typography.context,
    color: colors.text,
    fontFamily: 'Inter-Regular',
    paddingVertical: 12,
  },
  addItemButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskContainer: {
    flex: 1,
  },
  taskButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.shadow,
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginBottom: 12,
  },
  taskContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  circle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: colors.text,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleDone: {
    borderColor: colors.secondary,
  },
  innerCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.secondary,
  },
  taskText: {
    ...typography.context,
    color: colors.text,
    fontFamily: 'Inter-Regular',
    flex: 1,
  },
  taskTextDone: {
    color: colors.secondary,
    textDecorationLine: 'line-through',
  },
  deleteButton: {
    padding: 5,
  },
  emptyText: {
    ...typography.context,
    color: colors.secondary,
    textAlign: 'center',
    fontFamily: 'Inter-Regular',
  },
});
