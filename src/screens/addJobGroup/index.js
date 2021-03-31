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
  FlatList,
  ToastAndroid,
} from 'react-native';
import Collapsible from 'react-native-collapsible';
import Popover, {PopoverPlacement} from 'react-native-popover-view';
import {
  ArrowDown,
  ArrowUp,
  Check,
  CheckActive,
  CoAdmin,
  Crew,
  Cross,
  DotMenu,
  Hamberger,
  Leader,
  Plus1,
  RadioChecked,
  RadioUncheck,
  Search,
  SortBtn,
  Subjob,
} from '../../assets';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';
import axios from 'axios';
import Modal from 'react-native-modal';
import {API_URL} from '@env';
import Swipeable from 'react-native-gesture-handler/Swipeable';

const windowHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

const time = Date(new Date()).split(' ');
const hour = time[4].split(':').slice(0, -1).join(':');
const timeNow = time[2] + ' ' + time[1] + ' ' + hour;

const datetime = new Date();
const getYear = datetime.getFullYear();
const getMonth = datetime.getMonth() + 1;
const getDate = datetime.getDate();

const data = [
  {idUser: 1, name: 'fachri', idPt: 1, pt: 'ansena'},
  {idUser: 2, name: 'Ghiffary', idPt: 1, pt: 'ansena'},
  {idUser: 3, name: 'joko', idPt: 1, pt: 'ansena'},
  {idUser: 4, name: 'widodo', idPt: 1, pt: 'ansena'},
  {idUser: 5, name: 'prabowo', idPt: 1, pt: 'ansena'},
  {idUser: 6, name: 'teguh', idPt: 1, pt: 'ansena'},
  {idUser: 7, name: 'tingkir', idPt: 1, pt: 'ansena'},
  {idUser: 8, name: 'anisa', idPt: 1, pt: 'ansena'},
  {idUser: 9, name: 'loli', idPt: 1, pt: 'ansena'},
  {idUser: 10, name: 'lativa', idPt: 1, pt: 'ansena'},
  {idUser: 11, name: 'james', idPt: 1, pt: 'ansena'},
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

  useEffect(() => {
    getData();
  }, []);

  const [title, setTitle] = useState('New Job Group 1');
  const [arrow, setArrow] = useState(false);
  const [arrowLead, setArrowLead] = useState(false);
  const [arrowSub, setArrowSub] = useState(false);
  const [dataCrew, setDataCrew] = useState([]);
  const [colapseCrew, setColapseCrew] = useState(true);
  const [colapseLeader, setColapseLeader] = useState(true);
  const [colapseSubjob, setColapseSubjob] = useState(true);
  const [animation, setAnimation] = useState(new Animated.Value(0));
  const [animationLeader, setAnimationLeader] = useState(new Animated.Value(0));
  const [animationSub, setAnimationSub] = useState(new Animated.Value(0));
  const [modalCoadmin, setModalCoadmin] = useState(
    new Animated.Value(deviceWidth),
  );
  const [checkedCoadmin, setCheckedCoAdmin] = useState('');
  const [checkCrew, setcheckCrew] = useState([]);
  const [leader, setLeader] = useState('');
  const [subJob, setSubJob] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [showPopover, setShowPopover] = useState(false);

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

  //Function Modal
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
  //End of function Modal

  const getData = () => {
    axios
      .get(`${API_URL}/jzl/api/api/getListUser/1`)
      .then((res) => {
        // console.log('Ini adalah list dataCrew', res.data);
        setDataCrew(res.data);
      })
      .catch(({response}) => {
        console.log(response);
      });
  };

  const addNewItem = (idUser, name, idPt) => {
    if (checkCrew.length < 1) {
      setcheckCrew([
        ...checkCrew,
        {
          idUser,
          name,
          idPt,
        },
      ]);
    } else {
      let foundValue = checkCrew.filter((obj) => obj.idUser === idUser);
      if (foundValue.length == 0) {
        setcheckCrew([
          ...checkCrew,
          {
            idUser,
            name,
            idPt,
          },
        ]);
      } else if (foundValue[0].idUser == idUser) {
        const newCrew = checkCrew.filter((item) => item.idUser !== idUser);
        setcheckCrew(newCrew);
      }
    }
  };

  const addSubjob = () => {
    setSubJob([...subJob, subJob.length]);
  };

  const removeListCrew = (idUser, index) => {
    if (idUser === leader.idUser) {
      setLeader('');
      const arr = [...checkCrew];
      arr.splice(index, 1);
      setcheckCrew(arr);
    } else {
      const arr = [...checkCrew];
      arr.splice(index, 1);
      setcheckCrew(arr);
    }
  };

  const showToastWithGravityAndOffset = (msg) => {
    ToastAndroid.showWithGravityAndOffset(
      msg,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
      25,
      50,
    );
  };

  const postData = () => {
    function formatDate(date) {
      var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;

      return [year, month, day].join('-');
    }

    if (title === 'New Job Group 1' || title === '') {
      showToastWithGravityAndOffset('Title Job Group must be fill in');
    } else if (checkedCoadmin.length < 1) {
      showToastWithGravityAndOffset('Co Admin must be fill in');
    } else if (checkCrew.length < 1) {
      showToastWithGravityAndOffset('Crew must be fill in');
    } else if (leader.idUser == undefined) {
      showToastWithGravityAndOffset('Leader must be fill in');
    } else {
      showToastWithGravityAndOffset('Data success Sent');
      const dataPost = {
        title: title,
        pt: checkCrew.map(({idPt}) => idPt),
        crew: checkCrew.map(({idUser}) => idUser),
        leaderId: leader.idUser,
        admin: 1,
        coAdmin: checkedCoadmin.idUser,
        date: formatDate(`${getYear} ${getMonth} ${getDate}`),
      };
      console.log(dataPost);
    }
  };

  const goToDetail = () => {
    setShowPopover(false);
  };
  return (
    <>
      {/* The View */}
      <ScrollView style={styles.container}>
        {/* Header */}
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
              postData();
            }}>
            <Text style={{...styles.btnheader, color: colors.badgeBlue}}>
              Done
            </Text>
          </TouchableOpacity>
        </View>

        {/* Date */}
        <View style={styles.datetime}>
          <Text style={styles.subtitleDate}>Date & Time</Text>
          <Text style={styles.date}>{timeNow}</Text>
        </View>

        {/* Body */}
        <View style={styles.inputjobgroup}>
          <TextInput
            placeholder="Job Group Title"
            onChangeText={(title) => {
              setTitle(title);
            }}
          />
        </View>

        {/* Add Co Admin */}
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
          activeOpacity={0.9}
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
              <Text style={{color: colors.txtGrey}}>
                {checkCrew.length < 1 ? 'None' : checkCrew.length}
              </Text>
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
              <FlatList
                data={checkCrew}
                renderItem={({item, index}) => {
                  const idUser = item.idUser;
                  const name = item.name;
                  return (
                    <Swipeable
                      renderRightActions={(progress, dragX) => {
                        const scales = dragX.interpolate({
                          inputRange: [0, 100],
                          outputRange: [0, 1],
                        });
                        return (
                          <TouchableOpacity
                            activeOpacity={0.6}
                            style={{
                              alignItems: 'center',
                              backgroundColor: 'red',
                              justifyContent: 'center',
                              alignItems: 'center',
                              width: 80,
                              transform: [{rotate: '180deg'}],
                            }}
                            onPress={() => {
                              // alert(index);
                              removeListCrew(idUser, index);
                            }}>
                            <Animated.Text
                              style={{
                                transform: [{scale: scales}],
                                color: 'white',
                                fontFamily: fonts.SFProDisplayHeavy,
                                fontSize: 18,
                              }}>
                              Delete
                            </Animated.Text>
                          </TouchableOpacity>
                        );
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          height: 50,
                          width: '100%',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          backgroundColor: 'white',
                          paddingHorizontal: 20,
                        }}>
                        <Text>{name}</Text>
                        <Image
                          source={Hamberger}
                          style={{height: 20, width: 20}}
                        />
                      </View>
                    </Swipeable>
                  );
                }}
                keyExtractor={(item) => item.idUser}
              />
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
          activeOpacity={0.9}
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
              marginBottom: 20,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={Leader}
                style={{height: 40, width: 40, marginRight: 10}}
              />
              <Text>Assign Leader</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{color: colors.txtGrey}}>
                {leader === '' ? 'None' : leader.name}
              </Text>
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
              {checkCrew.length > 0 &&
                checkCrew.map(({idUser, idPt, name, pt}, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      style={{
                        flexDirection: 'row',
                        height: 30,
                        alignItems: 'center',
                        marginBottom: 20,
                      }}
                      onPress={() => {
                        setLeader({idUser, name});
                      }}>
                      <Image
                        source={
                          leader.idUser === idUser ? RadioChecked : RadioUncheck
                        }
                        style={{height: 15, width: 15, marginRight: 10}}
                      />
                      <Text>{name}</Text>
                      <Text>{pt}</Text>
                    </TouchableOpacity>
                  );
                })}
            </View>
          </Collapsible>
        </TouchableOpacity>

        {/* SubJOB */}
        <TouchableOpacity
          activeOpacity={0.9}
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
              <FlatList
                data={subJob}
                keyExtractor={(index) => index}
                renderItem={({item, index}) => {
                  return (
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingHorizontal: 14,
                      }}>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={{marginRight: 20}}>{index + 1}. </Text>
                        <TextInput placeholder="Input Subjob" />
                      </View>
                      <Popover
                        // placement={PopoverPlacement.BOTTOM}
                        style={{borderRadius: 20, height: 50, width: 100}}
                        isVisible={showPopover}
                        onRequestClose={() => setShowPopover(false)}
                        from={
                          <TouchableOpacity
                            onRequestClose={() => setShowPopover(false)}
                            onPress={() => setShowPopover(true)}>
                            <Image
                              source={DotMenu}
                              style={{height: 15, width: 15}}
                            />
                          </TouchableOpacity>
                        }>
                        <View
                          style={{
                            height: 80,
                            width: 200,
                            padding: 10,
                            justifyContent: 'space-between',
                          }}>
                          <TouchableOpacity
                            onPress={() => {
                              setShowPopover(false);
                              navigation.navigate('addsubjob');
                            }}
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                            }}>
                            <Text style={{color: '#5cb7f8'}}>Details</Text>
                            <Image
                              source={ArrowUp}
                              style={{height: 20, width: 20}}
                            />
                          </TouchableOpacity>
                          <View
                            style={{
                              borderWidth: 0.5,
                              width: '100%',
                              borderColor: '#e0dfe1',
                            }}
                          />
                          <TouchableOpacity
                            onPress={() => {
                              alert('delete');
                            }}
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                            }}>
                            <Text style={{color: '#e06655'}}>Delete</Text>
                            <Image
                              source={Cross}
                              style={{height: 20, width: 20}}
                            />
                          </TouchableOpacity>
                        </View>
                      </Popover>
                    </View>
                  );
                }}
              />
              <TouchableOpacity style={styles.containerAdd} onPress={addSubjob}>
                <Image
                  source={Plus1}
                  style={{height: 15, width: 15, marginRight: 10}}
                />
                <Text style={styles.addBtn}>Add ..</Text>
              </TouchableOpacity>
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
            {dataCrew.length < 1
              ? null
              : dataCrew.map(({idUser, idPt, name, pt}, index) => {
                  var foundValue =
                    checkCrew.length > 0 &&
                    checkCrew.filter((obj) => obj.idUser === idUser);
                  return (
                    <TouchableOpacity
                      disabled={
                        foundValue.length > 0
                          ? foundValue[0].idUser
                            ? true
                            : false
                          : false
                      }
                      activeOpacity={0.6}
                      onPress={() => {
                        setCheckedCoAdmin({
                          idUser,
                          name,
                          idPt,
                        });
                      }}
                      key={index}>
                      <View style={styles.listData} key={index}>
                        <View style={{flexDirection: 'row'}}>
                          <Text
                            style={{
                              color:
                                foundValue.length > 0
                                  ? foundValue[0].idUser
                                    ? colors.txtGrey
                                    : 'black'
                                  : 'black',
                            }}>
                            {name}
                          </Text>
                        </View>
                        <View
                          style={{flexDirection: 'row', alignItems: 'center'}}>
                          <Text
                            style={{
                              fontSize: 12,
                              color:
                                foundValue.length > 0
                                  ? foundValue[0].idUser
                                    ? colors.txtGrey
                                    : 'black'
                                  : 'black',
                            }}>
                            {pt}
                          </Text>
                          {foundValue.length > 0 ? (
                            foundValue[0].idUser ? (
                              <View style={{marginRight: 30}} />
                            ) : (
                              <Image
                                source={
                                  checkedCoadmin.idUser === idUser
                                    ? RadioChecked
                                    : RadioUncheck
                                }
                                style={{height: 20, width: 20, marginLeft: 10}}
                              />
                            )
                          ) : (
                            <Image
                              source={
                                checkedCoadmin.idUser === idUser
                                  ? RadioChecked
                                  : RadioUncheck
                              }
                              style={{height: 20, width: 20, marginLeft: 10}}
                            />
                          )}
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                })}
          </ScrollView>
        </View>
      </Animated.View>
      {/* End Modal Coadmin */}

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
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{color: colors.txtGrey, marginRight: 10}}>
                    Details
                  </Text>
                  <Image source={Check} style={{height: 15, width: 20}} />
                </View>
              </View>
              <ScrollView style={styles.dataCoAdmin}>
                {dataCrew &&
                  dataCrew.map(({idUser, idPt, name, pt}, index) => {
                    var foundValue =
                      checkCrew.length > 0 &&
                      checkCrew.filter((obj) => obj.idUser === idUser);
                    return (
                      <TouchableOpacity
                        activeOpacity={0.6}
                        key={index}
                        onPress={() => {
                          addNewItem(idUser, name, idPt);
                        }}
                        disabled={
                          checkedCoadmin.idUser == idUser ? true : false
                        }>
                        <View style={styles.listData} key={index}>
                          <View style={{flexDirection: 'row'}}>
                            <Text
                              style={{
                                color:
                                  checkedCoadmin.idUser == idUser
                                    ? colors.txtGrey
                                    : 'black',
                              }}>
                              {name}
                            </Text>
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <Text
                              style={{
                                color:
                                  checkedCoadmin.idUser == idUser
                                    ? colors.txtGrey
                                    : 'black',
                              }}>
                              {pt}
                            </Text>
                            <Image
                              source={
                                foundValue.length > 0
                                  ? foundValue[0].idUser
                                    ? CheckActive
                                    : null
                                  : null
                              }
                              style={{height: 15, width: 20, marginLeft: 10}}
                            />
                          </View>
                        </View>
                      </TouchableOpacity>
                    );
                  })}
              </ScrollView>
            </View>
            <View style={styles.bottomModal}>
              <View style={{flexDirection: 'row'}}>
                <Image
                  source={SortBtn}
                  style={{height: 15, width: 15, marginRight: 10}}
                />
                <Text style={styles.txtBottomModal}>Sort By..</Text>
              </View>
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
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
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
