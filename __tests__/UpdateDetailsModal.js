import 'react-native';
import React from 'react';
import UpdateDetailsModal from '../pages/UpdateDetailsModal';

import renderer from 'react-test-renderer';

it('renders correctly', () => {
    renderer.create(<UpdateDetailsModal />);
});
