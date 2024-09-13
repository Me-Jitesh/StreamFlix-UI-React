import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css'
import { Toaster } from 'react-hot-toast';
import VideoUpload from './components/VideoUpload'
import HomeFeed from './components/HomeFeed';


function App() {

  const [ipAddress, setIpAddress] = useState('');

  useEffect(() => {
    // Function to fetch IP address
    const fetchIpAddress = async () => {
      try {
        // Fetch IP from an external service ipify
        const response = await axios.get('https://api.ipify.org?format=json');
        const ip = response.data.ip;

        setIpAddress(ip);

        // Send IP address to the backend
        await sendIpToBackend(ip);
      } catch (error) {
        console.error('Error fetching IP address : ', error);
      }
    };

    fetchIpAddress();
  }, []);

  // Function to send IP address to the backend
  const sendIpToBackend = async (ip) => {
    try {
      const response = await axios.get(`https://streamflix.koyeb.app/api/v1/visitor/save/${ip}`);
      console.log('IP address sent to backend : ', response.data);
    } catch (error) {
      console.error('Error sending IP to backend : ', error);
    }
  };

  return (
    <>
      <div className='flex justify-center py-8 bg-indigo-400'>
        <h1 className='font-bold text-6xl  text-center text-zinc-800'>
          Welcome To <span className='text-violet-950'>Stream</span><span className='text-orange-500'>Flix</span>
        </h1>
      </div>


      <div className="flex flex-col items-center justify-center space-y-2 py-6">
        <Toaster />
        <VideoUpload />
      </div>

      <div className="flex flex-col items-center justify-center space-y-2 py-6">
        <HomeFeed />
      </div>

    </>
  )
}

export default App
