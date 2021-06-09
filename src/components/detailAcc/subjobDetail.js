import React, {useState} from 'react';
import {Modal} from 'react-native';
import {StyleSheet, Text, View, Image} from 'react-native';
import Collapsible from 'react-native-collapsible';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import {
  ArrowDown,
  ArrowDownBlue,
  ArrowDownWhite,
  Image1,
  Star,
  Subjob,
} from '../../assets';
import ImageViewer from 'react-native-image-zoom-viewer';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';
import Approval from './subjobComponents/approval';
import CoAssessor from './subjobComponents/coAssessor';
import Crew from './subjobComponents/crew';
import DuplicateJob from './subjobComponents/duplicateJob';
import ImageGalery from './subjobComponents/imageGalery';
import Purpose from './subjobComponents/purpose';
import Remind from './subjobComponents/remind';

const SubjobDetail = () => {
  //porpose
  const [collapse, setCollapse] = useState(true);
  const purpose = useSelector((state) => state.detailjob.purpose);

  //Image galery
  const [collapseImgGalery, setCollapseImgGalery] = useState(true);
  const image = useSelector((state) => state.detailjob.image);
  const [imgView, setImgView] = useState('');
  const [visible, setIsVisible] = useState(false);


  //Crew
  

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.flexRow}
        onPress={() => {
          setCollapse(!collapse);
        }}>
        <View style={styles.left}>
          <Image source={Subjob} style={styles.imgSize} />
          <Text style={styles.txtTitle}>Sub Job Detail</Text>
        </View>
        <Image source={ArrowDown} style={styles.arrowSize} />
      </TouchableOpacity>
      <Collapsible collapsed={collapse}>
        <View style={styles.containerCollapse}>
          {/* Purpose */}
          <View style={styles.containerPurpose}>
            <Text style={styles.titlePurpose}>Purpose</Text>
            <Text style={styles.rowTxtPurpose}>{purpose}</Text>
          </View>

          {/* ImageGalery */}
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
                      let imgUrl = {uri: `${item.url}`};
                      return (
                        <TouchableOpacity
                          onPress={() => {
                            // alert(item.url);
                            setImgView(item.url);
                            setIsVisible(true);
                          }}>
                          <Image
                            source={imgUrl}
                            style={styles.imgSize}
                            key={index}
                          />
                        </TouchableOpacity>
                      );
                    })}
                </ScrollView>
              </View>
            </Collapsible>
          </View>

          <Crew />
          <Remind />
          <CoAssessor />
          <Approval />
          <DuplicateJob />
        </View>
      </Collapsible>

      <Modal visible={visible} transparent={true}>
        <ImageViewer
          enableSwipeDown={true}
          useNativeDriver
          imageUrls={[{url: imgView}]}
          onSwipeDown={() => {
            setIsVisible(false);
          }}
        />
      </Modal>
    </View>
  );
};

export default SubjobDetail;

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    backgroundColor: 'white',
    minHeight: 60,
    borderRadius: 15,
    paddingHorizontal: 20,
  },
  flexRow: {
    flexDirection: 'row',
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imgSize: {height: 30, width: 30, marginRight: 10},
  txtTitle: {
    fontFamily: fonts.SFProDisplayMedium,
    color: 'grey',
    fontSize: 16,
  },
  arrowSize: {height: 10, width: 15},
  containerCollapse: {
    minHeight: 150,
    backgroundColor: 'white',
    paddingVertical: 20,
  },

  //Purpose
  containerPurpose: {
    minHeight: 50,
    backgroundColor: colors.mainColor,
    borderRadius: 15,
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  titlePurpose: {
    fontFamily: fonts.SFProDisplayMedium,
    color: 'grey',
    fontSize: 16,
    marginBottom: 10,
  },
  rowTxtPurpose: {
    fontFamily: fonts.SFProDisplayMedium,
    color: 'grey',
    fontSize: 14,
    marginBottom: 10,
  },

  //Image galery
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
