import React from 'react';
import { Button, Text, Icon, Fab, View} from 'native-base';
import {withNavigation} from 'react-navigation';

const SubmitButton = props => {
      return (
        <View style={{ flex: 1 }}>
            <Fab
              active={true}
              direction="up"
              containerStyle={{ }}
              style={{ backgroundColor: '#5067FF' }}
              position="bottomRight"
              onPress={() =>
                            props.navigation.navigate('ItemModal', {
                              items: props.items,
                              refresh: props.refresh,
                              shopping: props.shopping,
                            })
                          }>
             <Icon name="add" />
            </Fab>
        </View>
      );
}

export default withNavigation(SubmitButton);
