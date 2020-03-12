import React from 'react';
import {Button, Text, Icon, Fab, View} from 'native-base';
import {withNavigation} from 'react-navigation';

const SubmitButton = props => {
  const f = () => {
    if (props.group) {
      props.navigation.navigate('GroupItemModal', {
        items: props.items,
        refresh: props.refresh,
        shopping: props.shopping,
      });
    } else {
      props.navigation.navigate('ItemModal', {
        items: props.items,
        refresh: props.refresh,
        shopping: props.shopping,
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
