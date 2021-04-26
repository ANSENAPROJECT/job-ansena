import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ToastAndroid,
  Pressable,
} from 'react-native';
import Collapsible from 'react-native-collapsible';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  Afternoon,
  ArrowDownWhite,
  ArrowUpRed,
  ChangeOverdueRed,
  ChangeOverdueWhite,
  Daylight,
  Morning,
  SwitchActive,
  SwitchDefault,
} from '../../assets';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';
import Slider from 'react-native-slider';
import {CalendarList} from 'react-native-calendars';
import axios from 'axios';
import qs from 'qs';
import {connect, useSelector} from 'react-redux';
import {API_URL} from '@env';
import {
  overdueHistory,
  statusButton,
} from '../../public/redux/ActionCreators/detailjob';

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

const ChangeOverdue = ({statusButtonRedux, overdueHistoryRedux}) => {
  const [collapse, setCollapse] = useState(true);
  const [notes, setNotes] = useState('');
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
  const userId = useSelector((state) => state.auth.idUser);
  const subjobId = useSelector((state) => state.detailjob.subjobId);

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

  const submitChangeOverdue = () => {
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
    if (notes === '') {
      showToastWithGravity('Notes must be filled in');
    } else if (switchDate === false) {
      showToastWithGravity('The date must be selected');
    } else {
      const data = {
        notes: notes,
        deadline: deadline,
        userId,
        subjobId,
      };
      axios
        .post(`${API_URL}/jzl/api/api/change_overdue`, qs.stringify(data))
        .then((res) => {
          console.log(res);
          statusButtonRedux(res.data.statusButton);
          overdueHistoryRedux(res.data.overdueHistory);
        })
        .catch(({response}) => {
          console.log(response);
        });
    }
  };

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: collapse ? 'red' : 'white',
      }}>
      <TouchableOpacity
        style={styles.btnTitle}
        onPress={() => {
          setCollapse(!collapse);
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={collapse ? ChangeOverdueWhite : ChangeOverdueRed}
            style={styles.imgSize}
          />
          <Text
            style={{
              fontFamily: fonts.SFProDisplayMedium,
              color: collapse ? 'white' : 'red',
            }}>
            Change Overdue Deadline
          </Text>
        </View>
        <Image
          source={collapse ? ArrowDownWhite : ArrowUpRed}
          style={styles.arrowIcon}
        />
      </TouchableOpacity>
      <Collapsible collapsed={collapse}>
        <View style={{minHeight: 200, marginTop: 20}}>
          <View style={styles.inputRow}>
            <TextInput
              multiline
              placeholder="Add Notes"
              value={notes}
              onChangeText={(text) => setNotes(text)}
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

          {/* submit */}
          <TouchableOpacity
            style={styles.submitBtn}
            activeOpacity={0.8}
            onPress={() => {
              submitChangeOverdue();
            }}>
            <Text style={styles.txtSubmit}>Change Overdue Deadline</Text>
          </TouchableOpacity>
        </View>
      </Collapsible>
    </View>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    statusButtonRedux: (data) => dispatch(statusButton(data)),
    overdueHistoryRedux: (data) => dispatch(overdueHistory(data)),
  };
};

export default connect(null, mapDispatchToProps)(ChangeOverdue);

const styles = StyleSheet.create({
  container: {
    minHeight: 60,
    borderRadius: 15,
    paddingBottom: 20,
    marginTop: 20,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  btnTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
  },
  imgSize: {
    height: 30,
    width: 30,
    marginRight: 10,
  },
  arrowIcon: {
    height: 10,
    width: 15,
  },
  inputRow: {
    height: 150,
    borderRadius: 15,
    backgroundColor: colors.mainColor,
    paddingHorizontal: 20,
    paddingVertical: 10,
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
  btndeadline: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
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
  submitBtn: {
    marginTop: 20,
    height: 40,
    backgroundColor: 'red',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtSubmit: {
    fontFamily: fonts.SFProDisplayMedium,
    color: 'white',
  },
});
