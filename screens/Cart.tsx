import React, {useState} from 'react';
import {View, Text, Dimensions} from 'react-native';
import {Button} from 'react-native-paper';
import {FlatList} from 'react-native';
import {StyleSheet} from 'react-native';
import { Icon } from 'react-native-elements';

const Height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const Cart = () => {
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
    setTotal(total - cartDetails[idx].value);
    const value = cartDetails.filter(item => item.index !== idx);
    console.log('Value', value);
    setCartDetails(value);
  };
  const refresh = () => {
    setTotal(0);
    setCartDetails(current =>
      current.map(obj => {
        return {...obj, value: 0, active: false};

        return obj;
      }),
    );
  };
  const recycle = () => {
    setCartDetails([]);
  };

  return (
    <View style={{backgroundColor: '#c3f7f6', flex: 1}}>
      <View style={styles.TopView}>
      <Icon style={styles.icon} name="cart" type="ionicon" color="#000" />
      <Text style={styles.titleText}>{total}</Text>
      <Text style={{fontWeight: 'bold', fontSize: 20, marginTop: 14}}>Items</Text>
      </View>
      <View style={styles.appViewAbove}>
        <Button
          buttonColor="green"
          style={styles.btn}
          icon="refresh"
          mode="contained"
          onPress={() => refresh()}>
          {' '}
        </Button>
        <Button
          buttonColor="#2a6dd1"
          style={styles.btn}
          icon="recycle"
          mode="contained"
          onPress={() => recycle()}>
          {' '}
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
              {' '}
            </Button>
            <Button
              buttonColor={item.active ? '#328c94' : '#19b7bd'}
              style={styles.btn}
              icon="minus"
              mode="contained"
              onPress={() => minusFromCart(item.index)}>
              {' '}
            </Button>
            <Button
              buttonColor="#c72d28"
              style={styles.btn}
              icon="delete"
              mode="contained"
              onPress={() => deleteFromCart(item.index)}>
              {' '}
            </Button>
          </View>
        )}
      />
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
    borderColor: 'black',
    borderWidth: 1,
    width: width / 5,
    height: Height / 20,
    borderRadius: 10,
    marginTop: 11,
    marginRight: 10,
    lineHeight: 35
  },
  titleText: {
    textAlign: 'center',
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
    borderColor: 'black',
    borderWidth: 1,
    width: width / 5,
    height: Height / 20,
    borderRadius: 20,
    lineHeight: 35,
    marginTop: 11,
    marginLeft: 10,
    marginRight: 10
  },
  appView: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginBottom: 20,
  },
  TopView: {
    marginTop: 50,
    alignContent: 'center',
    flexDirection: 'row',
    alignSelf: 'center',
    marginBottom: 20,
  },
  appViewAbove: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop:  5,
    marginBottom: 30,
  },
  btn: {
    width: width / 12,
    color: 'red',
    borderRadius: 10,
    margin: 10,
    marginLeft: 5,
  },
  icon: {
    width: width / 12,
    color: 'red',
    borderRadius: 10,
    marginTop: 15,
    marginLeft: 5,
  }
});
