import React, { useState } from "react";
import { Card, Button, HR, TextInput, Textarea, Progress, Alert } from "flowbite-react";
import axios from "axios";
import toast from 'react-hot-toast';


function VideoUpload() {

    const [selectedFile, setSelectedFile] = useState(null);
    const [meta, setMeta] = useState({
        title: "",
        desc: ""

    })
    const [progress, setProgress] = useState(0);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState('');

    function handleFileChange(event) {
        setSelectedFile(event.target.files[0]);
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
    }

    function handleForm(formEvent) {
        formEvent.preventDefault();
        if (!selectedFile) {
            alert("Must Select Video File !");
            return;
        }
        // save data into server
        submitToServer(selectedFile, meta);
    }

    async function submitToServer(video, videoMeta) {
        setUploading(true);

        //Calling API
        try {
            let formData = new FormData();
            formData.append("file", video);
            formData.append("title", videoMeta.title);
            formData.append("desc", videoMeta.desc);

            let response = await axios.post(`http://localhost:8080/api/v1/videos`, formData, {
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

            <Card className="flex" imgSrc="https://cdn.pixabay.com/photo/2023/02/15/20/01/ai-generated-7792597_1280.jpg" horizontal>
                <h1 className="text-3xl text-gray-400 text-center font-semibold p-3 bg-slate-900 rounded">Stream Your Moments 😍🤩 </h1>
                <hr />
                <div>
                    <form onSubmit={handleForm} className="flex flex-col space-y-9">

                        <div>
                            <TextInput name="title" value={meta.title} onChange={handleField} placeholder="Enter Title For Video" required></TextInput>
                        </div>

                        <div>
                            <Textarea name="desc" value={meta.desc} onChange={handleField} placeholder="Write Description" required rows={3}>

                            </Textarea>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="shrink-0">
                                <img className="h-16 w-16 object-cover rounded-s-full" src="https://plus.unsplash.com/premium_photo-1710961233810-5350d81d4b20?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="icon" />
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
                            <Button type="submit" disabled={uploading} gradientDuoTone="tealToLime" size="md" className="px-6" pill>Upload</Button>
                        </div>
                    </form>
                </div>
            </Card >

        </div >
    )
}

export default VideoUpload