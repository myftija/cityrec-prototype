import styled from "styled-components";
import Banner from '../../components/Banner';
import ProgressBar from '../../components/ProgressBar';

export const CenteredContainer = styled.div.attrs({
  className: 'centered-container'
})`
  text-align: center;
  width: 100%;
  padding-bottom: 95px;
`;

export const BannerWithMargin = styled(Banner)`
  margin-bottom: ${p => p.margin}px;
`;

export const ProgressBarWithMargin = styled(ProgressBar)`
  margin-top: ${p => p.margin}px;
`;


export const TemperatureField = styled.div`
  display: inline-flex; 
  align-items: flex-end;
  width: 100%;
  margin-top: 1px;

  & span {
    background: ${p => p.theme.secondary};
    color: white;
    border-radius: 3px;
    padding: 0 3px;
    font-weight: 700;
    font-size: 10px;
    margin-right: 8px;
  }
`;