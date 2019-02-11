import React from 'react';
import styled from 'styled-components';

const Indicator = styled.div`
  height: 10px;
  width: 100%;
  margin-top: 3px;
  border-radius: 3px 3px 0 0;
  background: ${p => p.theme.step[p.state].background};
`;

const Container = styled.div`
  flex-grow: 1;
  flex-basis: 0;
  margin: 0 1px;

  &:first-child {
    margin-left: 0;

    & ${Indicator} {
      border-radius: 0px 3px 0 0;
    }
  }

  &:last-child {
    margin-right: 0;

    & ${Indicator} {
      border-radius: 3px 0px 0 0;
    }
  }

  @media (max-width: 720px) {
    display: ${p => p.state === 'active' ? 'block' : 'none' };
    margin: 0;
    & ${Indicator} {
      border-radius: 0px !important;
    }
  }
`;

const StepName = styled.span`
  font-size: 13px;
  color: ${p => p.theme.step[p.state].text};
  text-align: center;
  display: block;
`;

const Step = (props) => {
  return (
    <Container state={props.state} >
      <StepName {...props}>{props.name}</StepName>
      <Indicator {...props} />
    </Container>
  );
}

export default Step;