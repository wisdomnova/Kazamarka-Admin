import React,{useEffect,useState,useCallback} from 'react';
import axios from 'axios';
import {SafeAreaView,ScrollView,View,Text,Image,Animated,Easing,RefreshControl} from 'react-native';
import Ripple from 'react-native-material-ripple';
import {useNetInfo} from '@react-native-community/netinfo';
import database from '@react-native-firebase/database';
import HomeStyle from '../../styles/stylesheet';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {IconOutline} from '@ant-design/icons-react-native';
import {moderateScale} from 'react-native-size-matters';
const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout)); 
}
const ProcessingOrders = ({navigation}) => {
  const network = useNetInfo();
  const [routeid, SetRouteId] = useState(false);
  const [routeorders] = useState([]);
  const [routeorders_shipped] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [display, SetDisplay] = useState(false);
  const spinValue = new Animated.Value(0);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => {setRefreshing(false)});
  }, []);
  Animated.loop(
    Animated.timing(spinValue,{
      toValue: 1,
      duration: 1500,
      easing: Easing.linear,
      useNativeDriver: true,
      delay: 0,
    })).start();
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });
  const OrdersList = () => {
    const getparams = {method: 'get',url: 'https://x8ki-letl-twmt.n7.xano.io/api:oCjr8IaJ/get-orders'};
    axios(getparams)
    .then(function(res){
      routeorders.length = 0;
      routeorders_shipped.length = 0;
      var ordersList = res.data.ordersArray;
      if(ordersList.length){
        SetRouteId(ordersList);
        FetchUsers(ordersList);
      }else{
        SetDisplay(true);
      }
    })
    .catch(function(err){
      console.log(err);
      return false;
    });
  };
  const FetchUsers = (dat) => {
    dat.map((item)=>{
      var itemId = item.user_id;
      database()
      .ref('/users/'+itemId+'')
      .once('value')
      .then(snapshot => {
        var vals = snapshot.val(),
        orders_processing = vals.orders_processing,
        orders_shipped = vals.orders_shipped;
        routeorders.push(orders_processing);
        routeorders_shipped.push(orders_shipped);
        SetDisplay(true);
      });
    });
  };
  const AcceptOrder = (req,res,dat) => {
    var sentorder = req.id, sentorderId = res.OrderId,
    routefilter = routeorders.map((elt)=>{
      elt.forEach((element,index)=>{
        var elm = element.Product, elmId = element.OrderId;
        if(sentorderId === elmId){
          var resitm = elm.filter((itm)=>{
            return itm.id !== sentorder;
          });
          var rerouteorders = routeorders[dat][index].Product; 
          var addressId = "";
          if(rerouteorders.length >1){
            routeorders[dat][index].Product = resitm;
            addressId = routeorders[dat][index].OrderAddressId;
          }else{
            routeorders[dat].splice(index,index);
          }
          CreateProcessing(res,req,addressId,dat);
        }
      });
    });
  };
  const CreateProcessing = (rar,res,rad,index) => {
    var orderDate = new Date(), m = orderDate.toLocaleString('default',{month:'short'}), d = orderDate.getDate(), y = orderDate.getFullYear(), fullDate = d+" "+m+", "+y;
    var orderId = rar.OrderId, orderHalf = {"OrderId": orderId, "OrderDate": fullDate, "OrderAddressId": rad, "Product": [{"id": res.id, "price": res.price, "qty": res.qty, "size": res.size, "image": res.image, "name": res.name}]};
    routeorders_shipped[index].push(orderHalf);
    UpdateProcessing();
  };
  const UpdateProcessing = () => {
    routeid.map((ind,pos)=>{
      var dataId = ind.user_id;
      database()
      .ref('/users/'+dataId+'')
      .update({
          "orders_processing" : routeorders[pos],
          "orders_shipped" : routeorders_shipped[pos]
      })
      .then(function(){
        SetDisplay(false);
        OrdersList();
      }).catch(function(err){
        console.log('error fire'+err);
          return false;
      });
    });
  };
  useEffect(()=>{
    OrdersList();
  },[]);
  return(
    <SafeAreaView style={HomeStyle.HomSafeArea}>
    {
      !network.isConnected ? 
        <View style={HomeStyle.HomViewTabNull}>
          <MaterialIcons name='network-locked' size={moderateScale(50)} color="grey" style={HomeStyle.HomViewIcon}/>
          <Text style={HomeStyle.HomViewTabNullText}>OOPS, No internet connection</Text>
        </View>
      :
      !display? 
      <>
        <View style={HomeStyle.HomSubNullView}>
          <Animated.View style={[HomeStyle.HomSubNullItem,{transform:[{rotate:spin}]}]}>
            <IconOutline name='setting' size={70} style={HomeStyle.HomSubNullIcon}/> 
          </Animated.View>
        </View>
      </>
      :
        routeorders[0][1] !== undefined  
        ? 
        <ScrollView style={HomeStyle.HomViewTop} contentContainerStyle={HomeStyle.HomViewTopCon} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
          {
            routeorders.map((items,rest)=>{ 
              var ItemRet = items.map((item,res)=>{
                if(res !== 0){
                  var itemProduct = item.Product;
                  if(itemProduct){
                    var ItemProductRet = itemProduct.map((itm,vad)=>{
                      return(
                        <>
                          <View style={HomeStyle.HomViewBase} key={(item.OrderId+itm.id)}>
                            <View style={HomeStyle.HomViewBaseTop}>
                              <Image style={HomeStyle.HomViewImg} source={{url:itm.image}}/>
                              <View style={HomeStyle.HomViewOrdCol}>
                                <Text style={HomeStyle.HomViewOrdColBigText}>{itm.name}</Text>
                                <View style={HomeStyle.HomViewOrdColChild}>
                                  <Text style={HomeStyle.HomViewOrdColBigSmall}>Size : {itm.size}</Text>
                                  <Text style={HomeStyle.HomViewOrdColBigSmall}>Qty : {itm.qty}</Text>
                                </View>
                              </View>
                              <View style={HomeStyle.HomViewOrdRow}>
                                <Text style={HomeStyle.HomViewText}>{itm.price} JOD</Text>
                                <Text style={HomeStyle.HomViewTextSmall}>{item.OrderDate}</Text>
                              </View>
                            </View>
                            <View style={HomeStyle.HomViewBaseBase}>
                              <View style={HomeStyle.HomViewBaseBaseRow}> 
                                <IconOutline name='clock-circle' style={[HomeStyle.HomViewBaseBaseIcon,{color:'#930393'}]}/>
                                <Text style={[HomeStyle.HomViewBaseBaseText,{color:'#930393'}]}>This order is processing.</Text>
                              </View>
                              <Ripple style={HomeStyle.HomAccPressable} rippleColor='#676767' rippleDuration={500} rippleOpacity={0.9} rippleSize={100} onPress={()=>AcceptOrder(itm,item,rest)}>
                                  <Text style={HomeStyle.HomAccPressableText}>Shipped ?</Text>
                              </Ripple>
                            </View>
                          </View>
                        </>
                      )
                    })
                  }
                }
                return(  
                  <>
                    <View style={HomeStyle.HomViewBaseLeftBar} key={item.toString()}>
                      <Text style={HomeStyle.HomViewBaseLeftBarText}>{item.OrderId}</Text>
                    </View>
                    {ItemProductRet}
                  </>
                  );
              })
              return ItemRet;
            })
          }
        </ScrollView>
      :
      <View style={HomeStyle.HomViewTabNull}>
        <IconOutline name="file-exclamation" size={moderateScale(50)} color="grey" style={HomeStyle.HomViewIcon}/>
        <Text style={HomeStyle.HomViewTabNullText}>No processing orders.</Text>
      </View>
    }
    </SafeAreaView>
  );
};
export default React.memo(ProcessingOrders);