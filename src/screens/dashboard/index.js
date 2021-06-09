import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Animated,
  Image,
  ToastAndroid,
  Pressable,
  Platform,
  Dimensions,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {
  Bell,
  Logo,
  RedBell,
  Plus,
  Active,
  Waiting,
  Failed,
  Prio,
  WaitingActive,
  Prio1,
  FailedActive,
  Logout,
} from '../../assets';
import {logout} from '../../public/redux/ActionCreators/auth';
import {colors} from '../../utils/colors';

import {connect, useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import {API_URL} from '@env';
import Modal from 'react-native-modal';
import {
  addJobGroup,
  deleteAllSubJob,
  deleteJobGroup,
} from '../../public/redux/ActionCreators/job';
import CardAI from '../../components/dashboard/cardAi';
import CardJob from '../../components/dashboard/cardJob';
import CardArsipJob from '../../components/dashboard/cardArsipJob';
import qs from 'qs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SafeAreaView} from 'react-native';
import {Root, Toast} from 'native-base';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
console.log('Ini adalah widt dari device ini', deviceWidth);

const Dashboard = ({
  navigation,
  logoutRedux,
  addJobGroup,
  deleteJobRedux,
  deleteAllsubJob,
}) => {
  const [possScroll, setPossScroll] = useState('');
  const [iconBell, setIconBell] = useState(true);

  const auth = useSelector((state) => state.auth);
  const name = useSelector((state) => state.auth.name);
  const idUser = useSelector((state) => state.auth.idUser);
  const isAdmin = useSelector((state) => state.auth.adminStatus);
  const isCoAdmin = useSelector((state) => state.auth.coadminStatus);
  const isLogin = useSelector((state) => state.auth.isLogin);
  const [waiting, setWaiting] = useState('');
  const [failed, setFailed] = useState('');
  const [priority, setPriority] = useState('');
  const [activeJob, setActiveJob] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const heightValue = useState(new Animated.Value(50))[0];
  const token = useSelector((state) => state.token.token);
  const tokenAuth = useSelector((state) => state.auth.token);
  console.log('Ini adalh token', token);

  function extendFooter() {
    Animated.timing(heightValue, {
      toValue: 60,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }

  function minimizeFooter() {
    Animated.timing(heightValue, {
      toValue: 50,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }

  const showToastWithGravityAndOffset = (msg) => {
    Toast.show({
      text: msg,
      buttonText: 'Ok',
      duration: 2000,
    });
  };

  useEffect(() => {
    axios
      .get(`${API_URL}/jzl/api/api/get_token/${token}`)
      .then((res) => {
        if (res.data === 0) {
          showToastWithGravityAndOffset(
            'Your account had been logged in on another device!',
          );
          handleLogout();
        }
      })
      .catch(({response}) => {
        console.log(response);
      });
    getDataJob();
  }, [tokenAuth]);

  const getDataJob = () => {
    axios
      .get(`${API_URL}/jzl/api/api/getListIndex/${idUser}`)
      .then((res) => {
        console.log('Result Data Job : ', res);
        setWaiting(res.data.waiting);
        setFailed(res.data.failed);
        setPriority(res.data.priority);
        setActiveJob(res.data.active);
      })
      .catch(({response}) => {
        console.log(response);
      });
  };

  const handleScroll = (event) => {
    const positionY = event.nativeEvent.contentOffset.y;
    setPossScroll(positionY);
    if (positionY > 0) {
      extendFooter();
    } else {
      minimizeFooter();
    }
  };

  const handleLogout = () => {
    axios
      .post(`${API_URL}/jzl/api/api/logout/${token}`)
      .then((res) => {
        console.log(res);
        AsyncStorage.removeItem('adminStatus');
        AsyncStorage.removeItem('coadminStatus');
        AsyncStorage.removeItem('code');
        AsyncStorage.removeItem('idUser');
        AsyncStorage.removeItem('name');
        AsyncStorage.removeItem('token');
        logoutRedux();
        setModalVisible(false);
        navigation.replace('login');
      })
      .catch(({response}) => {
        console.log(response);
      });
  };

  const handleAddJobGroup = () => {
    deleteJobRedux();
    deleteAllsubJob();
    const data = {
      userId: idUser,
    };
    axios
      .post(`${API_URL}/jzl/api/api/saveTemplateGroupJob`, qs.stringify(data))
      .then((res) => {
        console.log('response data', res);
        const data = res.data.data.jobId;
        addJobGroup(data);
        navigation.navigate('addjobgroup');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Root>
      <View style={styles.container}>
        <Animated.ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.body}
          onScroll={handleScroll}>
          {/* Top Navigator */}

          {/* Card active job */}
          <View style={styles.cardActiveJob}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={{fontSize: 24, fontWeight: 'bold', color: 'grey'}}>
                {activeJob}
              </Text>
              <Image source={Active} style={{height: 35, width: 35}} />
            </View>
            <Text
              style={{
                alignSelf: 'flex-end',
                fontWeight: 'bold',
                color: 'grey',
              }}>
              Active Job
            </Text>
          </View>

          {/* Waiting failed prioritize */}
          <View style={styles.statusContainer}>
            <View style={styles.cardStatus}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{fontSize: 24, fontWeight: 'bold', color: 'grey'}}>
                  {waiting}
                </Text>
                <Image
                  source={waiting > 0 ? WaitingActive : Waiting}
                  style={{height: 30, width: 30}}
                />
              </View>
              <Text
                style={{
                  alignSelf: 'flex-end',
                  fontWeight: 'bold',
                  color: 'grey',
                  fontSize: 12,
                }}>
                Waiting
              </Text>
            </View>
            <View style={styles.cardStatus}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{fontSize: 24, fontWeight: 'bold', color: 'grey'}}>
                  {failed}
                </Text>
                <Image
                  source={failed > 0 ? FailedActive : Failed}
                  style={{height: 30, width: 30}}
                />
              </View>
              <Text
                style={{
                  alignSelf: 'flex-end',
                  fontWeight: 'bold',
                  color: 'grey',
                  fontSize: 12,
                }}>
                Failed
              </Text>
            </View>
            <View style={styles.cardStatus}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{fontSize: 24, fontWeight: 'bold', color: 'grey'}}>
                  {priority}
                </Text>
                <Image
                  source={priority > 0 ? Prio1 : Prio}
                  style={{height: 30, width: 30}}
                />
              </View>
              <Text
                style={{
                  alignSelf: 'flex-end',
                  fontWeight: 'bold',
                  color: 'grey',
                  fontSize: 12,
                }}>
                Prioritized
              </Text>
            </View>
          </View>

          <CardAI />
          <CardJob navigation={navigation} />
          <CardArsipJob />
        </Animated.ScrollView>

        {/* footer */}
        {`${isAdmin}` === 'true' || `${isCoAdmin}` === 'true' ? (
          <Animated.View
            style={{
              ...styles.footer,
              height: heightValue,
              backgroundColor: possScroll > 0 ? '#f2f1f6' : colors.mainColor,
              opacity: possScroll > 0 ? 0.9 : 1,
            }}>
            {`${isAdmin}` === 'true' ? (
              <TouchableOpacity
                style={{flexDirection: 'row', alignItems: 'center'}}
                activeOpacity={0.6}
                onPress={handleAddJobGroup}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image source={Plus} style={styles.plus} />
                  <Text
                    style={{
                      color: colors.primary,
                      fontWeight: 'bold',
                      marginLeft: 10,
                    }}>
                    New
                  </Text>
                </View>
              </TouchableOpacity>
            ) : (
              <View />
            )}
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => {
                navigation.navigate('viewjob');
              }}>
              <Text style={{color: colors.primary, fontWeight: 'bold'}}>
                View
              </Text>
            </TouchableOpacity>
          </Animated.View>
        ) : null}

        {modalVisible ? (
          <View
            style={{
              backgroundColor: 'black',
              position: 'absolute',
              opacity: 0.6,
              height: '100%',
              width: '100%',
            }}
          />
        ) : null}
      </View>
    </Root>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.mainColor,
    flex: 1,
    paddingTop: 10,
    position: 'relative',
  },
  header: {
    height: 45,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    height: 40,
    width: 40,
  },
  bell: {
    height: 20,
    width: 20,
  },
  body: {
    flex: 1,
    width: '100%',
    position: 'relative',
  },
  topNav: {
    height: 30,
    width: deviceWidth - 49,
    backgroundColor: '#D9D8DD',
    marginTop: 30,
    alignSelf: 'center',
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  cardActiveJob: {
    height: 100,
    width: 343,
    backgroundColor: 'white',
    borderRadius: 20,
    alignSelf: 'center',
    marginTop: 25,
    paddingHorizontal: 16,
    paddingVertical: 15,
    justifyContent: 'space-between',
  },
  statusContainer: {
    alignSelf: 'center',
    marginTop: 15,
    width: 343,
    height: 77,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardStatus: {
    height: '100%',
    width: 108,
    backgroundColor: 'white',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    justifyContent: 'space-between',
  },
  footer: {
    width: '100%',
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 0,
  },
  plus: {
    height: 25,
    width: 25,
  },

  containerAi: {
    minHeight: 230,
    width: 343,
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
    marginTop: 25,
    padding: 20,
  },
  arrow: {
    height: 10,
    width: 10,
    transform: [{rotate: '270deg'}],
  },
  underline: {
    borderWidth: 0.5,
    marginTop: 10,
    width: 285,
    marginLeft: 10,
  },
  rowContainer: {
    width: '100%',
    marginBottom: 15,
  },
});

const mapDispatchToProps = (dispatch) => {
  return {
    logoutRedux: () => dispatch(logout()),
    addJobGroup: (jobId) => dispatch(addJobGroup(jobId)),
    deleteJobRedux: () => dispatch(deleteJobGroup()),
    deleteAllsubJob: () => dispatch(deleteAllSubJob()),
  };
};

export default connect(null, mapDispatchToProps)(Dashboard);
