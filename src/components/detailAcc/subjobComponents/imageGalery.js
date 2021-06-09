import React, {useState} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import Collapsible from 'react-native-collapsible';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import {ArrowDown, Image1} from '../../../assets';
import {colors} from '../../../utils/colors';
import {fonts} from '../../../utils/fonts';
import {API_URL} from '@env';

const ImageGalery = () => {
  const [collapseImgGalery, setCollapseImgGalery] = useState(true);
  const image = useSelector((state) => state.detailjob.image);
  return (
    <View style={styles.containerImgGalery}>
      <TouchableOpacity
        disabled={image.length === 0 ? true : false}
        onPress={() => {
          setCollapseImgGalery(!collapseImgGalery);
        }}
        style={styles.btnImgGalery}>
        <Text
          style={{
            fontFamily: fonts.SFProDisplayMedium,
            color: 'grey',
            fontSize: 16,
          }}>
          Image Galery
        </Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {image.length === 0 ? (
            <Text>{image.length}</Text>
          ) : (
            <>
              <Text>{image.length}</Text>
              <Image source={ArrowDown} style={styles.arrowImg} />
            </>
          )}
        </View>
      </TouchableOpacity>
      <Collapsible collapsed={collapseImgGalery}>
        <View style={styles.containerCollapseImgGalery}>
          <ScrollView horizontal={true}>
            {image &&
              image.map((item, index) => {
                let Image_Http_URL = {uri: `${item.url}`};
                return (
                  <Image
                    source={Image_Http_URL}
                    style={styles.imgSize}
                    key={index}
                  />
                );
              })}
          </ScrollView>
        </View>
      </Collapsible>
    </View>
  );
};

export default ImageGalery;

const styles = StyleSheet.create({
  containerImgGalery: {
    minHeight: 50,
    backgroundColor: colors.mainColor,
    borderRadius: 15,
    marginTop: 20,
    paddingHorizontal: 20,
  },
  btnImgGalery: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
  },
  imgSize: {
    height: 40,
    width: 40,
    borderRadius: 10,
    marginRight: 10,
  },
  arrowImg: {height: 10, width: 15, marginLeft: 10},
  containerCollapseImgGalery: {
    height: 50,
    marginVertical: 10,
  },
});
