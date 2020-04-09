import 'react-native';
import React from 'react';
import LoginModal from '../pages/LoginModal';

import renderer from 'react-test-renderer';

it('renders correctly', () => {
    renderer.create(<LoginModal />);
});
