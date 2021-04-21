import React, {useState} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import Collapsible from 'react-native-collapsible';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {ArrowDown, Image1} from '../../../assets';
import {colors} from '../../../utils/colors';
import {fonts} from '../../../utils/fonts';

const ImageGalery = () => {
  const [collapse, setCollapse] = useState(true);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          setCollapse(!collapse);
        }}
        style={styles.btn}>
        <Text style={{fontFamily: fonts.SFProDisplayMedium, color: 'grey'}}>
          Image Galery
        </Text>
        <Image source={ArrowDown} style={styles.arrowImg} />
      </TouchableOpacity>
      <Collapsible collapsed={collapse}>
        <View style={styles.containerCollapse}>
          <ScrollView horizontal={true}>
            <Image source={Image1} style={styles.imgSize} />
            <Image source={Image1} style={styles.imgSize} />
            <Image source={Image1} style={styles.imgSize} />
            <Image source={Image1} style={styles.imgSize} />
          </ScrollView>
        </View>
      </Collapsible>
    </View>
  );
};

export default ImageGalery;

const styles = StyleSheet.create({
  container: {
    minHeight: 50,
    backgroundColor: colors.mainColor,
    borderRadius: 15,
    marginTop: 20,
    paddingHorizontal: 20,
  },
  btn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
  },
  imgSize: {
    height: 40,
    width: 40,
    borderRadius: 10,
    marginRight: 10,
  },
  arrowImg: {height: 10, width: 15},
  containerCollapse: {
    height: 50,
    marginVertical: 10,
  },
});
