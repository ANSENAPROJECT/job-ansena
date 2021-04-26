import axios from 'axios';
import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
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

const MarkAsDone = ({statusButtonRedux, statusReportHistoryRedux}) => {
  const subjobId = useSelector((state) => state.detailjob.subjobId);
  const idUser = useSelector((state) => state.auth.idUser);

  // console.log(subjobId, idUser);

  const data = {
    subjobId,
    userId: idUser,
  };

  const submitDone = () => {
    axios
      .post(`${API_URL}/jzl/api/api/mark_as_done`, qs.stringify(data))
      .then((res) => {
        console.log('INi adalah response', res.data.statusButton);
        statusButtonRedux(res.data.statusButton);
        statusReportHistoryRedux(res.data.reportHistory);
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
