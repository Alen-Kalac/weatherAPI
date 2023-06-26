import React, { useState } from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import "./style.css"

const Home = () => {
  const fetchData = async (submittedValue) => {
    const response = await axios.get(
      `http://api.weatherapi.com/v1/current.json?key=9d5f5a09d6f740b2ad4142608232406&q=${submittedValue}&aqi=no`
    );
    const data = response.data;
    return data;
  };

  const [inputValue, setInputValue] = useState('');
  const [submittedValue, setSubmittedValue] = useState('Novi Pazar');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleButtonClick = () => {
    setSubmittedValue(inputValue);
    setInputValue('');
  };

  const { data, isLoading, isError, error } = useQuery(['weather', submittedValue], () =>
    fetchData(submittedValue)
  );

  if (isLoading) {
    return <div className="loader">Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  let backgroundURL = '';
  const cloudCoverage = data.current.cloud;

  switch (true) {
    case cloudCoverage >= 0 && cloudCoverage <= 20:
      backgroundURL = 'https://img.freepik.com/free-photo/beautiful-white-cloud_74190-3975.jpg?w=1380&t=st=1687621694~exp=1687622294~hmac=553a099fbfb9066d8b737648aac6778cdf71d38259f53ccbc6fd6f06c8b9872c';
      break;
    case cloudCoverage > 20 && cloudCoverage <= 40:
      backgroundURL = 'https://img.freepik.com/free-photo/sun-sunlight-bright-outdoor-sky_1127-2391.jpg?w=1380&t=st=1687621665~exp=1687622265~hmac=d17bd1ca473a8b04a0cf2b9591d4453c66c3329ba8f8ef1c10eb11fcea320505';
      break;
    case cloudCoverage > 40 && cloudCoverage <= 60:
      backgroundURL = 'https://img.freepik.com/free-photo/photo-field-with-clouds-blue-sky_188544-18646.jpg?t=st=1687621644~exp=1687622244~hmac=689e2b961989c38abe14119e367a7cc9d5d54f0a5852a8fb5dff8a31559b10e2&w=1380';
      break;
    case cloudCoverage > 60 && cloudCoverage <= 80:
      backgroundURL = 'https://img.freepik.com/free-photo/sky-covered-with-clouds_1122-742.jpg?w=1380&t=st=1687621620~exp=1687622220~hmac=b66b3c534d1c83c05b87fc675232d79f10e142c2eb0164a41a0ed8b239527303';
      break;
    case cloudCoverage > 80 && cloudCoverage <= 100:
      backgroundURL = 'https://www.rochesterfirst.com/wp-content/uploads/sites/66/2021/04/black-rain-abstract-dark-power-1-1.jpg?w=900';
      break;
    default:
      backgroundURL = 'Placeholder';
      console.log('There seems to be a problem with the API data');
  }

  return (
    <div
      className="background"
      style={{
        backgroundImage: `url(${backgroundURL})`,
        backgroundSize: 'cover',
      }}
    >
      <img className='lightning' src="https://www.seekpng.com/png/full/100-1001382_lightning-png-transparent-background-wwwpixsharkcom-lightning.png" alt="" />
      <div className="content">
        <div className="search-bar">
          <input type="text" value={inputValue} onChange={handleInputChange} />
        <button onClick={{handleButtonClick}}>Search</button>
        </div>
        <div className="weather-report">
          <div className="report-info">
            <p className="city-name">Weather for: {data.location.name}</p>
            <p>
              {data.current.condition.text}
              <img src={data.current.condition.icon} alt="" />
            </p>
            <p>{data.current.temp_c}C°</p>
            <p>Cloud coverage: {data.current.cloud}%</p>
          </div>
        </div>
        <div className="weather-update">
          <p>Last update: {data.current.last_updated}</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
