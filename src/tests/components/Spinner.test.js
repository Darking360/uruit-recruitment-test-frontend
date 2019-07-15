import React from 'react';
import { shallow } from 'enzyme';
import Spinner from '../../components/Spinner';

describe('Spinner', () => {

    it('renders without crashing', () => {
      shallow(<Spinner />);
    });

    it('matches snapshot', () => {
      const wrapper = shallow(<Spinner />);
      expect(wrapper).toMatchSnapshot();
    });

    it('render with correct width prop', () => {
      const wrapper = shallow(<Spinner width="20em" />);
      expect(wrapper.props().width).toBe("20em");
    });

    it('renders logo', () => {
      const wrapper = shallow(<Spinner width="20em" />);
      expect(wrapper.find('svg.overwatch-logo').length).toBe(1);
    });

});