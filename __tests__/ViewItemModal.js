import 'react-native';
import React from 'react';
import ViewItemModal from '../pages/ViewItemModal';

import renderer from 'react-test-renderer';

it('renders correctly', () => {
    renderer.create(<ViewItemModal />);
});
