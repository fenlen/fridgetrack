import 'react-native';
import React from 'react';
import Statistics from '../pages/Statistics';

import renderer from 'react-test-renderer';

it('renders correctly', () => {
    renderer.create(<Statistics />);
});
