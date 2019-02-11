import React from 'react';
import styled from 'styled-components';
import { ModifiedCard } from '../styles';

const Container = styled(ModifiedCard)`
  padding: 10px;
  margin-top: 15px;
`;

const Question = props => {
  return (
    <Container>Question 1</Container>
  );
}

export default Question;