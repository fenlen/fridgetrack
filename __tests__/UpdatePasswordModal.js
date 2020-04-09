import 'react-native';
import React from 'react';
import UpdatePasswordModal from '../pages/UpdatePasswordModal';

import renderer from 'react-test-renderer';

it('renders correctly', () => {
    renderer.create(<UpdatePasswordModal />);
});
