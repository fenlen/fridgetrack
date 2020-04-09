import 'react-native';
import React from 'react';
import GroupStatistics from '../pages/GroupStatistics';

import renderer from 'react-test-renderer';

it('renders correctly', () => {
    renderer.create(<GroupStatistics />);
});
