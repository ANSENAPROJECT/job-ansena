import axios from 'axios';
import React from 'react';
import {Image, StyleSheet, Text, View, ToastAndroid} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {connect, useSelector} from 'react-redux';
import {ReportDone} from '../../assets';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';
import {API_URL} from '@env';
import qs from 'qs';
import {
  reportHistory,
  statusButton,
} from '../../public/redux/ActionCreators/detailjob';

const auth = {
  headers: {
    Authorization:
      'key=AAAA9r5wtvs:APA91bEeoQGsG7xNX2CsOl7cBPjB2gfBbhZSpXaCN3vwPqGBxDRxUteZu_Eu3X62Wcq3ogf1Iv2O-xBOzC8t45CRu2dAerBzcOJ7n1Po1yQbE6ef896K3DY2AbrU_t27CEVeeIPuoaUj',
  },
};

const MarkAsDone = ({statusButtonRedux, statusReportHistoryRedux}) => {
  const subjobId = useSelector((state) => state.detailjob.subjobId);
  const idUser = useSelector((state) => state.auth.idUser);
  const approval = useSelector((state) => state.detailjob.approval);
  const status = useSelector((state) => state.detailjob.statusButton);
  const coadminStatus = useSelector((state) => state.auth.coadminStatus);
  const adminStatus = useSelector((state) => state.auth.adminStatus);
  const checkCrew = useSelector((state) => state.detailjob.crew);
  const name = useSelector((state) => state.auth.name);
  const showToast = (msg) => {
    ToastAndroid.showWithGravityAndOffset(
      msg,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
  };
  const data = {
    subjobId,
    userId: idUser,
  };

  const submitDone = () => {
    axios
      .post(`${API_URL}/jzl/api/api/mark_as_done`, qs.stringify(data))
      .then((res) => {
        console.log('INi adalah response', res.data.statusButton);
        let newToken;
        let nameToken;
        if (`${coadminStatus}` === 'true') {
          newToken = approval[1].token;
          nameToken = approval[1].approval;
        } else {
          newToken = approval[0].token;
          nameToken = approval[0].approval;
        }
        const dataNotif = {
          to: newToken,
          priority: 'high',
          soundName: 'default',
          notification: {
            title: 'JOB',
            body: `Hai ${
              nameToken.split(' ')[0]
            } You've got a job report from ${name}`,
          },
        };
        if (`${adminStatus}` === 'true') {
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
                } Your job has been marked as done`,
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
        } else {
          axios
            .post(`https://fcm.googleapis.com/fcm/send`, dataNotif, auth)
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              console.log(err);
            });
        }
        statusButtonRedux(res.data.statusButton);
        statusReportHistoryRedux(res.data.reportHistory);
        showToast('Submit Done !');
      })
      .catch(({response}) => {
        console.log(response);
      });
  };

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.8}
      onPress={submitDone}>
      <Image source={ReportDone} style={styles.imgSize} />
      <Text style={styles.txt}>Mark As Correct</Text>
    </TouchableOpacity>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    statusButtonRedux: (data) => dispatch(statusButton(data)),
    statusReportHistoryRedux: (data) => dispatch(reportHistory(data)),
  };
};

export default connect(null, mapDispatchToProps)(MarkAsDone);

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
