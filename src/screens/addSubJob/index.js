import React, {useState} from 'react';
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
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
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
} from '../../assets';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';
import Collapsible from 'react-native-collapsible';
import {CalendarList} from 'react-native-calendars';
import Slider from '@react-native-community/slider';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const datenow = new Date().getDate();
const montNow = new Date().getMonth() + 1;
const yearNow = new Date().getFullYear();
const timeNow = Number(`${yearNow}0${montNow}${datenow}`);
const optionTime = `${yearNow}-0${montNow}-${datenow}`;

console.log(timeNow);
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

const AddSubJob = ({navigation}) => {
  const [animation, setAnimation] = useState(new Animated.Value(0));
  const [arrow, setArrow] = useState(false);
  const [collapseApproval, setCollapseApproval] = useState(true);
  const [collapseDeadline, setCollapseDeadline] = useState(true);
  const [collapseDeadlineHour, setCollapseDeadlineHour] = useState(true);
  const [isEnabled, setIsEnabled] = useState(false);
  const [dataApproval, setDataApproval] = useState([
    {id: 1, name: 'Fachri Ghiffary'},
    {id: 2, name: 'Joko Anwar'},
  ]);

  const [daySelected, setDaySelected] = useState([]);
  const [markedDates, setMarkedDates] = useState({});
  const [month, setMonth] = useState(monthNames[new Date().getMonth()]);
  const [year, setYear] = useState(yearNow);
  const [selectedDate, setSelectedDate] = useState(
    `${yearNow}-0${montNow}-${datenow}`,
  );
  const [option, setOption] = useState('');

  const setNewDaySelected = (date) => {
    console.log(date);
    const dateSelected = Number(date.split('-').join(''));
    const numMonth = date.split('-')[1];
    const year = date.split('-')[0];
    if (dateSelected < timeNow) {
      alert('Pilih Deadline tidak boleh kmren yaa boskuh');
    } else {
      const markedDate = Object.assign({});
      markedDate[date] = {
        selected: true,
        selectedColor: 'blue',
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

  const toggleSwitch = () => setIsEnabled(!isEnabled);

  const toogleApproval = () => {
    setCollapseApproval(!collapseApproval);
    setArrow(!arrow);
    if (collapseApproval) {
      startAnimation();
    } else {
      endAnimation();
    }
  };

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

  const rotateInterpolate = animation.interpolate({
    inputRange: [0, 90],
    outputRange: ['0deg', '-90deg'],
  });

  const animatedStyle = {
    transform: [{rotate: rotateInterpolate}],
  };

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
        <TouchableOpacity style={styles.right}>
          <Text style={styles.txtColorBlue}>Add</Text>
        </TouchableOpacity>
      </View>

      {/* Code */}
      <View style={styles.code}>
        <Text style={styles.txtCode}>Code</Text>
        <Text style={styles.txtCode}>DIDI89</Text>
      </View>

      {/* title */}
      <View style={styles.titleinpt}>
        <TextInput placeholder="Subjob Title" />
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
            <Text>Approval</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{color: colors.txtGrey}}>Only You</Text>
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
            {dataApproval.length > 0 &&
              dataApproval.map(({id, name}, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={styles.rowDataApproval}
                    onPress={() => {
                      alert(id);
                    }}>
                    <View style={{flexDirection: 'row'}}>
                      <View style={styles.circle}>
                        <Text style={{fontSize: 12}}>{index + 1}</Text>
                      </View>
                      <Text>{name}</Text>
                    </View>
                    <Image
                      source={SwitchActive}
                      style={{height: 20, width: 40}}
                    />
                  </TouchableOpacity>
                );
              })}
            <TouchableOpacity
              style={styles.btnSwitch}
              onPress={() => {
                alert(tertekan);
              }}>
              <Text style={{color: 'white', fontWeight: 'bold'}}>
                Switch Order
              </Text>
            </TouchableOpacity>
          </View>
        </Collapsible>
      </View>

      {/* Purpose */}
      <View style={styles.purposeBox}>
        <TextInput
          placeholder="Purpose"
          multiline={true}
          styles={{height: '100%'}}
        />
      </View>

      {/* Deadline Date*/}
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          setCollapseDeadline(!collapseDeadline);
          setCollapseDeadlineHour(false);
        }}
        style={{
          ...styles.deadline,
          marginTop: 20,
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image source={DeadlineDate} style={styles.imgSize} />
          <Text style={{fontWeight: 'bold'}}>Deadline Date</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{color: colors.txtGrey}}>None</Text>
          <Image
            source={collapseDeadline ? SwitchDefault : SwitchActive}
            style={{height: 23, width: 43, marginLeft: 10}}
          />
        </View>
      </TouchableOpacity>
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
              selectedDayBackgroundColor: 'blue',
              selectedDotColor: 'blue',
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
            futureScrollRange={50}
            scrollEnabled={true}
            showScrollIndicator={false}
            onDayPress={(day) => {
              setNewDaySelected(day.dateString);
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
                setNewDaySelected(optionTime);
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
                const tomorrowSet = Number(optionTime.split('-')[2]) + 1;
                const sliceTime = optionTime.split('-').slice(0, -1);
                sliceTime.push(`${tomorrowSet}`);
                console.log(sliceTime.join('-'));
                setNewDaySelected(sliceTime.join('-'));
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
        <TouchableOpacity
          onPress={() => {
            setCollapseDeadlineHour(!collapseDeadlineHour);
          }}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 10,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image source={DeadlineHour} style={styles.imgSize} />
            <Text style={{fontWeight: 'bold'}}>Deadline Date</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{color: colors.txtGrey}}>09:00</Text>
            <Image
              source={collapseDeadlineHour ? SwitchDefault : SwitchActive}
              style={{height: 23, width: 43, marginLeft: 10}}
            />
          </View>
        </TouchableOpacity>
        <Collapsible collapsed={collapseDeadlineHour}>
          <View
            style={{
              height: 80,
              width: '100%',
              marginBottom: 20,
              marginTop: 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                backgroundColor: '#f2f3f8',
                height: 50,
                width: 100,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 20,
              }}>
              <Text>09: 00</Text>
            </View>
            <View
              style={{
                backgroundColor: '#f2f3f8',
                height: 50,
                width: 200,
                padding: 20,
                borderRadius: 20,
                justifyContent: 'center',
              }}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Image source={Morning} style={{height: 14, width: 14}} />
                <Image source={Daylight} style={{height: 14, width: 14}} />
                <Image source={Afternoon} style={{height: 14, width: 14}} />
              </View>
              <Slider
                style={{width: 180, height: 20, alignSelf: 'center'}}
                minimumValue={0}
                maximumValue={1}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
              />
            </View>
          </View>
        </Collapsible>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  // Header styles
  containerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imgHeader: {
    height: 15,
    width: 20,
    marginRight: 8,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 100,
  },
  center: {
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  right: {
    width: 100,
    alignItems: 'flex-end',
  },
  txtColorBlue: {
    color: colors.badgeBlue,
    fontFamily: fonts.SFProDisplayBold,
    fontSize: 14,
    fontWeight: 'bold',
  },
  titletxt: {
    fontWeight: 'bold',
    fontSize: 20,
  },

  // code
  code: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    width: deviceWidth - 80,
    height: 60,
    marginTop: 20,
    alignItems: 'center',
  },
  txtCode: {
    fontWeight: 'bold',
    color: 'grey',
  },

  // titleInput
  titleinpt: {
    backgroundColor: 'white',
    height: 50,
    width: '100%',
    borderRadius: 20,
    paddingHorizontal: 20,
    justifyContent: 'center',
    marginTop: 20,
  },

  // approval
  containerApproval: {
    borderRadius: 20,
    backgroundColor: 'white',
    marginTop: 30,
  },
  rowApproval: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    height: 70,
    width: '100%',
    borderRadius: 20,
    paddingHorizontal: 20,
  },
  bodyCollapseApprov: {
    height: 200,
    width: '100%',
    borderRadius: 20,
    paddingHorizontal: 20,
  },
  circle: {
    marginRight: 10,
    borderWidth: 0.5,
    borderColor: 'grey',
    height: 15,
    width: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  btnSwitch: {
    height: 30,
    backgroundColor: colors.badgeGreen,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: deviceWidth - 80,
    marginBottom: 25,
  },
  rowDataApproval: {
    flexDirection: 'row',
    height: 30,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  purposeBox: {
    alignSelf: 'center',
    height: 200,
    backgroundColor: 'white',
    width: '100%',
    marginTop: 20,
    borderRadius: 20,
    padding: 20,
  },

  // Deadline
  deadline: {
    minHeight: 70,
    width: '100%',
    backgroundColor: 'white',
    paddingHorizontal: 20,
  },
  imgSize: {height: 35, width: 30, marginRight: 10},
  containerCalendar: {
    height: 300,
    width: deviceWidth - 30,
    backgroundColor: 'white',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  sideCalender: {
    height: '100%',
    marginLeft: 20,
    justifyContent: 'space-between',
  },
  btn: {
    height: 30,
    width: 90,
    backgroundColor: '#f2f3f8',
    borderRadius: 10,
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  option: {
    height: 30,
    width: 90,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  line: {
    height: 2,
    width: '80%',
    backgroundColor: '#e0e0e0',
    borderRadius: 20,
    alignSelf: 'center',
  },
});

export default AddSubJob;
