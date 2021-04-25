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

const AcceptOverdueBtn = ({overdueHistoryRedux, statusButtonRedux}) => {
  const subjobId = useSelector((state) => state.detailjob.subjobId);
  const userId = useSelector((state) => state.auth.idUser);

  const data = {
    subjobId: subjobId,
    userId: userId,
  };

  const submitOverdue = () => {
    axios
      .post(`${API_URL}/jzl/api/api/change_overdue`, qs.stringify(data))
      .then((res) => {
        console.log(res);
        const overdueHistory = res.data.overdueHistory;
        const status = res.data.statusButton;
        overdueHistoryRedux(overdueHistory);
        statusButtonRedux(status);
      })
      .catch((err) => {
        console.log(err.response);
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
