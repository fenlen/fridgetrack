import 'react-native';
import React from 'react';
import Scan from '../pages/Scan';

import renderer from 'react-test-renderer';

it('renders correctly', () => {
    renderer.create(<Scan />);
});
