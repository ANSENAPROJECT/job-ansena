import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {useSelector} from 'react-redux';
import {fonts} from '../../utils/fonts';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const datenow = new Date().getDate();
const hournow = new Date().getHours();
const montNow = new Date().getMonth() + 1;

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
      <View>
        <View style={styles.header}>
          <Text style={styles.txtLeft}>{subjob}</Text>
          <Text style={styles.right}>{title}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 20,
          }}>
          <Text
            style={{
              ...styles.txtDeadline,
              color:
                statusButton === 'active overdue'
                  ? 'red'
                  : statusButton === 'overdue'
                  ? 'red'
                  : 'black',
            }}>
            {deadlinedate}
          </Text>
          {deadline.length == 0 ? null : statusButton != 'overdue' ? null : (
            <Text style={styles.txtOverdue}>OVERDUE</Text>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    height: 80,
    width: '100%',
    alignSelf: 'center',
    marginBottom: 20,
  },
  header: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },
  txtLeft: {
    fontSize: 20,
    fontFamily: fonts.SFProDisplayHeavy,
  },

  right: {
    fontSize: 11,
    fontFamily: fonts.SFProDisplayMedium,
    color: 'grey',
  },
  txtDeadline: {
    fontSize: 14,
    fontFamily: fonts.SFProDisplaySemiBold,
  },
  txtOverdue: {
    fontSize: 11,
    fontFamily: fonts.SFProDisplaySemiBold,
    color: 'red',
  },
});

export default HeaderTitle;
