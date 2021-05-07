import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {colors} from '../../../utils/colors';
import {fonts} from '../../../utils/fonts';

const CoAssessor = () => {
  const assessor = useSelector((state) => state.detailjob.assessor);
  const name = useSelector((state) => state.auth.name);
  return (
    <View style={styles.container}>
      <Text style={styles.txt}>Co-Assessor</Text>
      <Text style={{...styles.txt, color: 'white', fontSize: 14}}>
        {assessor.length === 0
          ? 'No Co-Assessor'
          : assessor.name === name
          ? 'You'
          : assessor.name}
      </Text>
    </View>
  );
};

export default CoAssessor;

const styles = StyleSheet.create({
  container: {
    height: 50,
    backgroundColor: colors.mainColor,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  txt: {
    color: colors.yellow,
    fontFamily: fonts.SFProDisplayMedium,
    fontSize: 16,
  },
});
