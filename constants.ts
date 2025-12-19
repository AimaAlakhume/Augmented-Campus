import { Hunt, User } from './types';

export const MOCK_USER: User = {
  name: "Alex Thompson",
  role: "Campus Explorer",
  avatarUrl: "https://picsum.photos/200/200", // Placeholder
  stats: {
    completed: 12,
    points: 1250,
    rank: 5
  },
  achievements: [
    {
      id: '1',
      title: 'First Hunt Complete',
      description: 'Completed your first scavenger hunt',
      icon: 'trophy',
      unlocked: true
    },
    {
      id: '2',
      title: 'Knowledge Seeker',
      description: 'Unlocked 10 educational content pieces',
      icon: 'check-circle',
      unlocked: true
    },
    {
      id: '3',
      title: 'Rising Star',
      description: 'Reached top 10 leaderboard',
      icon: 'star',
      unlocked: true
    }
  ]
};

export const INITIAL_HUNTS: Hunt[] = [
  {
    id: '1',
    title: 'Historic Campus Walk',
    description: 'Embark on a journey through time as you discover the founding stories behind campus landmarks. Using augmented reality, uncover hidden historical details and interact with virtual representations of historical figures.',
    difficulty: 'Medium',
    duration: 45,
    participants: 127,
    rating: 4.8,
    isTrending: true,
    educationalContent: "The Cornell Tech Bloomberg Center, designed by Morphosis Architects and named for daughters of former Mayor Michael Bloomberg, was built with a net-zero energy goal, making it one of NYC's first and largest net-zero buildings. Its net-zero features include a rooftop solar array, a geothermal heating and cooling system, and an all-electric design with no fossil fuels used on-site.",
    educationalLink: "https://www.google.com/search?q=Cornell+Tech+Bloomberg+Center",
    clues: [
      {
        description: "Locate the inscription at the entrance of the Bloomberg Center and learn about its net-zero energy goal.",
        latitude: 40.741875,
        longitude: -74.181570
      },
      {
        description: "Find 'The House' (the residential tower) and discover how it became the world\'s first passive house high-rise.",
        latitude: 40.742000,
        longitude: -74.182000
      },
      {
        description: "Find the rooftop solar array on the Bloomberg Center and learn about the campus’s sustainable energy model.",
        latitude: 40.742200,
        longitude: -74.181800
      }
      //  {
      //   description: "Locate the best viewpoint of the Queensbridge Bridge and use AR to see the original ferry route to the island.",
      //   latitude: 40.742400,
      //   longitude: -74.181600
      // },
      //  {
      //   description: "Complete the final challenge at the Tata Innovation Center, the hub of corporate and academic collaboration.",
      //   latitude: 40.741900,
      //   longitude: -74.181400
      // }
    ]
  },
  {
    id: '2',
    title: 'Science Building Quest',
    description: 'Explore cutting-edge research labs and discover innovations.',
    difficulty: 'Easy',
    duration: 20,
    participants: 89,
    rating: 4.8,
    isTrending: true,
    clues: [
      {
        description: "Find the molecular structure sculpture.",
        latitude: 40.742500,
        longitude: -74.182500
      }
    ]
  },
  {
    id: '3',
    title: 'Library Mystery Hunt',
    description: 'Uncover hidden collections and rare manuscripts.',
    difficulty: 'Hard',
    duration: 90,
    participants: 45,
    rating: 4.9,
    isTrending: true,
    clues: []
  },
  {
    id: '4',
    title: 'Art Gallery Adventure',
    description: 'Discover masterpieces and learn about campus art history.',
    difficulty: 'Easy',
    duration: 30,
    participants: 203,
    rating: 4.7,
    isTrending: false,
    clues: []
  },
  {
    id: '5',
    title: 'Engineering Marvel Tour',
    description: 'Explore innovative projects and meet student inventors.',
    difficulty: 'Medium',
    duration: 75,
    participants: 67,
    rating: 4.5,
    isTrending: false,
    clues: []
  }
];