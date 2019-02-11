import React from 'react';
import styled from 'styled-components';
import like from './like.svg';
import dislike from './dislike.svg';

const typeToIcon = {
  "like": like,
  "dislike": dislike,
}

const Container = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 2px;
  background-color: ${p => p.theme.feedbackButton[p.type].normal[p.state].background};
  text-align: center;
  line-height: 28px;
  cursor: pointer;
  transition: all 200ms ease-in-out;

  &:hover {
    background-color: ${p => p.theme.feedbackButton[p.type].hover[p.state].background};
  }
`;

const Icon = styled.span`
  width: 19px;
  height: 19px;
  mask: url(${p => typeToIcon[p.type]}) no-repeat center center;
  background-color: ${p => p.theme.feedbackButton[p.type].normal[p.state].foreground};
  background-size: contain;
  display: inline-block;
  vertical-align: middle;
`;

const FeedbackButton = props => {
  return (
    <Container {...props}>
      <Icon {...props}/>
    </Container>
  );
}

export default FeedbackButton;

