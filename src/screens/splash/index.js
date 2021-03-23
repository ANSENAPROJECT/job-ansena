import React, {useEffect} from 'react';
import {ActivityIndicator, Image, StyleSheet, View} from 'react-native';
import {Logo} from '../../assets';
import {useSelector} from 'react-redux';

const Splash = ({navigation}) => {
  const auth = useSelector((state) => state.auth);
  console.log(auth);
  useEffect(() => {
    setTimeout(() => {
      auth.code != null
        ? navigation.replace('dashboard')
        : navigation.replace('login');
    }, 3000);
  });
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

export default Splash;
