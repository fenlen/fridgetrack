import 'react-native';
import React from 'react';
import GroupViewitemModal from '../pages/GroupViewitemModal';

import renderer from 'react-test-renderer';

it('renders correctly', () => {
    renderer.create(<GroupViewitemModal />);
});
