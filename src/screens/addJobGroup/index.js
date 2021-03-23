import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Animated,
  BackHandler,
  Alert,
  Dimensions,
  Pressable,
} from 'react-native';
import Collapsible from 'react-native-collapsible';
import {
  ArrowDown,
  CoAdmin,
  Crew,
  Leader,
  Plus1,
  RadioChecked,
  RadioUncheck,
  Search,
  Subjob,
} from '../../assets';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';
import axios from 'axios';
import Modal from 'react-native-modal';
import {API_URL} from '@env';

const windowHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

const time = Date(new Date()).split(' ');
const hour = time[4].split(':').slice(0, -1).join(':');
const timeNow = time[2] + ' ' + time[1] + ' ' + hour;

const data = [
  {idUser: 1, name: 'Fachri', pt: 'ansena'},
  {idUser: 2, name: 'Joko', pt: 'ansena'},
  {idUser: 3, name: 'Tingkir', pt: 'ansena'},
  {idUser: 4, name: 'Alex', pt: 'ansena'},
  {idUser: 5, name: 'Tini', pt: 'ansena'},
  {idUser: 6, name: 'Eko', pt: 'ansena'},
];

const AddJobGroup = ({navigation}) => {
  // handleBack
  useEffect(() => {
    const backAction = () => {
      Alert.alert('Hold on!', 'Are you sure you want to go back?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => navigation.goBack()},
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const [title, setTitle] = useState('New Job Group 1');
  const [arrow, setArrow] = useState(false);
  const [arrowLead, setArrowLead] = useState(false);
  const [arrowSub, setArrowSub] = useState(false);
  const [dataCrew, setDataCrew] = useState(data);
  const [colapseCrew, setColapseCrew] = useState(true);
  const [colapseLeader, setColapseLeader] = useState(true);
  const [colapseSubjob, setColapseSubjob] = useState(true);
  const [animation, setAnimation] = useState(new Animated.Value(0));
  const [animationLeader, setAnimationLeader] = useState(new Animated.Value(0));
  const [animationSub, setAnimationSub] = useState(new Animated.Value(0));
  const [modalCoadmin, setModalCoadmin] = useState(
    new Animated.Value(deviceWidth),
  );
  const [checkedCoadmin, setCheckedCoAdmin] = useState({});
  const [checkCrew, setcheckCrew] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  //Toogle Collapse
  const toogleCrew = () => {
    setColapseCrew(!colapseCrew);
    setArrow(!arrow);
    if (colapseCrew) {
      startAnimation();
    } else {
      endAnimation();
    }
  };

  const toogleLeader = () => {
    setColapseLeader(!colapseLeader);
    setArrowLead(!arrowLead);
    if (colapseLeader) {
      startAnimationLeader();
    } else {
      endAnimationLeader();
    }
  };

  const toogleSubJob = () => {
    setColapseSubjob(!colapseSubjob);
    setArrowSub(!arrowSub);
    if (colapseSubjob) {
      startAnimationSub();
    } else {
      endAnimationSub();
    }
  };
  // End toogle collapse

  //Animation
  const startAnimation = () => {
    Animated.timing(animation, {
      toValue: 180,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const endAnimation = () => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  // ----------------------
  const startAnimationLeader = () => {
    Animated.timing(animationLeader, {
      toValue: 180,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const endAnimationLeader = () => {
    Animated.timing(animationLeader, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  //   --------------------------=
  const startAnimationSub = () => {
    Animated.timing(animationSub, {
      toValue: 180,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const endAnimationSub = () => {
    Animated.timing(animationSub, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };
  //   --------------------
  const rotateInterpolate = animation.interpolate({
    inputRange: [0, 90],
    outputRange: ['0deg', '-90deg'],
  });

  const animatedStyle = {
    transform: [{rotate: rotateInterpolate}],
  };

  const rotateInterpolateLeader = animationLeader.interpolate({
    inputRange: [0, 90],
    outputRange: ['0deg', '-90deg'],
  });

  const animatedStyleLeader = {
    transform: [{rotate: rotateInterpolateLeader}],
  };

  const rotateInterpolateSub = animationSub.interpolate({
    inputRange: [0, 90],
    outputRange: ['0deg', '-90deg'],
  });

  const animatedStyleSub = {
    transform: [{rotate: rotateInterpolateSub}],
  };
  //End Of animation

  //Modal
  const openModal = () => {
    Animated.timing(modalCoadmin, {
      duration: 300,
      toValue: 0,
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    Animated.timing(modalCoadmin, {
      duration: 300,
      toValue: deviceWidth,
      useNativeDriver: true,
    }).start();
  };

  //End of Modal

  const getData = () => {
    axios
      .get(`${API_URL}/job.ansena-sa.com/jzl/api/api/getListUser`)
      .then((res) => {
        // console.log(res.data);
        setDataCrew(res.data);
      })
      .catch(({response}) => {
        console.log(response);
      });
  };

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              navigation.pop();
            }}>
            <Text style={styles.btnheader}>Cancel</Text>
          </TouchableOpacity>
          <Text style={styles.title} ellipsizeMode="tail" numberOfLines={1}>
            {title === '' ? 'New Job Group 1' : title}
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.push('dashboard');
            }}>
            <Text style={{...styles.btnheader, color: colors.badgeBlue}}>
              Done
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.datetime}>
          <Text style={styles.subtitleDate}>Date & Time</Text>
          <Text style={styles.date}>{timeNow}</Text>
        </View>
        <View style={styles.inputjobgroup}>
          <TextInput
            placeholder="Job Group Title"
            onChangeText={(title) => {
              setTitle(title);
            }}
          />
        </View>
        <TouchableOpacity
          style={styles.addCoAdmin}
          activeOpacity={0.6}
          onPress={() => openModal()}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={CoAdmin}
              style={{height: 40, width: 40, marginRight: 10}}
            />
            <Text>Add Co-Admin</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{color: colors.txtGrey}}>
              {checkedCoadmin === '' ? 'None' : checkedCoadmin.name}
            </Text>
            <Image
              source={ArrowDown}
              style={{
                height: 15,
                width: 15,
                transform: [{rotate: '270deg'}],
                marginLeft: 10,
              }}
            />
          </View>
        </TouchableOpacity>

        {/* assign Crew */}
        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.crew}
          onPress={() => {
            toogleCrew();
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
              alignItems: 'center',
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={Crew}
                style={{height: 40, width: 40, marginRight: 10}}
              />
              <Text>Assign Crew</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{color: colors.txtGrey}}>None</Text>
              <Animated.Image
                source={ArrowDown}
                style={[
                  {
                    height: 15,
                    width: 15,
                    marginLeft: 10,
                  },
                  animatedStyle,
                ]}
              />
            </View>
          </View>
          <Collapsible collapsed={colapseCrew}>
            <View style={styles.content}>
              {/* {dataCrew &&
                dataCrew.map(({idUser, idPt, name, pt}, index) => {
                  return (
                    <View key={index} style={{flexDirection: 'row'}}>
                      <Text>{index + 1}</Text>
                      <Text>{name}</Text>
                      <Text>{pt}</Text>
                    </View>
                  );
                })} */}
              <TouchableOpacity
                style={styles.containerAdd}
                onPress={() => {
                  setModalVisible(true);
                }}>
                <Image
                  source={Plus1}
                  style={{height: 15, width: 15, marginRight: 10}}
                />
                <Text style={styles.addBtn}>Add ..</Text>
              </TouchableOpacity>
            </View>
          </Collapsible>
        </TouchableOpacity>

        {/* Assign Leader */}
        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.leader}
          onPress={() => {
            toogleLeader();
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
              alignItems: 'center',
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={Leader}
                style={{height: 40, width: 40, marginRight: 10}}
              />
              <Text>Assign Leader</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{color: colors.txtGrey}}>None</Text>
              <Animated.Image
                source={ArrowDown}
                style={[
                  {
                    height: 15,
                    width: 15,
                    transform: arrow
                      ? [{rotate: '180deg'}]
                      : [{rotate: '0deg'}],
                    marginLeft: 10,
                  },
                  animatedStyleLeader,
                ]}
              />
            </View>
          </View>
          <Collapsible collapsed={colapseLeader} align="center">
            <View style={styles.content}>
              {dataCrew &&
                dataCrew.map(({idUser, idPt, name, pt}) => {
                  return (
                    <View key={idUser}>
                      <Text>{name}</Text>
                    </View>
                  );
                })}
            </View>
          </Collapsible>
        </TouchableOpacity>
        {/* SubJOB */}
        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.subjob}
          onPress={toogleSubJob}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
              alignItems: 'center',
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={Subjob}
                style={{height: 40, width: 40, marginRight: 10}}
              />
              <Text>Sub Job</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{color: colors.txtGrey}}>None</Text>
              <Animated.Image
                source={ArrowDown}
                style={[
                  {
                    height: 15,
                    width: 15,
                    transform: arrow
                      ? [{rotate: '180deg'}]
                      : [{rotate: '0deg'}],
                    marginLeft: 10,
                  },
                  animatedStyleSub,
                ]}
              />
            </View>
          </View>
          <Collapsible collapsed={colapseSubjob} align="center">
            <View style={styles.content}>
              {/* {dataCrew &&
                dataCrew.map(({idUser, idPt, name, pt}) => {
                  return (
                    <View key={idUser}>
                      <Text>{name}</Text>
                    </View>
                  );
                })} */}
              <View style={styles.containerAdd}>
                <Image
                  source={Plus1}
                  style={{height: 15, width: 15, marginRight: 10}}
                />
                <Text style={styles.addBtn}>Add ..</Text>
              </View>
            </View>
          </Collapsible>
        </TouchableOpacity>
      </ScrollView>
      {/* Start Modal Co admin*/}
      <Animated.View
        style={[
          styles.modal,
          {
            transform: [{translateX: modalCoadmin}],
          },
        ]}>
        <View style={styles.headerModalCoadmin}>
          <TouchableOpacity
            onPress={() => {
              closeModal();
              setCheckedCoAdmin('');
            }}>
            <Text style={styles.txtCancel}>Cancel</Text>
          </TouchableOpacity>
          <Text style={styles.txtTitleModal}>Add-CoAdmin</Text>
          <TouchableOpacity
            onPress={() => {
              closeModal();
            }}>
            <Text style={styles.txtAddModal}>Add</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.formSearch}>
          <TextInput placeholder="Search Co-Admin Name..." />
          <Image source={Search} />
        </View>
        <View style={styles.containerScrollDataModal}>
          <View style={styles.headerData}>
            <Text style={{color: colors.txtGrey}}>Name</Text>
            <Text style={{color: colors.txtGrey, marginRight: 40}}>
              Details
            </Text>
          </View>
          <ScrollView style={styles.dataCoAdmin}>
            {dataCrew &&
              dataCrew.map(({idUser, idPt, name, pt}, index) => {
                return (
                  <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => {
                      setCheckedCoAdmin({
                        idUser,
                        name,
                        idPt,
                      });
                    }}>
                    <View style={styles.listData} key={index}>
                      <View style={{flexDirection: 'row'}}>
                        <Text
                          style={{
                            color: checkCrew == idUser ? 'red' : 'black',
                          }}>
                          {name}
                        </Text>
                      </View>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text>{pt}</Text>
                        <Image
                          source={
                            checkedCoadmin.idUser === idUser
                              ? RadioChecked
                              : RadioUncheck
                          }
                          style={{height: 20, width: 20, marginLeft: 10}}
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
          </ScrollView>
        </View>
      </Animated.View>

      {/* Modal set Crew */}
      <Modal
        animationType="slide"
        backdropOpacity={0.7}
        onBackdropPress={() => {
          setModalVisible(!modalVisible);
        }}
        onSwipeComplete={() => {
          setModalVisible(!modalVisible);
        }}
        swipeDirection={['down']}
        visible={modalVisible}
        onRequestClose={() => {
          showToastWithGravityAndOffset('Modal Has been Close');
          setModalVisible(!modalVisible);
        }}
        useNativeDriverForBackdrop>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View
              style={{
                height: 5,
                width: 120,
                borderRadius: 20,
                backgroundColor: 'grey',
                alignSelf: 'center',
              }}></View>

            <View style={{...styles.headerModalCoadmin, marginTop: 20}}>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}>
                <Text style={styles.txtCancel}>Cancel</Text>
              </TouchableOpacity>
              <Text style={styles.txtTitleModal}>Add Crew</Text>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}>
                <Text style={styles.txtAddModal}>Add</Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                ...styles.containerScrollDataModal,
                borderBottomRightRadius: 0,
                borderBottomLeftRadius: 0,
              }}>
              <View style={styles.headerData}>
                <Text style={{color: colors.txtGrey}}>Name</Text>
                <Text style={{color: colors.txtGrey, marginRight: 40}}>
                  Details
                </Text>
              </View>
              <ScrollView style={styles.dataCoAdmin}>
                {dataCrew &&
                  dataCrew.map(({idUser, idPt, name, pt}, index) => {
                    return (
                      <TouchableOpacity
                        activeOpacity={0.6}
                        onPress={() => {
                          setCheckedCoAdmin({
                            idUser,
                            name,
                            idPt,
                          });
                        }}>
                        <View style={styles.listData} key={index}>
                          <View style={{flexDirection: 'row'}}>
                            <Text
                              style={{
                                color: checkCrew == idUser ? 'red' : 'black',
                              }}>
                              {name}
                            </Text>
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <Text>{pt}</Text>
                            <Image
                              source={
                                checkedCoadmin.idUser === idUser
                                  ? RadioChecked
                                  : RadioUncheck
                              }
                              style={{height: 20, width: 20, marginLeft: 10}}
                            />
                          </View>
                        </View>
                      </TouchableOpacity>
                    );
                  })}
              </ScrollView>
            </View>
            <View style={styles.bottomModal}>
              <Text style={styles.txtBottomModal}>Sort By..</Text>
              <Text style={styles.txtBottomModal}>Filter</Text>
            </View>
          </View>
        </View>
      </Modal>
      {/* End Modal Crew */}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.mainColor,
    position: 'relative',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btnheader: {
    fontFamily: fonts.SFProDisplayThin,
    fontSize: 14,
    color: colors.badgeRed,
  },
  title: {
    fontFamily: fonts.SFProDisplayHeavy,
    fontSize: 19,
    maxWidth: 160,
  },
  datetime: {
    marginTop: 50,
    width: '80%',
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subtitleDate: {
    fontFamily: fonts.SFProDisplaySemiBold,
    fontSize: 18,
  },
  date: {
    fontFamily: fonts.SFProDisplayRegular,
    fontSize: 15,
  },
  inputjobgroup: {
    height: 60,
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 20,
    marginTop: 30,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  addCoAdmin: {
    height: 60,
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 20,
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  crew: {
    minHeight: 60,
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: 30,
    paddingHorizontal: 20,
    paddingVertical: 20,
    justifyContent: 'space-between',
  },
  leader: {
    minHeight: 60,
    width: '100%',
    backgroundColor: 'white',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 20,
    justifyContent: 'space-between',
  },
  subjob: {
    minHeight: 60,
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 20,
    justifyContent: 'space-between',
    marginTop: 30,
    marginBottom: 40,
  },
  content: {
    marginTop: 10,
  },
  containerAdd: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addBtn: {
    color: colors.badgeBlue,
    fontFamily: fonts.SFProDisplayBold,
    fontSize: 15,
  },

  //Modal
  modal: {
    height: windowHeight,
    width: deviceWidth,
    position: 'absolute',
    top: 0,
    bottom: 0,
    backgroundColor: colors.mainColor,
    padding: 30,
  },
  headerModalCoadmin: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  txtTitleModal: {
    fontFamily: fonts.SFProDisplayLightItalic,
    color: 'black',
    fontSize: 24,
  },
  txtCancel: {
    fontFamily: fonts.SFProDisplayLightItalic,
    color: colors.badgeRed,
    fontSize: 16,
  },
  txtAddModal: {
    fontFamily: fonts.SFProDisplayHeavy,
    fontSize: 16,
    color: colors.badgeBlue,
  },
  formSearch: {
    height: 60,
    width: deviceWidth - 60,
    alignSelf: 'center',
    backgroundColor: '#d6d6da',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 40,
    borderRadius: 20,
  },
  textSearch: {
    maxWidth: 280,
  },

  containerScrollDataModal: {
    height: windowHeight - 230,
    width: deviceWidth - 60,
    alignSelf: 'center',
    backgroundColor: 'white',
    marginTop: 40,
    borderRadius: 25,
    padding: 20,
  },
  headerData: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: colors.txtGrey,
    height: 35,
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  dataCoAdmin: {
    flex: 1,
  },
  listData: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    alignItems: 'center',
  },

  //modal crew
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: colors.mainColor,
    padding: 20,
    borderRadius: 20,
    height: windowHeight - 30,
    width: deviceWidth,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  bottomModal: {
    width: deviceWidth - 60,
    height: 50,
    backgroundColor: 'white',
    alignSelf: 'center',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    alignItems: 'center',
  },
  txtBottomModal: {
    color: colors.badgeBlue,
    fontWeight: 'bold',
  },
  modalText: {
    justifyContent: 'center',
    marginTop: 35,
    textAlign: 'center',
    fontSize: 18,
  },
});

export default AddJobGroup;
