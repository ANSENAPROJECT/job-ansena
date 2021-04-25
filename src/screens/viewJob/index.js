import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Header from '../../components/detail/header';

const ViewJob = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
    </View>
  );
};

export default ViewJob;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});
