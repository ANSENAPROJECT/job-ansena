import React, {useState} from 'react';
import {
  Image,
  ToastAndroid,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import Slider from 'react-native-slider';
import Collapsible from 'react-native-collapsible';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import {CalendarList} from 'react-native-calendars';
import {
  OverdueDateWhite,
  ArrowDownWhite,
  OverdueDateRed,
  ArrowUpRed,
  SwitchDefault,
  Morning,
  Daylight,
  Afternoon,
  SwitchActive,
  Image1,
  StopFill,
} from '../../assets';
import {fonts} from '../../utils/fonts';
import {colors} from '../../utils/colors';
import {connect, useSelector} from 'react-redux';
import {
  deleteProgressReport,
  updateProgressReport,
} from '../../public/redux/ActionCreators/progressReport';
import axios from 'axios';
import {API_URL} from '@env';
import {
  proposeOverdueHistory,
  statusButton,
} from '../../public/redux/ActionCreators/detailjob';

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

const Overdue = ({
  _ModalUpload,
  deleteProgressRedux,
  updateProgressRedux,
  proposeOverdueHistoryRedux,
  statusButtonRedux,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [collapse, setCollapse] = useState(true);
  const [deadlineCollape, setDeadlineCollape] = useState(true);
  const [hourCollapse, setHourCollapse] = useState(true);
  const [markedDates, setMarkedDates] = useState({});
  const [year, setYear] = useState(yearNow);
  const [valueHour, setValueHour] = useState(hour);
  const [valueMinutes, setValueMinutes] = useState('0');
  const [switchDate, setSwitchDate] = useState(false);
  const [switchHour, setSwitchHour] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    `${yearNow}-0${montNow}-${datenow}`,
  );
  const [month, setMonth] = useState(monthNames[new Date().getMonth()]);
  const [option, setOption] = useState('');

  const statusButton = useSelector((state) => state.detailjob.statusButton);
  const progressreport = useSelector(
    (state) => state.progressreport.img_request,
  );
  const jobId = useSelector((state) => state.detailjob.jobId);
  const subjobId = useSelector((state) => state.detailjob.subjobId);
  const [descrip, setDescrip] = useState('');
  const [check, setCheck] = useState('');
  const [reason, setReason] = useState('');
  const userId = useSelector((state) => state.auth.idUser);

  const showToastWithGravity = (msg) => {
    ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.CENTER);
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

  const setNewDaySelected = (date) => {
    let Y = new Date().getFullYear();
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
    if (set > now) {
      showToastWithGravity('Pilih Deadline tidak boleh kmren yaa boskuh');
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

  const renderAsset = (image, index) => {
    return renderImage(image, index);
  };

  const renderImage = (image, index) => {
    return (
      <>
        <View>
          <View style={{position: 'relative'}}>
            <Image source={image} style={styles.imgStyle} />
          </View>
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

  const handleUpdateDesc = (descript, image) => {
    const data = {
      desc: descrip,
      image: image,
    };
    updateProgressRedux(data);
  };

  const handleInput = (index, desc) => {
    setCheck(index);
    setDescrip(desc);
  };

  const handleupload = () => {
    const time =
      valueHour < 10
        ? '0' + valueHour + ':00'
        : `${valueHour}:${
            valueMinutes === ''
              ? '0'
              : valueMinutes.toString() < 10
              ? '0' + valueMinutes.toString()
              : valueMinutes.toString()
          }`;
    const deadline = `${selectedDate} ${time}`;

    if (reason === '') {
      showToastWithGravity('Field reason must be filled in');
    } else if (switchDate === false) {
      showToastWithGravity('The date must be selected');
    } else if (progressreport.length < 1) {
      showToastWithGravity('Image must be filled in');
    } else {
      const data = new FormData();
      data.append('jobId', `${jobId}`);
      data.append('subjobId', `${subjobId}`);
      data.append('userId', `${userId}`);
      data.append('note_request', `${reason}`);
      data.append('deadline', `${deadline}`);
      progressreport.forEach((item) => {
        data.append('img_request[]', {
          name: item.image.uri.split('/').pop(),
          type: item.image.mime,
          uri: item.image.uri,
        });
      });
      progressreport.forEach(({desc}) => {
        data.append('desc_request[]', desc);
      });

      console.log(data);

      const config = {
        headers: {
          'Content-type': 'multipart/form-data',
        },
      };
      axios
        .post(`${API_URL}/jzl/api/api/request_deadline`, data, config)
        .then((res) => {
          console.log(res);
          setIsLoading(false);
          proposeOverdueHistoryRedux(res.data.data.overdueHistory);
          statusButtonRedux(res.data.data.statusButton);
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
          statusButton === 'active user'
            ? colors.btngrey
            : collapse
            ? 'red'
            : 'white',
      }}>
      <TouchableOpacity
        disabled={statusButton === 'active user' ? true : false}
        style={styles.btnContainer}
        onPress={() => {
          setCollapse(!collapse);
        }}>
        <View style={styles.left}>
          <Image
            source={collapse ? OverdueDateWhite : OverdueDateRed}
            style={styles.iconImg}
          />
          <Text style={{...styles.txtTitle, color: collapse ? 'white' : 'red'}}>
            Propose Overdue Deadline
          </Text>
        </View>
        <Image
          source={collapse ? ArrowDownWhite : ArrowUpRed}
          style={styles.iconArrow}
        />
      </TouchableOpacity>
      <Collapsible collapsed={collapse}>
        <View style={{minHeight: 500, paddingBottom: 15}}>
          {/* Add Reason */}
          <View style={styles.addReasenStyle}>
            <TextInput
              editable
              placeholder="Add Reason"
              multiline
              value={reason}
              onChangeText={(text) => setReason(text)}
            />
          </View>

          {/* Calender Picker */}
          <View style={styles.containerDeadline}>
            <View style={styles.btndeadline}>
              <TouchableOpacity
                onPress={() => {
                  if (switchDate === true && switchHour === true) {
                    setDeadlineCollape(!deadlineCollape);
                    setHourCollapse(!hourCollapse);
                  } else if (switchDate === false && switchHour === false) {
                    setDeadlineCollape(!deadlineCollape);
                    setHourCollapse(!hourCollapse);
                    setSwitchDate(true);
                    setSwitchHour(true);
                    OptionDate(today);
                  }
                }}>
                <Text style={{...styles.txtTitle, color: '#616161'}}>
                  New Deadline Date
                </Text>
              </TouchableOpacity>
              <View style={styles.right}>
                <Text style={{...styles.txtTitle, color: '#616161'}}>
                  {switchDate == false
                    ? 'None'
                    : selectedDate.split('-')[2] + ' ' + month === ''
                    ? 'None'
                    : selectedDate.split('-')[2] + ' ' + month}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setSwitchDate(!switchDate);
                    setSwitchHour(!switchHour);
                  }}>
                  <Image
                    source={switchDate ? SwitchActive : SwitchDefault}
                    style={styles.imgSwitch}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <Collapsible collapsed={deadlineCollape}>
              <View style={styles.containerCalendar}>
                <CalendarList
                  theme={{
                    width: 200,
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
                    width: 200,
                    height: 150,
                    borderRadius: 20,
                    backgroundColor: 'white',
                  }}
                  horizontal={true}
                  calendarWidth={200}
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
                      if (day.day > datenow) {
                        setValueHour(9);
                        setNewDaySelected(day.dateString);
                        setSwitchDate(true);
                        setSwitchHour(true);
                      } else {
                        setValueHour(hour);
                        setNewDaySelected(day.dateString);
                        setSwitchDate(true);
                        setSwitchHour(true);
                      }
                    }
                  }}
                  markedDates={markedDates}
                />
                <View style={styles.sideCalender}>
                  <View>
                    <View style={styles.btn}>
                      <Text style={styles.txtSide}>{month}</Text>
                    </View>
                    <View style={styles.btn}>
                      <Text style={styles.txtSide}>{year}</Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    style={{
                      ...styles.option,
                      marginTop: 20,
                      backgroundColor: option === 'today' ? '#40a1f8' : 'white',
                    }}
                    onPress={() => {
                      setOption('today');
                      OptionDate(today);
                      setValueHour(hour);
                      setSwitchDate(true);
                      setSwitchHour(true);
                    }}>
                    <Text
                      style={{color: option === 'today' ? 'white' : 'black'}}>
                      Today
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      ...styles.option,
                      backgroundColor:
                        option === 'tomorrow' ? '#40a1f8' : 'white',
                    }}
                    onPress={() => {
                      setOption('tomorrow');
                      OptionDate(tomorrow);
                      setSwitchDate(true);
                      setSwitchHour(true);
                      setValueHour(9);
                    }}>
                    <Text
                      style={{
                        color: option === 'tomorrow' ? 'white' : 'black',
                      }}>
                      Tomorrow
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.option}
                    style={{
                      ...styles.option,
                      backgroundColor:
                        option === 'nextWeek' ? '#40a1f8' : 'white',
                    }}
                    onPress={() => {
                      setOption('nextWeek');
                      OptionDate(nextWeek);
                      setSwitchDate(true);
                      setSwitchHour(true);
                      setValueHour(9);
                    }}>
                    <Text
                      style={{
                        color: option === 'nextWeek' ? 'white' : 'black',
                      }}>
                      Next Week
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Collapsible>
          </View>

          {/* Time Slider */}
          <View style={styles.containerDeadline}>
            <View style={styles.btndeadline}>
              <TouchableOpacity
                onPress={() => {
                  setHourCollapse(!hourCollapse);
                }}>
                <Text style={{...styles.txtTitle, color: '#616161'}}>
                  New Deadline Time
                </Text>
              </TouchableOpacity>
              <View style={styles.right}>
                <Text style={{...styles.txtTitle, color: '#616161'}}>
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
                    style={styles.imgSwitch}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <Collapsible collapsed={hourCollapse}>
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
                      // console.log(Number(valueHour));
                      // console.log(valueHour);
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
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
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

          {/* Progress Report */}
          <View style={styles.containerProgress}>
            <Text
              style={{...styles.txtTitle, color: '#616161', marginBottom: 10}}>
              Progress Report
            </Text>
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
              <Text style={{...styles.txtTitle, color: colors.badgeBlue}}>
                Add Image...
              </Text>
            </TouchableOpacity>
          </View>

          {/* btn propose deadline */}
          {!isLoading ? (
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.btnPropose}
              onPress={() => {
                handleupload();
                setIsLoading(false);
              }}>
              <Text style={styles.txtBtnPropose}>Propose Overdue Deadline</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.btnPropose}>
              <ActivityIndicator size="small" color="white" />
              <Text style={{...styles.txtBtnPropose, marginLeft: 10}}>
                Please Wait
              </Text>
            </View>
          )}
        </View>
      </Collapsible>
    </View>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteProgressRedux: (data) => dispatch(deleteProgressReport(data)),
    updateProgressRedux: (data) => dispatch(updateProgressReport(data)),
    statusButtonRedux: (data) => dispatch(statusButton(data)),
    proposeOverdueHistoryRedux: (data) => dispatch(proposeOverdueHistory(data)),
  };
};

export default connect(null, mapDispatchToProps)(Overdue);

const styles = StyleSheet.create({
  container: {
    minHeight: 60,
    borderRadius: 15,
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  btnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconImg: {
    height: 30,
    width: 30,
    marginRight: 10,
  },
  txtTitle: {
    fontFamily: fonts.SFProDisplayMedium,
  },
  iconArrow: {
    height: 10,
    width: 15,
  },
  addReasenStyle: {
    marginTop: 20,
    height: 150,
    backgroundColor: '#f2f1f6',
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  btndeadline: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  containerDeadline: {
    minHeight: 60,
    backgroundColor: '#f2f1f6',
    marginTop: 20,
    borderRadius: 15,
    paddingVertical: 15,
  },
  containerCalendar: {
    height: 270,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  imgSwitch: {marginLeft: 10, height: 25, width: 45},
  right: {flexDirection: 'row', alignItems: 'center'},
  option: {
    height: 30,
    width: 90,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  sideCalender: {
    height: '100%',
    marginLeft: 10,
    justifyContent: 'space-between',
  },
  btn: {
    height: 30,
    width: 90,
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtSide: {
    fontFamily: fonts.SFProDisplayMedium,
  },
  collapseRow: {
    height: 40,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowSlider: {
    backgroundColor: '#f2f3f8',
    height: 50,
    width: 200,
    padding: 20,
    borderRadius: 20,
    justifyContent: 'center',
  },
  containerSlider: {
    height: 15,
  },
  track: {
    height: 2,
    backgroundColor: 'white',
  },
  thumb: {
    width: 10,
    height: 10,
    backgroundColor: '#31a4db',
    borderRadius: 10 / 2,
    shadowColor: 'white',
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 2,
    shadowOpacity: 1,
  },
  txtCollapseTime: {
    backgroundColor: '#f2f3f8',
    height: 50,
    width: 100,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 20,
    flexDirection: 'row',
    paddingHorizontal: 15,
  },
  containerProgress: {
    minHeight: 80,
    marginTop: 20,
    backgroundColor: '#f2f1f6',
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 15,
    justifyContent: 'space-between',
  },
  txtBtnPropose: {
    fontFamily: fonts.SFProDisplayMedium,
    color: 'white',
  },
  btnPropose: {
    marginTop: 20,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
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
