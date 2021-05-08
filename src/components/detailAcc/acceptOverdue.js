import axios from 'axios';
import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {AcceptOverdue} from '../../assets';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';
import {API_URL} from '@env';
import {connect, useSelector} from 'react-redux';
import qs from 'qs';
import {
  overdueHistory,
  statusButton,
} from '../../public/redux/ActionCreators/detailjob';

const auth = {
  headers: {
    Authorization:
      'key=AAAA9r5wtvs:APA91bEeoQGsG7xNX2CsOl7cBPjB2gfBbhZSpXaCN3vwPqGBxDRxUteZu_Eu3X62Wcq3ogf1Iv2O-xBOzC8t45CRu2dAerBzcOJ7n1Po1yQbE6ef896K3DY2AbrU_t27CEVeeIPuoaUj',
  },
};

const AcceptOverdueBtn = ({overdueHistoryRedux, statusButtonRedux}) => {
  const subjobId = useSelector((state) => state.detailjob.subjobId);
  const userId = useSelector((state) => state.auth.idUser);
  const checkCrew = useSelector((state) => state.detailjob.crew);
  console.log(checkCrew);
  const data = {
    subjobId: subjobId,
    userId: userId,
  };

  const submitOverdue = () => {
    axios
      .post(`${API_URL}/jzl/api/api/change_overdue`, qs.stringify(data))
      .then((res) => {
        console.log(res);
        for (let n = 0; n < checkCrew.length; n++) {
          console.log('ini adalah token yang dikirim', checkCrew[n].token);
          const token = checkCrew[n].token;
          const dataNotif = {
            to: token,
            priority: 'high',
            soundName: 'default',
            notification: {
              title: 'JOB',
              body: `Hai ${
                checkCrew[n].name.split(' ')[0]
              } your new deadline request has been approved`,
            },
          };
          axios
            .post(`https://fcm.googleapis.com/fcm/send`, dataNotif, auth)
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              console.log(err);
            });
        }
        const overdueHistory = res.data.overdueHistory;
        const status = res.data.statusButton;
        overdueHistoryRedux(overdueHistory);
        statusButtonRedux(status);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.8}
      onPress={() => {
        submitOverdue();
      }}>
      <Image source={AcceptOverdue} style={styles.imgSize} />
      <Text style={styles.txtTitle}>Accept Overdue Deadline</Text>
    </TouchableOpacity>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    overdueHistoryRedux: (data) => dispatch(overdueHistory(data)),
    statusButtonRedux: (data) => dispatch(statusButton(data)),
  };
};

export default connect(null, mapDispatchToProps)(AcceptOverdueBtn);

const styles = StyleSheet.create({
  container: {
    height: 60,
    borderRadius: 15,
    flexDirection: 'row',
    backgroundColor: colors.colorReportAcive,
    marginTop: 20,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  txtTitle: {
    fontFamily: fonts.SFProDisplayMedium,
    color: 'white',
  },
  imgSize: {height: 30, width: 30, marginRight: 10},
});
