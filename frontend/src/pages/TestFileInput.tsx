import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Upload, Camera, CheckCircle, RotateCcw } from 'lucide-react'

const TestFileInput: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [fileInputKey, setFileInputKey] = useState(0)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      console.log('File selected:', file.name)
    }
  }

  const resetFileInput = () => {
    setSelectedFile(null)
    setFileInputKey(prev => prev + 1) // Force re-render of input
    console.log('File input reset')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 dark:from-slate-900 dark:via-slate-800 dark:to-emerald-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-8">
          Test File Input Reset
        </h1>
        
        <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-3xl shadow-xl border border-slate-200/50 dark:border-slate-700/50 p-6 mb-6">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
            Test File Selection After Reset
          </h2>
          
          {/* File Upload Test */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="border-2 border-dashed border-gray-200 rounded-2xl p-8 bg-white shadow-sm hover:shadow-md transition-all duration-300"
            >
              <Upload className="mx-auto mb-3 w-10 h-10 text-emerald-500" />
              <h3 className="font-semibold text-gray-800 mb-1">Upload Image</h3>
              <p className="text-gray-500 text-sm mb-4">Test file selection</p>
              <input
                key={fileInputKey} // This forces re-render
                type="file"
                id="test-file-upload"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
              <button 
                onClick={() => document.getElementById('test-file-upload')?.click()}
                className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full transition-colors"
              >
                Choose File
              </button>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="border-2 border-dashed border-emerald-300 rounded-2xl p-8 bg-gradient-to-b from-emerald-50 to-white shadow-sm hover:shadow-md transition-all duration-300"
            >
              <Camera className="mx-auto mb-3 w-10 h-10 text-emerald-600" />
              <h3 className="font-semibold text-gray-800 mb-1">Camera Test</h3>
              <p className="text-gray-500 text-sm mb-4">Test camera input</p>
              <input
                key={fileInputKey} // This forces re-render
                type="file"
                id="test-camera-capture"
                accept="image/*"
                capture="environment"
                onChange={handleFileSelect}
                className="hidden"
              />
              <button 
                onClick={() => document.getElementById('test-camera-capture')?.click()}
                className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full transition-colors"
              >
                Open Camera
              </button>
            </motion.div>
          </div>

          {/* Selected File Display */}
          {selectedFile && (
            <div className="bg-green-100 dark:bg-green-900/20 border border-green-300 dark:border-green-700 text-green-700 dark:text-green-300 px-4 py-3 rounded-lg mb-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                <strong>File Selected:</strong> {selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} KB)
              </div>
            </div>
          )}

          {/* Reset Button */}
          <button
            onClick={resetFileInput}
            className="flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            <RotateCcw className="h-5 w-5" />
            Reset File Input
          </button>
        </div>

        <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-3xl shadow-xl border border-slate-200/50 dark:border-slate-700/50 p-6">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
            What This Tests
          </h2>
          <ul className="list-disc list-inside text-slate-700 dark:text-slate-300 space-y-1">
            <li>File input selection works initially</li>
            <li>After selecting a file, you can select the same file again</li>
            <li>Reset button clears the file input completely</li>
            <li>Key prop forces React to re-render the input element</li>
            <li>Both upload and camera inputs work independently</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default TestFileInput
