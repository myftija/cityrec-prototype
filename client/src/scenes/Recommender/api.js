import { get, post } from 'axios';
import City from './city.model';

export const postSurvey = async (surveyData) => {
  try {
    const response = await post('/api/survey', surveyData);
    return response.data;
  } catch (error) {
    //
  }
}

export const fetchCities = async () => {
  try {
    const response = await get('/api/cities');
    const cities = response.data.map(City.parse);
    return cities;
  } catch (error) {
    return [];
  }
}

export const fetchRecommendations = async selectedCities => {
  try {
    const params = new URLSearchParams();
    for (const city of selectedCities) {
      params.append('selected_cities', city)
    }

    const response = await get('/api/recommendations', { params });
    const cities = response.data.map(City.parse);
    return cities;
  } catch (error) {
    return [];
  }
}

export const fetchRefinedRecommendations = async (selectedCities, refinements) => {
  try {
    const params = new URLSearchParams();
    for (const city of selectedCities) {
      params.append('selected_cities', city)
    }

    for (let [option, value] of Object.entries(refinements)) {
      params.append(option, value)
    }

    const response = await get('/api/recommendations', { params });
    const cities = response.data.map(City.parse);
    return cities;
  } catch (error) {
    return [];
  }
}