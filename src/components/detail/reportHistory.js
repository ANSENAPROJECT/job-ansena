import React, {useState} from 'react';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import Collapsible from 'react-native-collapsible';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import {ArrowDown, ReportActive, ReportDefault} from '../../assets';
import {fonts} from '../../utils/fonts';

const ReportHistory = () => {
  const [collapse, setCollapse] = useState(true);
  const reportHistory = useSelector((state) => state.detailjob.reportHistory);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        disabled={reportHistory == 0 ? true : false}
        style={styles.rowTitle}
        onPress={() => {
          setCollapse(!collapse);
        }}>
        <View style={styles.left}>
          <Image source={ReportActive} style={styles.imgSize} />
          <Text style={{fontFamily: fonts.SFProDisplayMedium}}>
            Report History
          </Text>
        </View>
        <View style={styles.right}>
          {/* <Text style={styles.txtColor}>None Reported</Text> */}
          {reportHistory.length == 0 ? (
            <Text style={{...styles.txtTitleRight, marginRight: 20}}>
              {reportHistory.length}
            </Text>
          ) : (
            <>
              <Text style={styles.txtTitleRight}>
                {reportHistory.length} x Reported
              </Text>
              <Image source={ArrowDown} style={{height: 10, width: 15}} />
            </>
          )}
        </View>
      </TouchableOpacity>
      <Collapsible collapsed={collapse}>
        <View style={styles.containerCollapse}>
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={reportHistory}
            renderItem={({item, index}) => {
              return (
                <View style={styles.rowCollapse}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{...styles.txtReport, marginRight: 20}}>
                      {index + 1}
                    </Text>
                    <Text
                      style={styles.txtReportDetail}
                      ellipsizeMode="tail"
                      numberOfLines={1}>
                      {item.status}
                    </Text>
                  </View>
                  <Text style={{...styles.txtReport, marginRight: 15}}>
                    {item.deadline}
                  </Text>
                </View>
              );
            }}
          />
        </View>
      </Collapsible>
    </View>
  );
};

export default ReportHistory;

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    minHeight: 60,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: 'white',
  },
  rowTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center',
    height: 60,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imgSize: {height: 30, width: 30, marginRight: 10},
  txtColor: {
    color: 'lightgrey',
    fontFamily: fonts.SFProDisplayMedium,
  },
  txtReport: {
    color: 'grey',
    fontWeight: 'bold',
  },
  txtReportDetail: {
    color: 'grey',
    fontWeight: 'bold',
    maxWidth: 150,
  },
  containerCollapse: {minHeight: 40, paddingHorizontal: 30},
  txtTitleRight: {
    color: 'lightgrey',
    marginRight: 10,
    fontFamily: fonts.SFProDisplayMedium,
  },
  rowCollapse: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
