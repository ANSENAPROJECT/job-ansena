import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import {BackIcon} from '../../assets';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const AddSubJob = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.containerHeader}>
        <View style={styles.left}>
          <Image source={BackIcon} style={styles.imgHeader} />
          <Text style={styles.txtColorBlue}>New Job 1</Text>
        </View>
        <View style={styles.center}>
          <Text style={styles.titletxt}>Add Sub Job</Text>
        </View>
        <View style={styles.right}>
          <Text style={styles.txtColorBlue}>Add</Text>
        </View>
      </View>
      {/* Code */}
      <View style={styles.code}>
        <Text style={styles.txtCode}>Code</Text>
        <Text>DIDI89</Text>
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
    alignItems: 'center',
  },
  txtCode: {
    fontWeight: 'bold',
    color: 'grey',
  },
});

export default AddSubJob;
