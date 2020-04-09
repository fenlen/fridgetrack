import 'react-native';
import React from 'react';
import GroupAddItemModal from '../pages/GroupAddItemModal';

import renderer from 'react-test-renderer';

it('renders correctly', () => {
    renderer.create(<GroupAddItemModal />);
});
