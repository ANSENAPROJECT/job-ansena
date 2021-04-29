import React, {useState} from 'react';
import {Image} from 'react-native';
import {StyleSheet, Text, View} from 'react-native';
import Collapsible from 'react-native-collapsible';
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import {
  ArrowDown,
  ArrowDownBlue,
  ArrowDownWhite,
  ArrowUpRed,
  ArrowUpView,
  CoAdminView,
  CrewView,
  DateStart,
  DeadlineEnd,
  DeadlineStart,
  LeaderView,
  Subjob,
} from '../../assets';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';

const ActiveJobs = () => {
  const [collapse, setCollapse] = useState(true);
  const [collapseChild, setCollapseChild] = useState(true);
  const [collapseDeactive, setCollapseDeactive] = useState(true);
  return (
    <>
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          setCollapse(!collapse);
        }}>
        <Text style={styles.titleTxt}>Active Job Groups</Text>
        <Image source={ArrowUpView} style={styles.iconArrow} />
      </TouchableOpacity>
      <Collapsible collapsed={collapse}>
        <View
          style={{minHeight: 40, marginTop: 10}}
          showsVerticalScrollIndicator={false}>
          <View style={styles.containerCollapse}>
            <TouchableOpacity
              style={styles.titleCollapse}
              onPress={() => {
                setCollapseChild(!collapseChild);
              }}>
              <Text style={{fontFamily: fonts.SFProDisplayBold}}>Tim CEO</Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text
                  style={{
                    fontFamily: fonts.SFProDisplayMedium,
                    color: colors.badgeBlue,
                  }}>
                  active
                </Text>
                <Image source={ArrowDown} style={styles.iconArrowChild} />
              </View>
            </TouchableOpacity>
            <Collapsible collapsed={collapseChild}>
              <View style={{minHeight: 200, backgroundColor: 'white'}}>
                {/* Header */}
                <View style={styles.headerCollapse}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image source={Subjob} style={styles.imgSize} />
                    <Text style={styles.txtTitleCollapse}>Sub Jobs</Text>
                  </View>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={styles.txtTitleRight}>3 (2 active)</Text>
                    <Image
                      source={ArrowDownBlue}
                      style={styles.iconArrowRight}
                    />
                  </View>
                </View>
                {/* Body */}
                <View style={{marginTop: 20}}>
                  <View style={{...styles.flexJustify, marginBottom: 20}}>
                    <View style={{...styles.flexRow, flex: 1}}>
                      <Image source={DateStart} style={styles.imgSize} />
                      <Text>29 Jan 2021</Text>
                    </View>
                    <View style={{...styles.flexRow, flex: 1}}>
                      <Image source={CoAdminView} style={styles.imgSize} />
                      <Text>Gisela</Text>
                    </View>
                  </View>
                  <View style={{...styles.flexJustify, marginBottom: 20}}>
                    <View style={{...styles.flexRow, flex: 1}}>
                      <Image source={DeadlineStart} style={styles.imgSize} />
                      <Text>From 29 Jan</Text>
                    </View>
                    <View style={{...styles.flexRow, flex: 1}}>
                      <Image source={DeadlineEnd} style={styles.imgSize} />
                      <Text>Until 6 Feb</Text>
                    </View>
                  </View>
                  <View style={{...styles.flexJustify, marginBottom: 20}}>
                    <View style={{...styles.flexRow, flex: 1}}>
                      <Image source={CrewView} style={styles.imgSize} />
                      <Text>3 Crew</Text>
                    </View>
                    <View style={{...styles.flexRow, flex: 1}}>
                      <Image source={LeaderView} style={styles.imgSize} />
                      <Text>Angga</Text>
                    </View>
                  </View>
                </View>

                {/* Bottom */}
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={{
                    ...styles.btnBottom,
                    backgroundColor: colors.colorReportAcive,
                    alignItems: 'center',
                  }}>
                  <Text style={{...styles.txtWhite, color: 'white'}}>
                    Duplicate Job Group
                  </Text>
                  <Image
                    source={ArrowDownWhite}
                    style={{
                      ...styles.iconArrowChild,
                      transform: [{rotate: '-90deg'}],
                    }}
                  />
                </TouchableOpacity>

                <View
                  style={{
                    ...styles.btnDeactive,
                    backgroundColor: collapseDeactive
                      ? 'red'
                      : colors.mainColor,
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      setCollapseDeactive(!collapseDeactive);
                    }}
                    activeOpacity={0.8}
                    style={{
                      ...styles.flexJustify,
                      marginTop: 5,
                    }}>
                    <Text
                      style={{
                        ...styles.txtWhite,
                        color: collapseDeactive ? 'white' : 'red',
                      }}>
                      Deactive Job Group
                    </Text>
                    <Image
                      source={collapseDeactive ? ArrowDownWhite : ArrowUpRed}
                      style={{
                        ...styles.iconArrowChild,
                      }}
                    />
                  </TouchableOpacity>
                  <Collapsible collapsed={collapseDeactive}>
                    <View style={styles.containerCollapseDeactive}>
                      <View style={styles.formInput}>
                        <TextInput placeholder="Deactivate Notes" multiline />
                      </View>
                      <TouchableOpacity style={styles.submitDeactive}>
                        <Text
                          style={{
                            color: 'white',
                            fontFamily: fonts.SFProDisplayMedium,
                          }}>
                          Deactivate Job Group
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </Collapsible>
                </View>
              </View>
            </Collapsible>
          </View>
        </View>
      </Collapsible>
    </>
  );
};

export default ActiveJobs;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  titleTxt: {
    fontFamily: fonts.SFProDisplayHeavy,
    color: 'grey',
    fontSize: 20,
  },
  iconArrow: {height: 10, width: 15},
  containerCollapse: {
    minHeight: 60,
    backgroundColor: 'white',
    borderRadius: 15,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  iconArrowChild: {height: 10, width: 15, marginLeft: 10},
  titleCollapse: {
    flexDirection: 'row',
    alignItems: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 17,
  },
  headerCollapse: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imgSize: {height: 30, width: 30, marginRight: 10},
  txtTitleCollapse: {
    fontFamily: fonts.SFProDisplayBold,
    color: 'grey',
  },
  txtTitleRight: {
    fontFamily: fonts.SFProDisplayMedium,
    color: 'grey',
  },
  iconArrowRight: {
    height: 10,
    width: 15,
    marginLeft: 10,
    transform: [{rotate: '90deg'}],
  },
  flexJustify: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnBottom: {
    minHeight: 40,
    flexDirection: 'row',
    borderRadius: 15,
    marginBottom: 20,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  txtWhite: {
    fontFamily: fonts.SFProDisplayMedium,
  },
  btnDeactive: {
    minHeight: 40,
    borderRadius: 15,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  formInput: {
    height: 100,
    borderRadius: 15,
    backgroundColor: 'white',
    paddingHorizontal: 10,
  },
  submitDeactive: {
    height: 30,
    backgroundColor: 'red',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  containerCollapseDeactive: {
    height: 170,
    marginTop: 10,
  },
});
