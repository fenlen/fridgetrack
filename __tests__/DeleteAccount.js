import 'react-native';
import React from 'react';
import DeleteAccountModal from '../pages/DeleteAccountModal';

import renderer from 'react-test-renderer';

it('renders correctly', () => {
    renderer.create(<DeleteAccountModal />);
});
