import React from 'react';
import styled from 'styled-components';
import Checkbox from '../Checkbox';

const Container = styled.div.attrs(({ isChecked }) => ({
  className: isChecked ? 'checked' : ''
}))`
  display: inline-flex;
  background: #FFFFFF;
  padding: 5px 15px 5px 5px;
  color: ${p => p.theme.primaryText};
  box-shadow: 0 0 3px 0 #E6EAF7;
  text-align: center;
  border-radius: 100px;
  font-weight: 600;
  font-size: 13.5px;
  letter-spacing: -0.29px;
  align-items: center;
  transition: all 200ms ease-in-out;
  cursor: pointer;

  &:hover {
    box-shadow: 0 1px 4px 0 #C8CFE3;
  }

  &.checked {
    background: ${p => p.theme.darkGreen};
    color: white;
  }
`;

const ModifiedCheckbox = styled(Checkbox)`
  display: inline-block;
  margin-right: 7px;

  ${Container}:hover & {
    background-color: ${p => p.isChecked ? p.theme.checkbox.hover.checked.background : p.theme.checkbox.hover.unchecked.background};
    border: 3px solid ${p => p.isChecked ? p.theme.checkbox.hover.checked.border : p.theme.checkbox.hover.unchecked.border};
  }

  ${Container}.checked & {
    background-color: white;
    & span {
      background-color: ${p => p.theme.darkGreen};
    }
  }
`;

const RefinementOption = (props) => {
  const { onClick, isChecked } = props;
  return (
    <Container className={props.className} onClick={onClick} isChecked={isChecked}>
      <ModifiedCheckbox isChecked={isChecked} />
      <span>{props.children}</span>
    </Container>
  );
}

export default RefinementOption;