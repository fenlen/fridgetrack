import 'react-native';
import React from 'react';
import Meals from '../pages/Meals';

import renderer from 'react-test-renderer';

it('renders correctly', () => {
    renderer.create(<Meals />);
});
