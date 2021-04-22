import React, {useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import Collapsible from 'react-native-collapsible';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {ArrowDown, Image1, Showlatest} from '../../assets';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';

const LatestReport = () => {
  const [collapse, setCollapse] = useState(true);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          setCollapse(!collapse);
        }}
        style={styles.btn}>
        <View style={styles.flexRow}>
          <Image source={Showlatest} style={styles.imgSize} />
          <Text>Show Latest Report</Text>
        </View>
        <View style={styles.flexRow}>
          <View style={styles.dot} />
          <Image source={ArrowDown} style={styles.arrowImg} />
        </View>
      </TouchableOpacity>
      <Collapsible collapsed={collapse}>
        <View style={{paddingVertical: 10}}>
          <View style={styles.rowHeader}>
            <Text>Finish Time</Text>
            <Text>29 Jan 09:00</Text>
          </View>
          <View style={styles.containerDesc}>
            <Text>Membeli Packing merek exo di pasar legi</Text>
          </View>
          <View style={styles.containerGalery}>
            <Text style={styles.imgRowHeader}>Image Galery</Text>
            <View style={styles.rowGalery}>
              <Image source={Image1} style={styles.imgGalerySize} />
              <View style={{flex: 1}}>
                <Text>
                  List harga packing terbaru Februari 2021.- Sudah termasuk beli
                  olshop - Sudah termasuk ongkir
                </Text>
              </View>
            </View>
            <View style={styles.line} />
            <View style={styles.rowGalery}>
              <Image source={Image1} style={styles.imgGalerySize} />
              <View style={{flex: 1}}>
                <Text>
                  List harga packing terbaru Februari 2021.- Sudah termasuk beli
                  olshop - Sudah termasuk ongkir
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Collapsible>
    </View>
  );
};

export default LatestReport;

const styles = StyleSheet.create({
  container: {
    minHeight: 60,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    borderRadius: 15,
    paddingBottom: 10,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  flexRow: {flexDirection: 'row', alignItems: 'center'},
  imgSize: {height: 30, width: 30, marginRight: 10},
  dot: {
    height: 5,
    width: 5,
    borderRadius: 20,
    backgroundColor: 'red',
    marginRight: 10,
  },
  arrowImg: {height: 10, width: 15},
  rowHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingHorizontal: 10,
  },
  containerDesc: {
    minHeight: 100,
    backgroundColor: colors.mainColor,
    borderRadius: 15,
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  containerGalery: {
    backgroundColor: colors.mainColor,
    borderRadius: 15,
    minHeight: 100,
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  imgRowHeader: {
    fontFamily: fonts.SFProDisplayMedium,
    marginBottom: 20,
  },
  imgGalerySize: {
    height: 100,
    width: 100,
    borderRadius: 15,
    marginRight: 10,
  },
  rowGalery: {marginTop: 10, flexDirection: 'row'},
  line: {
    marginVertical: 20,
    height: 2,
    backgroundColor: 'grey',
    borderRadius: 10,
  },
});
