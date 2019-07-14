import React from 'react';
import { shallow, mount } from 'enzyme';
import MovePicker from '../../components/MovePicker';

const movements = {
    '1': 'paper',
    '2': 'scissors',
    '3': 'rock'
};

const mockOnChange = jest.fn();

const mockMove = {
    name: 'player1',
    onChange: mockOnChange,
    value: 1
}

describe('Movement Picker', () => {

    it('renders without crashing', () => {
        shallow(<MovePicker {...mockMove} />);
    });

    it('matches snapshot', () => {
      const wrapper = shallow(<MovePicker {...mockMove} />);
      expect(wrapper).toMatchSnapshot();
    });

    it('call onChange with correct params', () => {
        const wrapper = mount(<MovePicker {...mockMove} />);
        wrapper.find('img').simulate('click');
        expect(mockOnChange).toHaveBeenCalled();
        expect(mockOnChange).toHaveBeenCalledWith(mockMove.name, mockMove.value + 1);
    });

    it('updates correctly its props after 1 click', () => {
        const wrapper = mount(<MovePicker {...mockMove} />);
        expect(wrapper.find('img').prop('src')).toMatch(new RegExp(`${movements[1]}`));
        wrapper.find('img').simulate('click');
        expect(mockOnChange).toHaveBeenCalledTimes(2);
        // Update props
        wrapper.setProps({ ...mockMove, value: 2 });
        expect(wrapper.find('img').prop('src')).toMatch(new RegExp(`${movements[2]}`));
    });

    it('updates correctly its props after 2 clicks', () => {
        const wrapper = mount(<MovePicker {...mockMove} />);
        expect(wrapper.find('img').prop('src')).toMatch(new RegExp(`${movements[1]}`));
        wrapper.find('img').simulate('click');
        expect(mockOnChange).toHaveBeenCalledTimes(3);
        // Update props
        wrapper.setProps({ ...mockMove, value: 3 });
        expect(wrapper.find('img').prop('src')).toMatch(new RegExp(`${movements[3]}`));
    });

});