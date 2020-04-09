import 'react-native';
import React from 'react';
import AddMealModal from '../pages/AddMealModal';

import renderer from 'react-test-renderer';

it('renders correctly', () => {
    renderer.create(<AddMealModal />);
});
