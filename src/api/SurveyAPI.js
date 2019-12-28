import axios from 'axios';

export const getSurveys = () => {
  return axios
    .get('http://localhost:3000/surveys/')
    .then((result) => result.data);
};

export const getSurvey = (surveyId) => {
  return axios
    .get('http://localhost:3000/surveys/' + surveyId)
    .then((result) => result.data);
};

export const putSurvey = (survey) => {
  return axios
    .put('http://localhost:3000/surveys/' + survey._id, survey)
    .then((result) => result.data);
};
