import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  TextInput,
  Animated,
  Switch,
  Pressable,
  ToastAndroid,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Modal from 'react-native-modal';
import Slider from 'react-native-slider';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import {
  ArrowDown,
  BackIcon,
  CoAdmin,
  DeadlineDate,
  SwitchActive,
  SwitchDefault,
  DeadlineHour,
  Morning,
  Afternoon,
  Daylight,
  Assessor,
  Prio,
  Prio1,
  Remind,
  SortBtn,
  RadioUncheck,
  Plus,
  Plus1,
  Check,
  RadioChecked,
  CheckActive,
  Camera,
  Galery,
  StopFill,
  Hamberger,
} from '../../assets';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';
import Collapsible from 'react-native-collapsible';
import {CalendarList} from 'react-native-calendars';
// import Slider from '@react-native-community/slider';
import styles from './styles';
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';
import {API_URL} from '@env';
import {connect, useSelector} from 'react-redux';
import {updateDetailSubjob} from '../../public/redux/ActionCreators/job';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const datenow = new Date().getDate();
const montNow = new Date().getMonth() + 1;
const yearNow = new Date().getFullYear();
const hour = new Date().getHours() + 1;

const timeNow = Number(`${yearNow}0${montNow}${datenow}`);
const optionTime = `${yearNow}-0${montNow}-${datenow}`;

const nextWeek = new Date().getTime() + 7 * 24 * 60 * 60 * 1000;
const tomorrow = new Date().getTime() + 1 * 24 * 60 * 60 * 1000;
const today = new Date().getTime();

console.log('Ini adalah Datenow', datenow);
const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const AddSubJob = ({navigation, route, updateDetailSubjobRedux}) => {
  const subJobData = useSelector((state) => state.job.subJobData);
  const coAdminParams = route.params.coAdminName;
  const idParams = route.params.id;

  useEffect(() => {
    subJobData.map((item) => {
      return item.id === idParams
        ? (setDataSubjob(item),
          setTitle(item.subjob),
          setImages(item.img_refer),
          setCheckRemind(item.remind),
          setCheckCoassessor(item.assessor),
          setSwitchPrio(item.is_priority === 1 ? true : false),
          setSwitchDate(item.deadline != '' ? true : false),
          setSwitchHour(item.deadline != '' ? true : false),
          setPurpose(item.purpose),
          setSelectedDate(item.deadline.split(' ')[0]),
          setValueHour(
            item.deadline === ''
              ? hour
              : Number(item.deadline.split(' ')[1].split(':')[0]),
          ),
          setNote(item.note),
          setApproval(
            item.approval === ''
              ? {
                  idUser: 1,
                  name: 'Bernabas Aditya',
                  status: 1,
                }
              : item.approval[0],
          ),
          setApproval2(
            item.approval === ''
              ? coAdminParams.length === 0
                ? ''
                : {...coAdminParams, status: 0}
              : item.approval[1],
          ),
          setOptionRemind(item.alarm),
          setStopable(item.stoppable == 1 ? true : false),
          console.log(item))
        : null;
    });
  }, []);

  useEffect(() => {
    if (coAdminParams.length === 0) {
      setApproval2('');
    } else {
      if (subJobData.approval === '') {
        setApproval2({...coAdminParams, status: 0});
      }
    }

    // setApproval2({...coAdminParams, status: 0});
  }, []);

  //-------------------State here---------------------
  const [animation, setAnimation] = useState(new Animated.Value(0));
  const [arrow, setArrow] = useState(false);
  const [collapseApproval, setCollapseApproval] = useState(true);
  const [collapseDeadline, setCollapseDeadline] = useState(true);
  const [collapseDeadlineHour, setCollapseDeadlineHour] = useState(true);
  const [collapseRemind, setCollapseRemind] = useState(true);
  const [isEnabled, setIsEnabled] = useState(false);
  const [daySelected, setDaySelected] = useState([]);
  const [markedDates, setMarkedDates] = useState({});
  const [month, setMonth] = useState(monthNames[new Date().getMonth()]);
  const [year, setYear] = useState(yearNow);
  const [selectedDate, setSelectedDate] = useState(
    `${yearNow}-0${montNow}-${datenow}`,
  );
  const [option, setOption] = useState('');
  const [switchDate, setSwitchDate] = useState(false);
  const [switchHour, setSwitchHour] = useState(false);
  const [switchPrio, setSwitchPrio] = useState(false);
  const [switchRemind, setSwitchRemind] = useState(false);
  const [modalCoAssessor, setModalCoAssessor] = useState(false);
  const [modalRemind, setModalRemind] = useState(false);
  const [modalCamera, setModalCamera] = useState(false);
  const [checkCoassessor, setCheckCoassessor] = useState('');
  const [valueHour, setValueHour] = useState(hour);
  const [valueMinutes, setValueMinutes] = useState('0');
  const [images, setImages] = useState([]);
  const [editImage, setEditImage] = useState(true);
  const [dataCrew, setDataCrew] = useState([]);
  const [search, setSearch] = useState('');
  const [searchData, setSearchData] = useState([]);
  const [checkRemind, setCheckRemind] = useState([]);
  const [pages, setPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [dataSubjob, setDataSubjob] = useState({});
  const [purpose, setPurpose] = useState('');
  const [note, setNote] = useState('');
  const [approval, setApproval] = useState({
    idUser: 1,
    name: 'Bernabas Aditya',
    status: 1,
  });
  const [approval2, setApproval2] = useState({});
  const [optionRemind, setOptionRemind] = useState('');
  const [stopable, setStopable] = useState(false);

  //---------------------End of State-------------------------

  useEffect(() => {
    getData();
  }, [search]);

  //----------------- Start Function Here---------------------
  const setNewDaySelected = (date) => {
    const Y = new Date().getFullYear();
    let M = new Date().getMonth() + 1;
    let D = new Date().getDate();

    if (D < 10) {
      D = '0' + D;
    } else {
      D;
    }

    if (M < 10) {
      M = '0' + M;
    } else {
      M;
    }

    const thisTime = `${Y}-${M}${D}`;
    const now = new Date(thisTime).getTime();
    const set = new Date(date).getTime();

    const numMonth = date.split('-')[1];
    const year = date.split('-')[0];
    if (set < now) {
      alert('Pilih Deadline tidak boleh kmren yaa boskuh');
    } else {
      const markedDate = Object.assign({});
      markedDate[date] = {
        selected: true,
        selectedColor: '#40a1f8',
      };
      if (numMonth < 10) {
        setMonth(monthNames[numMonth.split('0')[1] - 1]);
      } else if (numMonth > 9) {
        setMonth(monthNames[numMonth - 1]);
      }
      setYear(year);
      setSelectedDate(date);
      setMarkedDates(markedDate);
    }
  };

  const toogleApproval = () => {
    setCollapseApproval(!collapseApproval);
    setArrow(!arrow);
    if (collapseApproval) {
      startAnimation();
    } else {
      endAnimation();
    }
  };

  const toogleRemind = () => {
    setCollapseRemind(!collapseRemind);
  };

  const showToastWithGravity = (msg) => {
    ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.CENTER);
  };

  const OptionDate = (date) => {
    const Y = new Date(date).getFullYear();
    let M = new Date(date).getMonth() + 1;
    let D = new Date(date).getDate();

    if (D < 10) {
      D = '0' + D;
    } else {
      D;
    }

    if (M < 10) {
      M = '0' + M;
    } else {
      M;
    }

    setNewDaySelected(`${Y}-${M}-${D}`);
  };

  const handleSlider = (value) => {
    // console.log(value);
    let result = value.toString().length;
    if (result === 3 || result === 4) {
      const hour = Number(value.toString().split('.')[0]);
      const minutes = 30;
      setValueHour(hour);
      setValueMinutes(minutes);
    } else {
      // console.log(value);
      setValueHour(Number(value.toString().split('.')[0]));
      setValueMinutes('0');
    }
    // this.setState({valueHour});
  };

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
          setImages(
            img.map((i) => {
              console.log('received image', i);
              return {
                uri: i.path,
                width: i.width,
                height: i.height,
                mime: i.mime,
              };
            }),
          );
        } else {
          let result = img.map((i) => {
            return {
              uri: i.path,
              width: i.width,
              height: i.height,
              mime: i.mime,
            };
          });
          setImages([...images.concat(result)]);
        }
      })
      .catch((e) => alert(e));
  };

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

  const deletePhoto = (uri) => {
    let foundValue = images.filter((obj) => obj.uri === uri);
    if (foundValue[0].uri == uri) {
      const newImages = images.filter((item) => item.uri !== uri);
      setImages(newImages);
    }
  };

  const renderAsset = (image) => {
    return renderImage(image);
  };

  const renderImage = (image) => {
    return (
      <>
        {!editImage ? (
          <View>
            <View style={{marginTop: 15, position: 'relative'}}>
              <Image
                style={{
                  width: 70,
                  height: 70,
                  marginHorizontal: 10,
                  marginBottom: 10,
                  resizeMode: 'cover',
                  borderRadius: 20,
                }}
                source={image}
              />
            </View>
            <Pressable
              onPress={() => {
                const parameter = image.uri;
                deletePhoto(parameter);
              }}
              style={{
                height: 20,
                width: 20,
                position: 'absolute',
                top: 10,
                left: 5,
              }}>
              <Image
                source={StopFill}
                style={{
                  height: 20,
                  width: 20,
                }}
              />
            </Pressable>
          </View>
        ) : (
          <View>
            <View style={{marginTop: 15, position: 'relative'}}>
              <Image
                style={{
                  width: 50,
                  height: 50,
                  marginHorizontal: 5,
                  marginBottom: 10,
                  resizeMode: 'cover',
                  borderRadius: 15,
                }}
                source={image}
              />
            </View>
          </View>
        )}
      </>
    );
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
    if (checkRemind.length < 1) {
      setCheckRemind([
        ...checkRemind,
        {
          idUser,
          name,
          idPt,
        },
      ]);
    } else {
      let foundValue = checkRemind.filter((obj) => obj.idUser === idUser);
      if (foundValue.length == 0) {
        setCheckRemind([
          ...checkRemind,
          {
            idUser,
            name,
            idPt,
          },
        ]);
      } else if (foundValue[0].idUser == idUser) {
        const newRemind = checkRemind.filter((item) => item.idUser !== idUser);
        setCheckRemind(newRemind);
      }
    }
  };

  const removeListCrew = (idUser, index) => {
    const arr = [...checkRemind];
    arr.splice(index, 1);
    setCheckRemind(arr);
  };

  const handleLoadmore = () => {
    setPages(pages + 1);
    getData();
    setIsLoading(true);
  };

  const handleSwitch = () => {
    setApproval2(approval);
    setApproval(approval2);
  };
  const handleSwitch1 = () => {
    if (approval2.status === 1) {
      setApproval(approval2);
      setApproval2({...approval, status: 0});
    }
  };
  const handleSwitch2 = () => {
    if (approval2.status === 1) {
      setApproval2({...approval2, status: 0});
    } else if (approval2.status === 0) {
      setApproval2({...approval2, status: 1});
    }
  };

  const renderFooter = () => {
    return isLoading ? (
      <View>
        <ActivityIndicator size="large" color="blue" />
      </View>
    ) : null;
  };

  const submitSubjob = () => {
    const time =
      valueHour < 10
        ? '0' + valueHour + ': 00'
        : `${valueHour}:${
            valueMinutes === ''
              ? '0'
              : valueMinutes.toString() < 10
              ? '0' + valueMinutes.toString()
              : valueMinutes.toString()
          }`;

    const priority = switchPrio === false ? 0 : 1;
    let approvalData = [approval, approval2];

    const data = {
      id: dataSubjob.id,
      id_title: dataSubjob.id_title,
      subjob: title,
      code: dataSubjob.code,
      approval: [approval, approval2],
      stoppable: stopable ? 1 : 0,
      alarm: optionRemind,
      remind: checkRemind.length === 0 ? '' : checkRemind,
      note: note,
      purpose: purpose,
      assessor: checkCoassessor === '' ? '' : checkCoassessor,
      deadline: switchDate ? selectedDate + ' ' + time : '',
      deadline_revise: '',
      is_priority: priority,
      is_failed: '',
      is_overdue: '',
      img_refer: images.length === 0 ? '' : images,
      img_request: '',
      reported: '',
    };

    console.log('ini data yang dikirim ke redux ', data);
    updateDetailSubjobRedux(data);
    navigation.navigate('addjobgroup', {
      subjob: title,
      id: dataSubjob.id,
    });
  };

  //-------------End Function Here-----------------

  //--------------Animation Here-------------------
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

  const rotateInterpolate = animation.interpolate({
    inputRange: [0, 90],
    outputRange: ['0deg', '-90deg'],
  });

  const animatedStyle = {
    transform: [{rotate: rotateInterpolate}],
  };

  let renderApproval;
  if (approval.name === 'Bernabas Aditya' && approval2.status === 0) {
    renderApproval = <Text style={{color: colors.txtGrey}}>Only You</Text>;
  } else if (approval.name != 'Bernabas Aditya' && approval2.status === 0) {
    renderApproval = (
      <Text style={{color: colors.txtGrey}}>
        Only {approval.name.split(' ')[0]}
      </Text>
    );
  } else if (approval.status === 1 && approval2.status === 1) {
    renderApproval = (
      <Text style={{color: colors.txtGrey}}>
        {approval.name === 'Bernabas Aditya'
          ? 'You'
          : approval.name.split(' ')[0]}{' '}
        then{' '}
        {approval2.name === 'Bernabas Aditya'
          ? 'You'
          : approval2.name.split(' ')[0]}
      </Text>
    );
  } else {
    renderApproval = <Text style={{color: colors.txtGrey}}>Only You</Text>;
  }

  let valueRemindOption;
  if (optionRemind === 1) {
    valueRemindOption = (
      <Text style={{color: colors.colorDetail}}>
        15 minutes before deadline
      </Text>
    );
  } else if (optionRemind === 2) {
    valueRemindOption = (
      <Text style={{color: colors.colorDetail}}>1 hour before deadline</Text>
    );
  } else if (optionRemind === 3) {
    valueRemindOption = (
      <Text style={{color: colors.colorDetail}}>1 day before deadline</Text>
    );
  } else if (optionRemind === 4) {
    valueRemindOption = (
      <Text style={{color: colors.colorDetail}}>From start to Finish</Text>
    );
  } else {
    valueRemindOption = <Text style={{color: colors.colorDetail}}>None</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.containerHeader}>
        <TouchableOpacity
          style={styles.left}
          onPress={() => {
            navigation.pop();
          }}>
          <Image source={BackIcon} style={styles.imgHeader} />
          <Text style={styles.txtColorBlue}>New Job 1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.center}>
          <Text style={styles.titletxt}>Add Sub Job</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.right}
          onPress={() => {
            submitSubjob();
          }}>
          <Text style={styles.txtColorBlue}>Add</Text>
        </TouchableOpacity>
      </View>

      {/* Code */}
      <View style={styles.code}>
        <Text style={styles.txtCode}>Code</Text>
        <Text style={styles.txtCode}>{dataSubjob.code}</Text>
      </View>

      {/* title */}
      <View style={styles.titleinpt}>
        <TextInput
          placeholder="Input Subjob"
          value={title}
          onChangeText={(text) => setTitle(text)}
        />
      </View>

      {/* approval */}
      <View style={styles.containerApproval}>
        <TouchableOpacity
          style={styles.rowApproval}
          onPress={() => {
            toogleApproval();
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={CoAdmin}
              style={{height: 30, width: 30, marginRight: 20}}
            />
            <Text style={styles.titleRow}>Approval</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {/* <Text style={{color: colors.txtGrey}}>Only You</Text> */}
            {renderApproval}
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
        </TouchableOpacity>
        <Collapsible collapsed={collapseApproval} align="center">
          <View style={styles.content}>
            <View
              style={styles.rowDataApproval}
              activeOpacity={0.8}
              onPress={() => {}}>
              <View style={{flexDirection: 'row'}}>
                <View style={styles.circle}>
                  <Text style={{fontSize: 12}}>1</Text>
                </View>
                <Text>
                  {approval.name === 'Bernabas Aditya' ? 'You' : approval.name}
                </Text>
              </View>
              <TouchableOpacity onPress={handleSwitch1} activeOpacity={0.9}>
                <Image source={SwitchActive} style={{height: 20, width: 40}} />
              </TouchableOpacity>
            </View>
            {coAdminParams.length === 0 ? null : (
              <View style={styles.rowDataApproval}>
                <View style={{flexDirection: 'row'}}>
                  <View style={styles.circle}>
                    <Text style={{fontSize: 12}}>2</Text>
                  </View>
                  <Text>
                    {approval2.name === 'Bernabas Aditya'
                      ? 'You'
                      : approval2.name}
                  </Text>
                </View>
                <TouchableOpacity onPress={handleSwitch2} activeOpacity={0.9}>
                  {approval2.status == 1 ? (
                    <Image
                      source={SwitchActive}
                      style={{height: 20, width: 40}}
                    />
                  ) : (
                    <Image
                      source={SwitchDefault}
                      style={{height: 20, width: 40}}
                    />
                  )}
                </TouchableOpacity>
              </View>
            )}
            {coAdminParams.length < 1 ? (
              <View
                style={{...styles.btnSwitch, backgroundColor: colors.txtGrey}}
                onPress={handleSwitch}>
                <Text style={{color: 'white', fontWeight: 'bold'}}>
                  Switch Order
                </Text>
              </View>
            ) : approval2.status === 0 ? (
              <View
                style={{...styles.btnSwitch, backgroundColor: colors.txtGrey}}
                onPress={handleSwitch}>
                <Text style={{color: 'white', fontWeight: 'bold'}}>
                  Switch Order
                </Text>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.btnSwitch}
                onPress={handleSwitch}
                activeOpacity={0.8}>
                <Text style={{color: 'white', fontWeight: 'bold'}}>
                  Switch Order
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </Collapsible>
      </View>

      {/* Purpose */}
      <View style={styles.purposeBox}>
        <TextInput
          placeholder="Purpose"
          value={purpose}
          multiline={true}
          onChangeText={(text) => setPurpose(text)}
          styles={{height: '100%'}}
        />
      </View>

      {/* Deadline Date*/}
      <View
        style={{
          ...styles.deadline,
          marginTop: 20,
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          activeOpacity={0.6}
          style={{flexDirection: 'row', alignItems: 'center'}}
          onPress={() => {
            if (switchDate === true && switchHour === true) {
              setCollapseDeadline(!collapseDeadline);
              setCollapseDeadlineHour(!collapseDeadlineHour);
            } else if (switchDate === false && switchHour === false) {
              setCollapseDeadline(!collapseDeadline);
              setCollapseDeadlineHour(!collapseDeadlineHour);
              setSwitchDate(true);
              setSwitchHour(true);
              OptionDate(today);
            }
          }}>
          <Image source={DeadlineDate} style={styles.imgSize} />
          <Text style={styles.titleRow}>Deadline Date</Text>
        </TouchableOpacity>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{color: colors.txtGrey}}>
            {switchDate == false
              ? 'None'
              : selectedDate.split('-')[2] + ' ' + month === ''
              ? 'None'
              : selectedDate.split('-')[2] + ' ' + month}
          </Text>
          <Pressable
            onPress={() => {
              setSwitchDate(!switchDate);
              setSwitchHour(!switchHour);
              OptionDate(today);
            }}>
            <Image
              source={switchDate ? SwitchActive : SwitchDefault}
              style={{height: 23, width: 43, marginLeft: 10}}
            />
          </Pressable>
        </View>
      </View>
      <Collapsible collapsed={collapseDeadline}>
        <View style={styles.containerCalendar}>
          <CalendarList
            theme={{
              width: 250,
              backgroundColor: 'transparent',
              textDayHeaderFontWeight: '100',
              calendarBackground: 'transparent',
              textDayFontSize: 14,
              textMonthFontSize: 14,
              dayTextColor: 'black',
              headerTextColor: 'black',
              textDayHeaderFontSize: 20,
              justifyContent: 'center',
              textDayHeaderFontSize: 14,
              selectedDayBackgroundColor: '#40a1f8',
              'stylesheet.day.basic': {
                base: {
                  width: 30,
                  height: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                },
              },
              'stylesheet.calendar.header': {
                header: {
                  height: 0,
                  opacity: 0,
                },
                dayHeader: {
                  marginTop: 2,
                  marginBottom: 7,
                  width: 30,
                  textAlign: 'center',
                  fontSize: 12,
                  color: 'black',
                },
              },
              justifyContent: 'center',
            }}
            style={{
              borderRadius: 20,
              alignSelf: 'center',
              width: 220,
              height: 150,
              borderRadius: 20,
              backgroundColor: '#f2f3f7',
            }}
            horizontal={true}
            calendarWidth={230}
            pastScrollRange={0}
            futureScrollRange={1}
            scrollEnabled={true}
            showScrollIndicator={false}
            onDayPress={(day) => {
              if (day.month > montNow) {
                setNewDaySelected(day.dateString);
                setSwitchDate(true);
                setSwitchHour(true);
              } else if (day.day < datenow) {
                showToastWithGravity('Cannot choose date before now');
              } else {
                setNewDaySelected(day.dateString);
                setSwitchDate(true);
                setSwitchHour(true);
              }
            }}
            markedDates={markedDates}
          />
          <View style={styles.sideCalender}>
            <View>
              <View style={styles.btn}>
                <Text>{month}</Text>
              </View>
              <View style={styles.btn}>
                <Text>{year}</Text>
              </View>
            </View>
            <TouchableOpacity
              style={{
                ...styles.option,
                marginTop: 20,
                backgroundColor:
                  option === 'today' ? colors.badgeBlue : 'white',
              }}
              onPress={() => {
                setOption('today');
                OptionDate(today);
              }}>
              <Text>Today</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                ...styles.option,
                backgroundColor:
                  option === 'tomorrow' ? colors.badgeBlue : 'white',
              }}
              onPress={() => {
                setOption('tomorrow');
                OptionDate(tomorrow);
              }}>
              <Text>Tomorrow</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.option}
              style={{
                ...styles.option,
                backgroundColor:
                  option === 'nextWeek' ? colors.badgeBlue : 'white',
              }}
              onPress={() => {
                setOption('nextWeek');
                OptionDate(nextWeek);
              }}>
              <Text>Next Week</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Collapsible>

      {/* Deadline Hour */}
      <View
        style={{
          ...styles.deadline,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          marginBottom: 30,
        }}>
        <View style={styles.line} />
        <View style={styles.btnDeadline}>
          <TouchableOpacity
            style={{flexDirection: 'row', alignItems: 'center'}}
            onPress={() => {
              setCollapseDeadlineHour(!collapseDeadlineHour);
              setSwitchHour(true);
            }}>
            <Image source={DeadlineHour} style={styles.imgSize} />
            <Text style={styles.titleRow}>Deadline Hour</Text>
          </TouchableOpacity>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{color: colors.txtGrey}}>
              {switchHour === false
                ? 'None'
                : valueHour < 10
                ? '0' + valueHour + ': 00'
                : `${valueHour}:${
                    valueMinutes === ''
                      ? '0'
                      : valueMinutes.toString() < 10
                      ? '0' + valueMinutes.toString()
                      : valueMinutes.toString()
                  }`}
            </Text>
            <TouchableOpacity
              onPress={() => {
                setSwitchDate(!switchDate);
                setSwitchHour(!switchHour);
              }}>
              <Image
                source={switchHour ? SwitchActive : SwitchDefault}
                style={{height: 23, width: 43, marginLeft: 10}}
              />
            </TouchableOpacity>
          </View>
        </View>
        <Collapsible collapsed={collapseDeadlineHour}>
          <View style={styles.collapseRow}>
            <View style={styles.txtCollapseTime}>
              <TextInput
                style={{width: 30}}
                value={
                  valueHour.toString() < 10
                    ? '0' + valueHour.toString()
                    : valueHour.toString()
                }
                onChangeText={(valueHour) => {
                  console.log(Number(valueHour));
                  console.log(valueHour);
                  if (valueHour > 17) {
                    showToastWithGravity('ga boleh lebih dari jam 5');
                    setValueHour(17);
                  } else {
                    setValueHour(Number(valueHour));
                  }
                }}
                onEndEditing={() => {
                  if (Number(valueHour) < 9) {
                    showToastWithGravity('jam harus lebih dari jam 9');
                    setValueHour(9);
                  }
                }}
                keyboardType="number-pad"
              />
              <View style={{height: 15, borderWidth: 0.5}} />
              <TextInput
                style={{width: 30}}
                placeholder="00"
                value={
                  valueMinutes.toString() < 10
                    ? '0' + valueMinutes.toString()
                    : valueMinutes.toString()
                }
                onChangeText={(valueMinutes) => {
                  if (valueHour === 17 && valueMinutes > 0) {
                    showToastWithGravity('dah jam 5 bos');
                  } else {
                    setValueMinutes(Number(valueMinutes));
                  }
                }}
                onEndEditing={() => {
                  if (Number(valueMinutes) === 60) {
                    showToastWithGravity('menit tidak boleh 60');
                    setValueMinutes(59);
                  }
                }}
                keyboardType="number-pad"
              />
            </View>
            <View style={styles.rowSlider}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Image source={Morning} style={{height: 14, width: 14}} />
                <Image source={Daylight} style={{height: 14, width: 14}} />
                <Image source={Afternoon} style={{height: 14, width: 14}} />
              </View>
              <Slider
                value={valueHour}
                onValueChange={(value) => {
                  handleSlider(value);
                }}
                step={0.5}
                minimumValue={9}
                maximumValue={17}
                style={styles.containerSlider}
                trackStyle={styles.track}
                thumbStyle={styles.thumb}
                minimumTrackTintColor="#31a4db"
                thumbTouchSize={{width: 50, height: 40}}
              />
            </View>
          </View>
        </Collapsible>
      </View>

      {/* add Co assesor */}
      <TouchableOpacity
        style={styles.continerAddCoAssessor}
        activeOpacity={0.6}
        onPress={() => {
          setModalCoAssessor(true);
        }}>
        <View style={styles.flexView}>
          <Image source={Assessor} style={styles.imgSize} />
          <Text style={styles.titleRow}>Add Co-Assesor</Text>
        </View>
        <View style={styles.flexView}>
          <Text style={{color: colors.txtGrey}}>
            {checkCoassessor === '' ? 'None' : checkCoassessor.name}
          </Text>
          <Image source={ArrowDown} style={styles.imgArrow} />
        </View>
      </TouchableOpacity>

      {/* Prioritize */}
      <TouchableOpacity
        style={styles.continerAddCoAssessor}
        activeOpacity={0.6}
        onPress={() => {
          setSwitchPrio(!switchPrio);
        }}>
        <View style={styles.flexView}>
          <Image source={Prio1} style={styles.imgSize} />
          <Text style={styles.titleRow}>Prioritized</Text>
        </View>
        <Image
          source={switchPrio ? SwitchActive : SwitchDefault}
          style={styles.switch}
        />
      </TouchableOpacity>

      {/* Remind Other */}
      <View style={styles.containerRemind}>
        <TouchableOpacity
          style={styles.rowReminder}
          onPress={() => {
            toogleRemind();
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image
              source={Remind}
              style={{height: 30, width: 30, marginRight: 20}}
            />
            <Text style={styles.titleRow}>Remind Other</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={checkRemind.length > 0 ? SwitchActive : SwitchDefault}
              style={styles.switch}
            />
          </View>
        </TouchableOpacity>
        <Collapsible collapsed={collapseRemind}>
          {checkRemind.length < 1 ? null : (
            <View style={styles.containerRemindRow}>
              {/* Remind Option */}
              <View>
                {/* Stopable */}
                <View style={styles.flexRow}>
                  <Text style={styles.titleRow}>Stopable</Text>
                  <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => {
                      setStopable(!stopable);
                    }}>
                    <Image
                      source={stopable === true ? SwitchActive : SwitchDefault}
                      style={styles.switch}
                    />
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    ...styles.line,
                    width: '100%',
                    marginTop: 10,
                    marginBottom: 10,
                  }}
                />
                {/* Reminder Alarm */}
                <View style={{marginBottom: 10}}>
                  <View style={styles.flexRow}>
                    <Text style={styles.titleRow}>Reminder Alarm</Text>
                    {/* <Text style={{color: colors.txtGrey}}>None</Text> */}
                    {valueRemindOption}
                  </View>
                  <View style={{...styles.flexRow, marginTop: 10}}>
                    <TouchableOpacity
                      style={{
                        ...styles.btnOptionRemind,
                        backgroundColor:
                          optionRemind === 1 ? colors.badgeBlue : 'white',
                      }}
                      onPress={() => {
                        setOptionRemind(1);
                      }}>
                      <Text
                        style={{
                          ...styles.txtRemindOption,
                          color: optionRemind === 1 ? 'white' : '#b6b6b6',
                        }}>
                        15 MINUTES
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        ...styles.btnOptionRemind,
                        backgroundColor:
                          optionRemind === 2 ? colors.badgeBlue : 'white',
                      }}
                      onPress={() => {
                        setOptionRemind(2);
                      }}>
                      <Text
                        style={{
                          ...styles.txtRemindOption,
                          color: optionRemind === 2 ? 'white' : '#b6b6b6',
                        }}>
                        1 HOUR
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        ...styles.btnOptionRemind,
                        backgroundColor:
                          optionRemind === 3 ? colors.badgeBlue : 'white',
                      }}
                      onPress={() => {
                        setOptionRemind(3);
                      }}>
                      <Text
                        style={{
                          ...styles.txtRemindOption,
                          color: optionRemind === 3 ? 'white' : '#b6b6b6',
                        }}>
                        1 DAY
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        ...styles.btnOptionRemind,
                        backgroundColor:
                          optionRemind === 4 ? colors.badgeBlue : 'white',
                      }}
                      onPress={() => {
                        setOptionRemind(4);
                      }}>
                      <Text
                        style={{
                          ...styles.txtRemindOption,
                          color: optionRemind === 4 ? 'white' : '#b6b6b6',
                        }}>
                        FOLLOW
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          )}
          <View style={{marginTop: 10}}>
            <FlatList
              data={checkRemind}
              renderItem={({item, index}) => {
                const {idUser, name} = item;
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
                            height: '100%',
                            transform: [{rotate: '180deg'}],
                          }}
                          onPress={() => {
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
              keyExtractor={(item, index) => index.toString()}
            />
            <TouchableOpacity
              style={{
                marginBottom: 20,
                flexDirection: 'row',
                alignItems: 'center',
              }}
              onPress={() => {
                setModalRemind(true);
              }}>
              <Image
                source={Plus1}
                style={{height: 15, width: 15, marginRight: 10}}
              />
              <Text style={{color: colors.badgeBlue, fontWeight: 'bold'}}>
                Add...
              </Text>
            </TouchableOpacity>
          </View>
        </Collapsible>
      </View>

      {/* Add Image */}
      <View style={styles.containerAddImage}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              setModalCamera(true);
            }}>
            <Text style={{color: colors.badgeBlue, fontWeight: 'bold'}}>
              Add Image...
            </Text>
          </TouchableOpacity>
          {images.length < 1 ? null : (
            <TouchableOpacity onPress={() => setEditImage(!editImage)}>
              {editImage ? (
                <Text style={{color: colors.badgeBlue, fontWeight: 'bold'}}>
                  Edit
                </Text>
              ) : (
                <Text style={{color: colors.badgeBlue, fontWeight: 'bold'}}>
                  Done
                </Text>
              )}
            </TouchableOpacity>
          )}
        </View>
        {images.length < 1 ? null : (
          <ScrollView style={styles.rowImage} horizontal={true}>
            {images
              ? images.map((i) => (
                  <View style={{alignSelf: 'center'}} key={i.uri}>
                    {renderAsset(i)}
                  </View>
                ))
              : null}
          </ScrollView>
        )}
      </View>

      {/* Notes */}
      <View style={styles.containerNote}>
        <TextInput
          placeholder="Notes"
          multiline={true}
          value={note}
          onChangeText={(text) => setNote(text)}
        />
      </View>

      {/* Modal */}
      <Modal
        transparent={true}
        isVisible={modalCoAssessor}
        onBackdropPress={() => {
          setModalCoAssessor(false);
        }}
        animationIn="slideInRight"
        animationOut="slideOutRight"
        onRequestClose={() => {
          showToastWithGravity('Modal has been closed.');
          setModalCoAssessor(!modalCoAssessor);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {/* Header Modal */}
            <View style={styles.headerModal}>
              <Pressable
                onPress={() => {
                  setModalCoAssessor(false);
                  setCheckCoassessor('');
                  setSearch([]);
                }}>
                <Image source={BackIcon} style={{height: 15, width: 20}} />
              </Pressable>
              <Text style={styles.txtTitle}>Add Co assesor</Text>
              <Pressable
                onPress={() => {
                  setModalCoAssessor(false);
                  setSearch([]);
                }}>
                <Text style={styles.txtAdd}>Add</Text>
              </Pressable>
            </View>

            {/* Search Modal */}
            <View style={styles.searchModal}>
              <TextInput
                placeholder="Search Co-Assessor Name"
                onChangeText={(search) => setSearch(search)}
                onSubmitEditing={searchName}
              />
            </View>

            <View style={styles.containerScrollDataModal}>
              <View style={styles.headerData}>
                <Text style={{color: colors.txtGrey}}>Name</Text>
                <Text style={{color: colors.txtGrey, marginRight: 40}}>
                  Details
                </Text>
              </View>
              <View style={{flex: 1}}>
                <FlatList
                  data={searchData.length === 0 ? dataCrew : searchData}
                  renderItem={({item}) => {
                    const {idUser, name, pt, idPt} = item;
                    var foundValue =
                      checkRemind.length > 0 &&
                      checkRemind.filter((obj) => obj.idUser === idUser);
                    return (
                      <Pressable
                        disabled={
                          foundValue.length > 0
                            ? foundValue[0].idUser
                              ? true
                              : false
                            : false
                        }
                        activeOpacity={0.6}
                        onPress={() => {
                          setCheckCoassessor({
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
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
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
                                    checkCoassessor.idUser === idUser
                                      ? RadioChecked
                                      : RadioUncheck
                                  }
                                  style={{
                                    height: 20,
                                    width: 20,
                                    marginLeft: 10,
                                  }}
                                />
                              )
                            ) : (
                              <Image
                                source={
                                  checkCoassessor.idUser === idUser
                                    ? RadioChecked
                                    : RadioUncheck
                                }
                                style={{height: 20, width: 20, marginLeft: 10}}
                              />
                            )}
                          </View>
                        </View>
                      </Pressable>
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
              <View
                style={{
                  ...styles.flexView,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View style={styles.flexView}>
                  <Image
                    source={SortBtn}
                    style={{height: 15, width: 15, marginRight: 10}}
                  />
                  <Text style={styles.txtFooter}>Sort By</Text>
                </View>
                <Text style={styles.txtFooter}>Filter</Text>
              </View>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal Remind */}
      <Modal
        transparent={true}
        isVisible={modalRemind}
        onBackdropPress={() => {
          setModalRemind(false);
        }}
        animationIn="slideInRight"
        animationOut="slideOutRight"
        onRequestClose={() => {
          showToastWithGravity('Modal has been closed.');
          setModalRemind(!modalRemind);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {/* Header Modal */}
            <View style={styles.headerModal}>
              <Pressable
                onPress={() => {
                  setModalRemind(false);
                  setCheckRemind([]);
                }}>
                <Image source={BackIcon} style={{height: 15, width: 20}} />
              </Pressable>
              <Text style={styles.txtTitle}>Remind Who ? </Text>
              <Pressable
                onPress={() => {
                  setModalRemind(false);
                }}>
                <Text style={styles.txtAdd}>Add</Text>
              </Pressable>
            </View>

            {/* Search Modal */}
            <View style={styles.searchModal}>
              <TextInput
                placeholder="Search Crew Name..."
                onChangeText={(search) => setSearch(search)}
                onSubmitEditing={searchName}
              />
            </View>

            <View style={styles.containerScrollDataModal}>
              <View style={styles.headerData}>
                <Text style={{color: colors.txtGrey}}>Name</Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{color: colors.txtGrey, marginRight: 10}}>
                    Details
                  </Text>
                  <Image source={Check} style={{height: 15, width: 20}} />
                </View>
              </View>
              <View style={{flex: 1}}>
                <FlatList
                  data={searchData.length === 0 ? dataCrew : searchData}
                  renderItem={({item}) => {
                    const {idUser, name, pt, idPt} = item;
                    var foundValue =
                      checkRemind.length > 0 &&
                      checkRemind.filter((obj) => obj.idUser === idUser);
                    return (
                      <Pressable
                        activeOpacity={0.6}
                        onPress={() => {
                          addNewItem(idUser, name, idPt);
                        }}
                        disabled={
                          checkCoassessor.idUser == idUser ? true : false
                        }>
                        <View style={styles.listData}>
                          <View style={{flexDirection: 'row'}}>
                            <Text
                              style={{
                                color:
                                  checkCoassessor.idUser == idUser
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
                                  checkCoassessor.idUser == idUser
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
                      </Pressable>
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
              <View
                style={{
                  ...styles.flexView,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View style={styles.flexView}>
                  <Image
                    source={SortBtn}
                    style={{height: 15, width: 15, marginRight: 10}}
                  />
                  <Text style={styles.txtFooter}>Sort By</Text>
                </View>
                <Text style={styles.txtFooter}>Filter</Text>
              </View>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal Camera */}
      <Modal
        isVisible={modalCamera}
        transparent={true}
        onBackdropPress={() => {
          setModalCamera(false);
        }}
        onRequestClose={() => {
          showToastWithGravity('Modal has been closed.');
          setModalCamera(!modalCamera);
        }}>
        <View style={styles.containerModalUpload}>
          <View style={styles.viewStyled}>
            <Pressable
              style={{alignItems: 'center'}}
              onPress={() => {
                pickSingleWithCamera(false);
                setModalCamera(false);
              }}>
              <Image source={Camera} style={{height: 50, width: 50}} />
              <Text>Camera</Text>
            </Pressable>
            <Pressable
              style={{alignItems: 'center'}}
              onPress={() => {
                pickMultiple();
                setModalCamera(false);
              }}>
              <Image source={Galery} style={{height: 50, width: 50}} />
              <Text>Galery</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateDetailSubjobRedux: (data) => dispatch(updateDetailSubjob(data)),
  };
};

export default connect(null, mapDispatchToProps)(AddSubJob);
