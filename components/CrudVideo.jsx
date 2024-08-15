import React, { useState, useEffect } from "react";
import YouTube from "react-youtube";

// Define the App component
const App = () => {
  // Initialize state for storing videos
  const [videos, setVideos] = useState(() => {
    // Load videos from localStorage if available
    const savedVideos = localStorage.getItem("videos");
    return savedVideos ? JSON.parse(savedVideos) : [];
  });

  // Initialize state for new video ID
  const [newVideoId, setNewVideoId] = useState("");
  // Initialize state for editing video ID
  const [editVideoId, setEditVideoId] = useState(null);
  // Initialize state for editing text
  const [editText, setEditText] = useState("");

  // Save videos to localStorage whenever the videos state changes
  useEffect(() => {
    localStorage.setItem("videos", JSON.stringify(videos));
  }, [videos]);

  // Function to add a new video
  const addVideo = () => {
    // Check if new video ID is not empty
    if (newVideoId.trim()) {
      // Add new video to the list
      setVideos([...videos, { id: Date.now(), videoId: newVideoId }]);
      // Reset new video ID
      setNewVideoId("");
    }
  };

  // Function to delete a video
  const deleteVideo = (id) => {
    // Filter out the video with the given ID
    setVideos(videos.filter((video) => video.id !== id));
  };

  // Function to start editing a video
  const startEditing = (id, currentVideoId) => {
    // Set the editing video ID
    setEditVideoId(id);
    // Set the editing text
    setEditText(currentVideoId);
  };

  // Function to save edited video
  const saveEdit = (id) => {
    // Update the video with the given ID
    setVideos(
      videos.map((video) =>
        video.id === id ? { ...video, videoId: editText } : video
      )
    );
    // Reset editing video ID and text
    setEditVideoId(null);
    setEditText("");
  };

  return (
    <div className="p-5 min-h-screen">
      <h1 className="flex justify-center text-3xl m-5 text-blue-500">I made the YouTube video</h1>

      <div className="flex justify-center m-5">
        <input
          type="text"
          value={newVideoId}
          onChange={(e) => setNewVideoId(e.target.value)}
          placeholder="Add a YouTube video ID"
          className="p-2 rounded"
        />
        <button onClick={addVideo} className="ml-2 p-2 bg-green-500 text-white rounded">
          Add Video
        </button>
      </div>

      <div className="flex flex-wrap gap-2 justify-center">
        {videos.map((video) => (
          <div key={video.id} className="relative">
            {editVideoId === video.id ? (
              // Editing mode
              <div className="flex flex-col items-center">
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="p-2 rounded"
                />
                <button onClick={() => saveEdit(video.id)} className="mt-2 p-2 bg-blue-500 text-white rounded">
                  Save
                </button>
              </div>
            ) : (
              // Normal mode
              <>
                <YouTube videoId={video.videoId} />
                <div className="absolute top-0 right-0 m-2">
                  <button onClick={() => startEditing(video.id, video.videoId)} className="p-1 bg-yellow-500 text-white rounded">
                    Edit
                  </button>
                  <button onClick={() => deleteVideo(video.id)} className="ml-2 p-1 bg-red-500 text-white rounded">
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;