import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Globe, 
  MapPin, 
  Image as ImageIcon, 
  BookOpen, 
  ChevronLeft, 
  ChevronRight,
  ChevronDown,
  Maximize2,
  Minimize2,
  Info,
  X,
  ArrowLeft,
  Play,
  Pause,
  Volume2,
  VolumeX
} from 'lucide-react';

// Import images with proper paths (replace with your actual image paths)
import TajMahal1 from '../assets/tjm1.jpg';
import TajMahal2 from '../assets/tmj2.jpg';
import GoldenTemple1 from '../assets/GT1.jpg';
import GoldenTemple2 from '../assets/GT2.jpg';
import KonarkSunTemple1 from '../assets/KST1.jpg';
import KonarkSunTemple2 from '../assets/KST2.jpg';
import IndiaMap from '../assets/india-map.png';
import BackgroundPattern from '../assets/indian-pattern.png';

// Expanded Cultural Insights with More Details
const CULTURAL_INSIGHTS = {
  "Taj Mahal": {
    location: {
      coordinates: [27.1751, 78.0421],
      city: "Agra, Uttar Pradesh",
      region: "North India",
      mapZoom: 5
    },
    culturalSignificance: "A breathtaking marble mausoleum symbolizing eternal love, built by Mughal Emperor Shah Jahan for his beloved wife Mumtaz Mahal. The Taj Mahal is considered the finest example of Mughal architecture, combining elements from Persian, Islamic, and Indian architectural styles.",
    historicalPeriod: "Mughal Era (1632-1653)",
    architecturalStyle: "Mughal Architecture with Persian Influences",
    mythsAndStories: [
      "Legend says Shah Jahan planned to build a black marble mausoleum for himself across the river, which would have been connected by a silver bridge",
      "The Taj Mahal changes colors throughout the day, appearing pinkish in the morning, milky white in the evening, and golden under moonlight",
      "Over 1,000 elephants were used to transport building materials during construction",
      "The four minarets tilt slightly outward to protect the main tomb in case of collapse"
    ],
    funFacts: [
      "The marble changes color throughout the day from pinkish to golden",
      "Contains intricate pietra dura (stone inlay) with 28 types of precious stones",
      "The entire complex is perfectly symmetrical except for Shah Jahan's cenotaph",
      "Took 22 years and 20,000 workers to complete"
    ],
    images: [TajMahal1, TajMahal2],
    colorTheme: "from-amber-800 to-rose-900",
    textColor: "text-amber-100"
  },
  "Golden Temple": {
    location: {
      coordinates: [31.6200, 74.8766],
      city: "Amritsar, Punjab",
      region: "North India",
      mapZoom: 5
    },
    culturalSignificance: "The holiest shrine of Sikhism, representing equality, brotherhood, and community service. Known as Harmandir Sahib, its golden dome and serene sarovar (holy tank) create a breathtaking sight that attracts millions of pilgrims annually.",
    historicalPeriod: "16th-18th Century",
    architecturalStyle: "Indo-Islamic Architecture with Sikh Elements",
    mythsAndStories: [
      "The foundation stone was laid by Sufi saint Hazrat Mian Mir at Guru Arjan's request",
      "Maharaja Ranjit Singh covered the upper floors with gold foil in the early 19th century",
      "The temple has four entrances symbolizing openness to all people",
      "Survived multiple attacks including one by Ahmed Shah Abdali in 1762"
    ],
    funFacts: [
      "750 kg of pure gold covers the upper floors",
      "Serves free meals (langar) to over 100,000 people daily",
      "The sarovar (pool) contains holy water believed to have healing properties",
      "Open 24 hours to people of all faiths and backgrounds"
    ],
    images: [GoldenTemple1, GoldenTemple2],
    colorTheme: "from-yellow-600 to-orange-700",
    textColor: "text-yellow-100"
  },
  "Konark Sun Temple": {
    location: {
      coordinates: [19.8875, 86.0944],
      city: "Konark, Odisha",
      region: "East India",
      mapZoom: 5
    },
    culturalSignificance: "A magnificent 13th-century temple dedicated to the Sun God Surya, designed as a gigantic stone chariot with elaborately carved wheels, pillars and walls. This UNESCO World Heritage Site showcases the pinnacle of Kalinga architecture and ancient India's astronomical knowledge.",
    historicalPeriod: "Eastern Ganga Dynasty (1250 CE)",
    architecturalStyle: "Kalinga Architecture",
    mythsAndStories: [
      "Built by King Narasimhadeva I to commemorate his military victories",
      "The main temple allegedly housed a massive magnetic idol that caused ships to wreck",
      "Legend says the temple's construction took 12 years and 1,200 artisans",
      "The temple's collapse is shrouded in mystery with theories ranging from natural disasters to Portuguese attacks"
    ],
    funFacts: [
      "The 12 pairs of wheels are precise sundials showing exact time of day",
      "Originally had a 229-foot tall shikhara (main tower) that no longer exists",
      "Erotic sculptures depict various aspects of life and Kama Sutra positions",
      "The entire structure is designed as the Sun God's chariot with 7 horses"
    ],
    images: [KonarkSunTemple1, KonarkSunTemple2],
    colorTheme: "from-red-800 to-amber-900",
    textColor: "text-amber-50"
  }
};

function CulturalMap() {
  const globeContainerRef = useRef(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [insights, setInsights] = useState(null);
  const [imageIndex, setImageIndex] = useState(0);
  const [showFunFacts, setShowFunFacts] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const imageContainerRef = useRef(null);
  const [showIndiaMap, setShowIndiaMap] = useState(false);

  // Initialize audio
  useEffect(() => {
    audioRef.current = new Audio();
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Handle audio when location changes
  useEffect(() => {
    if (!insights || !audioRef.current) return;

    audioRef.current.src = insights.audio;
    audioRef.current.loop = true;
    
    if (isPlaying) {
      audioRef.current.play().catch(e => console.log("Audio play failed:", e));
    }

    return () => {
      audioRef.current.pause();
    };
  }, [insights, isPlaying]);

  // Toggle audio play/pause
  const toggleAudio = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.log("Audio play failed:", e));
    }
    setIsPlaying(!isPlaying);
  };

  // Toggle mute
  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Advanced GSAP Globe Visualization
  useEffect(() => {
    if (!globeContainerRef.current) return;

    const globeContainer = globeContainerRef.current;
    globeContainer.innerHTML = '';
    
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.setAttribute('viewBox', '0 0 600 600');
    globeContainer.appendChild(svg);

    // Gradient Background for Globe
    const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    
    // Main globe gradient
    const globeGradient = document.createElementNS("http://www.w3.org/2000/svg", "radialGradient");
    globeGradient.setAttribute('id', 'globeGradient');
    globeGradient.innerHTML = `
      <stop offset="0%" stop-color="#1e293b"/>
      <stop offset="50%" stop-color="#0f172a"/>
      <stop offset="100%" stop-color="#020617"/>
    `;
    defs.appendChild(globeGradient);
    
    // Marker gradient
    const markerGradient = document.createElementNS("http://www.w3.org/2000/svg", "radialGradient");
    markerGradient.setAttribute('id', 'markerGradient');
    markerGradient.setAttribute('gradientTransform', 'rotate(45)');
    markerGradient.innerHTML = `
      <stop offset="0%" stop-color="#f59e0b"/>
      <stop offset="100%" stop-color="#b45309"/>
    `;
    defs.appendChild(markerGradient);
    
    svg.appendChild(defs);

    // Globe Background with Gradient
    const globeBackground = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    globeBackground.setAttribute('cx', '300');
    globeBackground.setAttribute('cy', '300');
    globeBackground.setAttribute('r', '280');
    globeBackground.setAttribute('fill', 'url(#globeGradient)');
    globeBackground.setAttribute('stroke', 'rgba(255,255,255,0.05)');
    globeBackground.setAttribute('stroke-width', '2');
    svg.appendChild(globeBackground);

    // Grid Lines with more organic feel
    for (let i = 0; i < 36; i++) {
      const longitude = document.createElementNS("http://www.w3.org/2000/svg", "path");
      const angle = i * 10;
      const x1 = 300 + Math.cos(angle * Math.PI / 180) * 280;
      const y1 = 300 + Math.sin(angle * Math.PI / 180) * 280;
      
      longitude.setAttribute('d', `M300,300 L${x1},${y1}`);
      longitude.setAttribute('stroke', 'rgba(234,179,8,0.15)');
      longitude.setAttribute('stroke-dasharray', '2,2');
      svg.appendChild(longitude);
    }

    // Latitude circles
    for (let i = 1; i < 6; i++) {
      const radius = i * 50;
      const latitude = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      latitude.setAttribute('cx', '300');
      latitude.setAttribute('cy', '300');
      latitude.setAttribute('r', radius.toString());
      latitude.setAttribute('fill', 'none');
      latitude.setAttribute('stroke', 'rgba(234,179,8,0.1)');
      latitude.setAttribute('stroke-dasharray', '3,3');
      svg.appendChild(latitude);
    }

    // India Outline (simplified)
    const indiaPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    indiaPath.setAttribute('d', 'M350,280 L340,300 L330,310 L320,320 L310,330 L300,340 L290,350 L280,360 L270,370 L260,380 L250,390 L240,400 L230,410 L220,420 L210,430 L200,440 L190,450 L180,460 L170,470 L160,480 L150,490 L140,500 L130,510 L120,520 L110,530 L100,540 L90,550 L80,560 L70,570 L60,580 L50,590 L40,600 L30,610 L20,620 L10,630 L0,640 L-10,650 L-20,660 L-30,670 L-40,680 L-50,690 L-60,700 L-70,710 L-80,720 L-90,730 L-100,740 L-110,750 L-120,760 L-130,770 L-140,780 L-150,790 L-160,800 L-170,810 L-180,820 L-190,830 L-200,840 L-210,850 L-220,860 L-230,870 L-240,880 L-250,890 L-260,900 L-270,910 L-280,920 L-290,930 L-300,940 L-310,950 L-320,960 L-330,970 L-340,980 L-350,990 L-360,1000 L-370,1010 L-380,1020 L-390,1030 L-400,1040 L-410,1050 L-420,1060 L-430,1070 L-440,1080 L-450,1090 L-460,1100 L-470,1110 L-480,1120 L-490,1130 L-500,1140 L-510,1150 L-520,1160 L-530,1170 L-540,1180 L-550,1190 L-560,1200 L-570,1210 L-580,1220 L-590,1230 L-600,1240');
    indiaPath.setAttribute('transform', 'scale(0.2) translate(1500, -500)');
    indiaPath.setAttribute('fill', 'rgba(234,179,8,0.05)');
    indiaPath.setAttribute('stroke', 'rgba(234,179,8,0.2)');
    indiaPath.setAttribute('stroke-width', '1');
    svg.appendChild(indiaPath);

    // Cultural Site Markers with Advanced Animations
    Object.entries(CULTURAL_INSIGHTS).forEach(([name, data]) => {
      const markerGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
      
      // Convert lat/long to SVG coordinates
      const x = 300 + (data.location.coordinates[1] / 180) * 250;
      const y = 300 - (data.location.coordinates[0] / 90) * 250;
      
      // Glowing effect
      const glow = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      glow.setAttribute('cx', x);
      glow.setAttribute('cy', y);
      glow.setAttribute('r', '25');
      glow.setAttribute('fill', 'rgba(234,179,8,0.2)');
      glow.setAttribute('filter', 'url(#glow)');
      
      // Main marker
      const marker = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      marker.setAttribute('cx', x);
      marker.setAttribute('cy', y);
      marker.setAttribute('r', '12');
      marker.setAttribute('fill', 'url(#markerGradient)');
      marker.setAttribute('stroke', '#f59e0b');
      marker.setAttribute('stroke-width', '2');
      marker.setAttribute('data-location', name);
      
      // Pulse animation circle
      const pulse = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      pulse.setAttribute('cx', x);
      pulse.setAttribute('cy', y);
      pulse.setAttribute('r', '12');
      pulse.setAttribute('fill', 'none');
      pulse.setAttribute('stroke', '#f59e0b');
      pulse.setAttribute('stroke-width', '2');

      markerGroup.appendChild(glow);
      markerGroup.appendChild(marker);
      markerGroup.appendChild(pulse);
      svg.appendChild(markerGroup);

      // Add hover and click effects
      markerGroup.addEventListener('mouseenter', () => {
        gsap.to(marker, { scale: 1.5, duration: 0.3 });
        gsap.to(glow, { scale: 2, opacity: 0.5, duration: 0.3 });
      });
      
      markerGroup.addEventListener('mouseleave', () => {
        gsap.to(marker, { scale: 1, duration: 0.3 });
        gsap.to(glow, { scale: 1, opacity: 0.2, duration: 0.3 });
      });

      markerGroup.addEventListener('click', () => {
        setSelectedLocation(name);
        setInsights(CULTURAL_INSIGHTS[name]);
        setImageIndex(0);
        setIsPlaying(true);
      });

      // Advanced GSAP Marker Animations
      const tl = gsap.timeline({ repeat: -1, yoyo: true });
      tl.to(marker, { 
        scale: 1.3, 
        duration: 2, 
        ease: "sine.inOut" 
      })
      .to(pulse, { 
        scale: 3, 
        opacity: 0, 
        duration: 3, 
        ease: "power1.inOut" 
      }, 0);

      // Initial animation
      gsap.fromTo(markerGroup, 
        { scale: 0, opacity: 0 }, 
        { 
          scale: 1, 
          opacity: 1, 
          duration: 1, 
          ease: 'elastic.out(1, 0.3)',
          delay: Math.random() * 0.8 
        }
      );
    });

    // Add glow filter
    const filter = document.createElementNS("http://www.w3.org/2000/svg", "filter");
    filter.setAttribute('id', 'glow');
    filter.setAttribute('height', '300%');
    filter.setAttribute('width', '300%');
    filter.setAttribute('x', '-75%');
    filter.setAttribute('y', '-75%');
    
    const feGaussianBlur = document.createElementNS("http://www.w3.org/2000/svg", "feGaussianBlur");
    feGaussianBlur.setAttribute('stdDeviation', '5');
    feGaussianBlur.setAttribute('result', 'blur');
    
    const feComposite = document.createElementNS("http://www.w3.org/2000/svg", "feComposite");
    feComposite.setAttribute('in', 'SourceGraphic');
    feComposite.setAttribute('in2', 'blur');
    feComposite.setAttribute('operator', 'overlay');
    
    filter.appendChild(feGaussianBlur);
    filter.appendChild(feComposite);
    defs.appendChild(filter);

    // Globe Rotation with Interactive Control
    let rotationX = 0;
    let rotationY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;
    let isDragging = false;
    let startX, startY;
    
    const handleMouseDown = (e) => {
      isDragging = true;
      startX = e.clientX;
      startY = e.clientY;
    };
    
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      
      targetRotationY = dx * 0.2;
      targetRotationX = dy * 0.1;
      
      startX = e.clientX;
      startY = e.clientY;
    };
    
    const handleMouseUp = () => {
      isDragging = false;
    };
    
    globeContainer.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    
    // Smooth rotation animation
    const animateRotation = () => {
      if (!isDragging) {
        // Slow auto-rotation when not dragging
        targetRotationY += 0.1;
      }
      
      rotationX += (targetRotationX - rotationX) * 0.1;
      rotationY += (targetRotationY - rotationY) * 0.1;
      
      gsap.set(svg, {
        rotationY: rotationY,
        rotationX: rotationX,
        transformOrigin: 'center center'
      });
      
      requestAnimationFrame(animateRotation);
    };
    
    animateRotation();

    return () => {
      globeContainer.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  // Image Navigation Handlers
  const handleNextImage = () => {
    if (insights && insights.images) {
      setImageIndex((prev) => (prev + 1) % insights.images.length);
    }
  };

  const handlePrevImage = () => {
    if (insights && insights.images) {
      setImageIndex((prev) => (prev - 1 + insights.images.length) % insights.images.length);
    }
  };

  // Toggle fullscreen for image
  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (imageContainerRef.current.requestFullscreen) {
        imageContainerRef.current.requestFullscreen();
      } else if (imageContainerRef.current.webkitRequestFullscreen) {
        imageContainerRef.current.webkitRequestFullscreen();
      } else if (imageContainerRef.current.msRequestFullscreen) {
        imageContainerRef.current.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  // Handle fullscreen change
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('msfullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('msfullscreenchange', handleFullscreenChange);
    };
  }, []);

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white flex flex-col md:flex-row relative overflow-hidden mt-12 p-12"
      style={{
        backgroundImage: `url(${BackgroundPattern})`,
        backgroundSize: 'cover',
        backgroundBlendMode: 'overlay'
      }}
    >
      {/* Account for navbar height */}
      <div className="h-16 md:h-20"></div>
      
      {/* Floating decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              opacity: 0,
              x: Math.random() * 100 - 50,
              y: Math.random() * 100 - 50,
              scale: Math.random() * 0.5 + 0.5
            }}
            animate={{ 
              opacity: [0, 0.3, 0],
              y: `+=${Math.random() * 100 + 50}`,
              x: `+=${Math.random() * 100 - 50}`
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: 'loop',
              ease: 'linear'
            }}
            className="absolute text-amber-400/20"
            style={{
              fontSize: `${Math.random() * 20 + 10}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          >
            {['ॐ', '☸', '✸', '卐', '☬'][Math.floor(Math.random() * 5)]}
          </motion.div>
        ))}
      </div>

      {/* Interactive Globe Visualization */}
      <div 
        ref={globeContainerRef} 
        className={`w-full h-[50vh] mt-12 md:h-[calc(100vh-5rem)] transition-all duration-500 ${selectedLocation ? 'md:w-1/2' : 'md:w-full'}`}
      />
      
      {/* Cultural Insights Panel */}
      <AnimatePresence mode="wait">
        {selectedLocation ? (
          <motion.div 
            key={selectedLocation}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5, type: 'spring' }}
            className={`w-full md:w-1/2 p-4 mt-12 md:p-6 z-20 relative overflow-y-auto ${insights?.colorTheme || 'from-slate-800 to-slate-900'} bg-gradient-to-br`}
            style={{ height: 'calc(50vh - 4rem)' }}
          >
            {/* Location Header */}
            <div className="flex justify-between items-start mb-4">
              <motion.div 
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <button 
                  onClick={() => {
                    setSelectedLocation(null);
                    setInsights(null);
                    setIsPlaying(false);
                  }}
                  className="flex items-center gap-2 text-white/90 hover:text-white transition-colors mb-2"
                >
                  <ArrowLeft size={18} />
                  <span>Back to Map</span>
                </button>
                
                <h2 className="text-3xl md:text-4xl font-bold text-white flex items-center gap-3">
                  <MapPin className="text-amber-400" size={28} />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 to-amber-500">
                    {selectedLocation}
                  </span>
                </h2>
                <p className="text-amber-200/90 text-sm md:text-base">{insights?.location.city}, {insights?.location.region}</p>
              </motion.div>
              
              {/* Audio Controls */}
              <div className="flex gap-1">
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleAudio}
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 transition-all"
                  title={isPlaying ? "Pause audio" : "Play audio"}
                >
                  {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleMute}
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 transition-all"
                  title={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </motion.button>
              </div>
            </div>

            {insights && (
              <div className="space-y-4 md:space-y-6">
                {/* Historical Tags */}
                <div className="flex flex-wrap gap-2">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="bg-amber-900/70 text-white px-3 py-1 rounded-full flex items-center gap-1 hover:bg-amber-800 transition-all text-sm"
                  >
                    <BookOpen size={16} />
                    <span>{insights.historicalPeriod}</span>
                  </motion.div>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-amber-800/70 text-white px-3 py-1 rounded-full hover:bg-amber-700 transition-all text-sm"
                  >
                    {insights.architecturalStyle}
                  </motion.div>
                  <motion.button
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3 }}
                    onClick={() => setShowIndiaMap(!showIndiaMap)}
                    className="bg-white/20 text-white px-3 py-1 rounded-full hover:bg-white/30 transition-all flex items-center gap-1 text-sm"
                  >
                    <Globe size={16} />
                    <span>View on Map</span>
                  </motion.button>
                </div>

                {/* India Map Modal */}
                <AnimatePresence>
                  {showIndiaMap && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
                      onClick={() => setShowIndiaMap(false)}
                    >
                      <motion.div
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0.8 }}
                        className="relative bg-slate-900 rounded-xl overflow-hidden max-w-4xl w-full max-h-[90vh]"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="absolute top-4 right-4 z-10">
                          <button 
                            onClick={() => setShowIndiaMap(false)}
                            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 transition-all"
                          >
                            <X size={20} />
                          </button>
                        </div>
                        <div className="relative h-full">
                          <img 
                            src={IndiaMap} 
                            alt="India Map" 
                            className="w-full h-full object-contain"
                          />
                          <div 
                            className="absolute bg-amber-400 rounded-full w-6 h-6 border-2 border-amber-600 shadow-lg animate-pulse"
                            style={{
                              left: `${50 + (insights.location.coordinates[1] / 180) * 40}%`,
                              top: `${50 - (insights.location.coordinates[0] / 90) * 40}%`,
                              transform: 'translate(-50%, -50%)'
                            }}
                          />
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Image Gallery */}
                {insights.images && insights.images.length > 0 && (
                  <motion.div 
                    ref={imageContainerRef}
                    className="relative rounded-xl overflow-hidden shadow-2xl group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <AnimatePresence mode="wait">
                      <motion.img 
                        key={imageIndex}
                        src={insights.images[imageIndex]} 
                        alt={`${selectedLocation} view`}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        transition={{ duration: 0.5 }}
                        className="w-full h-48 md:h-64 object-cover"
                      />
                    </AnimatePresence>
                    
                    {/* Image Navigation */}
                    {insights.images.length > 1 && (
                      <>
                        <motion.button 
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={handlePrevImage}
                          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/40 rounded-full p-2 backdrop-blur-sm transition-all"
                        >
                          <ChevronLeft size={20} />
                        </motion.button>
                        <motion.button 
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={handleNextImage}
                          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/40 rounded-full p-2 backdrop-blur-sm transition-all"
                        >
                          <ChevronRight size={20} />
                        </motion.button>
                      </>
                    )}
                    
                    {/* Image Controls */}
                    <div className="absolute top-0 right-0 flex gap-1 p-2">
                      <motion.button 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={toggleFullscreen}
                        className="bg-white/30 hover:bg-white/40 rounded-full p-1 backdrop-blur-sm transition-all"
                        title={isFullscreen ? "Exit fullscreen" : "View fullscreen"}
                      >
                        {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                      </motion.button>
                      <div className="bg-black/70 text-white px-2 py-1 rounded-full text-xs">
                        {imageIndex + 1} / {insights.images.length}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Cultural Significance */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white/10 backdrop-blur-lg p-4 rounded-xl mt-5 border border-white/10"
                >
                  <h3 className="text-lg font-semibold text-amber-300 mb-2">Cultural Significance</h3>
                  <p className={`${insights.textColor || 'text-white/90'} leading-relaxed text-sm md:text-base`}>
                    {insights.culturalSignificance}
                  </p>
                </motion.div>

                {/* Toggleable Facts Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white/10 backdrop-blur-lg p-4 rounded-xl border border-white/10 overflow-hidden"
                >
                  <div className="flex justify-between items-center mb-2 cursor-pointer" onClick={() => setShowFunFacts(!showFunFacts)}>
                    <h3 className="text-lg font-semibold text-amber-300 flex items-center gap-2">
                      <Info size={18} />
                      {showFunFacts ? 'Fun Facts' : 'Location Details'}
                    </h3>
                    <motion.div animate={{ rotate: showFunFacts ? 180 : 0 }}>
                      <ChevronDown size={20} />
                    </motion.div>
                  </div>
                  
                  <AnimatePresence>
                    {!showFunFacts ? (
                      <motion.div
                        key="location"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`${insights.textColor || 'text-white/90'} space-y-1 text-sm`}
                      >
                        <p><span className="font-medium text-amber-200">City:</span> {insights.location.city}</p>
                        <p><span className="font-medium text-amber-200">Region:</span> {insights.location.region}</p>
                        <p><span className="font-medium text-amber-200">Coordinates:</span> {insights.location.coordinates.join(', ')}</p>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="facts"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ul className={`space-y-2 list-disc pl-5 ${insights.textColor || 'text-white/90'} text-sm`}>
                          {insights.funFacts.map((fact, index) => (
                            <motion.li 
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.1 + index * 0.05 }}
                              className="hover:text-amber-200 transition-colors"
                            >
                              {fact}
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Historical Stories */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-white/10 backdrop-blur-lg p-4 rounded-xl border border-white/10"
                >
                  <h3 className="text-lg font-semibold text-amber-300 mb-3 flex items-center gap-2">
                    <ImageIcon size={18} />
                    Historical Stories & Myths
                  </h3>
                  <ul className="space-y-3">
                    {insights.mythsAndStories.map((story, index) => (
                      <motion.li 
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 + index * 0.15 }}
                        className="bg-white/10 p-3 rounded-lg border-l-4 border-amber-500/70 hover:border-amber-500 transition-all text-sm"
                      >
                        <p className={`${insights.textColor || 'text-white/90'}`}>{story}</p>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            )}
          </motion.div>
        ) : (
          // Default View with Enhanced Design
          <motion.div 
            key="default-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full flex items-center justify-center p-4 md:p-6 z-10 absolute md:relative"
            style={{ height: 'calc(100vh - 5rem)' }}
          >
            <div className="text-center max-w-2xl">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mb-6 md:mb-8"
              >
                <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-amber-300 to-amber-500">
                  India's Cultural Heritage
                </h1>
                <p className="text-lg md:text-xl text-white/90 mb-6 leading-relaxed">
                  Explore the magnificent tapestry of India's cultural landmarks. 
                  Each site tells a unique story of history, architecture, and tradition.
                </p>
              </motion.div>
              
              <div className="flex flex-wrap justify-center gap-4">
                {Object.entries(CULTURAL_INSIGHTS).map(([location, data], index) => (
                  <motion.button
                    key={location}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ 
                      delay: 0.4 + index * 0.15,
                      type: "spring",
                      stiffness: 300,
                      damping: 15
                    }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setSelectedLocation(location);
                      setInsights(data);
                      setIsPlaying(true);
                    }}
                    className={`bg-gradient-to-br ${data.colorTheme} p-1 rounded-2xl shadow-lg hover:shadow-xl transition-all`}
                  >
                    <div className="bg-slate-900/90 hover:bg-slate-900/70 rounded-xl p-4 transition-all h-full">
                      <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-amber-500 to-amber-700 rounded-full flex items-center justify-center mx-auto mb-3 shadow-inner">
                        <MapPin size={24} className="text-white" />
                      </div>
                      <h3 className="text-lg md:text-xl font-semibold text-white mb-1">{location}</h3>
                      <p className="text-amber-300/90 text-sm">{data.location.city}</p>
                    </div>
                  </motion.button>
                ))}
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="mt-8 text-white/80 text-sm"
              >
                <p>Click on any cultural site to begin exploration</p>
                <div className="flex justify-center mt-2">
                  <motion.div
                    animate={{ y: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ChevronDown size={20} />
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default CulturalMap;