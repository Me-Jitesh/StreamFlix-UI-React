import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import VideoUpload from './components/VideoUpload';
import HomeFeed from './components/HomeFeed';
import { Toaster } from 'react-hot-toast';
import { Button } from 'flowbite-react';
function App() {
    return (
        <Router>
            <div className='app'>
                <Toaster />
                <nav className='flex justify-between px-6 py-12'>
                    <h1 className='font-black text-4xl text-gray-500'>
                        Stream<span className='text-orange-500'>Flix</span>
                    </h1>
                    <div className='flex space-x-4'>
                        <Link className='text-white' to='/'>
                            <Button gradientDuoTone="purpleToBlue" outline pill >
                                Video Upload
                            </Button>
                        </Link>
                        <Link className='text-white' to='/feed'>
                            <Button gradientDuoTone="redToYellow" outline pill>
                                Watch Videos
                            </Button>
                        </Link>
                    </div>
                </nav>
                <div className="flex flex-col items-center justify-center space-y-2 py-6">

                    <Routes>
                        {/* Route for VideoUpload (Landing Page) */}
                        <Route path='/' element={<VideoUpload />} />
                        {/* Route for Feed */}
                        <Route path='/feed' element={<HomeFeed />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
