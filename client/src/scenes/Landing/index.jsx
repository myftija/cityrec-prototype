import React from 'react'
import styled from 'styled-components';
import { PageTitle, PageSubtitle } from '../../CommonStyles';
import { NextButton, Icon } from '../Recommender/Stepper/styles';
import skyline from './skyline.jpg';
import queryString from 'query-string';
import Checkbox from '../../components/Checkbox';

const Wrapper = styled.div`
  text-align: center;
`;

const Container = styled.div.attrs({
  className: 'col-xs-12 col-sm-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3'
})``;

const WhitePageTitle = styled(PageTitle)`
  color: white;
`;
const WhitePageSubtitle = styled(PageSubtitle)`
  color: white;
`;

const Card = styled.div`
  background-color: white;
  box-shadow: 0 5px 11px 0 #4040C6;
  border-radius: 10px;
  padding: 35px 35px 20px;
  text-align: left;
  color: ${p => p.theme.primaryText};
  margin: 20px 80px 10px;
  @media (max-width: 1300px) {
    margin: 20px 0 10px;
  }

  > span + span {
    margin-top: 20px;
  }
  > span {
    font-size: 14px;
    line-height: 26px;
    display: block;
    z-index: 1;
  }
  > span#head {
    font-weight: 700;
    font-size: 17px;
  }

  & a {
    color: ${p => p.theme.primary};
    transition: 100ms all ease-in-out;
    font-weight: 700;

    &:hover {
      color: ${p => p.theme.secondary};
    }
  }

  background-image: url(${skyline});
  background-repeat: no-repeat;
  background-position-y: bottom;
  background-size: 100%;
`;


const StartButton = styled(NextButton).attrs({
  enabled: true
})`
  background: ${p => p.theme.primary};
  color: white;
  font-size: 13px;
  padding: 16px 72px;
  border-radius: 100px;
  margin-top: 40px;
  z-index: 200 !important;
  display: block;

  & ${Icon} {
    background-color: white;;
  }

  :hover {
    background: ${p => p.theme.secondary};
  }
`;

const Footprint = styled.span`
  display: block;
  font-size: 11px;
  color: #FFFFFF99;
  padding-bottom: 10px;
`;

const ContactDetails = styled.span`
  display: block;
  font-size: 12px;
  color: #FFFFFFD9;

  & a {
    text-decoration: underline;
    color: #FFFFFF;
    transition: 200ms all ease-in-out;

    &:hover {
      color: #c3d6ff;
    }
  }

  > span + span {
    margin-left: 10px;
  }
`;

const AgreementField = styled.div`
  margin: 15px 0 10px;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  text-align: center;

  > span {
    font-size: 13px;
    margin-left: 10px;
    font-weight: 700;
  }
`;

const Warning = styled.div`
  background: ${p => p.theme.red}4D;
  color: ${p => p.theme.darkRed};
  border-radius: 4px;
  font-weight: 700;
  font-size: 12px;
  padding: 3px 7px;
  width: fit-content;
  height: 24px;
  margin-bottom: -24px;
`;

const ModifiedCheckbox = styled(Checkbox)`
  ${AgreementField}:hover & {
    background-color: ${p => p.isChecked ? p.theme.checkbox.hover.checked.background : p.theme.checkbox.hover.unchecked.background};
    border: 3px solid ${p => p.isChecked ? p.theme.checkbox.hover.checked.border : p.theme.checkbox.hover.unchecked.border};
  }
`;

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      agreement: false,
      startActionAttempted: false
    };
  }

  onStartClick = () => {
    const { agreement } = this.state;
    if (!agreement) {
      this.setState({ startActionAttempted: true });
      return;
    }

    const { match, history, location } = this.props;
    const route = match.path === '/' ? '/rec/preferences' : `${match.path}/rec/preferences`;
    const urlParameters = queryString.parse(location.search);
    if ('v' in urlParameters) {
      history.push(`${route}${location.search}`) 
    } else {
      const randomVersion = Math.floor((Math.random() * 2) + 1);
      const versionParameter = location.search === '' ? `?v=${randomVersion}` : `&v=${randomVersion}`
      history.push(`${route}${location.search}${versionParameter}`) 
    }
  }

  onAgreementClick = () => {
    this.setState({ agreement: !this.state.agreement });
  }

  render() {
    const { agreement, startActionAttempted } = this.state;
    return(
      <Wrapper>
        <WhitePageTitle>A prototype recommender system for cities</WhitePageTitle>
        <WhitePageSubtitle>User study</WhitePageSubtitle>
        <Container>
          <Card>
            <span id="head">Dear participant,</span>
            <span>thank you for taking part in our user study on tourism recommender systems.</span>
            <span>In this prototype application, you can get recommendations for travel destinations by expressing your travel preferences. After interacting with the system, we’ll ask you to fill out a short survey. Your responses will greatly contribute to our research and help us find new ways how to improve tourism recommender systems.</span>
            <span>CityRec was developed to conduct this user study in the scope of a Master’s thesis at the Technical University of Munich (TUM). If you have any questions or concerns, please don’t hesitate to contact us via <a href="mailto:saadi.myftija@tum.de,linus.dietz@tum.de">email.</a></span>
            <span>All gathered data is anonymized immediately and cannot be traced back to any individual.</span>
            <AgreementField onClick={this.onAgreementClick}>
              <ModifiedCheckbox isChecked={agreement} />
              <span>I agree to participate in the user study</span>
            </AgreementField>
            {!agreement && startActionAttempted &&
              <Warning>You must first agree to the statement above!</Warning>
            }
            <StartButton onClick={this.onStartClick}>
              <span>Start</span>
              <Icon />
            </StartButton>
          </Card>
          <ContactDetails>
            <span>Thesis author: <a href="mailto:saadi.myftija@tum.de">Saadi Myftija</a></span>
            <span>•</span>
            <span>Thesis advisor: <a href="mailto:linus.dietz@tum.de">Linus Dietz</a></span>
          </ContactDetails>
          <Footprint>Munich, 2018</Footprint>
        </Container>
      </Wrapper>
    );
  };
}

export default Landing;