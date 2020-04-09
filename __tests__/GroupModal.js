import 'react-native';
import React from 'react';
import GroupModal from '../pages/GroupModal';

import renderer from 'react-test-renderer';

it('renders correctly', () => {
    renderer.create(<GroupModal />);
});
