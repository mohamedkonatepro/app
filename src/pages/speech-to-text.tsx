import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAudioRecorder } from 'react-audio-voice-recorder';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useRouter } from 'next/router';

const SpeechToText = () => {
  const router = useRouter();
  const [text, setText] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const recorderControls = useAudioRecorder();

  useEffect(() => {
    if (recorderControls.recordingBlob) {
      addAudioElement(recorderControls.recordingBlob);
    }
  }, [recorderControls.recordingBlob]);

  const addAudioElement = async (blob: Blob) => {
    const formData = new FormData();
    formData.append('audio', blob);
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('/api/speech-to-text', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setText(response.data.text);
    } catch (error: any) {
      setError('Failed to convert speech to text');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-black">Speech to Text</h2>
        <div className="flex justify-center space-x-4">
          { !recorderControls.isRecording && <button
            onClick={recorderControls.startRecording}
            className="flex items-center bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            <i className="fas fa-microphone mr-2"></i> Start
          </button>}
          { recorderControls.isRecording && <button
            onClick={() => {
              recorderControls.stopRecording();
            }}
            className="flex items-center bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            <i className="fas fa-stop mr-2"></i> Stop
          </button>}
        </div>
        {loading && <p className="text-center mt-4">Processing...</p>}
        {error && (
          <div className="mt-4">
            <p className="text-red-500">{error}</p>
          </div>
        )}
        {text && (
          <div className="mt-4">
            <h3 className="text-lg font-bold text-black">Converted Text:</h3>
            <p className="text-black mt-2">{text}</p>
          </div>
        )}
      </div>

      <button
          className="mt-4 w-1/4 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
          onClick={() => router.back()}
        >
          Go Back
      </button>
    </div>
  );
};

export default SpeechToText;
