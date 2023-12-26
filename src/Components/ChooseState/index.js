import React, { useEffect } from 'react';
import cities from '../../Data/in.json';
import axios from 'axios';
import { UseWeatherAppContext } from '../../Context/Context';

const ChooseStateComponents = () => {
  const { state: { city }, dispatch } = UseWeatherAppContext();

  const handleChange = (e) => {
    const selectedCity = cities.find((c) => c.city === e.target.value);
    dispatch({
      type: 'SET_CITY',
      payload: { ...selectedCity }
    });
  };

  const getWeatherDataURL = (lat, long) => {
    const APIKEY = '34480b98aa332da53123a0ac63a4ea9d';
    const exclude = 'hourly,minutely';
    return `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=${exclude}&units=metric&lang=tr&appid=${APIKEY}`;
  };

  const fetchData = async () => {
    try {
      const lat = city && city.lat ? city.lat : '';
      const long = city && city.lng ? city.lng : '';
      const URL = getWeatherDataURL(lat, long);

      const response = await axios.get(URL);
      const _daily = response.data.daily;

      dispatch({
        type: 'SET_DAILY',
        payload: _daily
      });
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [city]);

  return (
    <div className='stateWrap'>
      <select className='stateMenu' defaultValue={city} onChange={handleChange}>
        {cities &&
          cities.length > 0 &&
          cities.map((city) => (
            <option key={`${city.population}${city.lat}`} value={city.city}>
              {city.city} - {city.admin_name}
            </option>
          ))}
      </select>
    </div>
  );
};

export default ChooseStateComponents;

