import React from 'react';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import {ArrowDown} from '../assets';

const CardAI = () => {
  return (
    <ScrollView style={styles.containerAi} nestedScrollEnabled>
      <Text style={{fontSize: 20, marginBottom: 20}}>Ai</Text>
      <View style={styles.rowContainer}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text>1. </Text>
          <Image source={ArrowDown} style={styles.arrow} />
        </View>
        <View style={styles.underline} />
      </View>
      <View style={styles.rowContainer}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text>2. </Text>
          <Image source={ArrowDown} style={styles.arrow} />
        </View>
        <View style={styles.underline} />
      </View>
      <View style={styles.rowContainer}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text>3. </Text>
          <Image source={ArrowDown} style={styles.arrow} />
        </View>
        <View style={styles.underline} />
      </View>
      <View style={styles.rowContainer}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text>4. </Text>
          <Image source={ArrowDown} style={styles.arrow} />
        </View>
        <View style={styles.underline} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  containerAi: {
    minHeight: 300,
    maxHeight: 300,
    width: 343,
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
    marginTop: 25,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  arrow: {
    height: 10,
    width: 10,
    transform: [{rotate: '270deg'}],
  },
  underline: {
    borderWidth: 0.7,
    borderColor: '#eaeaea',
    marginTop: 10,
    width: 285,
    marginLeft: 10,
  },
  rowContainer: {
    width: '100%',
    marginBottom: 30,
  },
});

export default CardAI;
