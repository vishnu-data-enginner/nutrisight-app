import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mic, MicOff, Volume2, VolumeX, Play, Pause, Square } from 'lucide-react'

interface VoiceInputProps {
  onTranscript?: (text: string) => void
  onStart?: () => void
  onStop?: () => void
}

const VoiceInput: React.FC<VoiceInputProps> = ({ onTranscript, onStart, onStop }) => {
  const [isListening, setIsListening] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [audioLevel, setAudioLevel] = useState(0)
  const recognitionRef = useRef<any>(null)
  const audioRef = useRef<HTMLAudioElement>(null)

  const startListening = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition
      recognitionRef.current = new SpeechRecognition()
      
      recognitionRef.current.continuous = true
      recognitionRef.current.interimResults = true
      recognitionRef.current.lang = 'en-US'

      recognitionRef.current.onstart = () => {
        setIsListening(true)
        onStart?.()
      }

      recognitionRef.current.onresult = (event: any) => {
        let finalTranscript = ''
        let interimTranscript = ''

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript
          if (event.results[i].isFinal) {
            finalTranscript += transcript
          } else {
            interimTranscript += transcript
          }
        }

        setTranscript(finalTranscript || interimTranscript)
        if (finalTranscript) {
          onTranscript?.(finalTranscript)
        }
      }

      recognitionRef.current.onend = () => {
        setIsListening(false)
        onStop?.()
      }

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error)
        setIsListening(false)
      }

      recognitionRef.current.start()
    } else {
      alert('Speech recognition not supported in this browser')
    }
  }

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
    }
  }

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play()
      setIsPlaying(true)
    }
  }

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      setIsPlaying(false)
    }
  }

  // Simulate audio level for visual feedback
  React.useEffect(() => {
    let interval: NodeJS.Timeout
    if (isListening) {
      interval = setInterval(() => {
        setAudioLevel(Math.random() * 100)
      }, 100)
    } else {
      setAudioLevel(0)
    }
    return () => clearInterval(interval)
  }, [isListening])

  return (
    <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-emerald-100 p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
          <Volume2 className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">Voice Input</h3>
          <p className="text-sm text-gray-500">Speak your ingredients or questions</p>
        </div>
      </div>

      {/* Voice Visualizer */}
      <div className="mb-6">
        <div className="flex items-center justify-center gap-2 h-16">
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.div
              key={i}
              className="w-1 bg-gradient-to-t from-emerald-500 to-teal-500 rounded-full"
              animate={{
                height: isListening ? `${20 + audioLevel * 0.8}px` : '20px',
                opacity: isListening ? 1 : 0.3
              }}
              transition={{ duration: 0.1 }}
            />
          ))}
        </div>
        <p className="text-center text-sm text-gray-500 mt-2">
          {isListening ? 'Listening...' : 'Click to start speaking'}
        </p>
      </div>

      {/* Transcript */}
      <AnimatePresence>
        {transcript && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-6 p-4 bg-gray-50 rounded-2xl"
          >
            <p className="text-gray-900 text-sm">{transcript}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={isListening ? stopListening : startListening}
          className={`w-16 h-16 rounded-full flex items-center justify-center text-white shadow-lg ${
            isListening 
              ? 'bg-gradient-to-r from-red-500 to-pink-500' 
              : 'bg-gradient-to-r from-emerald-500 to-teal-500'
          }`}
        >
          {isListening ? (
            <Square className="w-6 h-6" />
          ) : (
            <Mic className="w-6 h-6" />
          )}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={isPlaying ? pauseAudio : playAudio}
          className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white shadow-lg"
        >
          {isPlaying ? (
            <Pause className="w-5 h-5" />
          ) : (
            <Play className="w-5 h-5" />
          )}
        </motion.button>
      </div>

      {/* Status */}
      <div className="mt-4 text-center">
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${
          isListening 
            ? 'bg-red-100 text-red-700' 
            : 'bg-gray-100 text-gray-700'
        }`}>
          <div className={`w-2 h-2 rounded-full ${
            isListening ? 'bg-red-500 animate-pulse' : 'bg-gray-400'
          }`} />
          {isListening ? 'Recording' : 'Ready'}
        </div>
      </div>

      {/* Hidden audio element */}
      <audio ref={audioRef} onEnded={() => setIsPlaying(false)} />
    </div>
  )
}

export default VoiceInput
