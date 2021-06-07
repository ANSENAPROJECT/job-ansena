import React, {useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import Collapsible from 'react-native-collapsible';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {ArrowDown, CoAdmin, IconGalery, Remind} from '../../assets';
import {fonts} from '../../utils/fonts';
import {API_URL} from '@env';
import {useSelector} from 'react-redux';

const ImageGalery = () => {
  const [collapse, setCollapse] = useState(true);
  const image = useSelector((state) => state.detailjob.image);
  console.log('ini adalah data dari image', image);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        disabled={image.length == 0 ? true : false}
        activeOpacity={0.9}
        style={{flexDirection: 'row', justifyContent: 'space-between'}}
        onPress={() => {
          setCollapse(!collapse);
        }}>
        <View style={styles.left}>
          <Image source={IconGalery} style={styles.imgSize} />
          <Text style={{fontFamily: fonts.SFProDisplayMedium}}>
            Image Galery
          </Text>
        </View>
        <View style={styles.right}>
          {image.length == 0 ? (
            <Text style={{...styles.txtRight, marginRight: 20}}>
              {image.length}
            </Text>
          ) : (
            <>
              <Text style={styles.txtRight}>{image.length}</Text>
              <Image source={ArrowDown} style={styles.arrow} />
            </>
          )}
        </View>
      </TouchableOpacity>
      <Collapsible
        collapsed={collapse}
        style={{
          minHeight: 0,
        }}>
        <ScrollView
          nestedScrollEnabled
          horizontal={true}
          style={{marginTop: 10}}
          showsHorizontalScrollIndicator={false}>
          {image &&
            image.map((item, index) => {
              let Image_Http_URL = {uri: `${item.url}`};
              return (
                <Image
                  key={index}
                  style={styles.imgGalery}
                  source={Image_Http_URL}
                />
              );
            })}
        </ScrollView>
      </Collapsible>
    </View>
  );
};

export default ImageGalery;

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    minHeight: 40,
    backgroundColor: 'white',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 20,
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
  imgGalery: {height: 30, width: 30, marginRight: 10},
  txtRight: {
    fontFamily: fonts.SFProDisplayMedium,
    color: 'lightgrey',
  },
});
