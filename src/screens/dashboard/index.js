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
} from '../../assets';
import CardAI from '../../components/cardAi';
import CardAripJob from '../../components/cardArsipJob';
import CardJob from '../../components/cardJob';
import {logout} from '../../public/redux/ActionCreators/auth';
import {colors} from '../../utils/colors';

import {connect, useSelector} from 'react-redux';
import axios from 'axios';
import {API_URL} from '@env';
import Modal from 'react-native-modal';

const Dashboard = ({navigation, logoutRedux, getJobRedux}) => {
  const [possScroll, setPossScroll] = useState('');
  const [iconBell, setIconBell] = useState(true);

  const auth = useSelector((state) => state.auth);
  const code = useSelector((state) => state.auth.code);
  const idUser = useSelector((state) => state.auth.idUser);

  const isLogin = useSelector((state) => state.auth.isLogin);
  const [waiting, setWaiting] = useState('');
  const [failed, setFailed] = useState('');
  const [priority, setPriority] = useState('');
  const [activeJob, setActiveJob] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const showToastWithGravityAndOffset = (msg) => {
    ToastAndroid.showWithGravityAndOffset(
      msg,
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
  };

  useEffect(() => {
    getDataJob();
  }, []);

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
    const positionX = event.nativeEvent.contentOffset.x;
    const positionY = event.nativeEvent.contentOffset.y;
    setPossScroll(positionY);
  };

  const handleLogout = () => {
    logoutRedux();
    setModalVisible(false);
    navigation.replace('login');
  };

  return (
    <>
      <View style={styles.container}>
        {/* header */}
        <View style={styles.header}>
          <Image source={Logo} style={styles.logo} />
          <View style={{flexDirection: 'row'}}>
            <Text>
              Hello, <Text style={{fontWeight: 'bold'}}>{code}</Text>
            </Text>
            <TouchableOpacity
              style={{marginLeft: 20}}
              onPress={() => setModalVisible(true)}>
              <Image style={styles.bell} source={iconBell ? Bell : RedBell} />
            </TouchableOpacity>
          </View>
        </View>

        <Animated.ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.body}
          onScroll={handleScroll}>
          <View style={styles.topNav}>
            <TouchableOpacity>
              <Text>Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text>Job</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text>Event</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text>HRD</Text>
            </TouchableOpacity>
          </View>

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
          <CardJob />
          <CardAripJob />
        </Animated.ScrollView>

        {/* footer */}
        <View
          style={{
            ...styles.footer,
            height: possScroll > 0 ? 60 : 44,
            backgroundColor: possScroll > 0 ? '#f2f1f6' : colors.mainColor,
            opacity: possScroll > 0 ? 0.9 : 1,
          }}>
          <TouchableOpacity
            style={{flexDirection: 'row', alignItems: 'center'}}
            activeOpacity={0.6}
            onPress={() => {
              navigation.navigate('addjobgroup');
            }}>
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
          <TouchableOpacity activeOpacity={0.6}>
            <Text style={{color: colors.primary, fontWeight: 'bold'}}>
              View
            </Text>
          </TouchableOpacity>
        </View>
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

      {/* prompt Logout */}
      <Modal
        animationType="fade"
        animationInTiming={300}
        hasBackdrop={true}
        onBackdropPress={() => {
          setModalVisible(!modalVisible);
        }}
        backdropColor="black"
        backdropOpacity={0.6}
        visible={modalVisible}
        onRequestClose={() => {
          showToastWithGravityAndOffset('Modal Has been Close');
          setModalVisible(!modalVisible);
        }}
        useNativeDriver={true}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Are you sure you want to logout ?
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Pressable
                style={{...styles.btnModal, borderRightWidth: 0.5}}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text
                  style={{
                    color: colors.badgeRed,
                    fontSize: 20,
                    fontWeight: 'bold',
                  }}>
                  Cancel
                </Text>
              </Pressable>
              <Pressable
                style={{...styles.btnModal, borderLeftWidth: 0.5}}
                onPress={handleLogout}>
                <Text
                  style={{
                    color: colors.badgeBlue,
                    fontSize: 20,
                    fontWeight: 'bold',
                  }}>
                  Yes
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </>
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
    width: 343,
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

  // modal
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    height: 150,
    width: 300,
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  btnModal: {
    height: 50,
    width: 150,
    borderTopWidth: 0.7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalText: {
    justifyContent: 'center',
    marginTop: 35,
    textAlign: 'center',
    fontSize: 18,
  },
});

const mapDispatchToProps = (dispatch) => {
  return {
    logoutRedux: () => dispatch(logout()),
  };
};

export default connect(null, mapDispatchToProps)(Dashboard);
