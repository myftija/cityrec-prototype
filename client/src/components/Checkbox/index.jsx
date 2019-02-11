import React from 'react';
import styled from 'styled-components';
import tick from './tick.svg';

const Tick = styled.span`
  width: 11px;
  height: 11px;
  mask: url(${tick}) no-repeat center center;
  mask-size: contain;
  background-color: white;
  display: inline-block;
  vertical-align: middle;
`;

const Container = styled.div`
  width: 25px;
  height: 25px;
  box-sizing: border-box;
  border-radius: 100px;
  background-color: ${p => p.isChecked ? p.theme.checkbox.normal.checked.background : p.theme.checkbox.normal.unchecked.background};
  border: 3px solid ${p => p.isChecked ? p.theme.checkbox.normal.checked.border : p.theme.checkbox.normal.unchecked.border};
  text-align: center;
  line-height: 19px;
  transition: all 200ms ease-in-out;

  &:hover {
    background-color: ${p => p.isChecked ? p.theme.checkbox.hover.checked.background : p.theme.checkbox.hover.unchecked.background};
    border: 3px solid ${p => p.isChecked ? p.theme.checkbox.hover.checked.border : p.theme.checkbox.hover.unchecked.border};
  }

  & ${Tick} {
    opacity: ${p => p.isChecked ? 1 : 0};
  }
`;

const Checkbox = props => {
  return (
    <Container isChecked={props.isChecked} className={props.className}>
      <Tick />
    </Container>
  );
}

export default Checkbox;

