import React from 'react';
import styled from 'styled-components'
import { ModifiedCard } from '../styles';
import { SerifBullet } from '../../../../CommonStyles';
import InfoBullet from '../../../../components/InfoBullet';
import CostIndicator from '../../../../components/CostIndicator';
import MatchLevelIndicator from '../../../../components/MatchLevelIndicator';
import { ProgressBarWithMargin, TemperatureField } from '../../styles';

const MAP_KEY = 'Nbx46lwGXYYiagLOQyuAM8Y9PHBimLAn'

const Container = styled(ModifiedCard)`
  min-height: 350px;
  height: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  cursor: auto;
`;

const RichContentContainer = styled.div`
  width: 100%;
  display: inline-flex;
  flex-grow: 1;
  margin-bottom: 10px;

  > div#image {
    background-color: ${p => p.theme.lightblue};
    background-image: url(${p => p.pictureUrl});
    background-size: cover;
    background-position: center; 
    width: 30%;
    min-height: 100%;
    margin-right: 10px;
    border-radius: 2px;
  }

  > div#map {
    background-image: url(${p => p.mapUrl});
    background-color: ${p => p.theme.lightblue};
    background-size: cover;
    background-position: center; 
    width: 70%;
    min-height: 100%;
    border-radius: 2px;
    display: block;
  }

  @media (max-width: 576px) {
    > div#image {
      width: 50%;      
    }
    > div#map {
      width: 50%;      
    }
  }
`;

const DetailsContainer = styled.div`
  width: 100%;
  display: inline-flex;

  > div {
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    > * + * {
      margin-top: 8px;
    }
  }

  > div:first-child {
    margin-right: 5px;
  }
  > div:last-child {
    margin-left: 5px;
  }
`;

const CityDetailsPane = props => {
  const { city, maxSimilarity } = props;
  const mapUrl = `https://www.mapquestapi.com/staticmap/v5/map?key=${MAP_KEY}&locations=${city.name && city.name.split(' ').join('+')},${city.country && city.country.split(' ').join('+')}|marker-sm-2E71F0&zoom=5&type=light&size=500,250@2x`
  return(
    <Container>
      <RichContentContainer pictureUrl={city.pictureUrl} mapUrl={mapUrl}>
        <div id="image"></div>
        <div id="map"></div>
      </RichContentContainer>

      <DetailsContainer>
        <div>
          <InfoBullet label="match with your preferences">
            <MatchLevelIndicator value={(1/city.distance)/maxSimilarity} symbolCount={10} />
          </InfoBullet>
          <InfoBullet label="price level">
            <CostIndicator value={city.costOfLivingIndexBin/5} symbolCount={5} />
          </InfoBullet>
          <InfoBullet label="climate type">
            <SerifBullet>{city.climateType}</SerifBullet>
          </InfoBullet>
          <InfoBullet label="average temperature">
            <TemperatureField>
              <span>{Number(city.averageTemperature).toFixed(1)}°C</span>
              <ProgressBarWithMargin value={city.averageTemperature / 30.0} margin={0} fillColor={'#5D26CF'}/>
            </TemperatureField>
          </InfoBullet>
        </div>
        <div>
          <InfoBullet label="food">
            <ProgressBarWithMargin value={city.food} margin={5}/>
          </InfoBullet>
          <InfoBullet label="arts and entertainment">
            <ProgressBarWithMargin value={city.artsAndEntertainment} margin={5}/>
          </InfoBullet>
          <InfoBullet label="outdoors and recreation">
            <ProgressBarWithMargin value={city.outdoorsAndRecreation} margin={5}/>
          </InfoBullet>
          <InfoBullet label="nightlife">
            <ProgressBarWithMargin value={city.nightlife} margin={5}/>
          </InfoBullet>
        </div>
      </DetailsContainer>
    </Container>
  );
}

export default CityDetailsPane;