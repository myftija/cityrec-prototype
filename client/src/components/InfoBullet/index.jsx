import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Label = styled.span`
  display: block;
  font-weight: 700;
  font-size: 10px;
  color: ${p => p.theme.midnightBlue};
  text-transform: uppercase;
`;

const InfoBullet = props => {
  return (
    <Container>
      <Label>{props.label}</Label>
      {props.children}
    </Container>
  );
}

export default InfoBullet;