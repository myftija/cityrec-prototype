import React from 'react';
import styled from 'styled-components';
import Checkbox from '../../../../components/Checkbox';
import InfoBullet from '../../../../components/InfoBullet';
import { Card, CardHead, CardBody, SerifBullet } from '../../../../CommonStyles';
import CostIndicator from '../../../../components/CostIndicator';

const LeftSideContent = styled.div`
  width: 50%;
`;

const ModifiedCardHead = styled(CardHead)`
    & span#title {
    color: ${p => p.isSelected ? p.theme.darkGreen : p.theme.primaryText};
  }

  & span#subtitle {
    color: ${p => p.isSelected ? p.theme.green : p.theme.secondaryText};
  }
`;

const CityImage = styled.div`
  background-color: #E9EAEE;
  background-image: url(${p => p.pictureUrl});
  background-size: cover;
  height: 100%;
`;

const RightSideContent = styled.div`
  width: 50%;
  min-height: 107px;
  padding: 10px;
  border-top: 1px solid #E9EAEE; 

  > * + * {
    margin-top: 8px;
  }
`;

const ModifiedCheckbox = styled(Checkbox)`
  display: inline-block;
  margin-right: 7px;

  ${Card}:hover & {
    background-color: ${p => p.isChecked ? p.theme.checkbox.hover.checked.background : p.theme.checkbox.hover.unchecked.background};
    border: 3px solid ${p => p.isChecked ? p.theme.checkbox.hover.checked.border : p.theme.checkbox.hover.unchecked.border};
  }
`;

const SmallCity = props => {
  const { city, onClick, isSelected } = props;

  return (
      <Card onClick={onClick}>
        <ModifiedCardHead isSelected={isSelected}>
          <div>
            <span id="title">{city.name}</span>
            <span id="subtitle">{city.country}</span>
          </div>
          <ModifiedCheckbox isChecked={isSelected} />
        </ModifiedCardHead>

        <CardBody>
          <LeftSideContent>
            <CityImage pictureUrl={city.pictureUrl} />
          </LeftSideContent>
          <RightSideContent>
            <InfoBullet label="price level">
              <CostIndicator value={city.costOfLivingIndexBin/5} symbolCount={5}/>
            </InfoBullet>
            <InfoBullet label="climate type">
              <SerifBullet>{city.climateType}</SerifBullet>
            </InfoBullet>
          </RightSideContent>
        </CardBody>
      </Card>
  );
}

export default SmallCity;