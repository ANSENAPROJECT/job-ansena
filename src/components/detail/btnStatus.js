import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {WaitingWhite} from '../../assets';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';

const ButtonStatus = ({status}) => {
  return (
    <View style={styles.container}>
      <Image source={WaitingWhite} style={styles.imgSize} />
      <Text style={styles.txtTitle}>{status}</Text>
    </View>
  );
};

export default ButtonStatus;

const styles = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: colors.btngrey,
    borderRadius: 15,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  imgSize: {height: 40, width: 40, marginRight: 10},
  txtTitle: {
    fontFamily: fonts.SFProDisplayMedium,
    color: 'white',
  },
});
