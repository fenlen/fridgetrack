import 'react-native';
import React from 'react';
import Premium from '../pages/Premium';

import renderer from 'react-test-renderer';

it('renders correctly', () => {
    renderer.create(<Premium />);
});
