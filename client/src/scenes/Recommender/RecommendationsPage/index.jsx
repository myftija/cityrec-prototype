import React from 'react';
import { PageTitle, PageSubtitle, StandardRow, StandardSmallContainer, StandardLargeContainer } from '../../../CommonStyles';
import { CenteredContainer } from '../styles';
import CityTag from './CityTag';
import CityDetailsPane from './CityDetailsPane';
import { CityTagsContainer, HintMessage, SurveyFootnote } from './styles';
import Spinner from '../../../components/Spinner';
import * as Survey from "survey-react";
import "survey-react/survey.css";
import queryString from 'query-string';
import once from 'lodash/once';
import isEqual from 'lodash/isEqual';

const questionsSet = {
  elements: [
    { 
      type: "radiogroup",
      name: "recommendation",
      title: "Based on your preferences, which of the recommended travel destinations would you have selected?",
      isRequired: true,
      choices: [
        'Neither of them'
      ]
    },
    {
      type: "matrix",
      name: "evaluation",
      title: "* Please indicate your level of agreement with the following statements",
      isAllRowRequired: true,
      columns: [
        {
          value: "Strongly Disagree",
          text: "Strongly Disagree"
        },
        {
          value: "Disagree",
          text: "Disagree"
        },
        {
          value: "Neutral",
          text: "Neutral"
        },
        {
          value: "Agree",
          text: "Agree"
        },
        {
          value: "Strongly Agree",
          text: "Strongly Agree"
        }
      ],
      rows: [
        {
          value: "interest",
          text: "The travel destinations recommended to me by CityRec, matched my interests"
        },
        {
          value: "novelty",
          text: "The recommender system helped me discover new travel destinations"
        },
        {
          value: "explanation",
          text: "I understood why the travel destinations were recommended to me"
        },
        {
          value: "preference",
          text: "I found it easy to tell the system what my preferences are"
        },
        {
          value: "tasteProfile",
          text: "I found it easy to modify my taste profile in this recommender system"
        },
        {
          value: "interface",
          text: "The layout and labels of the recommender interface are adequate"
        },
        {
          value: "satisfaction",
          text: "Overall, I am satisfied with this recommender system"
        },
        {
          value: "futureUse",
          text: "I would use this recommender system again, when looking for travel destinations"
        },
      ]
    },
    { type: "radiogroup",
      name: "travelingFrequency",
      title: "How often do you travel for vacation? (a period of at least one night spent away from home)",
      isRequired: true,
      choices: [
        'Less than once a year',
        'Once a year',
        '2-4 times a year',
        '5-7 times a year',
        'More than 7 times a year',
      ]
    },
    {
      type: "matrix",
      name: "predictorRelevance",
      title: "* Please indicate how important each of the aspects below is to you, when choosing a travel destination",
      isAllRowRequired: true,
      columns: [
        {
          value: "Not important at all",
          text: "Not important at all"
        },
        {
          value: "Slightly important",
          text: "Slightly important"
        },
        {
          value: "Important",
          text: "Important"
        },
        {
          value: "Very important",
          text: "Very important"
        },
        {
          value: "Extremely important",
          text: "Extremely important"
        }
      ],
      rows: [
        {
          value: "cost",
          text: "Cost"
        },
        {
          value: "weather",
          text: "Weather"
        },
        {
          value: "food",
          text: "A variety of cafes and restaurants"
        },
        {
          value: "artsAndEntertainment",
          text: "Plentiful cultural and entertainment attractions"
        },
        {
          value: "outdoorsAndRecreation",
          text: "A multitude of outdoor activities"
        },
        {
          value: "nightlife",
          text: "Plentiful nightlife hotspots"
        },
        {
          value: "shopsAndServices",
          text: "An abundance of shops and services"
        },
      ]
    },
    { type: "radiogroup",
      name: "gender",
      title: "Please select your gender",
      isRequired: true,
      choices: [
        'Male',
        'Female',
        'Other / prefer not to disclose',
      ]
    },
    { type: "radiogroup",
      name: "ageGroup",
      title: "Please select your age group",
      isRequired: true,
      choices: [
        '-20',
        '21-30',
        '31-40',
        '41-50',
        '51-60',
        '61-',
        'Prefer not to disclose',
      ]
    },
    {
      "type": "comment",
      "name": "comment",
      isRequired: false,
      title: "Additional comments regarding your experience with the recommender system (optional)"
    }
  ]
};

const questionsSubset = {
  elements: [
    {
      type: "radiogroup",
      name: "recommendation",
      title: "Based on your preferences, which of the recommended travel destinations would you have selected?",
      isRequired: true,
      colCount: 2,
      choices: [
        'None of them'
      ]
    },
    {
      type: "radiogroup",
      name: "interest",
      title: "The travel destinations recommended to me by CityRec, matched my interests",
      isRequired: true,
      colCount: 3,
      choices: [
        'Strongly agree',
        'Agree',
        'Neutral',
        'Disagree',
        'Strongly disagree',
      ]
    },
  ]
};

class RecommendationsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCityIndex: 0,
      model: new Survey.Model({ elements: [] }),
      prevCityIds: []
    }
  }

  componentDidMount() {
    const { shouldResetRecommenderProgress, resetRecommenderProgress, endTimeTracking } = this.props;
    if (shouldResetRecommenderProgress()) {
      resetRecommenderProgress();
    } else {
      endTimeTracking();
    }
  }

  // bad hacky solution :(
  static getDerivedStateFromProps(props, state) { 
    const cityIds = props.cities.map(c => c.id);
    if (!isEqual(cityIds, state.prevCityIds)) {
      const { location } = props;
      const urlParameters = queryString.parse(location.search);
      const surveyType = urlParameters.sv;
      
      let questions;
      if (surveyType === 'short') {
        questions = questionsSubset;
      } else {
        questions = questionsSet;
      }

      const model = new Survey.Model(questions);
      model.getQuestionByName("recommendation").choices = [
        ...props.cities.slice(0,5).map((c, i) => `${c.name}|${c.name} - recommendation #${i+1}`),
        'none|None of them'
      ];

      return { model, prevCityIds: cityIds };
    }
    return null;
  }
  
  onComplete = (survey, options) => {
    const { submitSurvey } = this.props;
    submitSurvey(survey.data);
    console.log('survey submitted...');
  }
  onCompleteOnce = once(this.onComplete);


  onCityTagClick = (index) => () => {
    this.setState({ selectedCityIndex: index });
  }

  render() {
    const { cities, isLoading, location, surveySubmitted } = this.props;
    const { selectedCityIndex, model } = this.state;
    const renderedCityTags = (cities.slice(0,5)).map((c, i) => 
      <CityTag key={c.id} city={c} rank={i+1} onClick={this.onCityTagClick(i)} isSelected={i === selectedCityIndex} />); 

    const maxSimilarity = cities[0] ? 1/cities[0].distance : 0;

    const urlParameters = queryString.parse(location.search);
    const surveyType = urlParameters.sv;

    return (
      isLoading
      ? <CenteredContainer><Spinner /></CenteredContainer>
      :
        <CenteredContainer>
          <PageTitle>Our top recommendations for you</PageTitle>
          <PageSubtitle>Select a city to explore more information about it</PageSubtitle>

          <StandardRow>
            <StandardSmallContainer className="col-sm-12 col-md-12 offset-lg-1 col-lg-3">
              <CityTagsContainer>
                {renderedCityTags}
              </CityTagsContainer>
            </StandardSmallContainer>
            <StandardLargeContainer className="col-sm-12 col-md-12 col-lg-7">
              <CityDetailsPane city={cities[selectedCityIndex] || {}}  maxSimilarity={maxSimilarity} />
            </StandardLargeContainer>
          </StandardRow>

          {surveyType === 'short'
            ?
              <StandardRow>
                <StandardLargeContainer className="col-sm-12 col-md-12 offset-lg-1 col-lg-10">
                  <Survey.Survey
                    model={model}
                    onComplete={this.onCompleteOnce}
                    completeText="Submit answers"
                    completedHtml="<span id='title'>Thank you for the feedback!</span><span id='subtitle'>Click on 'Start over' to get change your preferences and get new recommendations.</span>"
                  />
                </StandardLargeContainer>
              </StandardRow>
            :
              <React.Fragment>
                <PageTitle style={{marginTop: '15px'}}>Research survey</PageTitle>
                {!surveySubmitted && 
                  <HintMessage>Please don’t forget to complete the survey. We greatly appreciate your help in our research. Afterwards, we will provide you an option to further explore CityRec and get new recommendations, without having to fill out the survey once again.</HintMessage>
                }
                <StandardRow>
                  <StandardLargeContainer className="col-sm-12 col-md-12 col-lg-12">
                    <Survey.Survey
                      model={model}
                      onComplete={this.onCompleteOnce}
                      completeText="Submit answers"
                      completedHtml="<span id='title'>Thank you for taking the time to complete this survey!</span><span id='subtitle'>We truly value the information you provided us with. Your responses will contribute to our research and help us find new ways how to improve tourism recommender systems! <br /> You can now further explore CityRec by clicking on 'Start over'. You will not be asked to fill out the survey again.</span>"
                    />

                    {!surveySubmitted && 
                      <SurveyFootnote>Note: questions marked with * are required!</SurveyFootnote>
                    }
                  </StandardLargeContainer>
                </StandardRow>
              </React.Fragment>
          }
        </CenteredContainer>
    );
  }
}

export default RecommendationsPage;