import React from 'react'
import styled from 'styled-components';

const Container = styled.div`
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 1px;
  height: 16px;
  line-height: 16px;

  & span#active {
    color: ${p => p.theme.darkGreen};
  }
  & span#inactive {
    color: #CCCCCC;
    font-weight: 600;
  }
`;

const CostIndicator = props => {
  const { value, symbolCount } = props;
  const activeCount = Math.ceil(value * symbolCount);

  return(
    <Container>
      <span id="active">{"$".repeat(activeCount)}</span>
      <span id="inactive">{"$".repeat(symbolCount - activeCount)}</span>
    </Container>
  );
}

export default CostIndicator;