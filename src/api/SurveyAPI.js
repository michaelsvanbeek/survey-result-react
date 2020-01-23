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

export const postSurvey = (survey) => {
  return axios
    .post('http://localhost:3000/surveys/', survey)
    .then((result) => result.data);
};

export const putSurvey = (survey) => {
  let surveyId = survey._id;
  let updatedSurvey = {...survey};
  delete updatedSurvey._id;
  return axios
    .put('http://localhost:3000/surveys/' + surveyId, updatedSurvey)
    .then((result) => result.data);
};
