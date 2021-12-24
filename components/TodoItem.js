import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Touchable,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

function TodoItem({id, text, done, onToggle, onRemove}) {
  // useEffect(() => {
  //   console.log('컴포넌트가 마운트될 때 출력됨');
  //   return () => {
  //     console.log('컴포넌트가 언마운트될 때 출력됨');
  //   };
  // }, []);

  const remove = () => {
    // 제목, 내용
    Alert.alert('삭제', '정말로 삭제하시겠어요?', [
      // 왼쪽 버튼
      {text: '취소', onPress: () => {}, style: 'cancel'},
      // 오른쪽 버튼
      {
        text: '삭제',
        onPress: () => {
          onRemove(id);
        },
        style: 'destuctive',
      },
    ]);
  };

  return (
    <View style={styles.item}>
      <TouchableOpacity
        onPress={() => {
          onToggle(id);
          // console.log('id : ' + Platform.OS + ' / ' + id);
        }}>
        <View style={[styles.circle, done && styles.filled]}>
          {done && (
            <Image
              source={require('../assets/icons/check_white/check_white.png')}
            />
          )}
        </View>
      </TouchableOpacity>
      <Text style={[styles.text, done && styles.lineThrough]}>{text}</Text>
      {done ? (
        // <TouchableOpacity
        //   onPress={() => {
        //     onRemove(id);
        //   }}>
        //   <Icon name="delete" size={32} color="red" />
        // </TouchableOpacity>

        <TouchableOpacity onPress={remove}>
          <Icon name="delete" size={32} color="red" />
        </TouchableOpacity>
      ) : (
        <View style={styles.removePlaceholder} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#26a69a',
    marginRight: 16,
  },
  filled: {
    alignItems: 'center',
    backgroundColor: '#26a69a',
  },
  text: {
    flex: 1,
    fontSize: 16,
    color: '#212121',
  },
  lineThrough: {
    color: '#9e9e9e',
    textDecorationLine: 'line-through',
  },

  // 내용이 긴 경우 텍스트 영역이 달라지는 것을 막기 위함
  removePlaceholder: {
    width: 32,
    height: 32,
  },
});

export default TodoItem;
