import React, {useState} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import Collapsible from 'react-native-collapsible';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {ArrowDown, Star} from '../../../assets';
import {colors} from '../../../utils/colors';
import {fonts} from '../../../utils/fonts';

const Crew = () => {
  const [collapse, setCollapse] = useState(true);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          setCollapse(!collapse);
        }}
        style={styles.btnCollapse}>
        <Text style={{fontFamily: fonts.SFProDisplayMedium, color: 'grey'}}>
          Crew
        </Text>
        <Image source={ArrowDown} style={styles.imgArrow} />
      </TouchableOpacity>
      <Collapsible collapsed={collapse}>
        <View style={styles.containerCollapse}>
          <View style={styles.rowFlex}>
            <Image source={Star} style={styles.imgSize} />
            <Text style={styles.textRow}>Fachri Ghiffary</Text>
          </View>
        </View>
      </Collapsible>
    </View>
  );
};

export default Crew;

const styles = StyleSheet.create({
  container: {
    minHeight: 50,
    backgroundColor: colors.mainColor,
    borderRadius: 15,
    marginTop: 20,
    paddingHorizontal: 20,
  },
  btnCollapse: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
  },
  containerCollapse: {
    minHeight: 30,
    marginVertical: 10,
  },
  rowFlex: {flexDirection: 'row', alignItems: 'center'},
  imgSize: {height: 15, width: 15, marginRight: 10},
  textRow: {
    fontFamily: fonts.SFProDisplayMedium,
    color: 'grey',
  },
  imgArrow: {height: 10, width: 15},
});