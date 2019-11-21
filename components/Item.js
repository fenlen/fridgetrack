import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Item = ({name, expDate}) => {
  return (
    <View style={styles.item}>
      <Text style={styles.content}>
        {name}     {expDate}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: 10,
    fontSize: 28,
    backgroundColor: 'powderblue',
  },
  item: {
    flex: 1,
  },
});

export default Item;
