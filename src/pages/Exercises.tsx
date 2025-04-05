import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Pause, RotateCcw, Heart } from 'lucide-react';

type Exercise = {
  id: number;
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  bodyPart: string;
  description: string;
  animation: string;
  instructions: string[];
  duration: string;
  calories: number;
  equipment: string[];
};

const exercises: Exercise[] = [
  {
    id: 1,
    name: 'Push-ups',
    level: 'beginner',
    bodyPart: 'chest',
    description: 'A classic exercise that targets chest, shoulders, and triceps.',
    animation: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    instructions: [
      'Start in a plank position with hands slightly wider than shoulders',
      'Keep your body in a straight line from head to heels',
      'Lower your body until your chest nearly touches the ground',
      'Push back up to the starting position',
      'Keep your core tight throughout the movement'
    ],
    duration: '30-60 seconds',
    calories: 100,
    equipment: ['None']
  },
  {
    id: 2,
    name: 'Squats',
    level: 'beginner',
    bodyPart: 'legs',
    description: 'A fundamental lower body exercise that builds strength and muscle.',
    animation: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    instructions: [
      'Stand with feet shoulder-width apart',
      'Keep your chest up and core engaged',
      'Lower your body as if sitting back into a chair',
      'Keep knees in line with toes',
      'Return to standing position'
    ],
    duration: '45-60 seconds',
    calories: 150,
    equipment: ['Optional: Dumbbells']
  },
  {
    id: 3,
    name: 'Pull-ups',
    level: 'advanced',
    bodyPart: 'back',
    description: 'An advanced upper body exercise targeting back and biceps.',
    animation: 'src/components/how-to-do-pull-ups-for-a-bigger-and-shredded-back.jpg',
    instructions: [
      'Grip the bar with hands wider than shoulders',
      'Hang with arms fully extended',
      'Pull yourself up until chin is over the bar',
      'Lower back down with control',
      'Maintain proper form throughout'
    ],
    duration: '20-30 seconds',
    calories: 180,
    equipment: ['Pull-up bar']
  },
  {
    id: 4,
    name: 'Plank',
    level: 'beginner',
    bodyPart: 'core',
    description: 'An isometric core exercise that builds stability and strength.',
    animation: 'https://images.unsplash.com/photo-1566241142559-40e1dab266c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    instructions: [
      'Start in a forearm plank position',
      'Keep your body in a straight line',
      'Engage your core and glutes',
      'Hold the position',
      'Breathe steadily throughout'
    ],
    duration: '30-60 seconds',
    calories: 80,
    equipment: ['None']
  },
  {
    id: 5,
    name: 'Dumbbell Rows',
    level: 'intermediate',
    bodyPart: 'back',
    description: 'A compound exercise that targets the back muscles and improves posture.',
    animation: 'src/components/one-tip-to-maximize-your-dumbbell-row-inset1-700xh.jpg',
    instructions: [
      'Place one knee and hand on a bench',
      'Hold dumbbell with free hand',
      'Pull dumbbell to hip level',
      'Lower with control',
      'Keep back straight throughout'
    ],
    duration: '40-50 seconds',
    calories: 130,
    equipment: ['Dumbbell', 'Bench']
  },
  {
    id: 6,
    name: 'Burpees',
    level: 'advanced',
    bodyPart: 'full',
    description: 'A high-intensity full-body exercise that builds endurance and strength.',
    animation: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    instructions: [
      'Start in standing position',
      'Drop into a squat position and place hands on ground',
      'Kick feet back into plank position',
      'Perform a push-up',
      'Jump feet forward to squat position',
      'Jump up with arms overhead'
    ],
    duration: '30-45 seconds',
    calories: 200,
    equipment: ['None']
  }
];

export default function Exercises() {
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [selectedBodyPart, setSelectedBodyPart] = useState<string>('all');
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timer, setTimer] = useState(0);

  const filteredExercises = exercises.filter(exercise => 
    (selectedLevel === 'all' || exercise.level === selectedLevel) &&
    (selectedBodyPart === 'all' || exercise.bodyPart === selectedBodyPart)
  );

  const toggleFavorite = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fId => fId !== id) : [...prev, id]
    );
  };

  const startTimer = () => {
    setIsPlaying(true);
    const interval = setInterval(() => {
      setTimer(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  };

  const resetTimer = () => {
    setTimer(0);
    setIsPlaying(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="pt-16 bg-gray-900 min-h-screen">
      {/* Header */}
      <div className="bg-black py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white text-center">Exercise Library</h1>
          <p className="mt-4 text-xl text-gray-400 text-center max-w-2xl mx-auto">
            Choose your level and discover exercises tailored to your fitness journey
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap gap-4 justify-center">
          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="all">All Levels</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>

          <select
            value={selectedBodyPart}
            onChange={(e) => setSelectedBodyPart(e.target.value)}
            className="px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="all">All Body Parts</option>
            <option value="chest">Chest</option>
            <option value="back">Back</option>
            <option value="legs">Legs</option>
            <option value="arms">Arms</option>
            <option value="shoulders">Shoulders</option>
            <option value="core">Core</option>
            <option value="full">Full Body</option>
          </select>
        </div>
      </div>

      {/* Exercise Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredExercises.map((exercise) => (
            <motion.div
              key={exercise.id}
              className="group bg-gray-800 rounded-lg overflow-hidden cursor-pointer relative"
              whileHover={{ 
                rotateX: 10,
                rotateY: 10,
                scale: 1.05,
                transition: { duration: 0.3 }
              }}
              onClick={() => setSelectedExercise(exercise)}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <img
                src={exercise.animation}
                alt={exercise.name}
                className="w-full h-48 object-cover transform transition-transform duration-300 group-hover:scale-105"
              />
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-semibold text-white">{exercise.name}</h3>
                  <button
                    onClick={(e) => toggleFavorite(exercise.id, e)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Heart
                      className={`h-5 w-5 ${
                        favorites.includes(exercise.id) ? 'fill-red-500 text-red-500' : ''
                      }`}
                    />
                  </button>
                </div>
                <div className="flex gap-2 mt-2">
                  <span className="inline-block px-2 py-1 text-sm rounded bg-red-500 text-white">
                    {exercise.level}
                  </span>
                  <span className="inline-block px-2 py-1 text-sm rounded bg-gray-700 text-white">
                    {exercise.bodyPart}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Exercise Modal */}
      <AnimatePresence>
        {selectedExercise && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedExercise(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-800 rounded-lg max-w-2xl w-full p-6 relative"
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedExercise(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
              >
                <X className="h-6 w-6" />
              </button>

              <h2 className="text-2xl font-bold text-white mb-4">{selectedExercise.name}</h2>
              
              <div className="aspect-video mb-6 bg-gray-900 rounded-lg overflow-hidden relative group">
                <img
                  src={selectedExercise.animation}
                  alt={selectedExercise.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-700 p-4 rounded-lg text-center">
                  <p className="text-sm text-gray-400">Duration</p>
                  <p className="text-lg font-semibold text-white">{selectedExercise.duration}</p>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg text-center">
                  <p className="text-sm text-gray-400">Calories</p>
                  <p className="text-lg font-semibold text-white">{selectedExercise.calories}</p>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg text-center">
                  <p className="text-sm text-gray-400">Level</p>
                  <p className="text-lg font-semibold text-white capitalize">{selectedExercise.level}</p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-semibold text-white mb-2">Equipment Needed:</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedExercise.equipment.map((item, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-700 text-white rounded-full text-sm"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <p className="text-gray-300 mb-6">{selectedExercise.description}</p>

              <div className="mb-6">
                <h3 className="text-xl font-semibold text-white mb-2">Instructions:</h3>
                <ol className="list-decimal list-inside text-gray-300 space-y-2">
                  {selectedExercise.instructions.map((instruction, index) => (
                    <li key={index}>{instruction}</li>
                  ))}
                </ol>
              </div>

              <div className="flex items-center justify-between bg-gray-700 p-4 rounded-lg">
                <div className="text-2xl font-mono text-white">{formatTime(timer)}</div>
                <div className="flex gap-4">
                  <button
                    onClick={isPlaying ? () => setIsPlaying(false) : startTimer}
                    className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
                  >
                    {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                  </button>
                  <button
                    onClick={resetTimer}
                    className="p-2 rounded-full bg-gray-600 text-white hover:bg-gray-500 transition-colors"
                  >
                    <RotateCcw className="h-6 w-6" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}