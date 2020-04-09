import 'react-native';
import React from 'react';
import AppearanceModal from '../pages/AppearanceModal';

import renderer from 'react-test-renderer';

it('renders correctly', () => {
    renderer.create(<AppearanceModal />);
});
