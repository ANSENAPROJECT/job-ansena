import React, {useState} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import Collapsible from 'react-native-collapsible';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {ArrowDown, Image1, Subjob} from '../../assets';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';
import ImageGalery from './subjobComponents/imageGalery';
import Purpose from './subjobComponents/purpose';

const SubjobDetail = () => {
  const [collapse, setCollapse] = useState(true);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.flexRow}
        onPress={() => {
          setCollapse(!collapse);
        }}>
        <View style={styles.left}>
          <Image source={Subjob} style={styles.imgSize} />
          <Text style={styles.txtTitle}>Sub Job Detail</Text>
        </View>
        <Image source={ArrowDown} style={styles.arrowSize} />
      </TouchableOpacity>
      <Collapsible collapsed={collapse}>
        <View style={styles.containerCollapse}>
          <Purpose />
          <ImageGalery />
        </View>
      </Collapsible>
    </View>
  );
};

export default SubjobDetail;

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    backgroundColor: 'white',
    minHeight: 60,
    borderRadius: 15,
    paddingHorizontal: 20,
  },
  flexRow: {
    flexDirection: 'row',
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imgSize: {height: 30, width: 30, marginRight: 10},
  txtTitle: {
    fontFamily: fonts.SFProDisplayMedium,
    color: 'grey',
    fontSize: 16,
  },
  arrowSize: {height: 10, width: 15},
  containerCollapse: {
    minHeight: 150,
    backgroundColor: 'white',
    paddingVertical: 20,
  },
});
