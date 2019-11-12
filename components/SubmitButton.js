import React from 'react';
import {Button} from 'react-native';
import {withNavigation} from 'react-navigation';

const SubmitButton = props => {
  return (
    <Button
      title="Add item"
      onPress={() =>
        props.navigation.navigate('MyModal', {
          items: props.items,
          refresh: props.refresh,
          shopping: props.shopping,
        })
      }
    />
  );
};

export default withNavigation(SubmitButton);
