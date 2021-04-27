import {StyleSheet, Dimensions} from 'react-native';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  titleRow: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  // Header styles
  containerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imgHeader: {
    height: 15,
    width: 20,
    marginRight: 8,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 100,
  },
  center: {
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  right: {
    width: 100,
    alignItems: 'flex-end',
  },
  txtColorBlue: {
    color: colors.badgeBlue,
    fontFamily: fonts.SFProDisplayBold,
    fontSize: 14,
    fontWeight: 'bold',
  },
  titletxt: {
    fontWeight: 'bold',
    fontSize: 20,
  },

  // code
  code: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    width: deviceWidth - 80,
    height: 60,
    marginTop: 20,
    alignItems: 'center',
  },
  txtCode: {
    fontWeight: 'bold',
    color: 'grey',
  },

  // titleInput
  titleinpt: {
    backgroundColor: 'white',
    height: 50,
    width: '100%',
    borderRadius: 20,
    paddingHorizontal: 20,
    justifyContent: 'center',
    marginTop: 20,
  },

  // approval
  containerApproval: {
    borderRadius: 20,
    backgroundColor: 'white',
    marginTop: 30,
  },
  rowApproval: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    height: 70,
    width: '100%',
    borderRadius: 20,
    paddingHorizontal: 20,
  },
  bodyCollapseApprov: {
    height: 200,
    width: '100%',
    borderRadius: 20,
    paddingHorizontal: 20,
  },
  circle: {
    marginRight: 10,
    borderWidth: 0.5,
    borderColor: 'grey',
    height: 15,
    width: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  btnSwitch: {
    height: 30,
    backgroundColor: colors.badgeGreen,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: deviceWidth - 80,
    marginBottom: 25,
  },
  rowDataApproval: {
    flexDirection: 'row',
    height: 30,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  purposeBox: {
    alignSelf: 'center',
    height: 200,
    backgroundColor: 'white',
    width: '100%',
    marginTop: 20,
    borderRadius: 20,
    padding: 20,
  },

  // Deadline
  containerDeadline: {
    ...styles.deadline,
    marginTop: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  deadline: {
    minHeight: 70,
    width: '100%',
    backgroundColor: 'white',
    paddingHorizontal: 20,
  },
  imgSize: {height: 35, width: 30, marginRight: 10},
  containerCalendar: {
    height: 300,
    width: deviceWidth - 30,
    backgroundColor: 'white',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  sideCalender: {
    height: '100%',
    marginLeft: 20,
    justifyContent: 'space-between',
  },
  btn: {
    height: 30,
    width: 90,
    backgroundColor: '#f2f3f8',
    borderRadius: 10,
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnDeadline: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  option: {
    height: 30,
    width: 90,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  line: {
    height: 2,
    width: '80%',
    backgroundColor: '#e0e0e0',
    borderRadius: 20,
    alignSelf: 'center',
  },

  collapseRow: {
    height: 80,
    width: '100%',
    marginBottom: 20,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  txtCollapseTime: {
    backgroundColor: '#f2f3f8',
    height: 50,
    width: 100,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 20,
    flexDirection: 'row',
    paddingHorizontal: 15,
  },
  rowSlider: {
    backgroundColor: '#f2f3f8',
    height: 50,
    width: 200,
    padding: 20,
    borderRadius: 20,
    justifyContent: 'center',
  },
  containerSlider: {
    height: 15,
  },
  track: {
    height: 2,
    backgroundColor: 'white',
  },
  thumb: {
    width: 10,
    height: 10,
    backgroundColor: '#31a4db',
    borderRadius: 10 / 2,
    shadowColor: 'white',
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 2,
    shadowOpacity: 1,
  },

  // add co assesor
  continerAddCoAssessor: {
    height: 60,
    width: deviceWidth - 40,
    backgroundColor: 'white',
    borderRadius: 20,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  imgArrow: {
    transform: [{rotate: '270deg'}],
    height: 15,
    width: 15,
    marginLeft: 10,
  },
  flexView: {flexDirection: 'row', alignItems: 'center'},

  switch: {
    height: 25,
    width: 45,
  },
  containerNote: {
    height: 200,
    width: deviceWidth - 40,
    backgroundColor: 'white',
    marginBottom: 30,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },

  //Remind Other
  containerRemind: {
    borderRadius: 20,
    backgroundColor: 'white',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  rowReminder: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    height: 70,
    width: '100%',
    borderRadius: 20,
  },
  containerRemindRow: {
    height: 100,
    width: '100%',
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  txtRemindOption: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  btnOptionRemind: {
    height: 30,
    width: 75,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // add Image
  containerAddImage: {
    minHeight: 60,
    width: deviceWidth - 40,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    marginBottom: 30,
    paddingVertical: 10,
    justifyContent: 'center',
  },
  rowImage: {
    height: 80,
    width: '100%',
    flexDirection: 'row',
  },

  //   Modal
  centeredView: {
    flex: 1,
    bottom: 0,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  modalView: {
    height: deviceHeight,
    width: deviceWidth,
    backgroundColor: colors.mainColor,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  containerScrollDataModal: {
    height: deviceHeight - 230,
    width: deviceWidth - 50,
    alignSelf: 'center',
    backgroundColor: 'white',
    marginTop: 40,
    borderRadius: 25,
    padding: 20,
  },
  headerData: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: colors.txtGrey,
    height: 35,
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  dataCoAdmin: {
    flex: 1,
  },
  listData: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    alignItems: 'center',
  },
  headerModal: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  txtTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  txtAdd: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.badgeBlue,
  },
  searchModal: {
    height: 50,
    width: deviceWidth - 50,
    borderRadius: 20,
    backgroundColor: colors.txtGrey,
    paddingHorizontal: 20,
    marginTop: 40,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  columnData: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  iconRadio: {height: 20, width: 20, marginLeft: 20},
  txtFooter: {
    color: colors.badgeBlue,
    fontWeight: 'bold',
    fontSize: 12,
  },
  iconCheck: {height: 15, width: 20, marginLeft: 20},

  //Modal Camera
  containerModalUpload: {
    flex: 1,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  viewStyled: {
    bottom: -20,
    height: 100,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: deviceWidth,
    backgroundColor: colors.mainColor,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
