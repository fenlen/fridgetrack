import React from 'react';
import {Button, Text, Icon, Fab, View} from 'native-base';
import {withNavigation} from 'react-navigation';

const SubmitButton = props => {
  const f = () => {
    if (props.group) {
      props.navigation.navigate('GroupItemModal', {
        refresh: props.refresh,
        shopping: props.shopping,
        barcode: null,
      });
    } else {
      props.navigation.navigate('ItemModal', {
        refresh: props.refresh,
        shopping: props.shopping,
        barcode: null,
      });
    }
  };
  return (
    <View>
      <Fab
        active={true}
        containerStyle={{}}
        position="bottomRight"
        onPress={() => f()}>
        <Icon name="add" />
      </Fab>
    </View>
  );
};

export default withNavigation(SubmitButton);
