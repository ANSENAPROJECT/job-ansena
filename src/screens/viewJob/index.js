import React, {useState} from 'react';
import {Image} from 'react-native';
import {StyleSheet, Text, View} from 'react-native';
import Collapsible from 'react-native-collapsible';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {SortBtn} from '../../assets';
import Header from '../../components/detail/header';
import {fonts} from '../../utils/fonts';

const ViewJob = ({navigation}) => {
  const [collapse, setCollapse] = useState(true);
  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text style={{fontFamily: fonts.SFProDisplayHeavy, fontSize: 24}}>
          View Job Groups
        </Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() => {
              setCollapse(!collapse);
            }}>
            <Image source={SortBtn} style={{height: 15, width: 15}} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={SortBtn}
              style={{height: 15, width: 15, marginLeft: 10}}
            />
          </TouchableOpacity>
        </View>
      </View>
      <Collapsible collapsed={collapse}>
        <View
          style={{
            marginTop: 10,
            height: 200,
            backgroundColor: 'white',
            borderRadius: 15,
          }}></View>
      </Collapsible>
    </View>
  );
};

export default ViewJob;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});
