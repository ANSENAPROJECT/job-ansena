import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';

const HeaderTitle = () => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.txtHeader}>Beli Packing</Text>
        <Text style={styles.txtBottom}>IG POFF YOU</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.txtRow}>29 Jan 09:00</Text>
        <Text style={styles.rightRow}>ASSESSMENT NEEDED</Text>
      </View>
    </View>
  );
};

export default HeaderTitle;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  txtHeader: {fontFamily: fonts.SFProDisplayHeavy, fontSize: 20},
  txtBottom: {fontSize: 12, color: colors.txtGrey},
  txtRow: {fontFamily: fonts.SFProDisplayMedium, fontSize: 16},
  rightRow: {
    fontSize: 12,
    fontFamily: fonts.SFProDisplayMedium,
    color: colors.colorReportAcive,
  },
});
