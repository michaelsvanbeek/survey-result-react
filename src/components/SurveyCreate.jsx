import React, {
  useEffect,
  useState,
  Fragment,
} from 'react';
import { Redirect } from 'react-router-dom';
import { postSurvey } from '../api/SurveyAPI';
import { surveyTemplate } from '../classes/Survey';

const Survey = () => {
  const [surveyDef, setSurveyDef] = useState(surveyTemplate);
  useEffect(() => {
    postSurvey(surveyTemplate).then(setSurveyDef)
  }, []);
  console.log(surveyDef);
  if (surveyDef._id) {
    return (<Redirect to={"/survey/" + surveyDef._id + "/edit"} />);
  }
  return (
    <Fragment>
      Creating...
    </Fragment>
  );
}

export default Survey;