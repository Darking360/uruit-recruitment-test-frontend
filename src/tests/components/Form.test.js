import React from "react";
import { shallow, mount } from "enzyme";
import { 
  GameFieldSet, 
  GameButton,
  GameField,
  FieldSet
} from "../../components/Form";

const mockFieldset = {
  value: "Cool name",
  onChange: jest.fn(),
  label: "Label",
  name: "player1"
};

const typeEvent = {target: {name: mockFieldset.name, value: "New value"}};

describe("Game Fieldset", () => {

  it("renders without crashing", () => {
    shallow(<GameFieldSet {...mockFieldset} />);
  });

  it("matches snapshot", () => {
    const wrapper = shallow(<GameFieldSet {...mockFieldset} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("render correct label", () => {
    const wrapper = shallow(<GameFieldSet {...mockFieldset} />);
    expect(wrapper.find('label').text()).toBe(mockFieldset.label);
  });

  it("render correct inpuit value initially", () => {
    const wrapper = mount(<GameFieldSet {...mockFieldset} />);
    expect(wrapper.find('input').props().value).toBe(mockFieldset.value);
  });

  it("calls onChange as user types", () => {
    const wrapper = mount(<GameFieldSet {...mockFieldset} />);
    wrapper.find('input').simulate('change', typeEvent);
    expect(mockFieldset.onChange).toHaveBeenCalled();
  });

  it("changes with new props", () => {
    const wrapper = mount(<GameFieldSet {...mockFieldset} />);
    wrapper.find('input').simulate('change', typeEvent);
    expect(mockFieldset.onChange).toHaveBeenCalledTimes(2);
    wrapper.setProps({ ...mockFieldset, value: "New cool value" });
    expect(wrapper.find('input').props().value).toBe("New cool value");
  });
});

describe("Game Button", () => {
  it("renders without crashing", () => {
    shallow(<GameButton>Test</GameButton>);
  });

  it("matches snapshot", () => {
    const wrapper = shallow(<GameButton>Test</GameButton>);
    expect(wrapper).toMatchSnapshot();
  });
});

describe("Game Field", () => {
  it("renders without crashing", () => {
    shallow(<GameField name="name" value="test" />);
  });

  it("matches snapshot", () => {
    const wrapper = shallow(<GameField name="name" value="test" />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe("FieldSet", () => {
  it("renders without crashing", () => {
    shallow(<FieldSet>Test</FieldSet>);
  });

  it("matches snapshot", () => {
    const wrapper = shallow(<FieldSet>Test</FieldSet>);
    expect(wrapper).toMatchSnapshot();
  });
});