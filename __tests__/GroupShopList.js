import 'react-native';
import React from 'react';
import GroupShopList from '../pages/GroupShopList';

import renderer from 'react-test-renderer';

it('renders correctly', () => {
    renderer.create(<GroupShopList />);
});
