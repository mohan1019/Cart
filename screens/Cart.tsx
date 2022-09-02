import React, {useState} from 'react';
import {View, Text, Dimensions} from 'react-native';
import {Button} from 'react-native-paper';
import {FlatList} from 'react-native';
import {StyleSheet} from 'react-native';
import { Icon } from 'react-native-elements';
import { useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;


const Cart = () => {
 
  const [dim, setDim] = useState({
    width : 0,
    height : 0
  });
  const [total, setTotal] = useState(0);
  const [cartDetails, setCartDetails] = useState([
    {
      number: 'Zero',
      index: 0,
      value: 0,
      active: true,
    },
    {number: 'Zero', index: 1, value: 0, active: true},
    {number: 'Zero', index: 2, value: 0, active: true},
    {number: 'Zero', index: 3, value: 0, active: true},
  ]);

  const addToCart = (idx: number) => {
    setCartDetails(current =>
      current.map(obj => {
        if (obj.index === idx) {
          const updateValue = obj.value + 1;
          setTotal(total + 1);
          return {...obj, value: updateValue, active: false};
        }

        return obj;
      }),
    );
  };
  const minusFromCart = (idx: number) => {
    setCartDetails(current =>
      current.map(obj => {
        if (obj.index === idx) {
          if (obj.value > 0) {
            const updateValue = obj.value - 1;
            setTotal(total - 1);
            if (updateValue == 0) {
              obj.active = true;
            }
            return {...obj, value: updateValue};
          }
        }

        return obj;
      }),
    );
  };

  const deleteFromCart = (idx: number) => {

      cartDetails.map(obj => {
        if (obj.index === idx) {
          setTotal(total-obj.value)
        }
        return obj;
      })

    const value = cartDetails.filter(item => item.index !== idx);
    setCartDetails(value);
  };
  const refresh = () => {
    setTotal(0);
    setCartDetails(current =>
      current.map(obj => {
        return {...obj, value: 0, active: true};

        return obj;
      }),
    );
  };
  const recycle = () => {
    setTotal(0);
    setCartDetails([]);
  };

  const setLayout =() =>{
    const Height = Dimensions.get('window').height;
    const width = Dimensions.get('window').width;
    setDim({
        width: width,
        height: Height
    }) 
  }

  return (
    <SafeAreaView style={ dim.height> dim.width ? styles.backgroundPotrait : styles.backgroundLandscape} onLayout={()=>{setLayout()}} >
      <View style={dim.height> dim.width ? styles.TopView: styles.TopViewLandscape}>
      <Icon style={styles.icon} name="cart" type="ionicon" color="#000" />
      <Text style={styles.titleText}>{total}</Text>
      <Text style={styles.items}>Items</Text>
      </View>
      <View style={dim.height> dim.width ? styles.appViewAbove: styles.TopViewLandscape}>
        <Button
          buttonColor="green"
          style={styles.btn}
          icon="refresh"
          mode="contained"
          onPress={refresh}></Button>
        <Button
          buttonColor="#2a6dd1"
          style={styles.btn}
          icon="recycle"
          mode="contained"
          onPress={recycle}>
        </Button>
      </View>

      <FlatList
        data={cartDetails}
        scrollEnabled={true}
        renderItem={({item}) => (
          <View style={styles.appView}>
            <Text
              style={[
                styles.text,
                {backgroundColor: item.active ? '#fcc52d' : '#203ee8'},
              ]}>
              { item.active ?  'Zero': item.value}
            </Text>
            <Button
              buttonColor="#8a9b9c"
              style={styles.btn}
              icon="plus"
              onPress={() => addToCart(item.index)}>
            </Button>
            <Button
              buttonColor={item.active ? '#328c94' : '#19b7bd'}
              style={styles.btn}
              icon="minus"
              mode="contained"
              onPress={()=>minusFromCart(item.index)}>
            </Button>
            <Button
              buttonColor="#c72d28"
              style={styles.btn}
              icon="delete"
              mode="contained"
              onPress={() => deleteFromCart(item.index)}>
            </Button>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Cart;

const styles = StyleSheet.create({
  
  text: {
    textAlign: 'center',
    color: '#000',
    fontSize: width/18,
    fontWeight: 'bold',
    borderColor: 'black',
    borderWidth: width/220,
    width: width / 5,
    height: Height / 20,
    borderRadius: width/40,
    marginTop: Height/75,
    marginRight: width/30 ,
    lineHeight: Height/20
  },
  titleText: {
    textAlign: 'center',
    color: '#000',
    fontSize: width/18,
    fontWeight: 'bold',
    borderColor: 'black',
    borderWidth: width/250,
    width: width / 5,
    height: Height / 20,
    borderRadius: width/20,
    lineHeight: Height/20,
    marginTop: Height/65,
    marginLeft: width/40,
    marginRight: width/40,
    backgroundColor:'#009999'
  },
  appView: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginBottom: Height/50,
  },
  TopView: {
    marginTop: Height/10,
    alignContent: 'center',
    flexDirection: 'row',
    alignSelf: 'center',
    marginBottom: Height/40,
  },
  appViewAbove: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop:  Height/50,
    marginBottom: Height/30,
  },
  btn: {
    width: width / 12,
    color: 'red',
    borderRadius: width/40,
    margin: width/40,
    marginLeft: width/50,
  },
  icon: {
    width: width / 12,
    color: 'red',
    borderRadius: width/40,
    marginTop: width/20,
    marginLeft: width/60,
  },
  items: {
    fontWeight: 'bold',
    fontSize: width/15, 
    marginTop: Height/60
  },
  backgroundPotrait: {
    backgroundColor: '#c3f7f6', 
    flex: 1,
    flexDirection: 'column',
  },
  backgroundLandscape: {
    backgroundColor: '#c3f7f6', 
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  TopViewLandscape: {
    marginTop: Height/20,
    alignContent: 'center',
    flexDirection: 'row',
    alignSelf: 'center',
    marginBottom: Height/40,
  },

});
