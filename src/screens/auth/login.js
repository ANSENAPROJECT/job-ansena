import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import {EyeClose, EyeOpen, Logo} from '../../assets';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {setLoginTrue} from '../../public/redux/ActionCreators/auth';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';
import axios from 'axios';
import qs from 'qs';
import {connect} from 'react-redux';
import {API_URL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Root, Toast} from 'native-base';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      pass: true,
      email: '',
      password: '',
      isLoading: false,
      errMsg: '',
    };
  }

  showToastWithGravityAndOffset = (msg) => {
    Toast.show({
      text: msg,
      buttonText: 'Ok',
      duration: 2000,
    });
  };

  SubmitLogin = () => {
    if (this.state.email === '' || this.state.password === '') {
      this.setState({
        isLoading: false,
      });
      this.showToastWithGravityAndOffset('All column cannot be empty.');
    } else {
      const data = {
        email: this.state.email,
        password: this.state.password,
        token: this.props.token.token,
      };
      console.log('INi adalah data yang dikirm ', data);
      axios
        .post(`${API_URL}/jzl/api/api/index`, qs.stringify(data))
        .then((res) => {
          console.log(res);
          const msg = res.data.message;
          const dataLogin = {
            adminStatus: res.data.adminStatus,
            coadminStatus: res.data.coadminStatus,
            code: res.data.code,
            idUser: res.data.idUser,
            name: res.data.name,
            token: res.data.token,
          };
          AsyncStorage.setItem('adminStatus', `${res.data.adminStatus}`);
          AsyncStorage.setItem('coadminStatus', `${res.data.coadminStatus}`);
          AsyncStorage.setItem('code', `${res.data.code}`);
          AsyncStorage.setItem('idUser', `${res.data.idUser}`);
          AsyncStorage.setItem('name', `${res.data.name}`);
          AsyncStorage.setItem('token', `${res.data.token}`);
          this.props.dispatch(setLoginTrue(dataLogin));
          if (res.data.message !== 'success') {
            this.showToastWithGravityAndOffset(msg);
          } else {
            this.showToastWithGravityAndOffset(msg);
            this.props.navigation.replace('headerDashboard');
          }
          this.setState({
            isLoading: false,
          });
        })
        .catch(({response}) => {
          console.log({response});
          this.showToastWithGravityAndOffset('Connection Error');
          this.setState({
            isLoading: false,
            errMsg: 'Connection Error',
          });
        });
    }
  };
  render() {
    const {pass, isLoading, errMsg} = this.state;
    console.log('ini ada di login : ', this.props.token.token);
    return (
      <Root>
        <ScrollView style={styles.container}>
          <Image source={Logo} style={styles.logoImage} />
          <View style={styles.titleLogin}>
            <Text style={styles.title}>Lorem Ipsum</Text>
            <Text
              style={{
                textAlign: 'justify',
                fontSize: 12,
                fontFamily: fonts.SFProDisplayBold,
                color: 'grey',
              }}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s.
            </Text>
          </View>
          <View style={{...styles.formInput, marginTop: 40, marginBottom: 17}}>
            <TextInput
              autoCapitalize="none"
              placeholder="Nama Pengguna"
              value={this.state.email}
              onChangeText={(email) => this.setState({email})}
            />
          </View>
          <View style={{...styles.formInput, marginBottom: 30}}>
            <TextInput
              autoCapitalize="none"
              secureTextEntry={pass}
              style={{width: 220}}
              placeholder="Kata Sandi"
              value={this.state.password}
              onChangeText={(text) => {
                this.setState({password: text});
              }}
            />
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => {
                this.setState({
                  pass: !pass,
                });
              }}>
              <Image source={pass ? EyeClose : EyeOpen} />
            </TouchableOpacity>
          </View>
          {isLoading ? (
            <View style={{...styles.btn, flexDirection: 'row'}}>
              <ActivityIndicator size="small" color="white" />
              <Text
                style={{
                  fontFamily: fonts.SFProDisplayMedium,
                  color: 'white',
                  marginLeft: 10,
                }}>
                Please Wait...
              </Text>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.btn}
              activeOpacity={0.5}
              onPress={() => {
                this.setState({
                  isLoading: true,
                });
                this.SubmitLogin();
              }}>
              <Text style={{color: 'white'}}>Masuk</Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      </Root>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.mainColor,
  },
  logoImage: {
    height: 200,
    width: 200,
    alignSelf: 'center',
    marginTop: 100,
  },
  titleLogin: {
    marginTop: 20,
    width: 290,
    alignSelf: 'center',
  },
  title: {
    fontSize: 20,
    fontFamily: fonts.SFProDisplayBold,
    color: 'grey',
  },
  formInput: {
    height: 44,
    width: 310,
    borderRadius: 15,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
  },
  btn: {
    backgroundColor: colors.primary,
    height: 33,
    width: 310,
    alignSelf: 'center',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
});

const mapStateToProps = ({auth, token}) => {
  return {
    auth,
    token,
  };
};

export default connect(mapStateToProps)(Login);
