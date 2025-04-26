import {StyleSheet,Dimensions} from 'react-native';
import {moderateScale,scale,verticalScale} from 'react-native-size-matters';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const HomeStyle = StyleSheet.create({
    HomSubNullView: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },
    HomSubNullItem: {
        backgroundColor: 'transparent',
    },
    HomSubNullIcon: {
        marginBottom: 10,
        color: '#292929',
    },
    HomViewTabNull: {
        paddingTop: 30,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    HomViewIcon: {
        marginBottom: 20,
    },
    HomViewTabNullText: {
        fontFamily: 'Lato-Regular',
        fontWeight: '600',
        fontSize: moderateScale(13),
        color: 'grey',
        marginBottom: 30,
    },
    HomSafeArea: {
        flex: 1,
        display: 'flex',
        backgroundColor: '#fff'
    },
    HomViewTop: {
        width: '100%',
        height: '100%',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
    },
    HomViewTopCon: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    HomViewBaseLeftBar: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        height: moderateScale(30),
        width: '100%',
        paddingHorizontal: 30,
        paddingBottom: 5,
    },
    HomViewBaseLeftBarText: {
        fontFamily: 'Lato-Bold',
        fontWeight: '800',
        fontSize: moderateScale(15),
        color: '#000',
    },
    HomViewBase: {
        width: '95%',
        backgroundColor: '#f1f3f6',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginBottom: 20
    },
    HomViewBaseTop: {
        width: '100%',
        height: moderateScale(100),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    HomViewImg: {
        width: moderateScale(80),
        height: moderateScale(80),
        resizeMode: 'contain',
        marginHorizontal: 5,
    },
    HomViewOrdCol: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        flex: 1
    },
    HomViewOrdColBigText: {
        fontFamily: 'Lato-Regular',
        fontWeight: '600',
        fontSize: moderateScale(14),
        color: '#000',
        marginBottom: 8
    },
    HomViewOrdColChild: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    HomViewOrdColBigSmall: {
        fontFamily: 'Lato-Regular',
        fontWeight: '400',
        fontSize: moderateScale(11),
        color: '#000',
        marginVertical: 2,
    },
    HomViewOrdRow: {
        width: moderateScale(80),
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    HomViewBaseBase: {
        width: '100%',
        height: moderateScale(40),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20
    },
    HomViewBaseBaseRow: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        height: '100%'
    },
    HomViewBaseBaseIcon: {
        fontSize: moderateScale(15),
        marginRight: 4,
    },
    HomViewBaseBaseText: {
        fontFamily: 'Lato-Regular',
        fontWeight: '600',
        fontSize: moderateScale(12),
    },
    HomViewText: {
        fontFamily: 'Lato-Regular',
        fontWeight: '600',
        fontSize: moderateScale(11),
        color: '#000',
        marginVertical: 3
    },
    HomViewTextSmall: {
        fontFamily: 'Lato-Regular',
        fontWeight: '400',
        fontSize: moderateScale(11),
        color: '#000',
        marginVertical: 3
    },
    HomAccPressable: {
        backgroundColor: '#fff',
        borderRadius: 20,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: moderateScale(30),
        height: moderateScale(35),
        borderWidth: 1,
        borderColor: '#676767'
    },
    HomAccPressableText: {
        fontFamily: 'Lato-Regular',
        fontWeight: '600',
        fontSize: moderateScale(11),
        color: '#676767',
    },
    HomAddView: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingHorizontal: 30,
        paddingVertical: 10,
    },
    HomAddViewBigText:{
        fontFamily: 'Lato-Bold',
        fontWeight: '600',
        fontSize: moderateScale(15),
        color: '#000',
        marginVertical: 5
    },
    HomAddViewMidText:{
        fontFamily: 'Lato-Regular',
        fontWeight: '400',
        fontSize: moderateScale(13),
        color: '#000',
        marginVertical: 5
    },

});
export default HomeStyle; 