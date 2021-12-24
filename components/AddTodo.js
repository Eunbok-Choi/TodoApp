import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Image,
  Platform,
  TouchableOpacity,
  TouchableNativeFeedback,
  Keyboard,
} from 'react-native';

function AddTodo({onInsert}) {
  const [text, setText] = useState('');

  const onPress = () => {
    onInsert(text);
    setText('');
    Keyboard.dismiss(); // button 눌렀을 시 키보드 사라짐
  };

  const button = (
    <View style={styles.buttonStyle}>
      <Image source={require('../assets/icons/add_white/add_white.png')} />
    </View>
  );

  return (
    <View style={styles.block}>
      <TextInput
        placeholder="할일을 입력하세요."
        style={styles.input}
        value={text}
        onChangeText={setText}
        onSubmitEditing={onPress} // Enter 눌렀을 시 키보드 사라짐
        returnKeyType="done" // Enter 타입 지정
      />
      {Platform.select({
        ios: <TouchableOpacity onPress={onPress}>{button}</TouchableOpacity>,
        android: (
          <View style={styles.circleWrapper}>
            <TouchableNativeFeedback onPress={onPress}>
              {button}
            </TouchableNativeFeedback>
          </View>
        ),
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    backgroundcolor: 'white',
    height: 64,
    paddingHorizontal: 16, // 좌우 여백
    bordercolor: '#bdbdbd',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    alignItems: 'center', //상하 정렬
    flexDirection: 'row',
  },
  input: {
    flex: 1, // TextInput 란 확장
    fontSize: 16,
    paddingVertical: 8, // 상하 터치영역 확장
  },
  buttonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 48,
    height: 48,
    backgroundColor: '#26a69a',
    borderRadius: 24,
  },
  circleWrapper: {
    overflow: 'hidden', // 지정한 영역 외 바깥 영역 숨김
    borderRadius: 24,
  },
});

export default AddTodo;
