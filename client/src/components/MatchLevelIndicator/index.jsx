import React from 'react'
import styled from 'styled-components';

const Container = styled.div`
  font-size: 26px;
  font-weight: 700;
  letter-spacing: 1px;
  height: 16px;
  line-height: 16px;

  & span#active {
    color: ${p => p.theme.primary};
  }
  & span#inactive {
    color: #D4D0D0;
  }
`;

const MatchLevelIndicator = props => {
  const { value, symbolCount } = props;
  const activeCount = Math.floor(value * symbolCount);

  return(
    <Container>
      <span id="active">{"•".repeat(activeCount)}</span>
      <span id="inactive">{"•".repeat(symbolCount - activeCount)}</span>
    </Container>
  );
}

export default MatchLevelIndicator;