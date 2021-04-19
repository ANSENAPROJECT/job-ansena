import React, {useState} from 'react';
import {StyleSheet, Text, View, Dimensions, Image} from 'react-native';
import Collapsible from 'react-native-collapsible';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import {ArrowDown, Crew, Star} from '../../assets';
import {fonts} from '../../utils/fonts';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const CrewList = () => {
  const [collapse, setCollapse] = useState(true);
  const crew = useSelector((state) => state.detailjob.crew);
  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <TouchableOpacity
        disabled={crew.length == 0 ? true : false}
        style={styles.btn}
        onPress={() => {
          setCollapse(!collapse);
        }}
        activeOpacity={0.9}>
        <View style={styles.left}>
          <Image source={Crew} style={styles.imgSize} />
          <Text style={{fontFamily: fonts.SFProDisplayMedium}}>Crew</Text>
        </View>
        <View>
          <View style={styles.right}>
            {crew.length == 0 ? (
              <Text style={{...styles.txtRight, marginRight: 20}}>
                {crew.length}
              </Text>
            ) : (
              <>
                <Text style={styles.txtRight}>{crew.length}</Text>
                <Image source={ArrowDown} style={styles.arrow} />
              </>
            )}
          </View>
        </View>
      </TouchableOpacity>
      <Collapsible collapsed={collapse}>
        <View style={{minHeight: 40, marginTop: 10}}>
          {crew &&
            crew.map(({status, name}, index) => {
              return (
                <View style={styles.listCrew} key={index}>
                  {status == 0 ? (
                    <Image style={styles.imgStar} />
                  ) : (
                    <Image source={Star} style={styles.imgStar} />
                  )}
                  <Text>{name}</Text>
                </View>
              );
            })}
        </View>
      </Collapsible>
    </View>
  );
};

export default CrewList;

const styles = StyleSheet.create({
  container: {
    minHeight: 60,
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
  listCrew: {flexDirection: 'row', alignItems: 'center', marginBottom: 15},
  imgStar: {height: 15, width: 15, marginRight: 25},
  txtRight: {
    fontFamily: fonts.SFProDisplayMedium,
    color: 'lightgrey',
  },
});
