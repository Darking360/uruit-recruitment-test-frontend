import React from 'react';
import { shallow } from 'enzyme';
import App from '../App';

describe('App', () => {

   it('renders without crashing', () => {
      shallow(<App />);
    });

    it('matches snapshot', () => {
      const wrapper = shallow(<App />);
      expect(wrapper).toMatchSnapshot();
    });

});