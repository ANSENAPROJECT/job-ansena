import React, {useState} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import Collapsible from 'react-native-collapsible';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import {ArrowDown, Star} from '../../../assets';
import {colors} from '../../../utils/colors';
import {fonts} from '../../../utils/fonts';

const Crew = () => {
  const [collapse, setCollapse] = useState(true);
  const crewList = useSelector((state) => state.detailjob.crew);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        disabled={crewList.length === 0 ? true : false}
        onPress={() => {
          setCollapse(!collapse);
        }}
        style={styles.btnCollapse}>
        <Text style={{fontFamily: fonts.SFProDisplayMedium, color: 'grey'}}>
          Crew
        </Text>
        {crewList.length === 0 ? (
          <Text>{crewList.length}</Text>
        ) : (
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text>{crewList.length}</Text>
            <Image source={ArrowDown} style={styles.imgArrow} />
          </View>
        )}
      </TouchableOpacity>
      <Collapsible collapsed={collapse}>
        <View style={styles.containerCollapse}>
          {crewList &&
            crewList.map(({status, name}) => {
              return (
                <>
                  <View style={styles.rowFlex}>
                    {status === 0 ? (
                      <Image style={styles.imgSize} />
                    ) : (
                      <Image source={Star} style={styles.imgSize} />
                    )}
                    <Text style={styles.textRow}>{name}</Text>
                  </View>
                </>
              );
            })}
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
  rowFlex: {flexDirection: 'row', alignItems: 'center', marginBottom: 10},
  imgSize: {height: 15, width: 15, marginRight: 10},
  textRow: {
    fontFamily: fonts.SFProDisplayMedium,
    color: 'grey',
  },
  imgArrow: {height: 10, width: 15, marginLeft: 10},
});
