import React from 'react';
import styled from 'styled-components';
import icon from './action.svg';

const Container = styled.div`
  display: inline-block;
  background: linear-gradient(-225deg, ${p => p.theme.secondary}, ${p => p.theme.primary}) no-repeat;
  padding: 11px 22px;
  color: #ffffff;
  box-shadow: 0 2px 7px 0 rgba(80,58,216,0.46);
  text-align: center;
  border-radius: 100px;
  font-weight: 700;
  font-size: 15px;
  letter-spacing: -0.29px;

  & span {
    vertical-align: middle;
  }

  @media (max-width: 600px) {
    border-radius: 6px;
  }
`;

const Icon = styled.span`
  width: 18px;
  height: 18px;
  background: url(${icon}) no-repeat center center;
  background-size: contain;
  display: inline-block;
  margin-right: 10px;
`;

const Banner = (props) => {
  return (
    <Container className={props.className}>
      <Icon />
      <span>{props.children}</span>
    </Container>
  );
}

export default Banner;