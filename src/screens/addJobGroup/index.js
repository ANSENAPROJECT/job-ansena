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
  ActivityIndicator,
  LogBox,
  Pressable,
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
import qs from 'qs';
import {connect, useSelector} from 'react-redux';
import {
  addSubjob,
  deleteAllSubJob,
  deleteJobGroup,
  deleteSubjob,
  updateSubjob,
} from '../../public/redux/ActionCreators/job';
import {useIsFocused} from '@react-navigation/native';

const windowHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

const time = Date(new Date()).split(' ');
const hour = time[4].split(':').slice(0, -1).join(':');
const timeNow = time[2] + ' ' + time[1] + ' ' + hour;

const datetime = new Date();
const getYear = datetime.getFullYear();
const getMonth = datetime.getMonth() + 1;
const getDate = datetime.getDate();

const AddJobGroup = ({
  navigation,
  deleteJobRedux,
  addSubJobRedux,
  deleteAllsubJob,
  deleteSubJobRedux,
  updateSubjobRedux,
  route,
}) => {
  const isFocused = useIsFocused();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      route.params == undefined
        ? ' '
        : (setCheckId(route.params.id), setName(route.params.subjob));
    });
    return unsubscribe;
  }, [navigation, isFocused]);

  //Handle warning
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

  // handleBack
  useEffect(() => {
    const backAction = () => {
      Alert.alert(
        'Exit Add Job',
        'By closing this page, the filled data will be deleted, are you sure?',
        [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          {text: 'YES', onPress: () => handleBack()},
        ],
      );
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  //-----------------Start State--------------------
  const [title, setTitle] = useState('New Job Group 1');
  const [arrow, setArrow] = useState(false);
  const [arrowLead, setArrowLead] = useState(false);
  const [arrowSub, setArrowSub] = useState(false);
  const [dataCrew, setDataCrew] = useState([]);
  const [pages, setPages] = useState(1);
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
  const [modalVisible, setModalVisible] = useState(false);
  const [showPopover, setShowPopover] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [searchData, setSearchData] = useState([]);
  const [checkSub, setCheckSub] = useState('');
  const [name, setName] = useState('');
  const [checkId, setCheckId] = useState('');
  const [modalLoading, setModalLoading] = useState(false);
  const [txtLoading, setTxtLoading] = useState('Please Wait...');

  const jobId = useSelector((state) => state.job.jobgroup);
  const code = useSelector((state) => state.auth.code);
  const subJobData = useSelector((state) => state.job.subJobData);
  const userId = useSelector((state) => state.auth.idUser);
  const [jobIdDuplicate, setJobIdDuplicate] = useState('');

  //---------------------End State---------------------------

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      getData();
      getDetailJob();
    }
    return () => (mounted = false);
  }, [search]);

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

  const handleLoadmore = () => {
    setPages(pages + 1);
    getData();
    setIsLoading(true);
  };

  const renderFooter = () => {
    return isLoading ? (
      <View>
        <ActivityIndicator size="large" color="blue" />
      </View>
    ) : null;
  };

  //End of function Modal

  const handleBack = () => {
    let data;
    if (!route.params) {
      data = jobId;
    } else {
      data = jobIdDuplicate;
    }
    axios
      .post(`${API_URL}/jzl/api/api/deleteJob/${data}`)
      .then((res) => {
        showToastMsg(`The filled has been deleted`);
        console.log(res);
        deleteJobRedux();
        deleteAllsubJob();
        navigation.replace('dashboard');
      })
      .catch(({response}) => {
        console.log(response);
      });
  };

  const handleAddSubjob = () => {
    let IDJOB;
    if (!route.params) {
      IDJOB = jobId;
    } else {
      IDJOB = jobIdDuplicate;
    }
    axios
      .post(`${API_URL}/jzl/api/api/saveTemplateSubjob/${IDJOB}/${code}`)
      .then((res) => {
        console.log('response add subjob', res.data);
        const data = {
          id: res.data.data.subjobId,
          id_title: IDJOB,
          subjob: '',
          code: 'DIDI' + res.data.data.code,
          purpose: '',
          assessor: '',
          deadline: '',
          dealine_revise: '',
          alarm: '',
          stoppable: '',
          token: '',
          approval: '',
          remind: '',
          note: '',
          note_report: '',
          note_request: '',
          note_revise: '',
          status: '',
          is_priority: '',
          is_failed: '',
          is_overdue: '',
          img_refer: '',
          img_request: '',
          img_revise: '',
          is_time: '',
          reported: '',
        };
        console.log(data);
        addSubJobRedux(data);
        // setSubJob([...subJob, subJob.length]);
      })
      .catch(({response}) => {
        console.log(response);
      });
  };

  const handleDeleteSubjob = (id) => {
    axios
      .post(`${API_URL}/jzl/api/api/deleteSubjob/${id}`)
      .then((res) => {
        console.log(res);
        deleteSubJobRedux(id);
      })
      .catch(({response}) => {
        console.log(response);
      });
  };

  const handleUpdateSubjob = (name, id) => {
    updateSubjobRedux({
      subjob: name,
      id: id,
    });
  };

  const handleInput = (id, subjob) => {
    setCheckId(id);
    setName(subjob);
  };

  const getData = () => {
    axios
      .get(`${API_URL}/jzl/api/api/getListUser/${pages}`)
      .then((res) => {
        // console.log('Ini adalah list dataCrew', res.data);
        setDataCrew(dataCrew.concat(res.data.data));
        setIsLoading(true);
      })
      .catch(({response}) => {
        console.log(response);
      });
  };

  const searchName = () => {
    axios
      .get(`${API_URL}/jzl/api/api/getListUser/${search}`)
      .then((res) => {
        console.log(res.data.data);
        setSearchData(res.data.data);
        setIsLoading(true);
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

  const showToastMsg = (msg) => {
    ToastAndroid.showWithGravityAndOffset(
      msg,
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
  };

  const getDetailJob = () => {
    if (!route.params) {
      null;
    } else {
      const jobId = route.params;
      axios
        .get(`${API_URL}/jzl/api/api/duplicate_job/${jobId}`)
        .then((res) => {
          console.log(res);
          setJobIdDuplicate(res.data.data.jobId);
          setcheckCrew(res.data.data.crew);
          setCheckedCoAdmin(res.data.data.coadmin);
          setLeader(res.data.data.leader);
          setTitle(res.data.data.title);
        })
        .catch(({response}) => {
          console.log(response);
        });
    }
  };

  const postData = async () => {
    console.log('Ini adalah subjob data', subJobData);
    let data;
    if (!route.params) {
      data = jobId;
    } else {
      data = jobIdDuplicate;
    }
    setModalLoading(true);
    setTxtLoading('Please wait...');
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
      setModalLoading(false);
      showToastWithGravityAndOffset('Title Job Group must be fill in');
    } else if (checkCrew.length < 1) {
      setModalLoading(false);
      showToastWithGravityAndOffset('Crew must be fill in');
    } else if (leader.idUser == undefined) {
      setModalLoading(false);
      showToastWithGravityAndOffset('Leader must be fill in');
    } else {
      if (subJobData.find((obj) => obj.subjob === '')) {
        setModalLoading(false);
        showToastWithGravityAndOffset('Field subjob must be filled in');
      } else {
        let idCrew = [];
        let ptId = [];
        for (let k = 0; k < checkCrew.length; k++) {
          idCrew[k] = checkCrew[k].idUser;
          ptId[k] = checkCrew[k].idPt;
        }
        let newIdPt = [...new Set(ptId)];

        const dataPost = {
          jobId: data,
          title: title,
          pt: newIdPt.join(','),
          crew: idCrew.join(','),
          leaderid: leader.idUser,
          admin: 1,
          coadmin: checkedCoadmin.idUser,
        };
        console.log('data yang di post', dataPost);
        await axios
          .post(`${API_URL}/jzl/api/api/saveJobGroup`, qs.stringify(dataPost))
          .then((res) => {
            console.log('Ini response jobgroup', res);
            console.log(subJobData);
            for (let i = 0; i < subJobData.length; i++) {
              let newRemind = [];
              for (let j = 0; j < subJobData[i].remind.length; j++) {
                newRemind[j] = subJobData[i].remind[j].idUser;
              }

              let ApprovalNew;
              if (subJobData[i].approval === '') {
                ApprovalNew = '1';
              } else {
                const newApproval = subJobData[i].approval.filter((item) =>
                  item.status == 1 ? item : null,
                );
                ApprovalNew = newApproval.map((item) => `${item.idUser}`);
              }

              const data = new FormData();
              data.append('userId', `${userId}`);
              data.append('id', `${subJobData[i].id}`);
              data.append('approval', `${ApprovalNew}`);
              data.append('id_title', `${subJobData[i].id_title}`);
              data.append('subjob', `${subJobData[i].subjob}`);
              data.append('code', `${subJobData[i].code}`);
              data.append('purpose', `${subJobData[i].purpose}`);
              data.append('remind', `${newRemind}`);
              data.append(
                'assessor',
                `${
                  subJobData[i].assessor.length === 0
                    ? ''
                    : subJobData[i].assessor.idUser
                }`,
              );
              data.append('is_priority', `${subJobData[i].is_priority}`);
              data.append('stoppable', `${subJobData[i].stoppable}`);
              data.append('alarm', `${subJobData[i].alarm}`);
              data.append('deadline', `${subJobData[i].deadline}`);
              data.append('note', `${subJobData[i].note}`);
              subJobData[i].img_refer.length === 0
                ? data.append('subjob', `${subJobData[i].subjob}.empty`)
                : subJobData[i].img_refer.forEach((item) => {
                    data.append('img[]', {
                      name: item.uri.split('/').pop(),
                      type: item.mime,
                      uri: item.uri,
                    });
                  });
              console.log('Ini adalah formdata', data);

              const config = {
                headers: {
                  'Content-type': 'multipart/form-data',
                },
              };
              axios
                .post(`${API_URL}/jzl/api/api/save_subjob`, data, config)
                .then((res) => {
                  console.log(res);
                  setModalLoading(false);
                  setTxtLoading('Upload success');
                  // showToastWithGravityAndOffset('Success add job');
                  deleteAllsubJob();
                  navigation.goBack();
                })
                .catch(({response}) => {
                  setModalLoading(false);
                  setTxtLoading('Upload Failed');
                  console.log(response);
                });
            }
          })
          .catch(({response}) => {
            setModalLoading(false);
            console.log(response);
          });
      }
    }
  };

  return (
    <>
      {/* The View */}
      <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack}>
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
            value={title}
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
          onPress={() => {
            openModal();
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={CoAdmin}
              style={{height: 40, width: 40, marginRight: 10}}
            />
            <Text>Add Co-Admin</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{color: colors.txtGrey}}>
              {checkedCoadmin === ''
                ? 'None'
                : checkedCoadmin.name.split(' ')[0]}
            </Text>
            <Image
              source={ArrowDown}
              style={{
                height: 10,
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
                    height: 10,
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
                {leader === '' ? 'None' : leader.name.split(' ')[0]}
              </Text>
              <Animated.Image
                source={ArrowDown}
                style={[
                  {
                    height: 10,
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
        <View
          activeOpacity={0.9}
          style={{...styles.crew, borderRadius: 20, marginBottom: 30}}
          onPress={() => {
            toogleCrew();
          }}>
          <TouchableOpacity
            onPress={toogleSubJob}
            activeOpacity={0.9}
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
              <Text style={{color: colors.txtGrey}}>
                {subJobData.length === 0 ? 'None' : subJobData.length}
              </Text>
              <Animated.Image
                source={ArrowDown}
                style={[
                  {
                    height: 10,
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
          </TouchableOpacity>
          <Collapsible collapsed={colapseSubjob}>
            <View style={styles.content}>
              <FlatList
                data={subJobData}
                keyExtractor={(item, index) => index.toString()}
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

                        <TextInput
                          placeholder="input Subjob"
                          value={checkId === item.id ? name : item.subjob}
                          onChangeText={(text) => setName(text)}
                          onFocus={() => handleInput(item.id, item.subjob)}
                          onEndEditing={() => {
                            handleUpdateSubjob(name, item.id);
                          }}
                        />
                      </View>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={{marginRight: 10, color: colors.txtGrey}}>
                          {item.deadline === ''
                            ? ''
                            : item.deadline.split(' ')[0]}
                        </Text>
                        <Popover
                          // placement={PopoverPlacement.BOTTOM}
                          style={{
                            borderRadius: 20,
                            height: 50,
                            width: 100,
                          }}
                          isVisible={checkSub === item.id ? true : false}
                          onRequestClose={() => {
                            setCheckSub();
                          }}
                          from={
                            <TouchableOpacity
                              onRequestClose={() => {
                                setCheckSub();
                              }}
                              onPress={() => {
                                setCheckSub(item.id);
                              }}>
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
                                setCheckSub();
                                navigation.navigate('addsubjob', {
                                  id: item.id,
                                  coAdminName: checkedCoadmin,
                                });
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
                                handleDeleteSubjob(item.id);
                                setCheckSub();
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
                    </View>
                  );
                }}
              />
              <TouchableOpacity
                style={styles.containerAdd}
                onPress={handleAddSubjob}>
                <Image
                  source={Plus1}
                  style={{height: 15, width: 15, marginRight: 10}}
                />
                <Text style={styles.addBtn}>Add ..</Text>
              </TouchableOpacity>
            </View>
          </Collapsible>
        </View>
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
          <TextInput
            placeholder="Search Co-Admin Name..."
            onChangeText={(search) => setSearch(search)}
            onSubmitEditing={searchName}
          />
          <Image source={Search} />
        </View>
        <View style={styles.containerScrollDataModal}>
          <View style={styles.headerData}>
            <Text style={{color: colors.txtGrey}}>Name</Text>
            <Text style={{color: colors.txtGrey, marginRight: 40}}>
              Details
            </Text>
          </View>
          <FlatList
            data={searchData.length === 0 ? dataCrew : searchData}
            renderItem={({item}) => {
              const {idUser, name, pt, idPt} = item;
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
                  }}>
                  <View style={styles.listData}>
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
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
            }}
            keyExtractor={(item, index) => index.toString()}
            onEndReached={handleLoadmore}
            onEndReachedThreshold={0.01}
            ListFooterComponent={searchData.length === 0 ? renderFooter : null}
          />
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
            <View style={styles.formSearch}>
              <TextInput
                placeholder="Search Crew Name..."
                onChangeText={(search) => setSearch(search)}
                onSubmitEditing={searchName}
              />
              <Image source={Search} />
            </View>
            <View
              style={{
                ...styles.containerScrollDataModal,
                height: windowHeight - 320,
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
              <FlatList
                data={searchData.length === 0 ? dataCrew : searchData}
                renderItem={({item}) => {
                  const {idUser, name, pt, idPt} = item;
                  var foundValue =
                    checkCrew.length > 0 &&
                    checkCrew.filter((obj) => obj.idUser === idUser);
                  return (
                    <TouchableOpacity
                      activeOpacity={0.6}
                      onPress={() => {
                        addNewItem(idUser, name, idPt);
                      }}
                      disabled={checkedCoadmin.idUser == idUser ? true : false}>
                      <View style={styles.listData}>
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
                }}
                keyExtractor={(item, index) => index.toString()}
                onEndReached={handleLoadmore}
                onEndReachedThreshold={0.01}
                ListFooterComponent={
                  searchData.length === 0 ? renderFooter : null
                }
              />
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

      {/* Modal loading */}
      <Modal
        isVisible={modalLoading}
        backdropOpacit={0.9}
        animationIn="fadeIn"
        animationOut="fadeOut"
        animationOutTiming={2000}
        useNativeDriver={true}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <View
            style={{
              height: 100,
              width: 200,
              borderRadius: 15,
              backgroundColor: 'white',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ActivityIndicator size="large" color="blue" />
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>{txtLoading}</Text>
          </View>
        </View>
      </Modal>
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteJobRedux: () => dispatch(deleteJobGroup()),
    deleteAllsubJob: () => dispatch(deleteAllSubJob()),
    deleteSubJobRedux: (data) => dispatch(deleteSubjob(data)),
    updateSubjobRedux: (data) => dispatch(updateSubjob(data)),
    addSubJobRedux: (data) => dispatch(addSubjob(data)),
  };
};

export default connect(null, mapDispatchToProps)(AddJobGroup);

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
    fontFamily: fonts.SFProDisplayMedium,
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
    paddingHorizontal: 20,
    paddingTop: 20,
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
