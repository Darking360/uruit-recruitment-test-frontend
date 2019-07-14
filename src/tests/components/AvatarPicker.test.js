import React from 'react';
import { shallow, mount } from 'enzyme';
import AvatarPicker from '../../components/AvatarPicker';

const mockOnChange = jest.fn();

const moJSBurstMock = jest.fn();

const mockMove = {
    name: 'player1',
    onChange: mockOnChange,
    value: 'avatar'
}

describe('Avatar Picker', () => {

    it('renders without crashing', () => {
        shallow(<AvatarPicker {...mockMove} />);
    });

    it('matches snapshot', () => {
      const wrapper = shallow(<AvatarPicker {...mockMove} />);
      expect(wrapper).toMatchSnapshot();
    });

    it('call onChange with correct params', () => {
        const wrapper = mount(<AvatarPicker {...mockMove} />);
        wrapper.instance().playBurst = moJSBurstMock;
        wrapper.find('img').simulate('click');
        expect(moJSBurstMock).toHaveBeenCalledTimes(1);
        expect(mockOnChange).toHaveBeenCalled();
    });

    it('updates next random image after 1 click with mojs animation', () => {
        const wrapper = mount(<AvatarPicker {...mockMove} />);
        wrapper.instance().playBurst = moJSBurstMock;
        wrapper.find('img').simulate('click');
        expect(moJSBurstMock).toHaveBeenCalledTimes(2);
        expect(mockOnChange).toHaveBeenCalledTimes(2);
        // Update props
        wrapper.setProps({ ...mockMove, value: 'another' });
        expect(wrapper.find('img').prop('src')).toMatch(new RegExp(`((?!avatar).)`));
    });

});