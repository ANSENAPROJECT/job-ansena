import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {useSelector} from 'react-redux';
import {Assessor} from '../../assets';
import {fonts} from '../../utils/fonts';

const CoAssessor = () => {
  const assessor = useSelector((state) => state.detailjob.assessor);
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Image source={Assessor} style={styles.imgSize} />
        <Text style={{fontFamily: fonts.SFProDisplayMedium}}>Co-Assessor</Text>
      </View>
      <Text style={styles.right}>
        {assessor.length === 0 ? 'No Assessor' : assessor.name}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderRadius: 15,
    justifyContent: 'space-between',
    marginTop: 30,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imgSize: {
    height: 30,
    width: 30,
    marginRight: 10,
  },
  right: {
    color: 'lightgrey',
    fontFamily: fonts.SFProDisplayMedium,
  },
});

export default CoAssessor;
