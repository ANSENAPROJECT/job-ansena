import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {ArrowDown, Subjob} from '../../assets';
import Header from '../../components/detail/header';
import HeaderTitle from '../../components/detailAcc/headerTitle';
import SubjobDetail from '../../components/detailAcc/subjobDetail';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';

const DetailAdmin = () => {
  return (
    <View style={styles.container}>
      <Header />
      <HeaderTitle />
      <SubjobDetail />
    </View>
  );
};

export default DetailAdmin;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: colors.mainColor,
  },
});
