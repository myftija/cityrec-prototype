import styled from 'styled-components'
import { Card } from '../../../CommonStyles';

export const ModifiedCard = styled(Card)`
  &:hover {
    box-shadow: 0 5px 11px 0 rgba(230,234,247,0.82);
    transform: none;
  }
`;

export const CityTagsContainer = styled.div`
  display: flex;
  flex-direction: column;

  > * + * {
    margin-top: 10px;
  }
`;

export const BasicMessage = styled.span`
  font-size: 13px;
  color: ${p => p.themesecondaryText};
  text-align: center;
  display: block;
  margin-top: 15px;
`;

export const HintMessage = styled.h4`
  font-size: 14px;
  color: ${p => p.theme.primaryText};
  display: block;
  margin: auto;
  max-width: 900px;
  font-weight: 600;
  line-height: 18px;
  text-align: center;
  margin-bottom: 10px;
`;

export const StartOverButton = styled.button`
  background-color: transparent;
  transition: all 200ms ease-in-out;
  font-size: 10px;
  font-weight: 700;
  padding: 10px 40px;
  letter-spacing: 2.8px;
  color: ${p => p.theme.secondaryText};
  border: 1px solid ${p => p.theme.secondaryText}80;
  margin-top: 10px;
  border-radius: 100px;
  cursor: pointer;
  text-transform: uppercase;

  &, :hover, :focus, :active {
    outline: none;
  }

  &:hover {
    background-color: white;
  }
`;

export const SurveyFootnote = styled.div`
  padding-bottom: 3px;
  width: 100%;
  text-align: left;
  font-size: 12px;
`;