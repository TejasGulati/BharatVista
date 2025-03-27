import React, { useState, useEffect } from 'react';
import { 
  Search, 
  MapPin, 
  Calendar, 
  Clock, 
  Star, 
  RefreshCw, 
  AlertTriangle,
  Info,
  Filter,
  X,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Landmark,
  Wheat,
  Music,
  Drum
} from 'lucide-react';

// Comprehensive Indian Festival Data
const indianFestivals = [
  {
    id: 1,
    name: "Diwali",
    dates: "November 1-5, 2024",
    location: "Pan India",
    state: "Multiple States",
    month: "November",
    type: "Religious",
    duration: "5 days",
    description: "The Festival of Lights celebrating the victory of light over darkness and knowledge over ignorance.",
    culturalSignificance: "Marks the return of Lord Rama to Ayodhya after 14 years of exile and his victory over Ravana.",
    traditionalPractices: [
      "Lighting diyas and candles",
      "Rangoli decorations",
      "Exchanging sweets and gifts",
      "Lakshmi Puja",
      "Fireworks displays"
    ],
    rating: 4.9,
    icon: <Sparkles className="text-yellow-500" />
  },
  {
    id: 2,
    name: "Durga Puja",
    dates: "October 10-14, 2024",
    location: "Kolkata, West Bengal",
    state: "West Bengal",
    month: "October",
    type: "Religious",
    duration: "5 days",
    description: "Grand celebration of Goddess Durga's victory over the buffalo demon Mahishasura.",
    culturalSignificance: "Celebrates feminine power (Shakti) and the triumph of good over evil.",
    traditionalPractices: [
      "Elaborate pandal decorations",
      "Idol immersion (Visarjan)",
      "Dhunuchi folk dance",
      "Sindoor Khela",
      "Cultural performances"
    ],
    rating: 4.8,
    icon: <Landmark className="text-red-500" />
  },
  {
    id: 3,
    name: "Holi",
    dates: "March 25-26, 2024",
    location: "North India",
    state: "Multiple States",
    month: "March",
    type: "Cultural",
    duration: "2 days",
    description: "The vibrant festival of colors celebrating love, spring, and the victory of good over evil.",
    culturalSignificance: "Commemorates the divine love of Radha and Krishna and the story of Prahlad and Holika.",
    traditionalPractices: [
      "Throwing colored powders",
      "Singing and dancing",
      "Special Holi delicacies",
      "Bonfire on Holika Dahan",
      "Community celebrations"
    ],
    rating: 4.8,
    icon: <Drum className="text-pink-500" />
  },
  {
    id: 4,
    name: "Ganesh Chaturthi",
    dates: "September 7-17, 2024",
    location: "Mumbai, Maharashtra",
    state: "Maharashtra",
    month: "September",
    type: "Religious",
    duration: "10 days",
    description: "Celebration of the birth of Lord Ganesha, the remover of obstacles.",
    culturalSignificance: "Symbolizes new beginnings and the importance of overcoming obstacles in life.",
    traditionalPractices: [
      "Installation of Ganesha idols",
      "Daily prayers and aarti",
      "Modak preparation (sweet dumplings)",
      "Processions with music and dance",
      "Visarjan (immersion ceremony)"
    ],
    rating: 4.7,
    icon: <Landmark className="text-orange-500" />
  },
  {
    id: 5,
    name: "Pongal",
    dates: "January 15-18, 2024",
    location: "Tamil Nadu",
    state: "Tamil Nadu",
    month: "January",
    type: "Harvest",
    duration: "4 days",
    description: "Tamil harvest festival celebrating nature and giving thanks to the Sun God.",
    culturalSignificance: "Marks the end of winter solstice and the beginning of the sun's northward journey.",
    traditionalPractices: [
      "Preparation of Pongal dish",
      "Kolam decorations",
      "Jallikattu (bull-taming sport)",
      "Cattle worship",
      "Traditional dances"
    ],
    rating: 4.6,
    icon: <Wheat className="text-yellow-600" />
  },
  {
    id: 6,
    name: "Onam",
    dates: "August 20-31, 2024",
    location: "Kerala",
    state: "Kerala",
    month: "August",
    type: "Harvest",
    duration: "10 days",
    description: "Celebration of King Mahabali's annual return and Kerala's harvest season.",
    culturalSignificance: "Commemorates Kerala's golden age under King Mahabali's rule.",
    traditionalPractices: [
      "Pookalam (floral rangoli)",
      "Onasadya (grand feast)",
      "Vallamkali (boat races)",
      "Pulikali (tiger dance)",
      "Traditional games"
    ],
    rating: 4.7,
    icon: <Music className="text-green-600" />
  },
  {
    id: 7,
    name: "Navratri",
    dates: "October 3-12, 2024",
    location: "Gujarat",
    state: "Gujarat",
    month: "October",
    type: "Religious",
    duration: "9 nights",
    description: "Nine-night festival dedicated to the worship of Goddess Durga in her nine forms.",
    culturalSignificance: "Celebrates the victory of Goddess Durga over the buffalo demon Mahishasura.",
    traditionalPractices: [
      "Garba and Dandiya Raas dances",
      "Fasting and prayers",
      "Golu doll displays (South India)",
      "Kanya Pujan",
      "Vijayadashami celebrations"
    ],
    rating: 4.7,
    icon: <Drum className="text-purple-500" />
  },
  {
    id: 8,
    name: "Baisakhi",
    dates: "April 13, 2024",
    location: "Punjab",
    state: "Punjab",
    month: "April",
    type: "Harvest",
    duration: "1 day",
    description: "Punjabi harvest festival marking the solar new year and founding of the Khalsa.",
    culturalSignificance: "Commemorates the formation of the Khalsa Panth by Guru Gobind Singh in 1699.",
    traditionalPractices: [
      "Bhangra and Gidda dances",
      "Visiting gurdwaras",
      "Fairs and processions",
      "Harvest celebrations",
      "Community meals (langar)"
    ],
    rating: 4.5,
    icon: <Wheat className="text-yellow-500" />
  },
  {
    id: 9,
    name: "Pushkar Camel Fair",
    dates: "November 20-28, 2024",
    location: "Pushkar, Rajasthan",
    state: "Rajasthan",
    month: "November",
    type: "Cultural",
    duration: "9 days",
    description: "World's largest camel fair combined with religious significance of Pushkar Lake.",
    culturalSignificance: "Combines religious pilgrimage with vibrant cultural and commercial activities.",
    traditionalPractices: [
      "Camel trading and competitions",
      "Cultural performances",
      "Holy dip in Pushkar Lake",
      "Moustache competition",
      "Traditional Rajasthani music"
    ],
    rating: 4.6,
    icon: <Music className="text-amber-600" />
  },
  {
    id: 10,
    name: "Kumbh Mela",
    dates: "January 14 - April 27, 2025",
    location: "Prayagraj, Uttar Pradesh",
    state: "Uttar Pradesh",
    month: "January",
    type: "Religious",
    duration: "48 days",
    description: "Largest religious gathering in the world where Hindus gather to bathe in sacred rivers.",
    culturalSignificance: "Believed to cleanse sins and help attain salvation by bathing at sacred confluence.",
    traditionalPractices: [
      "Shahi Snan (royal bath)",
      "Religious discourses",
      "Akharas processions",
      "Cultural performances",
      "Mass feeding (langar)"
    ],
    rating: 4.9,
    icon: <Landmark className="text-blue-500" />
  },
  {
    id: 11,
    name: "Eid-ul-Fitr",
    dates: "April 10, 2024",
    location: "Pan India",
    state: "Multiple States",
    month: "April",
    type: "Religious",
    duration: "1 day",
    description: "Festival marking the end of Ramadan, the Islamic holy month of fasting.",
    culturalSignificance: "Celebrates the completion of spiritual purification achieved through Ramadan fasting.",
    traditionalPractices: [
      "Special Eid prayers",
      "Feasting and family gatherings",
      "Charity (Zakat al-Fitr)",
      "Wearing new clothes",
      "Exchanging gifts (Eidi)"
    ],
    rating: 4.5,
    icon: <Star className="text-green-500" />
  },
  {
    id: 12,
    name: "Christmas",
    dates: "December 25, 2024",
    location: "Pan India",
    state: "Multiple States",
    month: "December",
    type: "Religious",
    duration: "1 day",
    description: "Celebration of the birth of Jesus Christ, widely celebrated across India.",
    culturalSignificance: "Marks the nativity of Jesus while incorporating local Indian traditions.",
    traditionalPractices: [
      "Midnight mass",
      "Decorating Christmas trees",
      "Exchanging gifts",
      "Special meals",
      "Caroling"
    ],
    rating: 4.4,
    icon: <Star className="text-red-500" />
  },
  {
    id: 13,
    name: "Makar Sankranti",
    dates: "January 14, 2024",
    location: "Pan India",
    state: "Multiple States",
    month: "January",
    type: "Harvest",
    duration: "1 day",
    description: "Festival marking the transition of the Sun into Capricorn and the beginning of harvest season.",
    culturalSignificance: "Celebrates the solar cycle and the beginning of longer days.",
    traditionalPractices: [
      "Kite flying",
      "Sesame sweets preparation",
      "Holy dips in rivers",
      "Bonfires (in some regions)",
      "Cattle worship"
    ],
    rating: 4.6,
    icon: <Wheat className="text-orange-500" />
  },
  {
    id: 14,
    name: "Gudi Padwa",
    dates: "April 9, 2024",
    location: "Maharashtra",
    state: "Maharashtra",
    month: "April",
    type: "New Year",
    duration: "1 day",
    description: "Maharashtrian New Year marking the beginning of spring and harvest season.",
    culturalSignificance: "Celebrates the creation of the universe by Lord Brahma according to Hindu mythology.",
    traditionalPractices: [
      "Hoisting Gudi (flag)",
      "Rangoli decorations",
      "Special dishes like Puran Poli",
      "New clothes and jewelry",
      "Visiting temples"
    ],
    rating: 4.4,
    icon: <Landmark className="text-yellow-500" />
  },
  {
    id: 15,
    name: "Bihu",
    dates: "April 14-20, 2024",
    location: "Assam",
    state: "Assam",
    month: "April",
    type: "Harvest",
    duration: "7 days",
    description: "Assamese festival celebrating the changing seasons and agricultural cycles.",
    culturalSignificance: "Represents three different farming cycles in Assam's calendar.",
    traditionalPractices: [
      "Bihu dances and songs",
      "Traditional Assamese games",
      "Community feasts",
      "Buffalo fights",
      "Cultural performances"
    ],
    rating: 4.5,
    icon: <Music className="text-red-500" />
  },
  {
    id: 16,
    name: "Lohri",
    dates: "January 13, 2024",
    location: "Punjab",
    state: "Punjab",
    month: "January",
    type: "Harvest",
    duration: "1 day",
    description: "Punjabi winter harvest festival marking the end of winter solstice.",
    culturalSignificance: "Celebrates the passing of the winter solstice and the arrival of longer days.",
    traditionalPractices: [
      "Bonfire lighting",
      "Singing folk songs",
      "Dancing Bhangra",
      "Eating til (sesame) and rorhi (jaggery)",
      "Community gatherings"
    ],
    rating: 4.3,
    icon: <Wheat className="text-red-600" />
  },
  {
    id: 17,
    name: "Rath Yatra",
    dates: "July 7, 2024",
    location: "Puri, Odisha",
    state: "Odisha",
    month: "July",
    type: "Religious",
    duration: "1 day",
    description: "Chariot festival of Lord Jagannath, Balabhadra and Subhadra in Puri.",
    culturalSignificance: "One of the oldest chariot festivals in the world dating back to 12th century.",
    traditionalPractices: [
      "Chariot procession",
      "Pulling of the massive chariots",
      "Devotional singing",
      "Temple rituals",
      "Massive gatherings of devotees"
    ],
    rating: 4.6,
    icon: <Landmark className="text-yellow-600" />
  },
  {
    id: 18,
    name: "Hornbill Festival",
    dates: "December 1-10, 2024",
    location: "Kisama, Nagaland",
    state: "Nagaland",
    month: "December",
    type: "Cultural",
    duration: "10 days",
    description: "Festival of festivals showcasing Naga culture and traditions.",
    culturalSignificance: "Celebrates the cultural heritage of all Naga tribes in one event.",
    traditionalPractices: [
      "Traditional Naga dances",
      "Folk songs",
      "Indigenous games",
      "Handicraft displays",
      "Naga cuisine"
    ],
    rating: 4.7,
    icon: <Music className="text-blue-500" />
  },
  {
    id: 19,
    name: "Chhath Puja",
    dates: "November 7-10, 2024",
    location: "Bihar & Eastern UP",
    state: "Bihar",
    month: "November",
    type: "Religious",
    duration: "4 days",
    description: "Ancient Hindu festival dedicated to the Sun God and his wife Usha.",
    culturalSignificance: "One of the most eco-friendly religious festivals with deep Vedic roots.",
    traditionalPractices: [
      "Ritual bathing in water bodies",
      "Fasting without water",
      "Offering prayers to setting and rising sun",
      "Thekuwa and other special offerings",
      "Community participation"
    ],
    rating: 4.5,
    icon: <Landmark className="text-orange-600" />
  },
  {
    id: 20,
    name: "Pongal (Kerala)",
    dates: "January 15, 2024",
    location: "Kerala",
    state: "Kerala",
    month: "January",
    type: "Harvest",
    duration: "1 day",
    description: "Kerala's version of the harvest festival marking the end of agricultural cycle.",
    culturalSignificance: "Celebrates the harvest and thanks the gods for agricultural bounty.",
    traditionalPractices: [
      "Preparing Pongal dish",
      "Decorating cattle",
      "Village gatherings",
      "Traditional games",
      "Cultural programs"
    ],
    rating: 4.4,
    icon: <Wheat className="text-green-500" />
  }
];

// Simulated AI Insights Generation
const generateCulturalInsights = async (festival) => {
  // Simulated delay for API call
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Base insights structure
  const insights = {
    historicalOrigins: `The ${festival.name} has deep roots in ${festival.state === 'Multiple States' ? 'ancient Indian traditions' : `${festival.state}'s rich cultural heritage`}, reflecting centuries of cultural evolution.`,
    spiritualSignificance: festival.type === 'Religious' 
      ? `Represents profound spiritual connections and philosophical meanings central to Indian culture.` 
      : `Embodies the cultural values and social harmony of ${festival.state === 'Multiple States' ? 'Indian society' : `${festival.state}`}.`,
    regionalVariations: festival.state === 'Multiple States' 
      ? [
          `Celebrated with unique local interpretations across different regions of India`,
          `Diverse cultural expressions reflecting local traditions and customs`,
          `Variations in rituals, foods, and celebration styles`
        ]
      : [
          `Distinct local traditions within ${festival.state}`,
          `Variations between urban and rural celebrations`,
          `Unique community-specific practices`
        ],
    contemporaryRelevance: `Continues to be a vibrant part of modern Indian cultural identity while maintaining traditional roots.`,
    keyRituals: festival.traditionalPractices || [
      `Traditional ceremonial practices`,
      `Community gathering and celebration`,
      `Special foods and feasting traditions`
    ],
    travelTips: [
      `Best experienced by participating in community celebrations`,
      `Respect local customs and dress codes`,
      `Try traditional festival foods for authentic experience`,
      `Arrive early to witness preparation rituals`,
      `Learn basic local phrases to connect with people`
    ]
  };

  // Festival-specific additions
  switch(festival.id) {
    case 1: // Diwali
      insights.historicalOrigins = "Traces back to ancient Hindu scriptures with origins in the Ramayana epic.";
      insights.spiritualSignificance = "Symbolizes the victory of light over darkness, knowledge over ignorance, and good over evil.";
      break;
    case 2: // Durga Puja
      insights.historicalOrigins = "Originated in Bengal during medieval times, evolving into its current grand form in the 18th century.";
      insights.spiritualSignificance = "Celebrates the divine feminine power (Shakti) and the triumph of good over evil.";
      break;
    case 3: // Holi
      insights.historicalOrigins = "Has roots in various Hindu legends including the story of Prahlad and Holika from the Puranas.";
      insights.spiritualSignificance = "Represents the victory of devotion over evil and the arrival of spring's rejuvenation.";
      break;
    case 10: // Kumbh Mela
      insights.historicalOrigins = "Dates back to at least the 7th century CE, mentioned by Chinese traveler Xuanzang.";
      insights.spiritualSignificance = "Considered the largest act of faith, where bathing in sacred waters cleanses sins and liberates from rebirth.";
      break;
    case 18: // Hornbill
      insights.historicalOrigins = "Started in 2000 to promote Naga cultural heritage and encourage inter-tribal interaction.";
      insights.spiritualSignificance = "Celebrates the unity in diversity of Naga tribes while preserving unique traditions.";
      break;
  }

  return insights;
};

function IndianCulturalFestivalFinder() {
  const [filters, setFilters] = useState({
    month: '',
    state: '',
    type: '',
    searchQuery: ''
  });
  const [festivals] = useState(indianFestivals);
  const [filteredFestivals, setFilteredFestivals] = useState(indianFestivals);
  const [selectedFestival, setSelectedFestival] = useState(null);
  const [culturalInsights, setCulturalInsights] = useState(null);
  const [loadingFestivalId, setLoadingFestivalId] = useState(null); // Track loading per festival
  const [error, setError] = useState(null);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [expandedFestival, setExpandedFestival] = useState(null);

  // Predefined filter options with expanded Indian context
  const months = [
    'January', 'February', 'March', 'April', 
    'May', 'June', 'July', 'August', 
    'September', 'October', 'November', 'December'
  ];

  const states = [
    'Andhra Pradesh', 'Assam', 'Bihar', 'Gujarat', 'Karnataka', 'Kerala', 
    'Maharashtra', 'Multiple States', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 
    'Tamil Nadu', 'Uttar Pradesh', 'West Bengal'
  ];

  const types = [
    'Religious', 'Harvest', 'Cultural', 'New Year'
  ];

  // Enhanced Filtering Logic
  useEffect(() => {
    const applyFilters = () => {
      let result = festivals;

      if (filters.month) {
        result = result.filter(festival => festival.month === filters.month);
      }
      if (filters.state) {
        result = result.filter(festival => festival.state === filters.state);
      }
      if (filters.type) {
        result = result.filter(festival => festival.type.includes(filters.type));
      }
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        result = result.filter(festival => 
          festival.name.toLowerCase().includes(query) ||
          festival.description.toLowerCase().includes(query) ||
          festival.location.toLowerCase().includes(query)
        );
      }

      setFilteredFestivals(result);
    };

    applyFilters();
  }, [filters, festivals]);

  const fetchCulturalInsights = async (festival) => {
    setLoadingFestivalId(festival.id);
    setError(null);
    try {
      const insights = await generateCulturalInsights(festival);
      setCulturalInsights(insights);
      setSelectedFestival(festival);
    } catch (error) {
      setError("Unable to retrieve cultural insights");
    } finally {
      setLoadingFestivalId(null);
    }
  };

  const resetFilters = () => {
    setFilters({ month: '', state: '', type: '', searchQuery: '' });
    setFilteredFestivals(festivals);
    setIsFilterModalOpen(false);
  };

  const toggleFestivalExpansion = (id) => {
    setExpandedFestival(expandedFestival === id ? null : id);
  };

  // Generate gradient background based on festival type
  const getFestivalGradient = (type) => {
    switch(type) {
      case 'Religious':
        return 'from-purple-100 to-blue-100';
      case 'Harvest':
        return 'from-green-100 to-yellow-100';
      case 'Cultural':
        return 'from-pink-100 to-red-100';
      case 'New Year':
        return 'from-blue-100 to-teal-100';
      default:
        return 'from-gray-100 to-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-green-50 p-4 md:p-8 pt-24">
      <div className="max-w-7xl mx-auto">
        {/* Header with Enhanced Typography */}
        <header className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 mt-12 text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-red-600 to-green-600">
            Indian Cultural Festival Explorer
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Discover the rich tapestry of India's vibrant festivals, their deep cultural significance, and time-honored traditions.
          </p>
        </header>

        {/* Search Bar */}
        <div className="mb-6 relative">
          <div className="relative">
            <input
              type="text"
              placeholder="Search festivals by name, location or description..."
              className="w-full p-4 pl-12 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent shadow-sm transition-all duration-300 focus:shadow-md"
              value={filters.searchQuery}
              onChange={(e) => setFilters({...filters, searchQuery: e.target.value})}
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
        </div>

        {/* Mobile-Friendly Filter Toggle */}
        <div className="mb-6 block md:hidden">
          <button 
            onClick={() => setIsFilterModalOpen(true)}
            className="w-full flex items-center justify-center py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition duration-300 shadow-md hover:shadow-lg"
          >
            <Filter className="mr-2" size={20} />
            Open Filters
          </button>
        </div>

        {/* Filters Section with Responsive Design */}
        <div className="hidden md:block mb-8">
          <div className="bg-white shadow-2xl rounded-2xl p-6 border-2 border-orange-100">
            <div className="grid md:grid-cols-4 gap-4">
              {/* Month Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <Calendar className="mr-2 text-orange-600" size={20} />
                  Select Month
                </label>
                <select 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent shadow-sm transition duration-300 hover:bg-orange-50"
                  value={filters.month}
                  onChange={(e) => setFilters({...filters, month: e.target.value})}
                >
                  <option value="">All Months</option>
                  {months.map(month => (
                    <option key={month} value={month}>{month}</option>
                  ))}
                </select>
              </div>

              {/* State Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <MapPin className="mr-2 text-green-600" size={20} />
                  Select State
                </label>
                <select 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm transition duration-300 hover:bg-green-50"
                  value={filters.state}
                  onChange={(e) => setFilters({...filters, state: e.target.value})}
                >
                  <option value="">All States</option>
                  {states.map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </div>

              {/* Type Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <Star className="mr-2 text-yellow-600" size={20} />
                  Festival Type
                </label>
                <select 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent shadow-sm transition duration-300 hover:bg-yellow-50"
                  value={filters.type}
                  onChange={(e) => setFilters({...filters, type: e.target.value})}
                >
                  <option value="">All Types</option>
                  {types.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              {/* Filter Action Buttons */}
              <div className="flex items-end">
                <button 
                  onClick={resetFilters}
                  className="w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-gray-200 to-gray-300 text-gray-800 rounded-lg hover:from-gray-300 hover:to-gray-400 transition duration-300 shadow-sm hover:shadow-md"
                >
                  <RefreshCw className="mr-2" size={20} />
                  Reset Filters
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Filter Modal */}
        {isFilterModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end md:hidden">
            <div className="bg-white rounded-t-2xl w-full max-h-[80vh] overflow-y-auto animate-slide-up">
              <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center shadow-sm">
                <h2 className="text-xl font-bold text-gray-800">Filters</h2>
                <button 
                  onClick={() => setIsFilterModalOpen(false)}
                  className="p-2 rounded-full hover:bg-gray-100 transition"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Mobile Filter Inputs */}
              <div className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Month</label>
                  <select 
                    className="w-full p-3 border border-gray-300 rounded-lg transition hover:bg-orange-50"
                    value={filters.month}
                    onChange={(e) => setFilters({...filters, month: e.target.value})}
                  >
                    <option value="">All Months</option>
                    {months.map(month => (
                      <option key={month} value={month}>{month}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                  <select 
                    className="w-full p-3 border border-gray-300 rounded-lg transition hover:bg-green-50"
                    value={filters.state}
                    onChange={(e) => setFilters({...filters, state: e.target.value})}
                  >
                    <option value="">All States</option>
                    {states.map(state => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Festival Type</label>
                  <select 
                    className="w-full p-3 border border-gray-300 rounded-lg transition hover:bg-yellow-50"
                    value={filters.type}
                    onChange={(e) => setFilters({...filters, type: e.target.value})}
                  >
                    <option value="">All Types</option>
                    {types.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div className="flex space-x-4 pt-4">
                  <button 
                    onClick={resetFilters}
                    className="flex-1 py-3 bg-gradient-to-r from-gray-200 to-gray-300 text-gray-800 rounded-lg shadow-sm hover:shadow-md transition"
                  >
                    Reset
                  </button>
                  <button 
                    onClick={() => setIsFilterModalOpen(false)}
                    className="flex-1 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg shadow-md hover:shadow-lg transition"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Results Count */}
        <div className="mb-6 text-gray-700">
          <p>Showing {filteredFestivals.length} of {festivals.length} festivals</p>
        </div>

        {/* Festivals Display Grid */}
        {filteredFestivals.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFestivals.map((festival) => (
              <div 
                key={festival.id} 
                className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className={`h-48 flex items-center justify-center bg-gradient-to-r ${getFestivalGradient(festival.type)}`}>
                  <div className="text-6xl">
                    {festival.icon}
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold mb-2 text-gray-800">{festival.name}</h3>
                    <button 
                      onClick={() => toggleFestivalExpansion(festival.id)}
                      className="text-gray-500 hover:text-orange-600 transition"
                    >
                      {expandedFestival === festival.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>
                  </div>
                  
                  <div className="space-y-2 text-gray-600 mb-4">
                    <p className="flex items-center text-sm">
                      <Calendar className="mr-2 text-blue-500" size={16} />
                      {festival.dates}
                    </p>
                    <p className="flex items-center text-sm">
                      <MapPin className="mr-2 text-green-500" size={16} />
                      {festival.location}, {festival.state}
                    </p>
                    <p className="flex items-center text-sm">
                      <Clock className="mr-2 text-purple-500" size={16} />
                      {festival.duration}
                    </p>
                  </div>
                  
                  <p className="text-gray-700 mb-4">{festival.description}</p>
                  
                  {/* Expanded Details */}
                  {expandedFestival === festival.id && (
                    <div className="space-y-4 mb-4 animate-fade-in">
                      <div className="bg-orange-50 p-3 rounded-lg">
                        <h4 className="font-semibold text-orange-800 mb-2 flex items-center">
                          <Info className="mr-2" size={16} /> Cultural Significance
                        </h4>
                        <p className="text-orange-700 text-sm">{festival.culturalSignificance}</p>
                      </div>

                      {festival.traditionalPractices && (
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-2">Traditional Practices</h4>
                          <ul className="list-disc pl-5 text-gray-700 text-sm space-y-1">
                            {festival.traditionalPractices.map((practice, index) => (
                              <li key={index}>{practice}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}

                  <button 
                    onClick={() => fetchCulturalInsights(festival)}
                    disabled={loadingFestivalId === festival.id}
                    className={`w-full ${loadingFestivalId === festival.id ? 'bg-gray-400' : 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800'} text-white py-2 rounded-lg transition duration-300 flex items-center justify-center shadow-md hover:shadow-lg`}
                  >
                    {loadingFestivalId === festival.id ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Generating Insights...
                      </>
                    ) : (
                      <>
                        <Star className="mr-2" size={16} />
                        Get AI Cultural Insights
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl shadow-lg transform transition hover:shadow-xl">
            <AlertTriangle className="mx-auto mb-4 text-orange-500" size={48} />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Festivals Found</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              We couldn't find any festivals matching your search criteria. Try adjusting your filters or search term.
            </p>
            <button 
              onClick={resetFilters}
              className="mt-4 px-6 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition duration-300 inline-flex items-center shadow-md hover:shadow-lg"
            >
              <RefreshCw className="mr-2" size={16} />
              Reset Filters
            </button>
          </div>
        )}

        {/* Cultural Insights Modal */}
        {selectedFestival && culturalInsights && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fade-in">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8 shadow-2xl transform transition-all duration-300 scale-95 hover:scale-100">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-green-600">
                  {selectedFestival.name} - Cultural Insights
                </h2>
                <button 
                  onClick={() => {
                    setSelectedFestival(null);
                    setCulturalInsights(null);
                  }}
                  className="text-gray-500 hover:text-orange-600 p-1 rounded-full hover:bg-gray-100 transition"
                >
                  <X size={24} />
                </button>
              </div>
              
              {error ? (
                <div className="bg-red-50 p-4 rounded-lg flex items-center text-red-600">
                  <AlertTriangle className="mr-2" size={20} />
                  {error}
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Festival Overview */}
                  <div className={`bg-gradient-to-r ${getFestivalGradient(selectedFestival.type)} p-4 rounded-lg shadow-inner`}>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-semibold text-gray-700">Location</p>
                        <p className="text-gray-800 font-medium">{selectedFestival.location}, {selectedFestival.state}</p>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-700">Dates</p>
                        <p className="text-gray-800 font-medium">{selectedFestival.dates}</p>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-700">Type</p>
                        <p className="text-gray-800 font-medium">{selectedFestival.type}</p>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-700">Duration</p>
                        <p className="text-gray-800 font-medium">{selectedFestival.duration}</p>
                      </div>
                    </div>
                  </div>

                  {/* Cultural Insights Sections */}
                  {Object.entries(culturalInsights).map(([key, value]) => (
                    <div key={key} className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition">
                      <h3 className="font-semibold text-green-800 mb-2 capitalize text-lg flex items-center">
                        <Info className="mr-2" size={18} />
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </h3>
                      {Array.isArray(value) ? (
                        <ul className="list-disc pl-5 text-gray-700 space-y-2">
                          {value.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-gray-700">{value}</p>
                      )}
                    </div>
                  ))}

                  {/* Travel Tips Section */}
                  <div className="bg-blue-50 p-4 rounded-lg shadow-sm hover:shadow-md transition">
                    <h3 className="font-semibold text-blue-800 mb-2 flex items-center">
                      <MapPin className="mr-2" size={18} />
                      Visitor Experience Tips
                    </h3>
                    <ul className="list-disc pl-5 text-blue-700 space-y-2">
                      <li>Best time to visit: During main celebration days</li>
                      <li>What to wear: Traditional attire is appreciated but not required</li>
                      <li>Photography: Ask permission before photographing rituals or people</li>
                      <li>Local customs: Remove shoes when entering sacred spaces</li>
                      <li>Food: Don't miss the special festival delicacies</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default IndianCulturalFestivalFinder;