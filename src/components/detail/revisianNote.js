import React, {useState} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import Collapsible from 'react-native-collapsible';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import {ArrowDown, Image1} from '../../assets';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';

const RevisianNote = () => {
  const [collapse, setCollapse] = useState(true);
  const noteRevise = useSelector((state) => state.detailjob.noteRevise);
  const imgRevise = useSelector((state) => state.detailjob.imgRevise);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.btnTitle}
        onPress={() => {
          setCollapse(!collapse);
        }}>
        <Text style={{fontFamily: fonts.SFProDisplayMedium, color: 'red'}}>
          Revision Notes
        </Text>
        <Image source={ArrowDown} style={{height: 10, width: 15}} />
      </TouchableOpacity>
      <Collapsible collapsed={collapse}>
        <View style={{minHeight: 100}}>
          <View style={{minHeight: 50, marginTop: 20}}>
            <Text style={styles.txtStyle}>{noteRevise}</Text>
          </View>
          {imgRevise &&
            imgRevise.map(({img, desc}, index) => {
              let HTTP_URI = {uri: img};
              return (
                <View
                  style={{flexDirection: 'row', alignItems: 'center'}}
                  key={index}>
                  <Image
                    source={HTTP_URI}
                    style={{height: 100, width: 100, borderRadius: 20}}
                  />
                  <View style={{height: 100, marginLeft: 10}}>
                    <Text style={styles.txtStyle}>{desc}</Text>
                  </View>
                </View>
              );
            })}
        </View>
      </Collapsible>
    </View>
  );
};

export default RevisianNote;

const styles = StyleSheet.create({
  container: {
    minHeight: 60,
    backgroundColor: 'white',
    borderRadius: 15,
    paddingHorizontal: 20,
    marginTop: 20,
    paddingBottom: 20,
  },
  btnTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  txtStyle: {fontFamily: fonts.SFProDisplayMedium, color: 'grey'},
});
