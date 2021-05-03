import React, {useState, useEffect} from 'react';
import {Pressable, TouchableWithoutFeedback} from 'react-native';
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
  RadioChecked,
  RadioUncheck,
  Search,
  SortBtn,
  SwitchActive,
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
import axios from 'axios';
import {API_URL} from '@env';
import {ActivityIndicator} from 'react-native';
import {connect, useSelector} from 'react-redux';
import {
  activeJobGroup,
  deactivatedJobGroup,
  inactiveJobGroup,
} from '../../public/redux/ActionCreators/viewjob';
import {TouchableHighlight} from 'react-native';

const deviceWidth = Dimensions.get('window').width;

const datenow = new Date().getDate();
const montNow = new Date().getMonth() + 1;
const yearNow = new Date().getFullYear();
const defaultDate = `${yearNow}-0${montNow}-${datenow}`;

const monthNames = [
  'Jan',
  'Feb',
  'March',
  'April',
  'May',
  'June',
  'July',
  'Augst',
  'Sept',
  'Oct',
  'Nov',
  'Dec',
];

const ViewJob = ({
  navigation,
  activeJobRedux,
  inactiveJobRedux,
  deactiveJobRedux,
}) => {
  const user_id = useSelector((state) => state.auth.idUser);

  const [showPopover, setShowPopover] = useState(false);
  const [collapse, setCollapse] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const [activity, setActivity] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [subjob, setSubjob] = useState('');
  const [subJobMin, setSubJobMin] = useState('');
  const [subJobMax, setsubJobMax] = useState('');
  const [listDataCrew, setListDataCrew] = useState([]);
  const [listPt, setListPt] = useState([]);
  const [pages, setPages] = useState(1);
  const [search, setSearch] = useState('');
  const [searchData, setSearchData] = useState([]);
  const [filter, setFilter] = useState('');
  const [initialFilter, setInitialFilter] = useState(2);

  // Deadline Start
  const [markedDatesStart, setMarkedDatesStart] = useState({});
  const [selectedDateStart, setSelectedDateStart] = useState('');
  const [monthStart, setMonthStart] = useState(
    monthNames[new Date().getMonth()],
  );
  const [yearStart, setYearStart] = useState(yearNow);
  const [switchDateStart, setSwitchDateStart] = useState(false);
  const [placeHolderDateStart, setPlaceHolderDateStart] = useState('');

  // Deadline End
  const [markedDatesEnd, setMarkedDatesEnd] = useState({});
  const [selectedDateEnd, setSelectedDateEnd] = useState('');
  const [monthEnd, setMonthEnd] = useState(monthNames[new Date().getMonth()]);
  const [yearEnd, setYearEnd] = useState(yearNow);
  const [switchDateEnd, setSwitchDateEnd] = useState(false);
  const [placeHolderDateEnd, setPlaceHolderDateEnd] = useState('');

  //COadmin
  const [checkCoAdmin, setCheckCoAdmin] = useState('');

  //Crew
  const [minCrew, setMinCrew] = useState('');
  const [maxCrew, setMaxCrew] = useState('');
  const [checkPt, setCheckPt] = useState([]);
  const [namePt, setNamePt] = useState('');

  //Leader
  const [checkLeader, setCheckLeader] = useState('');

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

  // DEADLINE
  const dateStart = (date) => {
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
    const markedDate = Object.assign({});
    markedDate[date] = {
      selected: true,
      selectedColor: '#40a1f8',
    };
    if (numMonth < 10) {
      setMonthStart(monthNames[numMonth.split('0')[1] - 1]);
    } else if (numMonth > 9) {
      setMonthStart(monthNames[numMonth - 1]);
    }
    setYearStart(year);
    setSelectedDateStart(date);
    setDateStart(date);
    setMarkedDatesStart(markedDate);
  };

  const setDateStart = (data) => {
    const month = monthNames[Number(data.split('-')[1] - 1)];
    const YYYYMMDD = `${data.split('-')[2]} ${month} ${data.split('-')[0]}`;
    setPlaceHolderDateStart(YYYYMMDD);
  };

  const dateEnd = (date) => {
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
    const markedDate = Object.assign({});
    markedDate[date] = {
      selected: true,
      selectedColor: '#40a1f8',
    };
    if (numMonth < 10) {
      setMonthEnd(monthNames[numMonth.split('0')[1] - 1]);
    } else if (numMonth > 9) {
      setMonthEnd(monthNames[numMonth - 1]);
    }
    setYearEnd(year);
    setSelectedDateEnd(date);
    setDateEnd(date);
    setMarkedDatesEnd(markedDate);
  };

  const setDateEnd = (data) => {
    const month = monthNames[Number(data.split('-')[1] - 1)];
    const YYYYMMDD = `${data.split('-')[2]} ${month} ${data.split('-')[0]}`;
    setPlaceHolderDateEnd(YYYYMMDD);
  };

  //GETJOBGROUP
  const getJobGroup = () => {
    axios
      .get(`${API_URL}/jzl/api/api/view_detail/${user_id}${filter}`)
      .then((res) => {
        // console.log(res);
        activeJobRedux(res.data.data.active);
        inactiveJobRedux(res.data.data.inactive);
        deactiveJobRedux(res.data.data.deactivate);
      })
      .catch(({response}) => {
        console.log(response);
      });
  };

  // GET NAME
  const getData = () => {
    axios
      .get(`${API_URL}/jzl/api/api/getListUser/${pages}`)
      .then((res) => {
        // console.log('Ini adalah list dataCrew', res.data);
        setListDataCrew(listDataCrew.concat(res.data.data));
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

  const getAllPt = () => {
    axios
      .get(`${API_URL}/jzl/api/api/get_pt`)
      .then((res) => {
        // console.log(res.data.pt);
        setListPt(res.data.pt);
      })
      .catch(({response}) => {
        console.log(response);
      });
  };

  const handleLoadmore = () => {
    setPages(pages + 1);
    getData();
    setIsLoading(true);
  };

  const renderFooter = () => {
    return isLoading ? (
      <View>
        <ActivityIndicator size="small" color="blue" />
      </View>
    ) : null;
  };

  const addListPt = (id, pt) => {
    if (checkPt.length < 1) {
      setCheckPt([...checkPt, {}]);
    } else {
      let foundValue = checkPt.filter((obj) => obj.id === id);
      if (foundValue.length == 0) {
        setCheckPt([
          ...checkPt,
          {
            id,
            pt,
          },
        ]);
      } else if (foundValue[0].id == id) {
        const newPt = checkPt.filter((item) => item.id !== id);
        setCheckPt(newPt);
      }
    }
  };

  const filterItems = (query) => {
    const newList = listPt.filter(
      (obj) => obj.pt.toLowerCase().indexOf(query.toLowerCase()) > -1,
    );
    if (query === '') {
      getAllPt();
    } else {
      if (newList.length < 1) {
        getAllPt();
      } else {
        setListPt(newList);
      }
    }
  };

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      getData();
      getJobGroup();
      getAllPt();
    }
    return () => (mounted = false);
  }, [search, initialFilter]);

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
            onRequestClose={() => setShowPopover(false)}
            popoverStyle={styles.sortBy}
            placement={PopoverPlacement.BOTTOM}
            isVisible={showPopover}
            from={
              <TouchableOpacity
                style={styles.btn}
                onPress={() => setShowPopover(true)}>
                <Image source={SortBtn} style={{height: 20, width: 20}} />
              </TouchableOpacity>
            }>
            <Pressable
              style={styles.rowSort}
              onPress={() => {
                if (initialFilter === 1) {
                  setInitialFilter(2);
                  setFilter(`?as=${initialFilter}`);
                  setShowPopover(false);
                } else {
                  setInitialFilter(1);
                  setFilter(`?as=${initialFilter}`);
                  setShowPopover(false);
                }
              }}>
              <Text>Name</Text>
            </Pressable>
            <View style={styles.line} />
            <Pressable
              style={styles.rowSort}
              onPress={() => {
                if (initialFilter === 1) {
                  setInitialFilter(2);
                  setFilter(`?bs=${initialFilter}`);
                  setShowPopover(false);
                } else {
                  setInitialFilter(1);
                  setFilter(`?bs=${initialFilter}`);
                  setShowPopover(false);
                }
              }}>
              <Text>Date Created</Text>
            </Pressable>
            <View style={styles.line} />
            <Pressable
              style={styles.rowSort}
              onPress={() => {
                if (initialFilter === 1) {
                  setInitialFilter(2);
                  setFilter(`?cs=${initialFilter}`);
                  setShowPopover(false);
                } else {
                  setInitialFilter(1);
                  setFilter(`?cs=${initialFilter}`);
                  setShowPopover(false);
                }
              }}>
              <Text>Number of Crew</Text>
            </Pressable>
            <View style={styles.line} />
            <Pressable
              style={styles.rowSort}
              onPress={() => {
                if (initialFilter === 1) {
                  setInitialFilter(2);
                  setFilter(`?ds=${initialFilter}`);
                  setShowPopover(false);
                } else {
                  setInitialFilter(1);
                  setFilter(`?ds=${initialFilter}`);
                  setShowPopover(false);
                }
              }}>
              <Text>Number of Sub Jobs</Text>
            </Pressable>
            <View style={styles.line} />
            <Pressable
              style={styles.rowSort}
              onPress={() => {
                if (initialFilter === 1) {
                  setInitialFilter(2);
                  setFilter(`?es=${initialFilter}`);
                  setShowPopover(false);
                } else {
                  setInitialFilter(1);
                  setFilter(`?es=${initialFilter}`);
                  setShowPopover(false);
                }
              }}>
              <Text>Upcoming Deadline</Text>
            </Pressable>
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
                  keyboardType="number-pad"
                  placeholder="Min"
                  style={{
                    fontSize: 10,
                  }}
                  maxLength={2}
                  value={subJobMin}
                  onChangeText={(text) => setSubJobMin(text)}
                />
              </View>
              <Text style={{fontSize: 10, marginLeft: 5}}>To</Text>
              <View style={styles.inputMinMax}>
                <TextInput
                  keyboardType="number-pad"
                  placeholder="Max"
                  maxLength={2}
                  style={{fontSize: 10, width: '100%'}}
                  value={subJobMax}
                  onChangeText={(text) => setsubJobMax(text)}
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
                  <Text style={{fontSize: 10}}>
                    {switchDateStart ? placeHolderDateStart : 'None'}
                  </Text>
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
                      {switchDateStart ? placeHolderDateStart : 'Set Date'}
                    </Text>
                    <Pressable
                      onPress={() => {
                        if (switchDateStart == false) {
                          setSwitchDateStart(!switchDateStart);
                          dateStart(defaultDate);
                          setDateStart(defaultDate);
                        } else {
                          setSwitchDateStart(!switchDateStart);
                          dateStart('');
                        }
                      }}>
                      <Image
                        source={!switchDateStart ? SwitchDefault : SwitchActive}
                        style={styles.iconSwitch}
                      />
                    </Pressable>
                  </View>
                  <View style={styles.line} />
                  <Calendar
                    theme={{
                      backgroundColor: 'transparent',
                      calendarBackground: 'transparent',
                      textSectionTitleColor: 'black',
                      textSectionTitleDisabledColor: '#d9e1e8',
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
                      selectedDayBackgroundColor: '#40a1f8',
                      'stylesheet.day.basic': {
                        base: {
                          width: 30,
                          height: 30,
                          justifyContent: 'center',
                          alignItems: 'center',
                        },
                      },
                    }}
                    onDayPress={(day) => {
                      setSwitchDateStart(true);
                      dateStart(day.dateString);
                    }}
                    markedDates={markedDatesStart}
                  />
                </Popover>
              </View>
              <Text style={{marginHorizontal: 10, fontSize: 10}}>To</Text>
              <View style={styles.fieldDeadline}>
                <View>
                  <Text style={{fontSize: 10}}>
                    {switchDateEnd ? placeHolderDateEnd : 'None'}
                  </Text>
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
                      {switchDateEnd ? placeHolderDateEnd : ' Set Date'}
                    </Text>
                    <Pressable
                      onPress={() => {
                        if (switchDateEnd == false) {
                          setSwitchDateEnd(!switchDateEnd);
                          dateEnd(defaultDate);
                          setDateEnd(defaultDate);
                        } else {
                          setSwitchDateEnd(!switchDateEnd);
                          dateEnd('');
                        }
                      }}>
                      <Image
                        source={!switchDateEnd ? SwitchDefault : SwitchActive}
                        style={styles.iconSwitch}
                      />
                    </Pressable>
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
                      'stylesheet.day.basic': {
                        base: {
                          width: 30,
                          height: 30,
                          justifyContent: 'center',
                          alignItems: 'center',
                        },
                      },
                    }}
                    onDayPress={(day) => {
                      dateEnd(day.dateString);
                      setSwitchDateEnd(true);
                    }}
                    markedDates={markedDatesEnd}
                  />
                </Popover>
              </View>
            </View>
          </View>

          {/* coadmin */}
          <View style={{...styles.flexRow, marginTop: 10}}>
            <Text style={{fontSize: 12}}>CO-ADMIN</Text>

            <Popover
              placement={PopoverPlacement.BOTTOM}
              popoverStyle={styles.containerPopCoadmin}
              from={
                <TouchableOpacity style={styles.btnLeader}>
                  <Text style={{fontSize: 10}}>
                    {checkCoAdmin === '' ? 'NONE' : checkCoAdmin.name}{' '}
                  </Text>
                  <Image source={ArrowDown} style={{height: 5, width: 10}} />
                </TouchableOpacity>
              }>
              <View style={styles.containerBoxPop}>
                <View style={styles.formSearch}>
                  <TextInput
                    placeholder="Search"
                    onChangeText={(search) => setSearch(search)}
                    onSubmitEditing={searchName}
                  />
                  <Image source={Search} styl={{height: 10, width: 10}} />
                </View>
                <FlatList
                  data={searchData.length === 0 ? listDataCrew : searchData}
                  renderItem={({item}) => {
                    const {idUser, name, idPt, pt} = item;
                    return (
                      <Pressable
                        style={styles.rowCoadmin}
                        onPress={() => {
                          if (idUser === checkCoAdmin.idUser) {
                            setCheckCoAdmin('');
                          } else {
                            setCheckCoAdmin({
                              idUser,
                              name,
                              idPt,
                            });
                          }
                        }}>
                        <Text style={{fontFamily: fonts.SFProDisplayMedium}}>
                          {name}
                        </Text>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          <Text>{pt}</Text>
                          <Image
                            source={
                              checkCoAdmin.idUser === idUser
                                ? RadioChecked
                                : RadioUncheck
                            }
                            style={{height: 15, width: 15, marginLeft: 10}}
                          />
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
            </Popover>
          </View>

          {/* Crew */}
          <View style={{...styles.flexRow, marginTop: 10}}>
            <Text style={{fontSize: 12}}>CREW</Text>
            <View style={styles.crewRowContainer}>
              <View style={{...styles.inputMinMax, marginLeft: 0}}>
                <TextInput
                  keyboardType="number-pad"
                  placeholder="Min"
                  style={{fontSize: 10}}
                  maxLength={2}
                  value={minCrew}
                  onChangeText={(text) => setMinCrew(text)}
                />
              </View>
              <Text style={{fontSize: 10, marginLeft: 10}}>To</Text>
              <View style={styles.inputMinMax}>
                <TextInput
                  keyboardType="number-pad"
                  placeholder="Max"
                  style={{fontSize: 10}}
                  maxLength={2}
                  value={maxCrew}
                  onChangeText={(text) => setMaxCrew(text)}
                />
              </View>
              <Popover
                popoverStyle={styles.containerPopCoadmin}
                placement={PopoverPlacement.BOTTOM}
                from={
                  <TouchableOpacity style={styles.ChosePt}>
                    <Text style={{fontSize: 10}}>
                      {checkPt.length === 0
                        ? 'None'
                        : checkPt.length > 1
                        ? `${checkPt.length} Pt's`
                        : `${checkPt.length} Pt`}{' '}
                    </Text>
                    <Image source={ArrowDown} style={{height: 5, width: 10}} />
                  </TouchableOpacity>
                }>
                <View style={styles.containerBoxPop}>
                  <View style={styles.formSearch}>
                    <TextInput
                      placeholder="Search"
                      value={namePt}
                      onChangeText={(text) => setNamePt(text)}
                      onEndEditing={() => {
                        filterItems(namePt);
                      }}
                    />
                    <Image source={Search} styl={{height: 10, width: 10}} />
                  </View>
                  <FlatList
                    data={listPt}
                    renderItem={({item}) => {
                      const {id, pt} = item;
                      var foundValue =
                        checkPt.length > 0 &&
                        checkPt.filter((obj) => obj.id === id);
                      return (
                        <Pressable
                          onPress={() => {
                            addListPt(id, pt);
                          }}
                          disabled={checkPt.id == id ? true : false}
                          style={{
                            flexDirection: 'row',
                            marginBottom: 10,
                            justifyContent: 'space-between',
                            marginHorizontal: 20,
                          }}>
                          <Text
                            style={{
                              fontFamily: fonts.SFProDisplayMedium,
                            }}>
                            {pt}
                          </Text>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <Image
                              source={
                                foundValue.length > 0
                                  ? foundValue[0].id
                                    ? CheckActive
                                    : null
                                  : null
                              }
                              style={{height: 10, width: 15, marginLeft: 10}}
                            />
                          </View>
                        </Pressable>
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
                  <Text style={{fontSize: 10}}>
                    {checkLeader === '' ? 'NONE' : checkLeader.name}
                  </Text>
                  <Image source={ArrowDown} style={{height: 5, width: 10}} />
                </TouchableOpacity>
              }>
              <View style={styles.containerBoxPop}>
                <View style={styles.formSearch}>
                  <TextInput
                    placeholder="Search"
                    onChangeText={(search) => setSearch(search)}
                    onSubmitEditing={searchName}
                  />
                  <Image source={Search} styl={{height: 10, width: 10}} />
                </View>
                <FlatList
                  data={searchData.length === 0 ? listDataCrew : searchData}
                  renderItem={({item}) => {
                    const {name, idUser, pt} = item;
                    return (
                      <Pressable
                        style={styles.rowLeader}
                        onPress={() => {
                          if (idUser === checkLeader.idUser) {
                            setCheckLeader('');
                          } else {
                            setCheckLeader({idUser, name});
                          }
                        }}
                        disabled={checkCoAdmin.idUser == idUser ? true : false}>
                        <Text
                          style={{
                            fontFamily: fonts.SFProDisplayMedium,
                            color:
                              checkCoAdmin.idUser == idUser
                                ? 'lightgrey'
                                : 'black',
                          }}>
                          {name}
                        </Text>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          <Text
                            style={{
                              color:
                                checkCoAdmin.idUser == idUser
                                  ? 'lightgrey'
                                  : 'black',
                            }}>
                            {pt}
                          </Text>
                          <Image
                            source={
                              checkLeader.idUser === idUser
                                ? RadioChecked
                                : RadioUncheck
                            }
                            style={{height: 15, width: 15, marginLeft: 10}}
                          />
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
              <TouchableOpacity
                style={styles.touchRange}
                onPress={() => {
                  setActivity('');
                  setSubjob('');
                  setSubJobMin('');
                  setsubJobMax('');
                  setSwitchDateEnd(false);
                  setSwitchDateStart(false);
                  setPlaceHolderDateStart('');
                  setPlaceHolderDateEnd('');
                  dateStart(''), dateEnd('');
                  setCheckCoAdmin('');
                  setMinCrew('');
                  setMaxCrew('');
                  setListPt('');
                  setCheckLeader('');
                }}>
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

const mapDispatchToProps = (dispatch) => {
  return {
    activeJobRedux: (data) => dispatch(activeJobGroup(data)),
    inactiveJobRedux: (data) => dispatch(inactiveJobGroup(data)),
    deactiveJobRedux: (data) => dispatch(deactivatedJobGroup(data)),
  };
};

export default connect(null, mapDispatchToProps)(ViewJob);

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
    flexDirection: 'row',
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
    width: 40,
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
  rowCoadmin: {
    flexDirection: 'row',
    marginBottom: 10,
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
  rowLeader: {
    flexDirection: 'row',
    marginBottom: 10,
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
});
