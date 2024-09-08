import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { clientCredentials } from 'axios-oauth-client';



function App() {
  const serviceURL = window?.configs?.apiUrl ? window.configs.apiUrl : "/";
  // consumerKey, consumerSecret and tokenUrl represent variables to which respective environment variables were read
  const getClientCredentials = clientCredentials(
    axios.create(),
    window.configs.tokenUrl,
    window.configs.consumerKey,
    window.configs.consumerSecret
  );
  
  const data = {
    name: "John Doe",
    business_name: "Doe Enterprises",
    email: "johndoe@example.com",
    website: "https://www.doeenterprises.com"
  };
  const [data2, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const auth = await getClientCredentials();
        const accessToken = auth.access_token;
        console.log(serviceURL)
        console.log(accessToken)
        const response = await axios.get(`${serviceURL}/api/businesses`,data, {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }});
        setData(response.data);
        console.log(data2)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
