import React from 'react'
import styled, { keyframes } from 'styled-components';
import ReactTooltip from 'react-tooltip';
import infoIcon from './info.svg';


const Container = styled.div`
  display: inline-flex;
  align-items: center;
  background: #FFFFFF;
  border: 1px solid #E0E5F2;
  font-size: 13px;
  color: #503AD8;
  letter-spacing: -0.28px;
  border-radius: 100px;
  line-height: 14px;
  margin: 0 auto 10px;
  cursor: pointer;

  & span#message {
    margin: 0 15px 0 10px;
  }
`;

const Icon = styled.span`
  width: 14px;
  height: 14px;
  background: url(${infoIcon}) no-repeat center center;
  background-size: contain;
  display: inline-block;
`;

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(46,113,240, 0.5);
  }
  70% {
    box-shadow: 0 0 0 12px rgba(46,113,240, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(46,113,240, 0);
  }
`;

const IconContainer = styled.span`
  width: 28px;
  height: 28px;
  padding: 7px;
  background-color: ${p => p.theme.primary};
  border-radius: 100px;
  box-shadow: 0 0 0 rgba(46,113,240, 0.4);
  animation: ${pulse} 1.8s infinite;
`

const Content = styled.div`
  line-height: 20px;
  font-size: 14px;
  max-width: 600px;

  @media (max-width: 800px) {
    max-width: 700px;
  }
  @media (max-width: 700px) {
    max-width: 600px;
  }
  @media (max-width: 600px) {
    max-width: 500px;
  }
  @media (max-width: 500px) {
    max-width: 400px;
  }
  @media (max-width: 400px) {
    max-width: 300px;
  }
  @media (max-width: 300px) {
    max-width: 200px;
  }
  @media (max-width: 200px) {
    max-width: 160px;
  }
`;


const HoverInfoIndicator = props => {
  return (
    <React.Fragment>
      <Container data-tip data-for="info-indicator">
      <ReactTooltip place="bottom" type="dark" effect="solid" id="info-indicator">
        <Content>
          {props.children}
        </Content>
      </ReactTooltip>
        <IconContainer>
          <Icon />
        </IconContainer>
        <span id="message">click here for more information</span>
      </Container>
    </React.Fragment>
  );
}

export default HoverInfoIndicator;