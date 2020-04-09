import 'react-native';
import React from 'react';
import ViewMealModal from '../pages/ViewMealModal';

import renderer from 'react-test-renderer';

it('renders correctly', () => {
    renderer.create(<ViewMealModal />);
});
