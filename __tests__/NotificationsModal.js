import 'react-native';
import React from 'react';
import NotificationsModal from '../pages/NotificationsModal';

import renderer from 'react-test-renderer';

it('renders correctly', () => {
    renderer.create(<NotificationsModal />);
});
