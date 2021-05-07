import React, {useEffect} from 'react';
import {ActivityIndicator, Image, StyleSheet, View} from 'react-native';
import {Logo} from '../../assets';
import {connect, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setLoginTrue} from '../../public/redux/ActionCreators/auth';

const Splash = ({navigation, setLoginRedux}) => {
  const auth = useSelector((state) => state.auth);
  console.log(auth);
  useEffect(() => {
    const validation = async () => {
      const adminStatus = await AsyncStorage.getItem('adminStatus');
      const coadminStatus = await AsyncStorage.getItem('coadminStatus');
      const name = await AsyncStorage.getItem('name');
      const code = await AsyncStorage.getItem('code');
      const idUser = await AsyncStorage.getItem('idUser');
      const token = await AsyncStorage.getItem('token');

      const data = {
        name,
        adminStatus,
        coadminStatus,
        code,
        idUser,
        data,
        token,
      };
      console.log('data login redux', data);

      setLoginRedux(data);

      setTimeout(() => {
        code != null
          ? navigation.replace('dashboard')
          : navigation.replace('login');
      }, 2000);
    };
    validation();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <Image style={styles.logoImage} source={Logo} />
        <ActivityIndicator size="large" color="blue" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 100,
  },
  body: {
    width: 200,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  logoImage: {
    height: 150,
    width: 150,
  },
});

const mapdispatchToProps = (dispatch) => {
  return {
    setLoginRedux: (data) => dispatch(setLoginTrue(data)),
  };
};

export default connect(null, mapdispatchToProps)(Splash);
