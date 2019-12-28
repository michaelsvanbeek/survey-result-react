import React, {
  useEffect,
  useState,
} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const SurveyList = (props) => {
  const [surveys, setSurveys] = useState([]);
  useEffect(() => {
    async function fetchSurveys() {
      const result = await axios(
        'http://localhost:3000/surveys/'
      );
      setSurveys(result.data);
    }
    fetchSurveys();
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