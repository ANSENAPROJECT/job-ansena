import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {ReportDone} from '../../assets';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';

const MarkAsDone = () => {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.8}>
      <Image source={ReportDone} style={styles.imgSize} />
      <Text style={styles.txt}>Mark As Done</Text>
    </TouchableOpacity>
  );
};

export default MarkAsDone;

const styles = StyleSheet.create({
  container: {
    height: 60,
    borderRadius: 15,
    backgroundColor: colors.colorReportAcive,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  imgSize: {height: 30, width: 30, marginRight: 10},
  txt: {
    fontFamily: fonts.SFProDisplayMedium,
    color: 'white',
    fontSize: 16,
  },
});
