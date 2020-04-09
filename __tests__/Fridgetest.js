import 'react-native';
import React from 'react';
import Fridge from '../pages/Fridge';

import renderer from 'react-test-renderer';

it('renders correctly', () => {
  renderer.create(<Fridge />);
});
