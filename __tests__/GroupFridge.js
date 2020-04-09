import 'react-native';
import React from 'react';
import GroupFridge from '../pages/GroupFridge';

import renderer from 'react-test-renderer';

it('renders correctly', () => {
    renderer.create(<GroupFridge />);
});
