import React, {useState} from 'react';
import {StyleSheet, Text, View, Image, Pressable} from 'react-native';
import Collapsible from 'react-native-collapsible';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {ArrowDownBlue, ArrowDownWhite} from '../../../assets';
import {colors} from '../../../utils/colors';
import {fonts} from '../../../utils/fonts';

const DuplicateJob = () => {
  const [collapse, setCollapse] = useState(true);
  const [barDuplicate, setBarDuplicate] = useState('');
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          setCollapse(!collapse);
        }}
        style={styles.btnCollapse}>
        <Text style={styles.txtTitle}>Duplicate Job</Text>
        <Image source={ArrowDownBlue} style={styles.imgArrow} />
      </TouchableOpacity>
      <Collapsible collapsed={collapse}>
        <View style={styles.containerCollapse}>
          <View style={styles.barBtn}>
            <Pressable
              onPress={() => {
                setBarDuplicate(1);
              }}
              style={{
                ...styles.backgroundBar,
                backgroundColor: barDuplicate === 1 ? 'white' : 'transparent',
              }}>
              <Text style={{fontSize: 8}}>FOR THE SAME JOB GROUP</Text>
            </Pressable>
            <View style={{width: 10}} />
            <Pressable
              onPress={() => {
                setBarDuplicate(2);
              }}
              style={{
                ...styles.backgroundBar,
                backgroundColor: barDuplicate === 2 ? 'white' : 'transparent',
              }}>
              <Text style={{fontSize: 8}}>FOR ANOTHER JOB GROUP</Text>
            </Pressable>
          </View>
          <View style={styles.buttonDuplicate}>
            <Text style={styles.txtBtn}>Duplicate Sub job</Text>
            <Image source={ArrowDownWhite} style={styles.imgArrowWhite} />
          </View>
        </View>
      </Collapsible>
    </View>
  );
};

export default DuplicateJob;

const styles = StyleSheet.create({
  container: {
    minHeight: 50,
    borderRadius: 15,
    backgroundColor: colors.mainColor,
    marginTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  btnCollapse: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    justifyContent: 'space-between',
  },
  txtTitle: {
    color: colors.colorReportAcive,
    fontSize: 16,
  },
  imgArrow: {height: 10, width: 15, transform: [{rotate: '180deg'}]},
  containerCollapse: {
    height: 80,
    marginTop: 10,
  },
  barBtn: {
    height: 40,
    backgroundColor: 'lightgrey',
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  backgroundBar: {
    flex: 1,
    borderRadius: 10,
    height: '70%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonDuplicate: {
    marginTop: 10,
    height: 30,
    backgroundColor: colors.colorReportAcive,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  txtBtn: {
    fontFamily: fonts.SFProDisplayMedium,
    fontSize: 12,
    color: 'white',
  },
  imgArrowWhite: {
    transform: [{rotate: '-90deg'}],
    height: 10,
    width: 15,
  },
});
