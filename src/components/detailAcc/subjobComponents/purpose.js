import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {colors} from '../../../utils/colors';
import {fonts} from '../../../utils/fonts';

const Purpose = () => {
  const purpose = useSelector((state) => state.detailjob.purpose);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Purpose</Text>
      <Text style={styles.rowTxt}>{purpose}</Text>
    </View>
  );
};

export default Purpose;

const styles = StyleSheet.create({
  container: {
    minHeight: 50,
    backgroundColor: colors.mainColor,
    borderRadius: 15,
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  title: {
    fontFamily: fonts.SFProDisplayMedium,
    color: 'grey',
    fontSize: 16,
    marginBottom: 10,
  },
  rowTxt: {
    fontFamily: fonts.SFProDisplayMedium,
    color: 'grey',
    fontSize: 14,
    marginBottom: 10,
  },
});
