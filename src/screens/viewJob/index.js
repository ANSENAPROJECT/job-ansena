import React, {useState} from 'react';
import {TouchableWithoutFeedback} from 'react-native';
import Popover, {
  PopoverPlacement,
  PopoverMode,
} from 'react-native-popover-view';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Keyboard,
  Animated,
} from 'react-native';
import Collapsible from 'react-native-collapsible';
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import {
  ArrowDown,
  ArrowUpView,
  Check,
  CheckActive,
  FilterBtn,
  RadioUncheck,
  Search,
  SortBtn,
  SwitchDefault,
} from '../../assets';
import Header from '../../components/detail/header';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';
import {Calendar} from 'react-native-calendars';
import {FlatList} from 'react-native';
import ActiveJobs from '../../components/viewJob/activeJobs';
import InActiveJob from '../../components/viewJob/inActiveJob';
import DeactiveJob from '../../components/viewJob/deactiveJob';

const deviceWidth = Dimensions.get('window').width;

const data = [
  {id: 1, name: 'Fachri Ghiffary'},
  {id: 2, name: 'Fachri '},
  {id: 3, name: 'Ghiffary'},
  {id: 4, name: 'Fachri Albar'},
];
const dataPt = [
  {id: 1, name: 'PT. A'},
  {id: 2, name: 'PT. B'},
  {id: 3, name: 'PT. C'},
  {id: 4, name: 'PT. D'},
];

const ViewJob = ({navigation}) => {
  const [collapse, setCollapse] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const [activity, setActivity] = useState('');
  const [subjob, setSubjob] = useState('');
  const [listData, setListData] = useState(data);
  const [listPt, setlistPt] = useState(dataPt);

  const widthValue = useState(new Animated.Value(deviceWidth - 40))[0];

  function extendInput() {
    Animated.timing(widthValue, {
      toValue: deviceWidth - 40,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }

  function minimizeInput() {
    Animated.timing(widthValue, {
      toValue: deviceWidth - 100,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }

  const handleEnd = () => {
    setIsFocused(false);
    if (isFocused) {
      extendInput();
    }
  };

  const handleOnFocus = () => {
    setIsFocused(!isFocused);
    if (isFocused) {
      extendInput();
    } else {
      minimizeInput();
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Header navigation={navigation} />

      {/* Header Title */}
      <View style={styles.title}>
        <Text style={{fontFamily: fonts.SFProDisplayHeavy, fontSize: 24}}>
          View Job Group
        </Text>
        <View style={styles.flexRow}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              setCollapse(!collapse);
            }}>
            <Image source={FilterBtn} style={{height: 20, width: 25}} />
          </TouchableOpacity>
          <Popover
            popoverStyle={styles.sortBy}
            placement={PopoverPlacement.BOTTOM}
            from={
              <TouchableOpacity style={styles.btn}>
                <Image source={SortBtn} style={{height: 20, width: 20}} />
              </TouchableOpacity>
            }>
            <TouchableOpacity style={styles.rowSort}>
              <Text>Name</Text>
            </TouchableOpacity>
            <View style={styles.line} />
            <TouchableOpacity style={styles.rowSort}>
              <Text>Date Created</Text>
            </TouchableOpacity>
            <View style={styles.line} />
            <TouchableOpacity style={styles.rowSort}>
              <Text>Number of Crew</Text>
            </TouchableOpacity>
            <View style={styles.line} />
            <TouchableOpacity style={styles.rowSort}>
              <Text>Number of Sub Jobs</Text>
            </TouchableOpacity>
            <View style={styles.line} />
            <TouchableOpacity style={styles.rowSort}>
              <Text>Upcoming Deadline</Text>
            </TouchableOpacity>
          </Popover>
        </View>
      </View>
      <Collapsible collapsed={collapse}>
        <View style={styles.containerCollapse}>
          {/* Activity */}
          <View style={styles.flexRow}>
            <Text style={{fontSize: 12}}>ACTIVITY</Text>
            <View style={styles.rowActivity}>
              <View
                style={{
                  ...styles.btnActivity,
                  flex: 0.6,
                  backgroundColor: activity === 'all' ? 'white' : 'transparent',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    setActivity('all');
                  }}>
                  <Text
                    style={{
                      fontSize: 10,
                      color: activity === 'all' ? 'black' : 'white',
                    }}>
                    All
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  ...styles.btnActivity,
                  flex: 0.8,
                  backgroundColor:
                    activity === 'active' ? 'white' : 'transparent',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    setActivity('active');
                  }}>
                  <Text
                    style={{
                      fontSize: 10,
                      color: activity === 'active' ? 'black' : 'white',
                    }}>
                    ACTIVE
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  ...styles.btnActivity,
                  flex: 0.9,
                  backgroundColor:
                    activity === 'inactive' ? 'white' : 'transparent',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    setActivity('inactive');
                  }}>
                  <Text
                    style={{
                      fontSize: 10,
                      color: activity === 'inactive' ? 'black' : 'white',
                    }}>
                    INACTIVE
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  ...styles.btnActivity,
                  width: 75,
                  backgroundColor:
                    activity === 'deactivated' ? 'white' : 'transparent',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    setActivity('deactivated');
                  }}>
                  <Text
                    style={{
                      fontSize: 10,
                      color: activity === 'deactivated' ? 'black' : 'white',
                    }}>
                    DEACTIVATED
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Subjob  */}
          <View style={{...styles.flexRow, marginTop: 10}}>
            <Text style={{fontSize: 12}}>SUB JOBS</Text>
            <View style={styles.rowSubjob}>
              <View style={styles.rowButton}>
                <View
                  style={{
                    ...styles.btnActivity,
                    flex: 1,
                    backgroundColor: subjob === 'all' ? 'white' : 'transparent',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      setSubjob('all');
                    }}>
                    <Text
                      style={{
                        fontSize: 10,
                        color: subjob === 'all' ? 'black' : 'white',
                      }}>
                      ALL
                    </Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    ...styles.btnActivity,
                    flex: 1,
                    backgroundColor:
                      subjob === 'active' ? 'white' : 'transparent',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      setSubjob('active');
                    }}>
                    <Text
                      style={{
                        fontSize: 10,
                        color: subjob === 'active' ? 'black' : 'white',
                      }}>
                      ACTIVE
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.inputMinMax}>
                <TextInput
                  placeholder="Min"
                  style={{
                    fontSize: 10,
                  }}
                />
              </View>
              <Text style={{fontSize: 10, marginLeft: 5}}>To</Text>
              <View style={styles.inputMinMax}>
                <TextInput
                  placeholder="Max"
                  style={{fontSize: 10, width: '100%'}}
                />
              </View>
            </View>
          </View>

          {/* Deadline */}
          <View style={{...styles.flexRow, marginTop: 10}}>
            <Text style={{fontSize: 12}}>Deadline</Text>
            <View style={styles.rowSubjob}>
              <View style={styles.fieldDeadline}>
                <View>
                  <Text style={{fontSize: 10}}>None</Text>
                </View>
                <Popover
                  popoverStyle={styles.containerPopOver}
                  placement={PopoverPlacement.BOTTOM}
                  from={
                    <TouchableOpacity>
                      <Image
                        source={ArrowDown}
                        style={{height: 5, width: 10}}
                      />
                    </TouchableOpacity>
                  }>
                  <View style={{alignSelf: 'flex-end', flexDirection: 'row'}}>
                    <Text
                      style={{
                        fontFamily: fonts.SFProDisplayMedium,
                        fontSize: 12,
                      }}>
                      Set Date
                    </Text>
                    <Image source={SwitchDefault} style={styles.iconSwitch} />
                  </View>
                  <View style={styles.line} />
                  <Calendar
                    theme={{
                      backgroundColor: 'transparent',
                      calendarBackground: 'transparent',
                      textSectionTitleColor: 'black',
                      textSectionTitleDisabledColor: '#d9e1e8',
                      selectedDayBackgroundColor: '#00adf5',
                      selectedDayTextColor: '#ffffff',
                      todayTextColor: '#00adf5',
                      dayTextColor: '#2d4150',
                      textDisabledColor: '#d9e1e8',
                      dotColor: '#00adf5',
                      selectedDotColor: '#ffffff',
                      arrowColor: 'blue',
                      disabledArrowColor: '#d9e1e8',
                      monthTextColor: 'black',
                      indicatorColor: 'blue',
                      textDayFontFamily: 'monospace',
                      textMonthFontFamily: 'monospace',
                      textDayHeaderFontFamily: 'monospace',
                      textDayFontWeight: '300',
                      textMonthFontWeight: 'bold',
                      textDayHeaderFontWeight: '300',
                      textDayFontSize: 14,
                      textMonthFontSize: 14,
                      textDayHeaderFontSize: 14,
                    }}
                  />
                </Popover>
              </View>
              <Text style={{marginHorizontal: 10, fontSize: 10}}>To</Text>
              <View style={styles.fieldDeadline}>
                <View>
                  <Text style={{fontSize: 10}}>None</Text>
                </View>
                <Popover
                  popoverStyle={styles.containerPopOver}
                  placement={PopoverPlacement.BOTTOM}
                  from={
                    <TouchableOpacity>
                      <Image
                        source={ArrowDown}
                        style={{height: 5, width: 10}}
                      />
                    </TouchableOpacity>
                  }>
                  <View style={{alignSelf: 'flex-end', flexDirection: 'row'}}>
                    <Text
                      style={{
                        fontFamily: fonts.SFProDisplayMedium,
                        fontSize: 12,
                      }}>
                      Set Date
                    </Text>
                    <Image source={SwitchDefault} style={styles.iconSwitch} />
                  </View>
                  <View style={styles.line} />
                  <Calendar
                    theme={{
                      backgroundColor: 'transparent',
                      calendarBackground: 'transparent',
                      textSectionTitleColor: 'black',
                      textSectionTitleDisabledColor: '#d9e1e8',
                      selectedDayBackgroundColor: '#00adf5',
                      selectedDayTextColor: '#ffffff',
                      todayTextColor: '#00adf5',
                      dayTextColor: '#2d4150',
                      textDisabledColor: '#d9e1e8',
                      dotColor: '#00adf5',
                      selectedDotColor: '#ffffff',
                      arrowColor: 'blue',
                      disabledArrowColor: '#d9e1e8',
                      monthTextColor: 'black',
                      indicatorColor: 'blue',
                      textDayFontFamily: 'monospace',
                      textMonthFontFamily: 'monospace',
                      textDayHeaderFontFamily: 'monospace',
                      textDayFontWeight: '300',
                      textMonthFontWeight: 'bold',
                      textDayHeaderFontWeight: '300',
                      textDayFontSize: 14,
                      textMonthFontSize: 14,
                      textDayHeaderFontSize: 14,
                    }}
                  />
                </Popover>
              </View>
            </View>
          </View>

          {/* coadmin */}
          <View style={{...styles.flexRow, marginTop: 10}}>
            <Text style={{fontSize: 12}}>CO-ADMIN</Text>
            <View style={styles.columnCoadmin}>
              <Text style={{fontSize: 12}}>None</Text>
              <Popover
                placement={PopoverPlacement.BOTTOM}
                popoverStyle={styles.containerPopCoadmin}
                from={
                  <TouchableOpacity>
                    <Image source={ArrowDown} style={{height: 5, width: 10}} />
                  </TouchableOpacity>
                }>
                <View style={styles.containerBoxPop}>
                  <View style={styles.formSearch}>
                    <TextInput placeholder="Search" />
                    <Image source={Search} styl={{height: 10, width: 10}} />
                  </View>
                  <FlatList
                    data={listData}
                    renderItem={({item}) => {
                      return (
                        <View
                          style={{
                            flexDirection: 'row',
                            marginBottom: 10,
                            justifyContent: 'space-between',
                            marginHorizontal: 10,
                          }}>
                          <Text style={{fontFamily: fonts.SFProDisplayMedium}}>
                            {item.name}
                          </Text>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <Text>PT.A</Text>
                            <Image
                              source={RadioUncheck}
                              style={{height: 15, width: 15, marginLeft: 10}}
                            />
                          </View>
                        </View>
                      );
                    }}
                    keyExtractor={(item, index) => index.toString()}
                  />
                </View>
              </Popover>
            </View>
          </View>

          {/* Crew */}
          <View style={{...styles.flexRow, marginTop: 10}}>
            <Text style={{fontSize: 12}}>CREW</Text>
            <View style={styles.crewRowContainer}>
              <View style={styles.inputMinMax}>
                <TextInput placeholder="Min" style={{fontSize: 10}} />
              </View>
              <Text style={{fontSize: 10, marginLeft: 10}}>To</Text>
              <View style={styles.inputMinMax}>
                <TextInput placeholder="Max" style={{fontSize: 10}} />
              </View>
              <Popover
                popoverStyle={styles.containerPopCoadmin}
                placement={PopoverPlacement.BOTTOM}
                from={
                  <TouchableOpacity style={styles.ChosePt}>
                    <Text style={{fontSize: 10}}>ALL PT</Text>
                    <Image source={ArrowDown} style={{height: 5, width: 10}} />
                  </TouchableOpacity>
                }>
                <View style={styles.containerBoxPop}>
                  <View style={styles.formSearch}>
                    <TextInput placeholder="Search" />
                    <Image source={Search} styl={{height: 10, width: 10}} />
                  </View>
                  <FlatList
                    data={listPt}
                    renderItem={({item}) => {
                      return (
                        <View
                          style={{
                            flexDirection: 'row',
                            marginBottom: 10,
                            justifyContent: 'space-between',
                            marginHorizontal: 20,
                          }}>
                          <Text style={{fontFamily: fonts.SFProDisplayMedium}}>
                            {item.name}
                          </Text>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <Image
                              source={CheckActive}
                              style={{height: 15, width: 15, marginLeft: 10}}
                            />
                          </View>
                        </View>
                      );
                    }}
                    keyExtractor={(item, index) => index.toString()}
                  />
                </View>
              </Popover>
            </View>
          </View>

          {/* Leader */}
          <View style={{...styles.flexRow, marginTop: 10}}>
            <Text style={{fontSize: 12}}>LEADER</Text>
            <Popover
              popoverStyle={styles.containerPopCoadmin}
              placement={PopoverPlacement.BOTTOM}
              from={
                <TouchableOpacity style={styles.btnLeader}>
                  <Text style={{fontSize: 10}}>NONE</Text>
                  <Image source={ArrowDown} style={{height: 5, width: 10}} />
                </TouchableOpacity>
              }>
              <View style={styles.containerBoxPop}>
                <View style={styles.formSearch}>
                  <TextInput placeholder="Search" />
                  <Image source={Search} styl={{height: 10, width: 10}} />
                </View>
                <FlatList
                  data={listPt}
                  renderItem={({item}) => {
                    return (
                      <View
                        style={{
                          flexDirection: 'row',
                          marginBottom: 10,
                          justifyContent: 'space-between',
                          marginHorizontal: 20,
                        }}>
                        <Text style={{fontFamily: fonts.SFProDisplayMedium}}>
                          {item.name}
                        </Text>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          <Image
                            source={CheckActive}
                            style={{height: 15, width: 15, marginLeft: 10}}
                          />
                        </View>
                      </View>
                    );
                  }}
                  keyExtractor={(item, index) => index.toString()}
                />
              </View>
            </Popover>
          </View>

          {/* ButtonAction */}
          <View style={styles.btnActionContainer}>
            <View style={{...styles.btnBottom, borderColor: 'blue'}}>
              <TouchableOpacity style={styles.touchRange}>
                <Text style={{color: 'blue'}}>APPLY</Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                ...styles.btnBottom,
                marginHorizontal: 10,
                borderColor: 'blue',
              }}>
              <TouchableOpacity style={styles.touchRange}>
                <Text style={{color: 'blue'}}>RESET</Text>
              </TouchableOpacity>
            </View>
            <View style={{...styles.btnBottom, borderColor: 'red'}}>
              <TouchableOpacity style={styles.touchRange}>
                <Text style={{color: 'red'}}>CANCEL</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Collapsible>
      <View style={styles.flexRow}>
        <Animated.View
          style={{
            ...styles.searchInput,
            width: widthValue,
          }}>
          <Image source={Search} style={styles.iconSearch} />
          <TextInput
            placeholder="Search"
            style={{width: '100%'}}
            onEndEditing={() => {
              handleEnd();
            }}
            onFocus={() => {
              handleOnFocus();
            }}
          />
        </Animated.View>
        {isFocused ? (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              Keyboard.dismiss();
              handleEnd();
            }}>
            <Text style={styles.cancleStyle}>Cancel</Text>
          </TouchableOpacity>
        ) : null}
      </View>
      <ActiveJobs />
      <InActiveJob />
      <DeactiveJob />
    </ScrollView>
  );
};

export default ViewJob;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: colors.mainColor,
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btn: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchInput: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    marginTop: 10,
    paddingHorizontal: 20,
  },
  iconSearch: {height: 20, width: 20, marginRight: 10},
  cancleStyle: {
    color: colors.badgeBlue,
    marginLeft: 10,
    fontFamily: fonts.SFProDisplayMedium,
  },
  btnActivity: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    height: '70%',
  },
  containerCollapse: {
    minHeight: 200,
    borderRadius: 20,
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  rowActivity: {
    height: 30,
    width: deviceWidth - 160,
    backgroundColor: colors.mainColor,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  rowSubjob: {
    height: 30,
    width: deviceWidth - 160,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowButton: {
    height: 30,
    width: '40%',
    backgroundColor: colors.mainColor,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  inputMinMax: {
    height: '100%',
    flex: 1,
    backgroundColor: colors.mainColor,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
    borderRadius: 15,
    paddingHorizontal: 10,
  },
  fieldDeadline: {
    flex: 1,
    backgroundColor: colors.mainColor,
    borderRadius: 15,
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  iconSwitch: {
    marginLeft: 10,
    height: 20,
    width: 35,
    marginRight: 10,
  },
  line: {
    height: 1,
    width: '100%',
    backgroundColor: 'grey',
    marginTop: 10,
  },
  containerPopOver: {
    height: 370,
    width: 300,
    borderRadius: 20,
    padding: 10,
    backgroundColor: colors.mainColor,
  },
  columnCoadmin: {
    height: 30,
    width: deviceWidth - 160,
    borderRadius: 15,
    backgroundColor: colors.mainColor,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  containerPopCoadmin: {
    height: 350,
    width: 300,
    borderRadius: 15,
    backgroundColor: colors.mainColor,
    padding: 20,
  },
  containerBoxPop: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 10,
  },
  formSearch: {
    height: 40,
    backgroundColor: 'lightgrey',
    borderRadius: 15,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  crewRowContainer: {
    height: 30,
    width: deviceWidth - 160,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  ChosePt: {
    marginLeft: 10,
    height: 30,
    width: 80,
    borderRadius: 15,
    backgroundColor: colors.mainColor,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  btnLeader: {
    height: 30,
    width: deviceWidth - 160,
    backgroundColor: colors.mainColor,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  btnActionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  btnBottom: {
    flex: 1,
    height: 30,
    borderWidth: 1,
    borderRadius: 15,
  },
  touchRange: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sortBy: {
    height: 220,
    width: 200,
    borderRadius: 15,
    paddingVertical: 10,
  },
  rowSort: {marginHorizontal: 20, marginVertical: 5},
});
