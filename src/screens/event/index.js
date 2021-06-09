import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Event = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.txt}>Coming Soon.</Text>
    </View>
  );
};

export default Event;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txt: {
    fontSize: 40,
  },
});
