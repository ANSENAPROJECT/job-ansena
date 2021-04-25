import React, {useState} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import Collapsible from 'react-native-collapsible';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import {ArrowDown, Star} from '../../../assets';
import {colors} from '../../../utils/colors';
import {fonts} from '../../../utils/fonts';

const Remind = () => {
  const [collapse, setCollapse] = useState(true);
  const remindList = useSelector((state) => state.detailjob.remind);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        disabled={remindList.length === 0 ? true : false}
        onPress={() => {
          setCollapse(!collapse);
        }}
        style={styles.btnCollapse}>
        <Text style={{fontFamily: fonts.SFProDisplayMedium, color: 'grey'}}>
          Remind Peers
        </Text>
        {remindList.length === 0 ? (
          <Text>{remindList.length}</Text>
        ) : (
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text>{remindList.length}</Text>
            <Image source={ArrowDown} style={styles.imgArrow} />
          </View>
        )}
      </TouchableOpacity>
      <Collapsible collapsed={collapse}>
        <View style={styles.containerCollapse}>
          {remindList &&
            remindList.map((item, index) => {
              return (
                <View style={styles.rowFlex} key={index}>
                  <Text style={styles.textRow}>{item}</Text>
                </View>
              );
            })}
        </View>
      </Collapsible>
    </View>
  );
};

export default Remind;

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
    marginTop: 15,
  },
  rowFlex: {flexDirection: 'row', alignItems: 'center', marginBottom: 15},
  imgSize: {height: 15, width: 15, marginRight: 10},
  textRow: {
    fontFamily: fonts.SFProDisplayMedium,
    color: 'grey',
    marginLeft: 20,
  },
  imgArrow: {height: 10, width: 15, marginLeft: 10},
});
