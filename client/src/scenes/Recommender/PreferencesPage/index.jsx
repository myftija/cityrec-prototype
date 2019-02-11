import React from 'react';
import { StandardRow, StandardSmallContainer } from '../../../CommonStyles';
import { CenteredContainer, BannerWithMargin } from '../styles';
import SmallCity from './SmallCity';
import Spinner from '../../../components/Spinner';
import HoverInfoIndicator from '../../../components/HoverInfoIndicator';
import styled from 'styled-components';

const RefreshMessageContainer = styled.div`
  display: inline-flex;
  margin-top: 10px;
  align-items: center;

  & span {
    font-size: 14px;
    color: ${p => p.theme.primaryText};
    text-align: center;
  }
`;

const StyledButton = styled.button`
  background-color: transparent;
  transition: all 200ms ease-in-out;
  font-size: 10px;
  font-weight: 700;
  padding: 6px 25px;
  letter-spacing: 2.8px;
  color: ${p => p.theme.secondaryText};
  border: 1px solid ${p => p.theme.secondaryText}80;
  border-radius: 100px;
  cursor: pointer;
  text-transform: uppercase;
  margin-left: 15px;

  &, :hover, :focus, :active {
    outline: none;
  }

  &:hover {
    background-color: #fff3cd;
    color: #856404;
    border-color: #efd892;
  }
`;

class PreferencesPage extends React.Component {
  componentDidMount() {
    const { cities, getCities, startTimeTracking } = this.props;
    if (cities.length === 0) {
      getCities();
      startTimeTracking();
    }
  }

  toggleCitySelection = cityId => () => {
    const { toggleCitySelection } = this.props;
    toggleCitySelection(cityId);
  }

  onRefreshCitiesClick = () => {
    const { recordCityRefresh, resetSelectedCities, getCities } = this.props;
    recordCityRefresh();
    resetSelectedCities();
    getCities();
  }

  render () {
    const { cities, selectedCities, isLoading } = this.props;
    const renderedCities = cities.map(c => 
      <StandardSmallContainer key={c.id}>
        <SmallCity city={c} onClick={this.toggleCitySelection(c.id)} isSelected={selectedCities.has(c.id)}/>
      </StandardSmallContainer>);

    return (
      <CenteredContainer>
        <BannerWithMargin margin={15}>Tell us your preferences! Please select 3 to 5 cities from the list below, which you like best.</BannerWithMargin>      
        <StandardRow>
          <HoverInfoIndicator>By telling us which cities best reflect your preferences, we can model your choices and give you relevant recommendations. Your selections can also be cities that you have already visited! </HoverInfoIndicator>
        </StandardRow>
        {isLoading
          ? <Spinner />
          :
            <React.Fragment>
              <StandardRow>{renderedCities}</StandardRow>
              <RefreshMessageContainer>
                <span>Didn't recognize any of the cities above?</span>
                <StyledButton onClick={this.onRefreshCitiesClick}>Try out other cities</StyledButton>
              </RefreshMessageContainer>
            </React.Fragment>
        }
      </CenteredContainer>
    );
  }
}

export default PreferencesPage;