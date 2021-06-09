import React, {useState} from 'react';
import {Image} from 'react-native';
import {StyleSheet, Text, View, ToastAndroid} from 'react-native';
import Collapsible from 'react-native-collapsible';
import Modal from 'react-native-modal';
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import {connect, useSelector} from 'react-redux';
import {
  ArrowDown,
  ArrowDownBlue,
  ArrowDownWhite,
  ArrowUpRed,
  ArrowUpView,
  CoAdminView,
  CrewView,
  DateStart,
  DeadlineEnd,
  DeadlineStart,
  LeaderView,
  Subjob,
} from '../../assets';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';
import {Pressable} from 'react-native';
import {API_URL} from '@env';
import axios from 'axios';
import qs from 'qs';
import {
  activeJobGroup,
  deactivatedJobGroup,
  inactiveJobGroup,
} from '../../public/redux/ActionCreators/viewjob';
import {Alert} from 'react-native';
import {Platform} from 'react-native';

const ActiveJobs = ({
  activeJobRedux,
  inactiveJobRedux,
  deactiveJobRedux,
  navigation,
}) => {
  const [collapse, setCollapse] = useState(true);
  const [collapseChild, setCollapseChild] = useState(true);
  const [collapseDeactive, setCollapseDeactive] = useState(true);
  const [checkCollapse, setCheckCollapse] = useState('');
  const activeJob = useSelector((state) => state.viewjob.activeJobGroup);
  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleDeactive, setIsVisibleDeactive] = useState(false);
  const [note, setNote] = useState('');
  const idUser = useSelector((state) => state.auth.idUser);

  const showToast = (msg) => {
    Platform.OS === 'ios'
      ? Alert.alert(msg)
      : ToastAndroid.showWithGravityAndOffset(
          msg,
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
          25,
          50,
        );
  };

  const handleSubmit = () => {
    if (note === '') {
      showToast('Note must be filled in');
    } else {
      setIsVisibleDeactive(true);
    }
  };
  const submitDeactive = () => {
    const data = {
      note_deactivate: note,
      jobId: checkCollapse,
      userId: idUser,
      action: 1,
    };
    axios
      .post(`${API_URL}/jzl/api/api/action_view`, qs.stringify(data))
      .then((res) => {
        console.log(res);
        setIsVisibleDeactive(false);
        activeJobRedux(res.data.data.active);
        inactiveJobRedux(res.data.data.inactive);
        deactiveJobRedux(res.data.data.deactivate);
        if (res.data.data.active.length === 0) {
          setCollapse(true);
        }
      })
      .then(({response}) => {
        console.log(response);
      });
  };

  return (
    <>
      <TouchableOpacity
        disabled={activeJob.length === 0 ? true : false}
        style={styles.container}
        onPress={() => {
          setCollapse(!collapse);
        }}>
        <Text style={styles.titleTxt}>Active Job Groups</Text>
        <Image source={ArrowUpView} style={styles.iconArrow} />
      </TouchableOpacity>
      <Collapsible collapsed={collapse}>
        <View
          style={{minHeight: 40, marginTop: 10}}
          showsVerticalScrollIndicator={false}>
          {activeJob &&
            activeJob.map(
              (
                {
                  coadmin,
                  create,
                  crew,
                  dateEnd,
                  dateStart,
                  jobId,
                  leader,
                  status,
                  subjob,
                  title,
                },
                index,
              ) => {
                return (
                  <View style={styles.containerCollapse} key={index}>
                    <TouchableOpacity
                      style={styles.titleCollapse}
                      onPress={() => {
                        setCollapseChild(!collapseChild);
                        if (collapseChild === true) {
                          setCheckCollapse(jobId);
                        } else {
                          setCheckCollapse('');
                        }
                      }}>
                      <Text style={{fontFamily: fonts.SFProDisplayBold}}>
                        {title}
                      </Text>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text
                          style={{
                            fontFamily: fonts.SFProDisplayMedium,
                            color: colors.badgeBlue,
                          }}>
                          active
                        </Text>
                        <Image
                          source={ArrowDown}
                          style={styles.iconArrowChild}
                        />
                      </View>
                    </TouchableOpacity>
                    <Collapsible
                      collapsed={checkCollapse == jobId ? false : true}>
                      <View style={{minHeight: 200, backgroundColor: 'white'}}>
                        {/* Header */}
                        <View style={styles.headerCollapse}>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <Image source={Subjob} style={styles.imgSize} />
                            <Text style={styles.txtTitleCollapse}>
                              Sub Jobs
                            </Text>
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <Text style={styles.txtTitleRight}>{subjob}</Text>
                            <Image
                              source={ArrowDownBlue}
                              style={styles.iconArrowRight}
                            />
                          </View>
                        </View>
                        {/* Body */}
                        <View style={{marginTop: 20}}>
                          <View
                            style={{...styles.flexJustify, marginBottom: 20}}>
                            <View style={{...styles.flexRow, flex: 1}}>
                              <Image
                                source={DateStart}
                                style={styles.imgSize}
                              />
                              <Text>{create}</Text>
                            </View>
                            <View style={{...styles.flexRow, flex: 1}}>
                              <Image
                                source={CoAdminView}
                                style={styles.imgSize}
                              />
                              <Text>{coadmin}</Text>
                            </View>
                          </View>
                          <View
                            style={{...styles.flexJustify, marginBottom: 20}}>
                            <View style={{...styles.flexRow, flex: 1}}>
                              <Image
                                source={DeadlineStart}
                                style={styles.imgSize}
                              />
                              <Text>{dateStart}</Text>
                            </View>
                            <View style={{...styles.flexRow, flex: 1}}>
                              <Image
                                source={DeadlineEnd}
                                style={styles.imgSize}
                              />
                              <Text>{dateEnd}</Text>
                            </View>
                          </View>
                          <View
                            style={{...styles.flexJustify, marginBottom: 20}}>
                            <View style={{...styles.flexRow, flex: 1}}>
                              <Image source={CrewView} style={styles.imgSize} />
                              <Text>{crew}</Text>
                            </View>
                            <View style={{...styles.flexRow, flex: 1}}>
                              <Image
                                source={LeaderView}
                                style={styles.imgSize}
                              />
                              <Text>{leader}</Text>
                            </View>
                          </View>
                        </View>

                        {/* Bottom */}
                        <TouchableOpacity
                          activeOpacity={0.8}
                          style={{
                            ...styles.btnBottom,
                            backgroundColor: colors.colorReportAcive,
                            alignItems: 'center',
                          }}
                          onPress={() => {
                            setIsVisible(true);
                          }}>
                          <Text style={{...styles.txtWhite, color: 'white'}}>
                            Duplicate Job Group
                          </Text>
                          <Image
                            source={ArrowDownWhite}
                            style={{
                              ...styles.iconArrowChild,
                              transform: [{rotate: '-90deg'}],
                            }}
                          />
                        </TouchableOpacity>

                        <View
                          style={{
                            ...styles.btnDeactive,
                            backgroundColor: collapseDeactive
                              ? 'red'
                              : colors.mainColor,
                          }}>
                          <TouchableOpacity
                            onPress={() => {
                              setCollapseDeactive(!collapseDeactive);
                            }}
                            activeOpacity={0.8}
                            style={{
                              ...styles.flexJustify,
                              marginTop: 10,
                            }}>
                            <Text
                              style={{
                                ...styles.txtWhite,
                                color: collapseDeactive ? 'white' : 'red',
                              }}>
                              Deactive Job Group
                            </Text>
                            <Image
                              source={
                                collapseDeactive ? ArrowDownWhite : ArrowUpRed
                              }
                              style={{
                                ...styles.iconArrowChild,
                              }}
                            />
                          </TouchableOpacity>
                          <Collapsible collapsed={collapseDeactive}>
                            <View style={styles.containerCollapseDeactive}>
                              <View style={styles.formInput}>
                                <TextInput
                                  placeholder="Deactivate Notes"
                                  multiline
                                  value={note}
                                  onChangeText={(text) => setNote(text)}
                                />
                              </View>
                              <TouchableOpacity
                                style={styles.submitDeactive}
                                onPress={() => {
                                  handleSubmit();
                                }}>
                                <Text
                                  style={{
                                    color: 'white',
                                    fontFamily: fonts.SFProDisplayMedium,
                                  }}>
                                  Deactivate Job Group
                                </Text>
                              </TouchableOpacity>
                            </View>
                          </Collapsible>
                        </View>
                      </View>
                    </Collapsible>
                  </View>
                );
              },
            )}
        </View>
      </Collapsible>

      <Modal
        isVisible={isVisible}
        onBackdropPress={() => {
          setIsVisible(false);
        }}>
        <View style={styles.containerModal}>
          <View style={styles.bodyModal}>
            <Text style={{textAlign: 'center'}}>
              Confirmation, You'll be chaired to Job's Screen, are you sure to
              left this page ?
            </Text>
            <View style={styles.rowFlexModal}>
              <Pressable
                onPress={() => {
                  setIsVisible(false);
                }}>
                <Text
                  style={{fontFamily: fonts.SFProDisplayMedium, color: 'red'}}>
                  No
                </Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  setIsVisible(false);
                  navigation.navigate('addjobgroup', checkCollapse);
                }}>
                <Text
                  style={{fontFamily: fonts.SFProDisplayMedium, color: 'blue'}}>
                  Yes
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        isVisible={isVisibleDeactive}
        onBackdropPress={() => {
          setIsVisibleDeactive(false);
        }}>
        <View style={styles.containerModal}>
          <View style={{...styles.bodyModal, height: 100}}>
            <Text style={{textAlign: 'center'}}>
              Are you sure to deactivate this job group ?
            </Text>
            <View style={styles.rowFlexModal}>
              <Pressable
                onPress={() => {
                  setIsVisibleDeactive(false);
                }}>
                <Text
                  style={{fontFamily: fonts.SFProDisplayMedium, color: 'blue'}}>
                  No
                </Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  submitDeactive();
                }}>
                <Text
                  style={{fontFamily: fonts.SFProDisplayMedium, color: 'red'}}>
                  Yes
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    activeJobRedux: (data) => dispatch(activeJobGroup(data)),
    inactiveJobRedux: (data) => dispatch(inactiveJobGroup(data)),
    deactiveJobRedux: (data) => dispatch(deactivatedJobGroup(data)),
  };
};

export default connect(null, mapDispatchToProps)(ActiveJobs);

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  titleTxt: {
    fontFamily: fonts.SFProDisplayHeavy,
    color: 'grey',
    fontSize: 20,
  },
  iconArrow: {height: 10, width: 15},
  containerCollapse: {
    minHeight: 60,
    backgroundColor: 'white',
    borderRadius: 15,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  iconArrowChild: {height: 10, width: 15, marginLeft: 10},
  titleCollapse: {
    flexDirection: 'row',
    alignItems: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 17,
  },
  headerCollapse: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imgSize: {height: 30, width: 30, marginRight: 10},
  txtTitleCollapse: {
    fontFamily: fonts.SFProDisplayBold,
    color: 'grey',
  },
  txtTitleRight: {
    fontFamily: fonts.SFProDisplayMedium,
    color: 'grey',
  },
  iconArrowRight: {
    height: 10,
    width: 15,
    marginLeft: 10,
    transform: [{rotate: '90deg'}],
  },
  flexJustify: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnBottom: {
    minHeight: 40,
    flexDirection: 'row',
    borderRadius: 15,
    marginBottom: 20,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  txtWhite: {
    fontFamily: fonts.SFProDisplayMedium,
  },
  btnDeactive: {
    minHeight: 40,
    borderRadius: 15,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  formInput: {
    height: 100,
    borderRadius: 15,
    backgroundColor: 'white',
    paddingHorizontal: 10,
  },
  submitDeactive: {
    height: 30,
    backgroundColor: 'red',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  containerCollapseDeactive: {
    height: 170,
    marginTop: 10,
  },

  //Modal
  containerModal: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  bodyModal: {
    padding: 15,
    height: 120,
    width: '60%',
    borderRadius: 15,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  rowFlexModal: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    width: '100%',
    marginTop: 10,
  },
});
