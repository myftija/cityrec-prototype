import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background-color: #E9EAEE;
  width: 100%;
  height: 5px;
  border-radius: 100px;
`;

const Fill = styled.div`
  background-color: ${p => p.color || p.theme.primary};
  width: ${p => p.value * 100}%;
  height: 5px;
  border-radius: 2.5px;
  transition: all 200ms ease-in-out;
`;

const ProgressBar = props => {
  const { value, fillColor, className } = props;
  return(
    <Container className={className} >
        <Fill value={value} color={fillColor}/>
    </Container>
  );
}

export default ProgressBar;