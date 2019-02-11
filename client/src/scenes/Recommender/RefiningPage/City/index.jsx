import React from 'react';
import styled from 'styled-components';
import InfoBullet from '../../../../components/InfoBullet';
import { Card, CardHead, CardBody, SerifBullet } from '../../../../CommonStyles';
import CostIndicator from '../../../../components/CostIndicator';
import { ProgressBarWithMargin, TemperatureField } from '../../styles';

const CardBodyVertical = styled(CardBody)`
  flex-direction: column;
`;

const CityImage = styled.div`
  background-color: #E9EAEE;
  background-image: url(${p => p.pictureUrl});
  background-size: cover;
  height: 120px;
  width: 100%;
`;

const Content = styled.div`
  padding: 10px;

  > * + * {
    margin-top: 8px;
  }
`;

const ModifiedCard = styled(Card)`
  cursor: default;

  &:hover {
    box-shadow: 0 5px 11px 0 rgba(230,234,247,0.82);
    transform: none;
  }
`;

const City = props => {
  const { city } = props;

  return (
      <ModifiedCard>
        <CardHead>
          <div>
            <span id="title">{city.name}</span>
            <span id="subtitle">{city.country}</span>
          </div>
        </CardHead>

        <CardBodyVertical>
          <CityImage pictureUrl={city.pictureUrl} />
          <Content>
            <InfoBullet label="price level">
              <CostIndicator value={city.costOfLivingIndexBin/5} symbolCount={5}/>
            </InfoBullet>
            <InfoBullet label="climate type">
              <SerifBullet>{city.climateType}</SerifBullet>
            </InfoBullet>
            <InfoBullet label="average temperature">
              <TemperatureField>
                <span>{city.averageTemperature.toFixed(1)}°C</span>
                <ProgressBarWithMargin value={city.averageTemperature / 30.0} margin={0} fillColor={'#5D26CF'}/>
              </TemperatureField>
            </InfoBullet>
            <InfoBullet label="food">
              <ProgressBarWithMargin value={city.food} margin={5} />
            </InfoBullet>
            <InfoBullet label="arts and entertainment">
              <ProgressBarWithMargin value={city.artsAndEntertainment} margin={5} />
            </InfoBullet>
            <InfoBullet label="outdoors and recreation">
              <ProgressBarWithMargin value={city.outdoorsAndRecreation} margin={5} />
            </InfoBullet>
            <InfoBullet label="nightlife">
              <ProgressBarWithMargin value={city.nightlife} margin={5} />
            </InfoBullet>
          </Content>
        </CardBodyVertical>
      </ModifiedCard>
  );
}

export default City;