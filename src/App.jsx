import './App.css'
import VideoUpload from './components/VideoUpload'
import { Toaster } from 'react-hot-toast';


function App() {
  return (
    <>
      <div className='flex justify-center py-9 bg-blue-200'>
        <h1 className='font-bold text-6xl text-zinc-600'>
          Welcome To <span className='text-slate-900'>Stream</span><span className='text-red-800'>Flix</span>
        </h1>
      </div>


      <div className="flex flex-col items-center justify-center space-y-5 py-6">
        <Toaster />
        <VideoUpload />
      </div>

    </>
  )
}

export default App
