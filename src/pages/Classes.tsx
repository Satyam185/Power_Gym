import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const classes = [
  {
    id: 1,
    name: 'CrossFit',
    instructor: 'Tanya Bhatnagar',
    time: '6:00 AM - 7:00 AM',
    level: 'Intermediate',
    description: 'High-intensity functional movements that combine gymnastics, weightlifting, and cardio.',
    image: 'https://images.unsplash.com/photo-1534367610401-9f5ed68180aa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    exercises: []
  },
  {
    id: 2,
    name: 'Chest Workout',
    instructor: 'Vaibhav Gupta',
    time: '8:00 AM - 9:00 AM',
    level: 'All Levels',
    description: 'Comprehensive chest workout including bench press, flyes, and push-ups for building upper body strength.',
    image: '/images/IMG_4626.jpg',
    exercises: [
      {
        name: 'Bench Press',
        animation: '/images/IMG_4626.jpg',
        steps: ['Lie on bench', 'Grip bar slightly wider than shoulders', 'Lower bar to chest', 'Press up to starting position'],
        sets: '4 sets of 8-12 reps'
      },
      {
        name: 'Dumbbell Flyes',
        animation: '/images/dumbbell-fly.jpg',
        steps: ['Lie on bench', 'Hold dumbbells above chest', 'Lower arms out to sides', 'Bring weights back together'],
        sets: '3 sets of 12-15 reps'
      }
    ]
  },
  {
    id: 3,
    name: 'Back Strength',
    instructor: 'Satyam Rajput',
    time: '10:00 AM - 11:00 AM',
    level: 'Intermediate',
    description: 'Focus on building a stronger back with pull-ups, rows, and lat pulldowns.',
    image: '/images/back-double-biceps.jpg',
    exercises: [
      {
        name: 'Pull-ups',
        animation: '/images/images.jpg',
        steps: ['Grip bar with hands wider than shoulders', 'Pull body up until chin over bar', 'Lower with control'],
        sets: '4 sets of 8-10 reps'
      },
      {
        name: 'Barbell Rows',
        animation: '/images/one-tip-to-maximize-your-dumbbell-row-inset1-700xh.jpg',
        steps: ['Bend at hips, keep back straight', 'Pull bar to lower chest', 'Lower with control'],
        sets: '3 sets of 10-12 reps'
      }
    ]
  },
  {
    id: 4,
    name: 'Biceps Focus',
    instructor: 'Satyam Rajput',
    time: '1:00 PM - 2:00 PM',
    level: 'Intermediate',
    description: 'Targeted bicep training for building arm strength and definition.',
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    exercises: [
      {
        name: 'Barbell Curls',
        animation: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        steps: ['Stand with feet shoulder-width', 'Curl bar up to shoulders', 'Lower with control'],
        sets: '4 sets of 10-12 reps'
      },
      {
        name: 'Hammer Curls',
        animation: '/images/OIP.jpg',
        steps: ['Hold dumbbells at sides', 'Curl up keeping palms facing each other', 'Lower with control'],
        sets: '3 sets of 12-15 reps'
      }
    ]
  },
  {
    id: 5,
    name: 'Triceps Blast',
    instructor: 'Shailu Rajput',
    time: '3:00 PM - 4:00 PM',
    level: 'All Levels',
    description: 'Complete triceps workout for stronger, more defined arms.',
    image: '/images/tricepblast.jpg',
    exercises: [
      {
        name: 'Tricep Pushdowns',
        animation: '/images/OIP (1).jpg',
        steps: ['Stand facing cable machine', 'Push bar down', 'Control return to start'],
        sets: '4 sets of 12-15 reps'
      },
      {
        name: 'Skull Crushers',
        animation: '/images/OIP (2).jpg',
        steps: ['Lie on bench', 'Lower weight to forehead', 'Extend arms fully'],
        sets: '3 sets of 10-12 reps'
      },
      {
        name: 'Diamond Push-ups',
        animation: '/images/Screenshot_2024-03-21_at_12.36.05_PM.jpg',
        steps: ['Form diamond shape with hands', 'Lower chest to hands', 'Push back up', 'Keep elbows close'],
        sets: '3 sets of 12-15 reps'
      },
      {
        name: 'Overhead Tricep Extensions',
        animation: '/images/overhead-triceps-extension-main2.jpg',
        steps: ['Hold dumbbell overhead', 'Lower behind head', 'Extend arms fully', 'Keep elbows close'],
        sets: '3 sets of 12-15 reps'
      }
    ]
  },
  {
    id: 6,
    name: 'Leg Day',
    instructor: 'Sarthak Bhatele',
    time: '4:00 PM - 5:00 PM',
    level: 'Advanced',
    description: 'Intensive leg workout focusing on strength and muscle development.',
    image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    exercises: [
      {
        name: 'Squats',
        animation: '/images/OIP (3).jpg',
        steps: ['Stand with feet shoulder-width', 'Lower body keeping back straight', 'Push through heels to stand'],
        sets: '5 sets of 8-10 reps'
      },
      {
        name: 'Deadlifts',
        animation: '/images/AdobeStock_382378953-TH.jpg',
        steps: ['Stand with feet hip-width', 'Hinge at hips to grip bar', 'Stand up straight'],
        sets: '4 sets of 6-8 reps'
      },
      {
        name: 'Leg Press',
        animation: '/images/96f17a7fb2e9d7043882ceb39560ec2b.jpg',
        steps: ['Sit on machine', 'Place feet shoulder-width', 'Lower weight controlled', 'Push through heels'],
        sets: '4 sets of 10-12 reps'
      },
      {
        name: 'Bulgarian Split Squats',
        animation: '/images/Bulgarian_Split_Squats.jpg',
        steps: ['Place rear foot on bench', 'Lower into split squat', 'Keep front knee aligned', 'Push back up'],
        sets: '3 sets of 12 reps each leg'
      }
    ]
  },
  {
    id: 7,
    name: 'Shoulder Sculpt',
    instructor: 'Vaibhav Gupta',
    time: '5:30 PM - 6:30 PM',
    level: 'Intermediate',
    description: 'Complete shoulder workout for building strength and definition.',
    image: 'https://images.unsplash.com/photo-1532029837206-abbe2b7620e3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    exercises: [
      {
        name: 'Military Press',
        animation: '/images/militrypress.jpg',
        steps: ['Stand with feet shoulder-width', 'Press bar overhead', 'Lower with control'],
        sets: '4 sets of 8-10 reps'
      },
      {
        name: 'Lateral Raises',
        animation: '/images/lateralraises.jpg',
        steps: ['Stand with dumbbells at sides', 'Raise arms to shoulder level', 'Lower with control'],
        sets: '3 sets of 12-15 reps'
      },
      {
        name: 'Front Raises',
        animation: '/images/frontcableraise.jpg',
        steps: ['Hold dumbbells in front', 'Raise arms to shoulder height', 'Lower with control', 'Keep slight bend in elbows'],
        sets: '3 sets of 12-15 reps'
      },
      {
        name: 'Face Pulls',
        animation: '/images/facepull.jpg',
        steps: ['Set cable at head height', 'Pull rope to face level', 'Squeeze shoulder blades', 'Control return'],
        sets: '3 sets of 15-20 reps'
      }
    ]
  },
  {
    id: 8,
    name: 'Core & Abs',
    instructor: 'Shailu Rajput',
    time: '7:00 PM - 8:00 PM',
    level: 'All Levels',
    description: 'Targeted core workout for building strong, defined abs.',
    image: 'public/images/core.jpg',
    exercises: [
      {
        name: 'Planks',
        animation: 'https://images.unsplash.com/photo-1566241142559-40e1dab266c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        steps: ['Start in push-up position', 'Hold position', 'Keep body straight'],
        sets: '3 sets of 45-60 seconds'
      },
      {
        name: 'Russian Twists',
        animation: '/images/russiantwist.jpg',
        steps: ['Sit with knees bent', 'Lean back slightly', 'Rotate torso side to side'],
        sets: '3 sets of 20 reps'
      }
    ]
  }
];

export default function Classes() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedExercise, setSelectedExercise] = useState(null);

  const filteredClasses = classes.filter(cls =>
    cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cls.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cls.level.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pt-16 bg-gray-900">
      {/* Header */}
      <div className="bg-black py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white text-center">Our Classes</h1>
          <p className="mt-4 text-xl text-gray-400 text-center max-w-2xl mx-auto">
            Choose from a variety of classes designed to help you reach your fitness goals
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search classes, instructors, or difficulty level..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 pl-12 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      {/* Classes Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredClasses.map((cls) => (
            <motion.div
              key={cls.id}
              className="group bg-gray-800 rounded-lg overflow-hidden cursor-pointer relative"
              whileHover={{
                rotateX: 10,
                scale: 1.05,
                transition: { duration: 0.3 }
              }}
              onClick={() => setSelectedClass(cls)}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <img
                src={cls.image}
                alt={cls.name}
                className="w-full h-64 object-cover transform transition-transform duration-300 group-hover:scale-105"
              />
              <div className="p-6 relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white">{cls.name}</h3>
                    <p className="text-red-500">with {cls.instructor}</p>
                  </div>
                  <span className="px-3 py-1 bg-gray-700 text-white rounded-full text-sm">
                    {cls.level}
                  </span>
                </div>
                <p className="text-gray-400 mb-4">{cls.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">{cls.time}</span>
              
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Class Details Modal */}
      <AnimatePresence>
        {selectedClass && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedClass(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-800 rounded-lg max-w-2xl w-full p-6 relative"
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedClass(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
              >
                <X className="h-6 w-6" />
              </button>

              <h2 className="text-2xl font-bold text-white mb-4">{selectedClass.name}</h2>

              <div className="aspect-video mb-6 bg-gray-900 rounded-lg overflow-hidden">
                <img
                  src={selectedClass.image}
                  alt={selectedClass.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-semibold text-white mb-4">Exercises</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedClass.exercises.map((exercise, index) => (
                    <motion.div
                      key={index}
                      className="bg-gray-700 p-4 rounded-lg cursor-pointer"
                      whileHover={{ scale: 1.05 }}
                      onClick={() => setSelectedExercise(exercise)}
                    >
                      <h4 className="text-lg font-semibold text-white mb-2">{exercise.name}</h4>
                      <p className="text-gray-400">{exercise.sets}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Exercise Details Modal */}
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
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
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

              <div className="aspect-video mb-6 bg-gray-900 rounded-lg overflow-hidden">
                <img
                  src={selectedExercise.animation}
                  alt={selectedExercise.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-semibold text-white mb-2">Steps</h3>
                <ol className="list-decimal list-inside space-y-2">
                  {selectedExercise.steps.map((step, index) => (
                    <li key={index} className="text-gray-400">{step}</li>
                  ))}
                </ol>
              </div>

              <div className="text-gray-400">
                <strong className="text-white">Sets/Reps:</strong> {selectedExercise.sets}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}