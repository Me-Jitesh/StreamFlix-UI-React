import './App.css'
import VideoUpload from './components/VideoUpload'
import { Toaster } from 'react-hot-toast';


function App() {
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

    </>
  )
}

export default App
