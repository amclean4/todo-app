import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, FlatList, Text, View, Platform } from 'react-native';
import { CheckBox, Input, Button } from '@rneui/themed';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? 25 : 0,
    padding: 10,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    marginRight: 10,
  },
});

export default function App() {
  const [tasks, setTasks] = useState([
    { key: '1', description: 'Learn React Native', completed: false },
    { key: '2', description: 'Build a TODO app', completed: true },
  ]);
  const [newTask, setNewTask] = useState('');

  const renderItem = ({ item }) => (
    <View style={styles.taskItem}>
      <CheckBox
        checked={item.completed}
        onPress={() => {
          const updatedTasks = tasks.map((task) =>
            task.key === item.key ? { ...task, completed: !task.completed } : task
          );
          setTasks(updatedTasks);
        }}
      />
      <Text style={{ textDecorationLine: item.completed ? 'line-through' : 'none' }}>
        {item.description}
      </Text>
    </View>
  );

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([
        ...tasks,
        { key: String(Date.now()), description: newTask, completed: false },
      ]);
      setNewTask('');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <Input
          style={styles.input}
          placeholder="Add new task"
          value={newTask}
          onChangeText={setNewTask}
          onSubmitEditing={addTask}
        />
        <Button title="Add" onPress={addTask} />
      </View>
      <FlatList data={tasks} renderItem={renderItem} />
    </SafeAreaView>
  );
}