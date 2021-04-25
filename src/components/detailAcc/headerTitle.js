import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';

const monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'June',
  'July',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const HeaderTitle = () => {
  const subjob = useSelector((state) => state.detailjob.subjob);
  const title = useSelector((state) => state.detailjob.title);
  const deadline = useSelector((state) => state.detailjob.deadline);
  const statusButton = useSelector((state) => state.detailjob.statusButton);
  const dateDeadline = deadline.length === 0 ? '' : deadline.split(' ')[0];
  const monthDeadline =
    deadline.length === 0 ? '' : monthNames[Number(deadline.split(' ')[1]) - 1];
  const hourDeadline = deadline.length === 0 ? '' : deadline.split(' ')[2];
  const deadlinedate = `${dateDeadline} ${monthDeadline} ${hourDeadline}`;

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.txtHeader}>{subjob}</Text>
        <Text style={styles.txtBottom}>{title}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.txtRow}>{deadlinedate}</Text>
        <Text style={styles.rightRow}>
          {statusButton != 'waiting report'
            ? 'Assessment Needed'
            : statusButton != 'waiting revision report'
            ? 'Assessment Needed'
            : statusButton}
        </Text>
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
