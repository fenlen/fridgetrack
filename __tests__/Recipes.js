import 'react-native';
import React from 'react';
import Recipes from '../pages/Recipes';

import renderer from 'react-test-renderer';

it('renders correctly', () => {
    renderer.create(<Recipes />);
});
