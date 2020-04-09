import 'react-native';
import React from 'react';
import RegiterModal from '../pages/RegiterModal';

import renderer from 'react-test-renderer';

it('renders correctly', () => {
    renderer.create(<RegiterModal />);
});
