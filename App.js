import React, {useState, useEffect, useReducer} from 'react';
import {StyleSheet, KeyboardAvoidingView, Platform} from 'react-native';
// for IOS StatusBar
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

// import AsyncStorage from '@react-native-community/async-storage';

import DateHead from './components/DateHead';
import AddTodo from './components/AddTodo';
import Empty from './components/Empty';
import TodoList from './components/TodoList';
import todosStorage from './storages/todosStorage';

function App() {
  const today = new Date();

  const [todos, setTodos] = useState([
    {id: 1, text: '작업환경 설정', done: true},
    {id: 2, text: '리액트 네이티브 기초 공부', done: false},
    {id: 3, text: '투두리스트 만들어보기', done: false},
  ]);

  // // 데이터 불러오기 (데이터 저장보다 위에 있어야 함)
  // useEffect(() => {
  //   async function load() {
  //     try {
  //       const rawTodos = await AsyncStorage.getItem('todos');
  //       const savedTodos = JSON.parse(rawTodos);
  //       setTodos(savedTodos);
  //     } catch (e) {
  //       console.log('Failed to load todos');
  //     }
  //   }
  //   load();
  // }, []); // 배열이 비어있으면 마운트될 때 딱 한 번만 함수가 호출됨

  // // 데이터 저장
  // useEffect(() => {
  //   // console.log(todos);
  //   async function save() {
  //     try {
  //       await AsyncStorage.setItem('todos', JSON.stringify(todos));
  //     } catch (e) {
  //       console.log('Failed to load todos');
  //     }
  //   }
  //   save();
  // }, [todos]);

  //storage > todosStorage.js 사용
  useEffect(() => {
    todosStorage.get().then(setTodos).catch(console.error);
  }, []);

  useEffect(() => {
    todosStorage.set(todos).catch(console.error);
  }, [todos]);

  const onInsert = text => {
    // 새로 등록할 항목의 id를 구함
    // 등록된 항목 중에서 가장 큰 id를 구하고, 그 값에 1을 더함
    // 만약 리스트가 비어있다면 1을 id로 사용함

    const nextId =
      todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;

    const todo = {
      id: nextId,
      text,
      done: false,
    };

    setTodos(todos.concat(todo));

    console.log('Math.max() : ' + Math.max(...todos.map(todo => todo.id)));
    console.log('nextId : ' + nextId);
  };

  const onToggle = id => {
    const nextTodos = todos.map(todo =>
      todo.id === id ? {...todo, done: !todo.done} : todo,
    );
    setTodos(nextTodos);
  };

  const onRemove = id => {
    const nextTodos = todos.filter(todo => todo.id !== id);
    setTodos(nextTodos);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView edges={['bottom']} style={styles.block}>
        <KeyboardAvoidingView
          // behavior={Platform.OS === 'ios' ? 'padding' : undefined}  // 삼항연산자 이용 시
          behavior={Platform.select({ios: 'padding', android: undefined})}
          style={styles.avoid}>
          <DateHead date={today} />
          {todos.length === 0 ? (
            <Empty />
          ) : (
            <TodoList todos={todos} onToggle={onToggle} onRemove={onRemove} />
          )}
          <AddTodo onInsert={onInsert} />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    backgroundColor: 'white',
  },
  avoid: {
    flex: 1,
  },
});

export default App;
