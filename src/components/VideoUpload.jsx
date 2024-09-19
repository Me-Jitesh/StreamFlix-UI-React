import React, { useState } from "react";
import { Card, Button, TextInput, Textarea, Progress, Alert } from "flowbite-react";
import axios from "axios";
import toast from 'react-hot-toast';
import VideoPlayer from "./VideoPlayer";


function VideoUpload() {

    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedImg, setSelectedImg] = useState(null);
    const [meta, setMeta] = useState({
        title: "",
        desc: ""

    })
    const [progress, setProgress] = useState(0);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState('');
    const [vidId, setVidId] = useState("694543b0-7a1b-4bb5-9d2d-59c0624b0a2c");

    function handleFileChange(event) {
        setSelectedFile(event.target.files[0]);
    }

    function handleImgChange(event) {
        setSelectedImg(event.target.files[0]);
    }

    function handleField(event) {
        setMeta({
            ...meta,
            [event.target.name]: event.target.value,
        });
    }

    function resetForm() {

        setMeta({
            title: '',
            desc: ''
        });

        setUploading(false);
        setProgress(0);
        setSelectedFile(null);
        setSelectedImg(null);
    }

    function handleForm(formEvent) {
        formEvent.preventDefault();
        if (!selectedFile | !selectedImg) {
            alert("Must Select Video File !");
            return;
        }
        // save data into server
        submitToServer(selectedFile, selectedImg, meta);
    }

    async function submitToServer(video, image, videoMeta) {
        setUploading(true);

        //Calling API
        try {
            let formData = new FormData();
            formData.append("file", video);
            formData.append("thumb", image);
            formData.append("title", videoMeta.title);
            formData.append("desc", videoMeta.desc);

            let response = await axios.post(`https://streamflix.koyeb.app/api/v1/videos`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: (progressEvent) => {
                    const prgs = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setProgress(prgs);
                }
            });

            resetForm();
            setMessage("File Uploaded Successfully !");
            toast.success("Hurrey! File Uploading Done")
            console.log(response.data);

        } catch (error) {
            resetForm();
            setMessage("Oops... Uploading Failed!");
            toast.error("Bad Luck!")
            console.error(error);
        }
    }

    return (
        <div className="text-slate-100">

            <Card className="flex" imgSrc="https://cdn.pixabay.com/photo/2024/03/18/10/51/ai-generated-8640900_960_720.jpg" horizontal>
                <h1 className="text-3xl text-gray-400 text-center font-semibold p-3 bg-slate-900 rounded">Stream Your Moments 😍🤩 </h1>
                <hr />
                <div>
                    <form onSubmit={handleForm} className="flex flex-col space-y-3">

                        <div>
                            <TextInput name="title" value={meta.title} onChange={handleField} placeholder="Enter Title For Video" required></TextInput>
                        </div>

                        <div>
                            <Textarea name="desc" value={meta.desc} onChange={handleField} placeholder="Write Description" required rows={3}>

                            </Textarea>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="shrink-0">
                                <img className="h-16 w-16 object-cover rounded-s-full" src="https://plus.unsplash.com/premium_photo-1710961233810-5350d81d4b20" alt="icon" />
                            </div>

                            <label className="block">
                                <span className="sr-only">Upload Video</span>
                                <input type="file" name="file" onChange={handleFileChange} required
                                    className="block w-full text-sm text-slate-500
                                    file:mr-4 file:py-2 file:px-4
                                    file:rounded-full file:border-0
                                    file:text-sm file:font-semibold
                                    file:bg-violet-50 file:text-violet-700
                                    hover:file:bg-violet-100"
                                />
                            </label>
                        </div>

                        <div className="flex items-center space-x-2">
                            <div className="shrink-0">
                                <img className="h-16 w-16 object-cover rounded-s-full" src="https://plus.unsplash.com/premium_vector-1710344022594-ae662522105c" alt="icon" />
                            </div>

                            <label className="block">
                                <span className="sr-only">Upload Thumbnail</span>
                                <input type="file" name="thumb" onChange={handleImgChange} required
                                    className="block w-full text-sm text-slate-500
                                    file:mr-4 file:py-2 file:px-4
                                    file:rounded-full file:border-0
                                    file:text-sm file:font-semibold
                                    file:bg-violet-50 file:text-violet-700
                                    hover:file:bg-violet-100"
                                />
                            </label>
                        </div>

                        {uploading &&
                            <Progress
                                progress={progress}
                                textLabel="Uploading..."
                                size="lg"
                                color="green"
                                labelProgress
                                labelText
                            />
                        }

                        {message &&
                            <Alert className="items-center" color={"success"} onDismiss={() => { setMessage('') }} rounded withBorderAccent>
                                <span className="font-medium">{message}</span>
                            </Alert>
                        }

                        <div className="flex justify-center my-3">
                            <Button type="submit" disabled={uploading} gradientDuoTone="purpleToPink" size="md" className="px-6" outline pill>Upload</Button>
                        </div>
                    </form>
                </div>
            </Card >

            {/* <Card className="my-6 items-center">

                <video width="300px"
                    poster="https://cdn.pixabay.com/photo/2021/02/16/18/55/gamer-6022003_1280.png"
                    src={`http://localhost:8080/api/v1/videos/stream/${vidId}/master.m3u8`}
                    controls
                />

                <VideoPlayer src={`https://streamflix-unhp.onrender.com/api/v1/videos/stream/${vidId}/master.m3u8`}
                    poster={`https://streamflix-unhp.onrender.com/api/v1/videos/stream/thumb/${vidId}`}>
                </VideoPlayer>
            </Card> */}
        </div>
    )
}

export default VideoUpload