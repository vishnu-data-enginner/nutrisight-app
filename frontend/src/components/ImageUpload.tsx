import React, { useRef } from 'react';
import { Camera, Upload } from 'lucide-react';

interface ImageUploadProps {
  onImageUpload: (file: File) => void;
  isAnalyzing: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload, isAnalyzing }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageUpload(file);
    }
  };

  const handleCameraCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      if (video && canvas) {
        video.srcObject = stream;
        video.play();
        
        // Show video for 3 seconds then capture
        setTimeout(() => {
          const context = canvas.getContext('2d');
          if (context) {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            context.drawImage(video, 0, 0);
            
            canvas.toBlob((blob) => {
              if (blob) {
                const file = new File([blob], 'camera-capture.jpg', { type: 'image/jpeg' });
                onImageUpload(file);
              }
            }, 'image/jpeg');
          }
          
          // Stop camera
          stream.getTracks().forEach(track => track.stop());
        }, 3000);
      }
    } catch (error) {
      console.error('Camera access denied:', error);
    }
  };

  return (
    <div className="space-y-4">
      {/* File Upload */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
        <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-lg font-medium text-gray-700 mb-2">Upload Image</p>
        <p className="text-sm text-gray-500 mb-4">Drag and drop or click to select</p>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={isAnalyzing}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          Choose File
        </button>
      </div>

      {/* Camera Capture */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-green-400 transition-colors">
        <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-lg font-medium text-gray-700 mb-2">Take Photo</p>
        <p className="text-sm text-gray-500 mb-4">Use your camera to capture ingredients</p>
        <button
          onClick={handleCameraCapture}
          disabled={isAnalyzing}
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
        >
          Open Camera
        </button>
      </div>

      {/* Hidden video and canvas for camera */}
      <video ref={videoRef} className="hidden" />
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default ImageUpload;