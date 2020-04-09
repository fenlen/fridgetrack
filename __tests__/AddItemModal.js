import 'react-native';
import React from 'react';
import AddItemModal from '../pages/AddItemModal';

import renderer from 'react-test-renderer';

it('renders correctly', () => {
    renderer.create(<AddItemModal />);
});
