import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {fonts} from '../../utils/fonts';

const Purpose = () => {
  const purpose = useSelector((state) => state.detailjob.purpose);
  return (
    <View style={styles.container}>
      <Text style={{fontFamily: fonts.SFProDisplayMedium}}>Purpose</Text>
      <View style={styles.body}>
        <Text style={styles.txtPurpose}>
          {purpose.length === 0 ? 'No Purpose' : purpose}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 100,
    borderRadius: 15,
    backgroundColor: 'white',
    marginTop: 30,
    padding: 20,
  },

  txtPurpose: {
    color: 'grey',
    marginTop: 10,
  },
});

export default Purpose;
