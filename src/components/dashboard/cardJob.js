import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import {ArrowDown} from '../../assets';
import {useSelector} from 'react-redux';
import {colors} from '../../utils/colors';
import {API_URL} from '@env';
import {useIsFocused} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const CardJob = ({navigation}) => {
  const idUser = useSelector((state) => state.auth.idUser);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (navigation === undefined) {
      getData();
    } else {
      const unsubscribe = navigation.addListener('focus', () => {
        getData();
      });
      return unsubscribe;
    }
  }, [navigation, isFocused]);

  useEffect(() => {
    getData();
    return () => {
      getData();
    };
  }, [jobList, isFocused]);

  const [jobList, setJobList] = useState([]);

  const getData = () => {
    axios
      .get(`${API_URL}/jzl/api/api/getListIndex/${idUser}`)
      .then((res) => {
        // console.log(res);
        let i = '';
        for (let j = 0; j < 4 - res.data.result.length; j++) {
          i += '0';
        }
        const allData = res.data.result.concat(i.split(''));
        // console.log(allData);
        setJobList(allData);
      })
      .catch(({response}) => {
        console.log(response);
      });
  };

  return (
    <ScrollView style={styles.containerAi} nestedScrollEnabled>
      <Text style={{fontSize: 20, marginBottom: 20}}>Job</Text>
      {jobList &&
        jobList.map(
          (
            {
              idJobGroup,
              subjobId,
              subjob,
              status,
              priorityStatus,
              title,
              deadline,
              isAdmin,
              isCoadmin,
              isAssessor,
              isUser,
            },
            index,
          ) => {
            // Condition status badge
            let badge;
            if (isAdmin == 1) {
              if (
                (status >= 1 && status <= 3) ||
                status == 62 ||
                status == 63
              ) {
                badge = (
                  <View
                    style={
                      status
                        ? {
                            ...styles.badgefill,
                            backgroundColor: colors.badgeGreen,
                          }
                        : null
                    }
                  />
                );
              } else if ((priorityStatus == 1 && status == 4) || status == 61) {
                badge = (
                  <View
                    style={
                      status
                        ? {
                            ...styles.badgefill,
                            backgroundColor: colors.badgeYellow,
                          }
                        : null
                    }
                  />
                );
              } else if ((priorityStatus == 0 && status == 4) || status == 61) {
                badge = (
                  <View
                    style={
                      status
                        ? {
                            ...styles.badgefill,
                            backgroundColor: colors.badgeBlue,
                          }
                        : null
                    }
                  />
                );
              } else if (status == 6) {
                badge = (
                  <View
                    style={
                      status
                        ? {
                            ...styles.badgefill,
                            backgroundColor: colors.badgeBlue,
                          }
                        : null
                    }
                  />
                );
              } else if (status == 8) {
                badge = (
                  <View
                    style={
                      status
                        ? {
                            ...styles.badgeOutline,
                            borderColor: colors.badgeRed,
                          }
                        : null
                    }
                  />
                );
              } else {
                badge = (
                  <View
                    style={
                      status
                        ? {
                            ...styles.badgeOutline,
                            borderColor: colors.badgeRed,
                          }
                        : null
                    }
                  />
                );
              }
            } else if (isCoadmin == 1) {
              if (status == 1 || status == 2) {
                badge = (
                  <View
                    style={
                      status
                        ? {
                            ...styles.badgefill,
                            backgroundColor: colors.badgeGreen,
                          }
                        : null
                    }
                  />
                );
              } else if (
                (priorityStatus == 1 && status == 3) ||
                (priorityStatus == 1 && status == 62)
              ) {
                badge = (
                  <View
                    style={
                      status
                        ? {
                            ...styles.badgefill,
                            backgroundColor: colors.badgeYellow,
                          }
                        : null
                    }
                  />
                );
              } else if (
                (priorityStatus == 0 && status == 3) ||
                (priorityStatus == 0 && status == 62)
              ) {
                badge = (
                  <View
                    style={
                      status
                        ? {
                            ...styles.badgefill,
                            backgroundColor: colors.badgeBlue,
                          }
                        : null
                    }
                  />
                );
              } else if (priorityStatus == 1 && status == 4) {
                badge = (
                  <View
                    style={
                      status
                        ? {
                            ...styles.badgeOutline,
                            borderColor: colors.badgeYellow,
                          }
                        : null
                    }
                  />
                );
              } else if (priorityStatus == 0 && status == 4) {
                badge = (
                  <View
                    style={
                      status
                        ? {
                            ...styles.badgeOutline,
                            borderColor: colors.badgeBlue,
                          }
                        : null
                    }
                  />
                );
              } else if (status == 5) {
                badge = (
                  <View
                    style={
                      status
                        ? {
                            ...styles.badgeOutline,
                            borderColor: colors.badgeRed,
                          }
                        : null
                    }
                  />
                );
              } else if (status == 63 || status == 61) {
                badge = (
                  <View
                    style={
                      status
                        ? {
                            ...styles.badgefill,
                            backgroundColor: colors.badgeGreen,
                          }
                        : null
                    }
                  />
                );
              } else if (status == 6) {
                badge = (
                  <View
                    style={
                      status
                        ? {
                            ...styles.badgefill,
                            backgroundColor: colors.badgeGreen,
                          }
                        : null
                    }
                  />
                );
              } else if (status == 8) {
                badge = (
                  <View
                    style={
                      status
                        ? {
                            ...styles.badgeOutline,
                            borderColor: colors.badgeRed,
                          }
                        : null
                    }
                  />
                );
              }
            } else if (isAssessor == 1) {
              if (status == 1) {
                badge = (
                  <View
                    style={
                      status
                        ? {
                            ...styles.badgefill,
                            backgroundColor: colors.badgeGreen,
                          }
                        : null
                    }
                  />
                );
              } else if (
                (priorityStatus == 1 && status == 2) ||
                (priorityStatus == 1 && status == 63)
              ) {
                badge = (
                  <View
                    style={
                      status
                        ? {
                            ...styles.badgefill,
                            backgroundColor: colors.badgeYellow,
                          }
                        : null
                    }
                  />
                );
              } else if (
                (priorityStatus == 0 && status == 2) ||
                (priorityStatus == 0 && status == 63)
              ) {
                badge = (
                  <View
                    style={
                      status
                        ? {
                            ...styles.badgefill,
                            backgroundColor: colors.badgeBlue,
                          }
                        : null
                    }
                  />
                );
              } else if (
                (priorityStatus == 1 && status == 4) ||
                (priorityStatus == 1 && status == 3)
              ) {
                badge = (
                  <View
                    style={
                      status
                        ? {
                            ...styles.badgeOutline,
                            borderColor: colors.badgeYellow,
                          }
                        : null
                    }
                  />
                );
              } else if (
                (priorityStatus == 0 && status == 4) ||
                (priorityStatus == 0 && status == 3)
              ) {
                badge = (
                  <View
                    style={
                      status
                        ? {
                            ...styles.badgeOutline,
                            borderColor: colors.badgeBlue,
                          }
                        : null
                    }
                  />
                );
              } else if (status == 5) {
                badge = (
                  <View
                    style={
                      status
                        ? {
                            ...styles.badgeOutline,
                            borderColor: colors.badgeRed,
                          }
                        : null
                    }
                  />
                );
              } else if (status == 61 || status == 62) {
                badge = (
                  <View
                    style={
                      status
                        ? {
                            ...styles.badgefill,
                            backgroundColor: colors.badgeGreen,
                          }
                        : null
                    }
                  />
                );
              } else if (status == 6) {
                badge = (
                  <View
                    style={
                      status
                        ? {
                            ...styles.badgefill,
                            backgroundColor: colors.badgeGreen,
                          }
                        : null
                    }
                  />
                );
              } else if (status == 8) {
                badge = (
                  <View
                    style={
                      status
                        ? {
                            ...styles.badgeOutline,
                            borderColor: colors.badgeRed,
                          }
                        : null
                    }
                  />
                );
              }
            } else {
              if (
                (priorityStatus == 1 && status == 1) ||
                (priorityStatus == 1 && status == 61) ||
                (priorityStatus == 1 && status == 62) ||
                (priorityStatus == 1 && status == 63)
              ) {
                badge = (
                  <View
                    style={
                      status
                        ? {
                            ...styles.badgefill,
                            backgroundColor: colors.badgeYellow,
                          }
                        : null
                    }
                  />
                );
              } else if (
                (priorityStatus == 0 && status == 1) ||
                (priorityStatus == 0 && status == 61) ||
                (priorityStatus == 0 && status == 62) ||
                (priorityStatus == 0 && status == 63)
              ) {
                badge = (
                  <View
                    style={
                      status
                        ? {
                            ...styles.badgefill,
                            backgroundColor: colors.badgeBlue,
                          }
                        : null
                    }
                  />
                );
              } else if (
                (priorityStatus == 1 && status == 2) ||
                (priorityStatus == 1 && status == 3) ||
                (priorityStatus == 1 && status == 4)
              ) {
                badge = (
                  <View
                    style={
                      status
                        ? {
                            ...styles.badgeOutline,
                            borderColor: colors.badgeYellow,
                          }
                        : null
                    }
                  />
                );
              } else if (
                (priorityStatus == 0 && status == 2) ||
                (priorityStatus == 0 && status == 3) ||
                (priorityStatus == 0 && status == 4)
              ) {
                badge = (
                  <View
                    style={
                      status
                        ? {
                            ...styles.badgeOutline,
                            borderColor: colors.badgeBlue,
                          }
                        : null
                    }
                  />
                );
              } else if (status == 5) {
                badge = (
                  <View
                    style={
                      status
                        ? {
                            ...styles.badgefill,
                            backgroundColor: colors.badgeRed,
                          }
                        : null
                    }
                  />
                );
              } else if (status == 6) {
                badge = (
                  <View
                    style={
                      status
                        ? {
                            ...styles.badgefill,
                            backgroundColor: colors.badgeGreen,
                          }
                        : null
                    }
                  />
                );
              } else if (status == 8) {
                badge = (
                  <View
                    style={
                      status
                        ? {
                            ...styles.badgefill,
                            backgroundColor: colors.badgeRed,
                          }
                        : null
                    }
                  />
                );
              }
            }
            //End of Condition status badge

            return (
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.rowContainer}
                key={index}
                onPress={() => {
                  navigation.push(
                    isAdmin == 1
                      ? 'detailadmin'
                      : isCoadmin == 1
                      ? 'detailadmin'
                      : isAssessor == 1
                      ? 'detailadmin'
                      : 'detailuser',
                    subjobId,
                  );
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      width: '70%',
                      alignItems: 'center',
                    }}>
                    <Text>{index + 1}</Text>
                    {badge}
                    <View style={{height: 40, justifyContent: 'space-between'}}>
                      <Text
                        style={{fontWeight: '400'}}
                        ellipsizeMode="tail"
                        numberOfLines={1}
                        style={{width: 120}}>
                        {title}
                      </Text>
                      <Text style={{fontSize: 10, fontWeight: '300'}}>
                        {deadline == 0 ? null : deadline}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{fontSize: 10, width: 60}}
                      ellipsizeMode="tail"
                      numberOfLines={1}>
                      {subjob}
                    </Text>
                    <Image source={ArrowDown} style={styles.arrow} />
                  </View>
                </View>
                <View style={styles.underline} />
              </TouchableOpacity>
            );
          },
        )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  containerAi: {
    minHeight: 350,
    maxHeight: 350,
    width: 343,
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
    marginTop: 25,
    padding: 20,
  },
  arrow: {
    height: 10,
    width: 10,
    transform: [{rotate: '270deg'}],
    marginLeft: 10,
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
    justifyContent: 'center',
    marginBottom: 20,
  },
  badgeOutline: {
    height: 13,
    width: 25,
    borderRadius: 5,
    borderWidth: 3,
    borderColor: 'yellow',
    marginLeft: 20,
    marginRight: 20,
  },
  badgefill: {
    height: 13,
    width: 25,
    borderRadius: 5,
    marginLeft: 20,
    marginRight: 20,
  },
});

export default CardJob;
