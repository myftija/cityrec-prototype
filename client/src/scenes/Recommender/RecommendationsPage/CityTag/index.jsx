import React from 'react';
import { CardHead } from '../../../../CommonStyles';
import { ModifiedCard } from '../styles';
import styled from 'styled-components';
import icon from '../../../../images/arrow.svg';

const Container = styled(ModifiedCard).attrs({
  className: p => p.isSelected ? 'selected' : ''
})`
  &.selected {
    background: ${p => `linear-gradient(-225deg, ${p.theme.secondary}, ${p.theme.primary}) no-repeat;`};
  }
`;

const DetailsContainer = styled.div`
  display: inline-flex;
  align-items: center;
`;

const RankContainer = styled.div`
  width: 62px;
  height: 62px;
  background-image: linear-gradient(-90deg, #FCFCFC, #F6F7FB);
  margin-right: 15px;
  border-radius: 4px 0 0 4px;
  text-align: center;
  line-height: 62px;
  font-size: 17px;
  color: ${p => p.theme.primary};
  letter-spacing: 1.8px;
  font-weight: 700;

  > span {
    vertical-align: middle;
    display: inline-block;
  }

  > span#icon {
    color: ${p => `${p.theme.primary}4D`};
  }

  ${Container}.selected & {
    background: #1B2793;
    color: white;
    > span#icon {
      color: ${p => p.theme.primary};
    }
  }
`;

const ModifiedCardHead = styled(CardHead)`
  padding: 0 15px 0 0;

  ${Container}.selected & {
    color: white !important;

    & span#title {
      color: white;
    }

    & span#subtitle {
      color: white;
    }
  }
`;

export const Icon = styled.span`
  width: 12px;
  height: 12px;
  mask: url(${icon}) no-repeat center center;
  mask-size: contain;
  background-color: ${p => p.theme.primary};
  display: inline-block;
  margin: 0 0 -1px 3px;
  transition: all 200ms ease-in-out;
  opacity: 0;

  ${Container}:hover & {
    background-color: ${p => p.theme.primary};
    transform: translateX(5px);
    opacity: 1;
  }

  ${Container}.selected & {
    background-color: #FFFFFF;
    transform: translateX(5px);
    opacity: 1;
  }
`;

const CityTag = props => {
  const { city, rank, onClick, isSelected } = props;
  return (
    <Container onClick={onClick} isSelected={isSelected}>
      <ModifiedCardHead>
        <DetailsContainer>
          <RankContainer>
            <span id="icon">#</span>
            <span>{rank}</span>
          </RankContainer>
          <div>
            <span id="title">{city.name}</span>
            <span id="subtitle">{city.country}</span>
          </div>
        </DetailsContainer>
        <Icon />
      </ModifiedCardHead>
    </Container>
  );
}

export default CityTag;