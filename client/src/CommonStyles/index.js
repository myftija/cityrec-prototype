import styled from 'styled-components';

export const StandardContainer = styled.div.attrs({
  className: 'container'
})``;

export const StandardRow = styled.div.attrs({
  className: 'row'
})`
  margin-right: -20px !important;
  margin-left: -20px !important;

  @media (max-width: 576px) {
    margin-left: inherit !important;
    margin-right: inherit !important;
  }
`;

export const StandardSmallContainer = styled.div.attrs({
  className: 'col-sm-6 col-md-4 col-lg-3'
})`
  padding: 5px !important;

  @media (max-width: 576px) {
    margin-left: inherit !important;
    margin-right: inherit !important;
  }
`;

export const StandardLargeContainer = styled.div.attrs({
  className: 'col-md-7'
})`
  padding: 5px !important;
`;

export const PageTitle = styled.h1`
  font-size: 20px;
  font-weight: 700;
  color: ${p => p.theme.primaryText};
`;

export const PageSubtitle = styled.h2`
  font-size: 9px;
  letter-spacing: 0.8px;
  color: ${p => p.theme.secondaryText};
  font-weight: 600;
  text-transform: uppercase;
`;

// ---- Card related styles ---- //

export const Card = styled.div`
  background-color: #FFFFFF;
  box-shadow: 0 5px 11px 0 rgba(230,234,247,0.82);
  border-radius: 4px;
  text-align: left;
  transition: all 200ms ease-in-out;
  cursor: pointer;
  overflow: hidden;

  &:hover {
    box-shadow: 0 7px 6px 0 #C8CFE3;
    transform: translateY(-1px)
  }
`;

export const CardHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;

  & span#title {
    display: block;
    font-size: 15px;
    color: ${p => p.theme.primaryText};
    font-weight: 700;
  }

  & span#subtitle {
    display: block;
    font-size: 9px;
    color: ${p => p.theme.secondaryText};
    text-transform: uppercase;
    margin-top: -2px;
  }
`;

export const CardBody = styled.div`
  width: 100%;
  display: flex;
  align-items: stretch;

  > div {
    display: inline-block;
  }
`;

export const SerifBullet = styled.span`
  font-family: 'PT Serif', serif;
  font-style: italic;
  font-weight: 400;
  font-size: 14px;
  color: ${p => p.theme.secondaryText};
  line-height: 16px;
  display: block;
`;

