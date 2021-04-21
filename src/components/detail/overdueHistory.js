import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  FlatList,
} from 'react-native';
import Collapsible from 'react-native-collapsible';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import {ArrowDown, ArrowRed, OverdueActive, OverdueDefault} from '../../assets';
import {fonts} from '../../utils/fonts';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const OverdueHistory = () => {
  const [collapse, setCollapse] = useState(true);

  const overdueHistory = useSelector((state) => state.detailjob.overdueHistory);

  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <TouchableOpacity
        disabled={overdueHistory.length == 0 ? true : false}
        style={styles.rowContainer}
        onPress={() => {
          setCollapse(!collapse);
        }}>
        <View style={styles.left}>
          <Image source={OverdueActive} style={styles.imgSize} />
          <Text style={{fontFamily: fonts.SFProDisplayMedium}}>
            Overdue History
          </Text>
        </View>
        <View style={styles.right}>
          {overdueHistory.length == 0 ? (
            <Text style={{...styles.noOverdue, marginRight: 20}}>
              No Overdue
            </Text>
          ) : (
            <>
              <Text style={styles.overdue}>
                {overdueHistory.length} x (
                {overdueHistory[overdueHistory.length - 1].date_start})
              </Text>
              <View style={styles.dot} />
              <Image source={ArrowDown} style={{height: 10, width: 15}} />
            </>
          )}
        </View>
      </TouchableOpacity>
      <Collapsible collapsed={collapse}>
        <View style={{minHeight: 70}}>
          <FlatList
            style={{minHeight: 100}}
            data={overdueHistory}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => {
              return (
                <>
                  <View style={styles.rowCollapse}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Text style={styles.collapseLeft}>{item.date_start}</Text>
                      <Image source={ArrowRed} style={styles.arrowStyle} />
                    </View>
                    <Text style={styles.collapseRight}>{item.date_end}</Text>
                  </View>
                </>
              );
            }}
          />
        </View>
      </Collapsible>
    </View>
  );
};

export default OverdueHistory;

const styles = StyleSheet.create({
  container: {
    minHeight: 60,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    backgroundColor: 'white',
    marginBottom: 30,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  line: {
    height: 2,
    width: deviceWidth - 150,
    backgroundColor: 'lightgrey',
    alignSelf: 'center',
    borderRadius: 20,
  },
  imgSize: {height: 30, width: 30, marginRight: 10},
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  noOverdue: {fontFamily: fonts.SFProDisplayMedium, color: 'lightgrey'},
  overdue: {
    fontFamily: fonts.SFProDisplayMedium,
    color: 'lightgrey',
    marginRight: 10,
  },
  dot: {
    height: 5,
    width: 5,
    borderRadius: 10,
    backgroundColor: 'red',
    marginRight: 10,
  },
  rowCollapse: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 250,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  arrowStyle: {height: 10, width: 15, marginLeft: 10},
  collapseLeft: {color: 'red', fontFamily: fonts.SFProDisplaySemiBold},
  collapseRight: {
    color: 'lightgrey',
    fontFamily: fonts.SFProDisplaySemiBold,
  },
});
