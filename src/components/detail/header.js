import React from 'react';
import {SafeAreaView} from 'react-native';
import {View, Text, StyleSheet, Dimensions, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {BackIcon, DotMenuBlue} from '../../assets';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const Header = ({navigation}) => {
  return (
    <SafeAreaView>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.leftHeader}
          onPress={() => {
            navigation.goBack();
          }}>
          <Image source={BackIcon} style={styles.arrowimg} />
          <Text style={styles.txtHeader}>Back</Text>
        </TouchableOpacity>
        <Image source={DotMenuBlue} style={styles.dotmenu} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  //Header
  headerContainer: {
    height: 50,
    width: '100%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dotmenu: {
    width: 20,
    height: 5,
  },
  arrowimg: {
    height: 15,
    width: 20,
  },
  txtHeader: {
    fontSize: 17,
    fontFamily: fonts.SFProDisplayMedium,
    marginLeft: 5,
    color: colors.badgeBlue,
  },
});

export default Header;
