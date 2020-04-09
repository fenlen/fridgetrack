import 'react-native';
import React from 'react';
import ShopList from '../pages/ShopList';

import renderer from 'react-test-renderer';

it('renders correctly', () => {
    renderer.create(<ShopList />);
});
