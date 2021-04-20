import React, {useState} from 'react';
import {Image, StyleSheet, Text, TextInput, View} from 'react-native';
import Collapsible from 'react-native-collapsible';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import {
  ArrowDownWhite,
  ReportDone,
  ReportDone1,
  ArrowDownBlue,
  CoAdmin,
  Image1,
} from '../../assets';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';

const ReportAsDone = ({_ModalUpload}) => {
  const [collapse, setCollapse] = useState(true);
  const statusButton = useSelector((state) => state.detailjob.statusButton);

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor:
          statusButton === 'overdue'
            ? colors.btngrey
            : collapse
            ? 'blue'
            : 'white',
      }}>
      <TouchableOpacity
        disabled={statusButton === 'overdue' ? true : false}
        style={styles.btnContainer}
        activeOpacity={0.6}
        onPress={() => {
          setCollapse(!collapse);
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={collapse ? ReportDone : ReportDone1}
            style={styles.iconImg}
          />
          <Text
            style={{
              fontFamily: fonts.SFProDisplayMedium,
              color: collapse ? 'white' : colors.colorReportAcive,
            }}>
            Report As Done
          </Text>
        </View>
        <Image
          source={collapse ? ArrowDownWhite : ArrowDownBlue}
          style={styles.iconArrow}
        />
      </TouchableOpacity>
      <Collapsible collapsed={collapse}>
        <View style={{minHeight: 300, paddingHorizontal: 20}}>
          <View style={styles.reportTime}>
            <Text style={styles.txtCollapse}>Finish Time</Text>
            <Text style={styles.txtCollapse}>29 Jan 09:00</Text>
          </View>
          <View style={styles.containerDesc}>
            <TextInput multiline={true} placeholder="Add Description" />
          </View>
          <View style={styles.containerUpload}>
            <Text style={styles.txtImgReport}>Image Report</Text>
            <View style={styles.imgUpload}>
              <Image source={Image1} style={styles.imgUploadSize} />
              <View style={styles.txtDescContainer}>
                <TextInput
                  style={{fontSize: 12}}
                  placeholder="Image Description"
                  multiline
                />
              </View>
            </View>
            <TouchableOpacity
              onPress={() => {
                _ModalUpload();
              }}>
              <Text style={styles.txtAdd}>Add Image...</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.btnDone} activeOpacity={0.6}>
            <Text style={styles.txtBtn}>Report as Done</Text>
          </TouchableOpacity>
        </View>
      </Collapsible>
    </View>
  );
};

export default ReportAsDone;

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
    minHeight: 60,
    borderRadius: 15,
    paddingHorizontal: 20,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
  },
  iconImg: {height: 30, width: 30, marginRight: 10},
  iconArrow: {height: 10, width: 15},
  reportTime: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  txtCollapse: {color: 'grey', fontFamily: fonts.SFProDisplayMedium},
  containerDesc: {
    minHeight: 100,
    backgroundColor: colors.mainColor,
    marginTop: 20,
    borderRadius: 15,
    paddingHorizontal: 10,
  },
  txtImgReport: {
    fontFamily: fonts.SFProDisplayMedium,
    color: '#6C6C6C',
    marginBottom: 10,
  },
  containerUpload: {
    minHeight: 100,
    marginTop: 20,
    borderRadius: 15,
    padding: 20,
    backgroundColor: colors.mainColor,
  },
  txtAdd: {
    fontFamily: fonts.SFProDisplayMedium,
    color: colors.colorReportAcive,
  },
  btnDone: {
    height: 30,
    backgroundColor: colors.colorReportAcive,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  txtBtn: {
    fontFamily: fonts.SFProDisplayMedium,
    color: 'white',
  },
  imgUpload: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  imgUploadSize: {height: 90, width: 90, borderRadius: 25},
  txtDescContainer: {
    maxHeight: 100,
    width: 130,
  },
});
