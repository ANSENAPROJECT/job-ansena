import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  Pressable,
  Dimensions,
  BackHandler,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Header from '../../components/detail/header';
import ReportHistory from '../../components/detail/reportHistory';
import OverdueHistory from '../../components/detail/overdueHistory';
import HeaderTitle from '../../components/detailAcc/headerTitle';
import SubjobDetail from '../../components/detailAcc/subjobDetail';
import Revise from '../../components/detailAcc/revise';
import {
  deleteAll,
  detailJob,
  overdueHistory,
  reportHistory,
  statusButton,
  timeReport,
} from '../../public/redux/ActionCreators/detailjob';
import {
  addProgressReport,
  addProgressReportGalery,
} from '../../public/redux/ActionCreators/progressReport';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';
import {API_URL} from '@env';
import {connect, useSelector} from 'react-redux';
import Collapsible from 'react-native-collapsible';
import LatestReport from '../../components/detailAcc/latesReport';
import MarkAsDone from '../../components/detailAcc/markAsDone';
import Modal from 'react-native-modal';
import ImagePicker from 'react-native-image-crop-picker';
import {Camera, Galery} from '../../assets';
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const DetailAdmin = ({
  navigation,
  route,
  detailJobRedux,
  reportHistoryRedux,
  overdueHistoryRedux,
  timeReportRedux,
  statusButtonRedux,
  deleteAllRedux,
  addProgresReportRedux,
  addProgressReportGaleryRedux,
}) => {
  const idUser = useSelector((state) => state.auth.idUser);
  const [modalupload, setModalupload] = useState(false);
  const [images, setImages] = useState([]);
  const status = useSelector((state) => state.detailjob.statusButton);
  const reportProgress = useSelector((state) => state.progressreport);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const backAction = () => {
      deleteAllRedux();
      navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const getData = () => {
    const id = route.params;
    axios
      .get(`${API_URL}/jzl/api/api/detail_subjob/${id}/${idUser}`)
      .then((res) => {
        console.log('Ini dari halaman parent detail', res.data);
        const data = {
          jobId: res.data.data.jobId,
          subjobId: res.data.data.subjobId,
          subjob: res.data.data.subjob,
          title: res.data.data.title,
          deadline: res.data.data.deadlineView,
          approval: res.data.data.approval,
          assessor: res.data.data.assessor,
          purpose: res.data.data.purpose,
          image: res.data.data.image,
          crew: res.data.data.crew,
          remind: res.data.data.remind,
        };

        const reportHistory = res.data.data.reportHistory;
        const overdueHistory = res.data.data.overdueHistory;
        const timeReport = res.data.data.timeReport;
        const statusButton = res.data.data.statusButton;
        detailJobRedux(data);
        reportHistoryRedux(reportHistory);
        overdueHistoryRedux(overdueHistory);
        timeReportRedux(timeReport);
        statusButtonRedux(statusButton);
      })
      .catch(({response}) => {
        console.log('Ini response', response);
      });
  };

  const _ModalUpload = () => {
    setModalupload(!modalupload);
  };

  // camera
  const pickSingleWithCamera = (cropping, mediaType = 'photo') => {
    ImagePicker.openCamera({
      cropping: cropping,
      width: 200,
      height: 200,
      includeExif: true,
      mediaType,
    })
      .then((img) => {
        if (images.length < 1) {
          const data = {
            image: {
              uri: img.path,
              width: img.width,
              height: img.height,
              mime: img.mime,
            },
            desc: '',
          };
          addProgresReportRedux(data);
        } else {
          const data = {
            image: {
              uri: img.path,
              width: img.width,
              height: img.height,
              mime: img.mime,
            },
            desc: '',
          };
          addProgresReportRedux(data);
        }
      })
      .catch((e) => console.log(e));
  };

  //Galery
  const pickMultiple = () => {
    ImagePicker.openPicker({
      multiple: true,
      waitAnimationEnd: false,
      sortOrder: 'desc',
      includeExif: true,
      forceJpg: true,
    })
      .then((img) => {
        if (images.length < 1) {
          // addProgresReportRedux();
          let data = img.map((i) => {
            return {
              image: {
                uri: i.path,
                width: i.width,
                height: i.height,
                mime: i.mime,
              },
              desc: '',
            };
          });
          addProgressReportGaleryRedux(data);
        } else {
          let data = img.map((i) => {
            console.log(i);
            return {
              image: {
                uri: i.path,
                width: i.width,
                height: i.height,
                mime: i.mime,
              },
              desc: '',
            };
          });
          addProgressReportGaleryRedux(data);
        }
      })
      .catch((e) => console.log(e));
  };

  return (
    <>
      <ScrollView style={styles.container}>
        <Header navigation={navigation} />
        <HeaderTitle />
        <SubjobDetail />
        <ReportHistory />
        <OverdueHistory />
        <LatestReport />
        <MarkAsDone />
        <Revise _ModalUpload={_ModalUpload} />
      </ScrollView>

      <Modal isVisible={modalupload} onBackdropPress={_ModalUpload}>
        <View style={{flex: 1, justifyContent: 'flex-end'}}>
          <View style={styles.containerModal}>
            <Pressable
              style={{alignItems: 'center'}}
              activeOpacity={0.6}
              onPress={() => pickSingleWithCamera()}>
              <Image source={Camera} style={styles.imgSize} />
              <Text style={{fontFamily: fonts.SFProDisplayMedium}}>Camera</Text>
            </Pressable>
            <Pressable
              style={{alignItems: 'center'}}
              activeOpacity={0.6}
              onPress={pickMultiple}>
              <Image source={Galery} style={styles.imgSize} />
              <Text style={{fontFamily: fonts.SFProDisplayMedium}}>Galery</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    detailJobRedux: (data) => dispatch(detailJob(data)),
    reportHistoryRedux: (data) => dispatch(reportHistory(data)),
    overdueHistoryRedux: (data) => dispatch(overdueHistory(data)),
    timeReportRedux: (data) => dispatch(timeReport(data)),
    statusButtonRedux: (data) => dispatch(statusButton(data)),
    deleteAllRedux: () => dispatch(deleteAll()),
    addProgresReportRedux: (data) => dispatch(addProgressReport(data)),
    addProgressReportGaleryRedux: (data) =>
      dispatch(addProgressReportGalery(data)),
  };
};

export default connect(null, mapDispatchToProps)(DetailAdmin);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: colors.mainColor,
  },
  imgSize: {
    height: 50,
    width: 50,
  },
  containerModal: {
    height: 100,
    width: deviceWidth,
    backgroundColor: 'white',
    alignSelf: 'center',
    marginBottom: -20,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
