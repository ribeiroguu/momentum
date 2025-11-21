import React, { createContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Task, TaskItem } from "@/types";

interface TasksContextData {
  tasks: Task[];
  loading: boolean;
  addTask: (title: string) => Promise<Task>;
  updateTask: (id: string, title: string, items: TaskItem[]) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  getTask: (id: string) => Task | undefined;
  addTaskItem: (taskId: string, text: string) => Promise<void>;
  toggleTaskItem: (taskId: string, itemId: string) => Promise<void>;
  deleteTaskItem: (taskId: string, itemId: string) => Promise<void>;
}

export const TasksContext = createContext<TasksContextData>({} as TasksContextData);

const TASKS_STORAGE_KEY = "@momentum:tasks";

interface TasksProviderProps {
  children: ReactNode;
}

export function TasksProvider({ children }: TasksProviderProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    try {
      const storedTasks = await AsyncStorage.getItem(TASKS_STORAGE_KEY);
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    } catch (error) {
      console.error("Error loading tasks:", error);
    } finally {
      setLoading(false);
    }
  }

  async function saveTasks(newTasks: Task[]) {
    try {
      await AsyncStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(newTasks));
      setTasks(newTasks);
    } catch (error) {
      console.error("Error saving tasks:", error);
    }
  }

  async function addTask(title: string): Promise<Task> {
    const newTask: Task = {
      id: Date.now().toString(),
      title: title || "Tarefa sem título",
      items: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    const updatedTasks = [newTask, ...tasks];
    await saveTasks(updatedTasks);
    return newTask;
  }

  async function updateTask(id: string, title: string, items: TaskItem[]) {
    const updatedTasks = tasks.map((task) =>
      task.id === id
        ? { ...task, title, items, updatedAt: Date.now() }
        : task
    );
    await saveTasks(updatedTasks);
  }

  async function deleteTask(id: string) {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    await saveTasks(updatedTasks);
  }

  function getTask(id: string): Task | undefined {
    return tasks.find((task) => task.id === id);
  }

  async function addTaskItem(taskId: string, text: string) {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        const newItem: TaskItem = {
          id: Date.now().toString(),
          text,
          completed: false,
        };
        return {
          ...task,
          items: [...task.items, newItem],
          updatedAt: Date.now(),
        };
      }
      return task;
    });
    await saveTasks(updatedTasks);
  }

  async function toggleTaskItem(taskId: string, itemId: string) {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          items: task.items.map((item) =>
            item.id === itemId ? { ...item, completed: !item.completed } : item
          ),
          updatedAt: Date.now(),
        };
      }
      return task;
    });
    await saveTasks(updatedTasks);
  }

  async function deleteTaskItem(taskId: string, itemId: string) {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          items: task.items.filter((item) => item.id !== itemId),
          updatedAt: Date.now(),
        };
      }
      return task;
    });
    await saveTasks(updatedTasks);
  }

  return (
    <TasksContext.Provider
      value={{
        tasks,
        loading,
        addTask,
        updateTask,
        deleteTask,
        getTask,
        addTaskItem,
        toggleTaskItem,
        deleteTaskItem,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
}
