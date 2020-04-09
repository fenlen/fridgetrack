import 'react-native';
import React from 'react';
import ViewRecipesModal from '../pages/ViewRecipesModal';

import renderer from 'react-test-renderer';

it('renders correctly', () => {
    renderer.create(<ViewRecipesModal />);
});
