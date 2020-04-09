import 'react-native';
import React from 'react';
import AddRecipeModal from '../pages/AddRecipeModal';

import renderer from 'react-test-renderer';

it('renders correctly', () => {
    renderer.create(<AddRecipeModal />);
});
