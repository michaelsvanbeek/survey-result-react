import React, {
  useEffect,
  useState,
} from 'react';
import { Link } from 'react-router-dom';
import { getSurveys } from '../api/SurveyAPI';

const SurveyList = (props) => {
  const [surveys, setSurveys] = useState([]);
  useEffect(() => {
    getSurveys().then(setSurveys)
  }, []);

  return (
    <div>
      <h1>Surveys</h1>
      {
        surveys.map((survey) => (
            <Link to={"/survey/" + survey._id} key={survey._id}>
              <h3>{survey.name}</h3>
            </Link>
          )
        )
      }
    </div>
  );
}

export default SurveyList;