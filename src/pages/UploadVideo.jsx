import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { useNavigate } from 'react-router-dom';

import toast, { Toaster } from 'react-hot-toast';
import FadeLoader from 'react-spinners/FadeLoader';

const UploadVideo = () => {
  const [title, setTitle] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [noti, setNoti] = useState(false);
  const [flag, setFlag] = useState(false);
  const navigate = useNavigate(); // Initialize the navigate function

  const showToast = () => {
    toast.success('Video uploaded successfully', {
      style: {
        fontSize: '24px', // Adjust font size here
        fontWeight: 'bold', // Optional: Make it bold
      },
    });
    setNoti(true);
  };

  useEffect(() => {
    if (noti === true) {
      navigate('/videoList');
    }
  });

  const handleFileChange = (e) => {
    setVideoFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    setFlag(true);
    e.preventDefault();

    if (!videoFile || !title) {
      return setUploadStatus('Please provide both a title and a video file.');
    }

    // Encode the title to ensure no spaces or special characters
    const encodedTitle = encodeURIComponent(title.trim());

    // Generate a safe file name for the video
    const originalFileName = videoFile.name;
    const fileExtension = originalFileName.substring(
      originalFileName.lastIndexOf('.')
    );
    const safeFileName = encodeURIComponent(
      originalFileName.replace(/\s+/g, '_')
    );

    // Create FormData for upload
    const formData = new FormData();
    formData.append('video', videoFile, safeFileName);
    formData.append('title', encodedTitle);

    try {
      const response = await fetch(
        'https://drm-backend-gvrt.onrender.com/api/videos/upload',
        {
          method: 'POST',
          body: formData,
        }
      );

      const data = await response.json();
      if (response.ok) {
        console.log(data);
        setUploadStatus(data.message);
        if (data.message === 'Video uploaded successfully') {
          // alert('Video uploaded successfully');
          showToast();
          setNoti(false);
          setFlag(false);
        }
      } else {
        setUploadStatus(`Error: ${data.error}`);
      }
    } catch (error) {
      setUploadStatus(`Error: ${error.message}`);
    }
  };

  const handleFileDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith('video/')) {
      setVideoFile(file);
      console.log('Video file:', file);
    } else {
      alert('Please drop a valid video file.');
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <div className="flex flex-row">
      <Sidebar />
      <div className="w-full bg-gray-100 flex justify-center items-center h-screen">
        <Toaster position="top-center" reverseOrder={false} />{' '}
        <div className="bg-white p-8 rounded-lg shadow-lg w-[80%]">
          <h2 className="text-[2.8rem] p-4 border-b-2 mb-6 text-center">
            Upload Video
          </h2>
          <form className="flex flex-col items-center" onSubmit={handleSubmit}>
            <div className="w-full mb-6">
              <label className="text-[2.1rem] block mb-2">Title:</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="text-[1.8rem] w-full p-4 border border-gray-300 rounded-md focus:outline-none "
              />
            </div>

            <div
              className="w-full h-[30rem] border-dashed border-2 border-gray-400 flex flex-col items-center justify-center bg-white rounded-md text-[1.8rem] cursor-pointer mb-6 relative"
              onDrop={handleFileDrop}
              onDragOver={handleDragOver}
            >
              {/* Video Preview or Instruction */}
              {videoFile ? (
                <video
                  className="w-[50rem] h-[90%] object-cover"
                  controls
                  src={URL.createObjectURL(videoFile)} // Generate a preview URL for the video
                ></video>
              ) : (
                <p className="text-center text-[1.8rem]">
                  Drag & drop a video file, or click to upload
                </p>
              )}

              {/* Custom "Browse Video" button */}
              {!videoFile && (
                <button
                  className="absolute bottom-4 bg-[#399db6] text-white px-8 py-4 text-[1.8rem] rounded-md hover:bg-[#5ebfd8] transition"
                  type="button"
                  onClick={() => document.getElementById('fileInput').click()}
                >
                  Browse Video
                </button>
              )}

              {/* Hidden file input */}
              <input
                id="fileInput"
                type="file"
                accept="video/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
            {flag === false ? (
              <div className="">
                {' '}
                <button
                  className="bg-[#399db6] text-white px-8 py-4  text-[1.8rem] rounded-md hover:bg-[#5ebfd8] transition flex items-center justify-center gap-8  "
                  type="submit"
                >
                  Upload
                
                </button>
              
              </div>
            ) : (
              <button
                  className="bg-[#399db6] text-white px-8 py-4  text-[1.8rem] rounded-md hover:bg-[#5ebfd8] transition flex items-center justify-center gap-8  "
                  type="submit"
                >
                  Upload
                  <FadeLoader
                  className='pb-8 mr-5'
                  style={{ transform: 'scale(0.6)' }}
                  width={5}
                  // size={5}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
                </button>
            )}
          </form>

          {uploadStatus && flag === false && (
            <p className="text-[1.8rem] mt-4 text-center">{uploadStatus}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadVideo;
