import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Pressable,
} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Logo, Logout} from '../../assets';
import Profile from '../../screens/profile';
import Dashboard from '../../screens/dashboard';
import Event from '../../screens/event';
import Hrd from '../../screens/hrd';
import {connect, useSelector} from 'react-redux';
import {API_URL} from '@env';
import axios from 'axios';
import {colors} from '../../utils/colors';
import Modal from 'react-native-modal';
import {logout} from '../../public/redux/ActionCreators/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Tab = createMaterialTopTabNavigator();

const HeaderDashboard = ({logoutRedux, navigation}) => {
  const token = useSelector((state) => state.token.token);
  const [modalVisible, setModalVisible] = useState(false);
  const auth = useSelector((state) => state.auth);
  const name = useSelector((state) => state.auth.name);
  const idUser = useSelector((state) => state.auth.idUser);
  const isAdmin = useSelector((state) => state.auth.adminStatus);
  const isCoAdmin = useSelector((state) => state.auth.coadminStatus);
  const isLogin = useSelector((state) => state.auth.isLogin);

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

  return (
    <>
      <View style={styles.container}>
        <SafeAreaView>
          <View style={styles.header}>
            <Image source={Logo} style={styles.logo} />
            <View style={{flexDirection: 'row'}}>
              <Text>
                Hello
                <Text style={{fontWeight: 'bold'}}>
                  {' '}
                  {name === null ? null : name.split(' ')[0]}
                </Text>
              </Text>
              <TouchableOpacity
                style={{marginLeft: 20}}
                onPress={() => setModalVisible(true)}>
                <Image style={styles.bell} source={Logout} />
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>

        <Tab.Navigator
          initialRouteName="dashboard"
          tabBarPosition="top"
          tabBarOptions={{
            upperCaseLabel: false,
            showIcon: true,

            labelStyle: {fontSize: 14, textTransform: 'none'},
            tabStyle: {
              paddingTop: 0,
              paddingBottom: 20,
              borderRadius: 10,
            },
            indicatorStyle: {
              height: 30,
              backgroundColor: 'white',
              borderRadius: 10,
            },
            style: {
              backgroundColor: '#D9D8DD',
              marginTop: 15,
              borderRadius: 20,
              height: 30,
            },
          }}>
          <Tab.Screen
            name="profile"
            component={Profile}
            options={{
              tabBarLabel: 'Profile',
            }}
          />
          <Tab.Screen
            name="dashboard"
            component={Dashboard}
            options={{
              tabBarLabel: 'Job',
            }}
          />
          <Tab.Screen
            name="event"
            component={Event}
            options={{
              tabBarLabel: 'Event',
            }}
          />
          <Tab.Screen
            name="hrd"
            component={Hrd}
            options={{
              tabBarLabel: 'Hrd',
            }}
          />
        </Tab.Navigator>
      </View>

      <Modal
        animationType="fade"
        animationInTiming={300}
        onBackdropPress={() => {
          setModalVisible(!modalVisible);
        }}
        hasBackdrop={true}
        backdropColor="black"
        backdropOpacity={0.6}
        isVisible={modalVisible}
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
                onPress={() => handleLogout()}>
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

const mapDispatchToProps = (dispatch) => {
  return {
    logoutRedux: () => dispatch(logout()),
  };
};

export default connect(null, mapDispatchToProps)(HeaderDashboard);

const styles = StyleSheet.create({
  header: {
    height: 45,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    height: 40,
    width: 40,
  },
  bell: {
    height: 20,
    width: 20,
  },
  container: {
    backgroundColor: '#efeff4',
    flex: 1,
    paddingTop: 10,
    position: 'relative',
    paddingHorizontal: 20,
  },
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
