import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function TaskPage() {
  // Começa sem nenhuma tarefa
  const [tasks, setTasks] = useState([]);

  // Alterna o estado da tarefa (feito / não feito)
  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, done: !task.done } : task
    ));
  };

  // Adiciona uma nova tarefa
  const addTask = () => {
    const newId = tasks.length + 1;
    const newTask = { id: newId, text: `Tarefa ${String(newId).padStart(2, '0')}`, done: false };
    setTasks([...tasks, newTask]);
  };

  return (
    <View style={styles.container}>
      {/* Cabeçalho com seta */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="arrow-back" size={26} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Título principal */}
      <Text style={styles.title}>Título da tarefa</Text>

      {/* Lista de tarefas com scroll */}
      <ScrollView style={styles.taskContainer}>
        {tasks.length === 0 ? (
          <Text style={styles.emptyText}>Nenhuma tarefa ainda :c</Text>
        ) : (
          tasks.map(task => (
            <TouchableOpacity
              key={task.id}
              style={styles.taskButton}
              onPress={() => toggleTask(task.id)}
            >
              <View style={[styles.circle, task.done && styles.circleDone]}>
                {task.done && <View style={styles.innerCircle} />}
              </View>
              <Text
                style={[
                  styles.taskText,
                  task.done && styles.taskTextDone
                ]}
              >
                {task.text}
              </Text>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

      {/* Botão flutuante de adicionar */}
      <TouchableOpacity style={styles.addButton} onPress={addTask}>
        <Ionicons name="add" size={36} color="#FFFFFF" />
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
}

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
    marginTop: 50,
  },
});
