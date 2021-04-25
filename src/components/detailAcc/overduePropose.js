import React, {useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import Collapsible from 'react-native-collapsible';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import {ArrowDown, Image1, OverdueDate} from '../../assets';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';

const OverduePropose = () => {
  const [collapse, setCollapse] = useState(true);
  const noteRequest = useSelector((state) => state.detailjob.noteRequest);
  const deadlineOverdue = useSelector(
    (state) => state.detailjob.deadlineOverdue,
  );
  const imgRequest = useSelector((state) => state.detailjob.imgRequest);
  console.log(deadlineOverdue);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.btnTitle}
        onPress={() => {
          setCollapse(!collapse);
        }}>
        <View style={styles.flexRow}>
          <Image source={OverdueDate} style={styles.iconSize} />
          <Text style={styles.fontStyle}>Show Overdue Proposal</Text>
        </View>
        <View style={styles.flexRow}>
          <View style={styles.dot} />
          <Image source={ArrowDown} style={styles.arrowImg} />
        </View>
      </TouchableOpacity>
      <Collapsible collapsed={collapse}>
        <View style={styles.containerCollapse}>
          <View style={styles.headerColapse}>
            <Text style={styles.txtHeaderCollapse}>Proposed Deadline</Text>
            <Text style={{fontFamily: fonts.SFProDisplayMedium, color: 'red'}}>
              {deadlineOverdue}
            </Text>
          </View>
          <View style={styles.descCollapse}>
            <Text>{noteRequest}</Text>
          </View>
          <View style={styles.imgCollapse}>
            <Text>Progress Report</Text>
            {imgRequest &&
              imgRequest.map(({desc, img}, index) => {
                let HTTP_URI = {uri: img};
                return (
                  <View style={{marginTop: 20}} key={index}>
                    <View style={styles.rowImgReport}>
                      <Image source={HTTP_URI} style={styles.imgSize} />
                      <View style={styles.containerText}>
                        <Text>{desc}</Text>
                      </View>
                    </View>
                  </View>
                );
              })}
          </View>
        </View>
      </Collapsible>
    </View>
  );
};

export default OverduePropose;

const styles = StyleSheet.create({
  container: {
    minHeight: 60,
    backgroundColor: 'white',
    borderRadius: 15,
    paddingHorizontal: 20,
  },
  btnTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  flexRow: {flexDirection: 'row', alignItems: 'center'},
  iconSize: {height: 30, width: 30, marginRight: 10},
  fontStyle: {fontFamily: fonts.SFProDisplayMedium, color: 'black'},
  dot: {
    height: 5,
    width: 5,
    borderRadius: 10,
    backgroundColor: 'red',
    marginRight: 10,
  },
  arrowImg: {height: 10, width: 15},
  containerCollapse: {minHeight: 100, marginTop: 10, marginBottom: 20},
  headerColapse: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  txtHeaderCollapse: {fontFamily: fonts.SFProDisplayMedium, color: 'red'},
  descCollapse: {
    minHeight: 100,
    marginTop: 20,
    backgroundColor: colors.mainColor,
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  imgCollapse: {
    minHeight: 100,
    backgroundColor: colors.mainColor,
    marginTop: 20,
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  rowImgReport: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imgSize: {height: 100, width: 100, borderRadius: 20},
  containerText: {height: 100, width: 150},
});
