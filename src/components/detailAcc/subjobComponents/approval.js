import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {colors} from '../../../utils/colors';
import {fonts} from '../../../utils/fonts';

const Approval = () => {
  const approval = useSelector((state) => state.detailjob.approval);

  const newApproval =
    approval &&
    approval.map((item) => {
      return item.approval;
    });

  return (
    <View style={styles.container}>
      <Text style={styles.txt}>Approval</Text>
      <Text style={styles.right}>
        {approval.length > 1 ? newApproval.join(' Then ') : approval.approval}
      </Text>
    </View>
  );
};

export default Approval;

const styles = StyleSheet.create({
  container: {
    height: 50,
    backgroundColor: colors.mainColor,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  txt: {
    color: colors.yellow,
    fontFamily: fonts.SFProDisplayMedium,
    fontSize: 16,
  },
});
