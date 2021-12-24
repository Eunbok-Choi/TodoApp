import React from 'react';
import {View, Text, StyleSheet, StatusBar} from 'react-native';

// for IOS StatusBar
import {useSafeAreaInsets} from 'react-native-safe-area-context';

function DateHead() {
  const d = new Date();
  const year = d.getFullYear();
  const month = d.getMonth() + 1; // getMonth 범위 : 0 ~ 11 까지
  const day = d.getDate();

  const formatted = `${year}년 ${month}월 ${day}일`;

  const {top} = useSafeAreaInsets();

  return (
    <>
      <View style={[styles.statusBarPlaceholder, {height: top}]} />
      <StatusBar backgroundColor="#26a69a" barStyle="light-content" />
      <View style={styles.block}>
        <Text style={styles.dateText}>
          {year}년 {month}월 {day}일
        </Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  statusBarPlaceholder: {
    backgroundColor: '#26a69a',
  },
  block: {
    padding: 16,
    backgroundColor: '#26a69a',
  },
  dateText: {
    fontSize: 24,
    color: 'white',
  },
});

export default DateHead;
