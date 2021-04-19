import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  BackHandler,
  Alert,
} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import {Camera, Galery} from '../../assets';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';
import {API_URL} from '@env';
import {connect, useSelector} from 'react-redux';
import {
  deleteAll,
  detailJob,
  overdueHistory,
  reportHistory,
  statusButton,
  timeReport,
} from '../../public/redux/ActionCreators/detailjob';
import ButtonStatus from '../../components/detail/btnStatus';
import Header from '../../components/detail/header';
import HeaderTitle from '../../components/detail/headerTitle';
import Approval from '../../components/detail/approval';
import CoAssessor from '../../components/detail/coAssessor';
import Purpose from '../../components/detail/purpose';
import ImageGalery from '../../components/detail/imageGalery';
import CrewList from '../../components/detail/crewList';
import Reminded from '../../components/detail/remind';
import ReportHistory from '../../components/detail/reportHistory';
import OverdueHistory from '../../components/detail/overdueHistory';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const DetailJob = ({
  navigation,
  route,
  detailJobRedux,
  reportHistoryRedux,
  overdueHistoryRedux,
  statusButtonRedux,
  timeReportRedux,
  deleteAllRedux,
}) => {
  const [modalupload, setModalupload] = useState(false);
  const [modaluploadOverdue, setModaluploadOverdue] = useState(false);
  const [images, setImages] = useState([]);

  const idUser = useSelector((state) => state.auth.idUser);
  const status = useSelector((state) => state.detailjob.statusButton);

  console.log(status);

  const _ModalUpload = () => {
    setModalupload(!modalupload);
  };

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

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    const id = route.params;
    axios
      .get(`${API_URL}/jzl/api/api/detail_subjob/${id}/${idUser}`)
      .then((res) => {
        console.log('Ini dari halaman parent detail', res.data);
        const data = {
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

  //Camera
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
          setImages([
            ...images,
            {
              uri: img.path,
              width: img.width,
              height: img.height,
              mime: img.mime,
            },
          ]);
        } else {
          // console.log('gambar sudah lebih dari 1');
          setImages([
            ...images,
            {
              uri: img.path,
              width: img.width,
              height: img.height,
              mime: img.mime,
            },
          ]);
        }
      })
      .catch((e) => console.log(e));
  };

  let StatusBtn;
  if (status === 'waiting assessment') {
    StatusBtn = <ButtonStatus status={status} />;
  } else {
    StatusBtn = null;
  }

  return (
    <>
      <ScrollView style={styles.container}>
        <Header navigation={navigation} />
        <HeaderTitle />
        <Approval />
        <CoAssessor />
        <Purpose />
        <ImageGalery />
        <CrewList />
        <Reminded />
        <ReportHistory />
        <OverdueHistory />
        {/* {StatusBtn}
        {status === 'waiting assessment' ? null : (
          <>
            <ReportAsDone _ModalUpload={_ModalUpload} />
            <Overdue _ModalUpload={_ModalUpload} />
          </>
        )} */}
      </ScrollView>

      {/* Modal */}
      <Modal isVisible={modalupload} onBackdropPress={_ModalUpload}>
        <View style={{flex: 1, justifyContent: 'flex-end'}}>
          <View style={styles.containerModal}>
            <TouchableOpacity
              style={{alignItems: 'center'}}
              activeOpacity={0.6}
              onPress={pickSingleWithCamera}>
              <Image source={Camera} style={styles.imgSize} />
              <Text style={{fontFamily: fonts.SFProDisplayMedium}}>Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{alignItems: 'center'}}
              activeOpacity={0.6}>
              <Image source={Galery} style={styles.imgSize} />
              <Text style={{fontFamily: fonts.SFProDisplayMedium}}>Galery</Text>
            </TouchableOpacity>
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
    statusButtonRedux: (data) => dispatch(statusButton(data)),
    timeReportRedux: (data) => dispatch(timeReport(data)),
    deleteAllRedux: () => dispatch(deleteAll()),
  };
};
export default connect(null, mapDispatchToProps)(DetailJob);

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.main,
    flex: 1,
    paddingHorizontal: 20,
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
