import React, {useState} from 'react';
import {StyleSheet, Text, View, Dimensions, Image} from 'react-native';
import Collapsible from 'react-native-collapsible';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import {ArrowDown, Crew, Remind} from '../../assets';
import {fonts} from '../../utils/fonts';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const Reminded = () => {
  const [collapse, setCollapse] = useState(true);
  const remind = useSelector((state) => state.detailjob.remind);
  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          setCollapse(!collapse);
        }}
        activeOpacity={0.9}>
        <View style={styles.left}>
          <Image source={Remind} style={styles.imgSize} />
          <Text style={{fontFamily: fonts.SFProDisplayMedium}}>
            Remind Peers
          </Text>
        </View>
        <View>
          <View style={styles.right}>
            {remind && remind.length == 0 ? (
              <Text style={{...styles.txtRight, marginRight: 20}}>
                {remind && remind.length}
              </Text>
            ) : (
              <>
                <Text style={styles.txtRight}>{remind && remind.length}</Text>
                <Image source={ArrowDown} style={styles.arrow} />
              </>
            )}
          </View>
        </View>
      </TouchableOpacity>
      <Collapsible collapsed={collapse}>
        <View style={{minHeight: 0, marginTop: 10}}>
          {remind &&
            remind.map((item, index) => {
              return (
                <View style={styles.rowText} key={index}>
                  <Text>{item}</Text>
                </View>
              );
            })}
        </View>
      </Collapsible>
    </View>
  );
};

export default Reminded;

const styles = StyleSheet.create({
  container: {
    minHeight: 60,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    backgroundColor: 'white',
    paddingHorizontal: 20,
  },
  line: {
    height: 2,
    width: deviceWidth - 150,
    backgroundColor: 'lightgrey',
    alignSelf: 'center',
    borderRadius: 20,
  },
  imgSize: {
    height: 30,
    width: 30,
    marginRight: 10,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrow: {
    height: 10,
    width: 15,
    marginLeft: 10,
  },
  btn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  rowText: {
    height: 30,
    width: '75%',
    alignSelf: 'center',
    marginBottom: 10,
  },
  txtRight: {
    fontFamily: fonts.SFProDisplayMedium,
    color: 'lightgrey',
  },
});
