import 'react-native';
import React from 'react';
import Account from '../pages/Account';

import renderer from 'react-test-renderer';

it('renders correctly', () => {
    renderer.create(<Account />);
});
