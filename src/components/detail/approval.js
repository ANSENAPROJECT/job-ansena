import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {useSelector} from 'react-redux';
import {CoAdmin} from '../../assets';
import {fonts} from '../../utils/fonts';

const Approval = () => {
  const approval = useSelector((state) => state.detailjob.approval);

  const newApproval =
    approval &&
    approval.map((item) => {
      return item.approval;
    });
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Image source={CoAdmin} style={styles.imgSize} />
        <Text style={{fontFamily: fonts.SFProDisplayMedium}}>Approval</Text>
      </View>
      <Text style={styles.right}>{newApproval.join(' Then ')}</Text>
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
    marginTop: 10,
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

export default Approval;
