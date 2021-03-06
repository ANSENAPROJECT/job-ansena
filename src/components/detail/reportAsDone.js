import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import Collapsible from 'react-native-collapsible';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {connect, useSelector} from 'react-redux';
import {
  ArrowDownWhite,
  ReportDone,
  ReportDone1,
  ArrowDownBlue,
  CoAdmin,
  Image1,
  StopFill,
} from '../../assets';
import {
  deleteProgress,
  deleteProgressReport,
  updateProgressReport,
} from '../../public/redux/ActionCreators/progressReport';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';
import {API_URL} from '@env';
import {
  reportHistory,
  statusButton,
} from '../../public/redux/ActionCreators/detailjob';
import {Modal} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';

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

const config = {
  headers: {
    'Content-type': 'multipart/form-data',
  },
};

const auth = {
  headers: {
    Authorization:
      'key=AAAA9r5wtvs:APA91bEeoQGsG7xNX2CsOl7cBPjB2gfBbhZSpXaCN3vwPqGBxDRxUteZu_Eu3X62Wcq3ogf1Iv2O-xBOzC8t45CRu2dAerBzcOJ7n1Po1yQbE6ef896K3DY2AbrU_t27CEVeeIPuoaUj',
  },
};

const ReportAsDone = ({
  _ModalUpload,
  deleteProgressRedux,
  updateProgressRedux,
  reportHistoryRedux,
  statusButtonRedux,
  deleteAllProgressRedux,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [collapse, setCollapse] = useState(true);
  const statusButton = useSelector((state) => state.detailjob.statusButton);
  const deadline = useSelector((state) => state.detailjob.deadline);
  const dateDeadline = deadline.length === 0 ? '' : deadline.split(' ')[0];
  const monthDeadline =
    deadline.length === 0 ? '' : monthNames[Number(deadline.split(' ')[1]) - 1];
  const hourDeadline = deadline.length === 0 ? '' : deadline.split(' ')[2];
  const deadlinedate = `${dateDeadline} ${monthDeadline} ${hourDeadline}`;
  const progressreport = useSelector(
    (state) => state.progressreport.img_request,
  );
  const [descrip, setDescrip] = useState('');
  const [check, setCheck] = useState('');
  const [description, setDescription] = useState('');
  const jobId = useSelector((state) => state.detailjob.jobId);
  const subjobId = useSelector((state) => state.detailjob.subjobId);
  const userId = useSelector((state) => state.auth.idUser);
  const approval = useSelector((state) => state.detailjob.approval);
  const assessor = useSelector((state) => state.detailjob.assessor);
  const name = useSelector((state) => state.auth.name);
  const showToastWithGravity = (msg) => {
    ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.BOTTOM);
  };

  const renderAsset = (image, index) => {
    return renderImage(image, index);
  };
  const [visible, setIsVisible] = useState(false);
  const [renderImg, setRenderImg] = useState('');

  const renderImage = (image, index) => {
    return (
      <>
        <View>
          <TouchableOpacity
            style={{position: 'relative'}}
            onPress={() => {
              setRenderImg(image.uri);
              setIsVisible(true);
            }}>
            <Image source={image} style={styles.imgStyle} />
          </TouchableOpacity>
          <Pressable
            style={{position: 'absolute', left: -5, top: -5}}
            onPress={() => {
              deleteProgressRedux(index);
            }}>
            <Image source={StopFill} style={{height: 25, width: 25}} />
          </Pressable>
        </View>
      </>
    );
  };

  const handleInput = (index, desc) => {
    setCheck(index);
    setDescrip(desc);
  };

  const handleUpdateDesc = (descript, image) => {
    const data = {
      desc: descrip,
      image: image,
    };
    updateProgressRedux(data);
  };

  const handleUpload = () => {
    setIsLoading(true);
    if (description == '') {
      showToastWithGravity('Field description must be filled in');
      setIsLoading(false);
    } else if (progressreport.length === 0) {
      showToastWithGravity('Image must be filled in');
      setIsLoading(false);
    } else {
      const data = new FormData();
      data.append('jobId', `${jobId}`);
      data.append('subjobId', `${subjobId}`);
      data.append('userId', `${userId}`);
      data.append('note_report', `${description}`);
      progressreport.forEach((item) => {
        data.append('img_report[]', {
          name: item.image.uri.split('/').pop(),
          type: item.image.mime,
          uri: item.image.uri,
        });
      });
      progressreport.forEach(({desc}) => {
        data.append('desc[]', desc);
      });

      console.log(data);

      axios
        .post(`${API_URL}/jzl/api/api/report_as_done`, data, config)
        .then((res) => {
          console.log(res);
          let newToken;
          let nameToken;
          if (assessor.length === 0) {
            newToken = approval[0].token;
            nameToken = approval[0].approval;
          } else {
            newToken = assessor.token;
            nameToken = assessor.name;
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
          axios
            .post(`https://fcm.googleapis.com/fcm/send`, dataNotif, auth)
            .then((res) => {
              console.log(res);
              setIsLoading(false);
            })
            .catch((err) => {
              console.log(err);
            });
          setIsLoading(false);
          reportHistoryRedux(res.data.data.reportHistory);
          statusButtonRedux(res.data.data.statusButton);
          deleteAllProgressRedux();
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor:
          statusButton === 'overdue'
            ? colors.btngrey
            : collapse
            ? 'blue'
            : 'white',
        // backgroundColor: collapse ? 'blue' : 'white',
      }}>
      <TouchableOpacity
        disabled={statusButton === 'overdue' ? true : false}
        style={styles.btnContainer}
        activeOpacity={0.6}
        onPress={() => {
          setCollapse(!collapse);
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={collapse ? ReportDone : ReportDone1}
            style={styles.iconImg}
          />
          <Text
            style={{
              fontFamily: fonts.SFProDisplayMedium,
              color: collapse ? 'white' : colors.colorReportAcive,
            }}>
            Report As Done
          </Text>
        </View>
        <Image
          source={collapse ? ArrowDownWhite : ArrowDownBlue}
          style={styles.iconArrow}
        />
      </TouchableOpacity>
      <Collapsible collapsed={collapse}>
        <View style={{minHeight: 300, paddingHorizontal: 5}}>
          <View style={styles.reportTime}>
            <Text style={styles.txtCollapse}>Finish Time</Text>
            <Text style={styles.txtCollapse}>{deadlinedate}</Text>
          </View>
          <View style={styles.containerDesc}>
            <TextInput
              multiline={true}
              placeholder="Add Description"
              onChangeText={(text) => setDescription(text)}
            />
          </View>
          <View style={styles.containerUpload}>
            <Text style={styles.txtImgReport}>Image Report</Text>
            {progressreport.length < 1 ? null : (
              <View>
                {progressreport &&
                  progressreport.map(({image, desc}, index) => {
                    return (
                      <View style={styles.imgDesc} key={index}>
                        {renderAsset(image, index)}
                        <View style={styles.rowInput}>
                          <TextInput
                            multiline
                            placeholder="Image Description"
                            style={{maxWidth: 150}}
                            value={check === index ? descrip : desc}
                            onChangeText={(text) => setDescrip(text)}
                            onEndEditing={() => {
                              handleUpdateDesc(descrip, image);
                            }}
                            onFocus={() => {
                              handleInput(index, desc);
                            }}
                          />
                        </View>
                      </View>
                    );
                  })}
              </View>
            )}
            <TouchableOpacity
              onPress={() => {
                _ModalUpload();
              }}>
              <Text style={styles.txtAdd}>Add Image...</Text>
            </TouchableOpacity>
          </View>
          {isLoading ? (
            <TouchableOpacity style={styles.btnDone}>
              <ActivityIndicator size="small" color="white" />
              <Text style={{...styles.txtBtn, marginLeft: 10}}>
                Please Wait ...
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.btnDone}
              activeOpacity={0.6}
              onPress={() => {
                handleUpload();
              }}>
              <Text style={styles.txtBtn}>Report as Done</Text>
            </TouchableOpacity>
          )}
        </View>
      </Collapsible>

      <Modal visible={visible} transparent={true}>
        <ImageViewer
          enableSwipeDown={true}
          useNativeDriver
          imageUrls={[{url: renderImg}]}
          onSwipeDown={() => {
            setIsVisible(false);
          }}
        />
      </Modal>
    </View>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteProgressRedux: (data) => dispatch(deleteProgressReport(data)),
    updateProgressRedux: (data) => dispatch(updateProgressReport(data)),
    reportHistoryRedux: (data) => dispatch(reportHistory(data)),
    statusButtonRedux: (data) => dispatch(statusButton(data)),
    deleteAllProgressRedux: () => dispatch(deleteProgress()),
  };
};

export default connect(null, mapDispatchToProps)(ReportAsDone);

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
    minHeight: 60,
    borderRadius: 15,
    paddingHorizontal: 20,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
  },
  iconImg: {height: 30, width: 30, marginRight: 10},
  iconArrow: {height: 10, width: 15},
  reportTime: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  txtCollapse: {color: 'grey', fontFamily: fonts.SFProDisplayMedium},
  containerDesc: {
    minHeight: 100,
    backgroundColor: colors.mainColor,
    marginTop: 20,
    borderRadius: 15,
    paddingHorizontal: 10,
  },
  txtImgReport: {
    fontFamily: fonts.SFProDisplayMedium,
    color: '#6C6C6C',
    marginBottom: 10,
  },
  containerUpload: {
    minHeight: 100,
    marginTop: 20,
    borderRadius: 15,
    padding: 20,
    backgroundColor: colors.mainColor,
  },
  txtAdd: {
    fontFamily: fonts.SFProDisplayMedium,
    color: colors.colorReportAcive,
  },
  btnDone: {
    height: 40,
    backgroundColor: colors.colorReportAcive,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    flexDirection: 'row',
  },
  txtBtn: {
    fontFamily: fonts.SFProDisplayMedium,
    color: 'white',
  },
  imgUpload: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  imgUploadSize: {height: 90, width: 90, borderRadius: 25},
  txtDescContainer: {
    maxHeight: 100,
    width: 130,
  },
  imgDesc: {
    height: 100,
    flexDirection: 'row',
    marginVertical: 10,
  },
  imgStyle: {height: 100, width: 100, borderRadius: 30},
  rowInput: {
    height: 120,
    marginLeft: 10,
  },
});
