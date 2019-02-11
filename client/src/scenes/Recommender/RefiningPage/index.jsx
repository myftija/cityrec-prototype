import React from 'react';
import { StandardRow, StandardSmallContainer } from '../../../CommonStyles';
import { CenteredContainer, BannerWithMargin } from '../styles';
import City from './City';
import Spinner from '../../../components/Spinner';
import ScoreRefiner from './ScoreRefiner';
import styled from 'styled-components';
import HoverInfoIndicator from '../../../components/HoverInfoIndicator';

const NextQuestionButton = styled.button`
  background-color: ${p => p.isDisabled ? 'transparent' : 'white'};
  transition: all 200ms ease-in-out;
  font-size: 10px;
  font-weight: 700;
  padding: 6px 17px;
  letter-spacing: 2.8px;
  color: ${p => p.theme.secondaryText};
  border: 1px solid ${p => p.theme.secondaryText}80;
  margin-top: 10px;
  border-radius: 100px;
  cursor: pointer;
  text-transform: uppercase;
  margin-bottom: 10px;
  pointer-events: ${p => p.isDisabled ? 'none' : 'all'};

  &, :hover, :focus, :active {
    outline: none;
  }

  &:hover {
    background-color: ${p => p.theme.primary};
    color: white;
  }
`;

const SuccessMessage = styled.div`
  color: ${p => p.theme.primaryText};
  font-weight: 700;
  font-size: 14px;
  line-height: 14px;
  min-height: 118px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const aspects = [
  {
    aspectName: 'price level',
    aspectCodeName: 'cost',
  },
  {
    aspectName: 'average temperature',
    aspectCodeName: 'temperature',
  },
  {
    aspectName: 'food',
    aspectCodeName: 'food',
  },
  {
    aspectName: 'arts and entertainment',
    aspectCodeName: 'arts',
  },
  {
    aspectName: 'outdoors and recreation',
    aspectCodeName: 'outdoors',
  },
  {
    aspectName: 'nightlife',
    aspectCodeName: 'nightlife',
  },
];

const possibleAspectValues = new Set([-2, -1, 0, 1, 2]);

class RefiningPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentAspectIndex: 0
    }
  }

  componentDidMount() {
    const { shouldResetRecommenderProgress, resetRecommenderProgress } = this.props;
    if (shouldResetRecommenderProgress()) {
      resetRecommenderProgress();
    }
  }

  onNextQuestionClick = () => {
    const { currentAspectIndex } = this.state;
    const { setRefinementsCompletedFlag } = this.props;

    setRefinementsCompletedFlag(currentAspectIndex+1 >= aspects.length);
    this.setState({ currentAspectIndex: currentAspectIndex+1 });
  }

  render() {
    const { cities, refinements, isLoading, handleRefinementAction, onNextStepClick } = this.props;
    const { currentAspectIndex } = this.state;

    const renderedCities = (cities.slice(0, 4)).map(c => {
      return (
      <StandardSmallContainer key={c.id}>
        <City city={c} />
      </StandardSmallContainer>);});

    return (
      <CenteredContainer>
        <BannerWithMargin margin={15}>Please check out the initial recommendations below and provide some feedback!</BannerWithMargin>

        <StandardRow>
          <HoverInfoIndicator>In this step, your feedback helps us better tune our understanding of what you prefer. Please check out the initial recommendations below and rate how well each aspect fits your preferences!</HoverInfoIndicator>
        </StandardRow>

        {currentAspectIndex < aspects.length
          ?
            <div className="offset-md-1 col-md-10 col-sm-12">
              <ScoreRefiner
                aspectName={aspects[currentAspectIndex].aspectName}
                aspectCodeName={aspects[currentAspectIndex].aspectCodeName}
                handleRefinementAction={handleRefinementAction}
                selectedValue={refinements[aspects[currentAspectIndex].aspectCodeName]}
              />
              <NextQuestionButton
                isDisabled={!possibleAspectValues.has(refinements[aspects[currentAspectIndex].aspectCodeName])}
                onClick={this.onNextQuestionClick}
              >
                next question
              </NextQuestionButton>
            </div>
          : <SuccessMessage>
              <span>Thank you for the feedback! You can now proceed to the next step.</span>
              <NextQuestionButton isDisabled={false} onClick={onNextStepClick}>
                go to next step
              </NextQuestionButton>
            </SuccessMessage>
        }

        {isLoading
          ? <Spinner />
          : <StandardRow>{renderedCities}</StandardRow>
        }
      </CenteredContainer>
    );
  }
}

export default RefiningPage;