import React, { useState, useEffect, useCallback } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  Trophy, 
  RefreshCw,
  Globe,
  Star,
  Info,
  Clock,
  ArrowRight,
  Medal
} from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Configuration for Gemini AI
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || 'AIzaSyBUpkr7y-nrr8ODoZ4LKjttWDeLSfBhSYw';
const GEMINI_MODEL = "gemini-1.5-flash";

const CulturalQuiz = () => {
  // Gemini AI State Management
  const [genAI, setGenAI] = useState(null);
  const [model, setModel] = useState(null);

  // AI Insight State
  const [aiInsight, setAiInsight] = useState(null);
  const [isLoadingAiInsight, setIsLoadingAiInsight] = useState(false);
  const [aiInsightError, setAiInsightError] = useState(null);
  const [showInsightButton, setShowInsightButton] = useState(false);

  // Quiz State
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(15);
  const [timerActive, setTimerActive] = useState(false);
  const [timeBonus, setTimeBonus] = useState(0);
  const [isGeneratingQuiz, setIsGeneratingQuiz] = useState(true);

  // Initialize Gemini AI
  useEffect(() => {
    const initializeGeminiAI = async () => {
      try {
        if (!GEMINI_API_KEY || GEMINI_API_KEY === 'YOUR_ACTUAL_API_KEY') {
          throw new Error("Gemini API key is not properly configured.");
        }
        
        const initializedGenAI = new GoogleGenerativeAI(GEMINI_API_KEY);
        const initializedModel = await initializedGenAI.getGenerativeModel({ 
          model: GEMINI_MODEL 
        });
        
        setGenAI(initializedGenAI);
        setModel(initializedModel);
      } catch (error) {
        console.error("Gemini AI Initialization Error:", error);
        setAiInsightError(error.message || "Failed to initialize AI service.");
      }
    };

    initializeGeminiAI();
  }, []);

  // Generate dynamic quiz questions
  useEffect(() => {
    const generateQuizQuestions = async () => {
      if (!model) return;

      try {
        setIsGeneratingQuiz(true);
        const prompt = `Generate 5 multiple choice questions about Indian culture with these requirements:
        
        1. Each question should have 4 options with 1 correct answer
        2. Include these fields for each question:
           - question: The question text
           - options: Array of 4 options
           - correctAnswer: The correct option
           - explanation: Brief explanation of the answer
           - difficulty: Easy/Medium/Hard
           - category: Arts/Geography/Cuisine/Literature/History
           - region: Specific region or Pan-India
        
        3. Questions should cover diverse aspects of Indian culture
        4. Format as a valid JSON array with exactly 5 questions
        
        Example format:
        [
          {
            "question": "...",
            "options": ["...", "...", "...", "..."],
            "correctAnswer": "...",
            "explanation": "...",
            "difficulty": "...",
            "category": "...",
            "region": "..."
          }
        ]`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        let text = response.text();
        
        // Clean the response to extract JSON
        const jsonStart = text.indexOf('[');
        const jsonEnd = text.lastIndexOf(']') + 1;
        const jsonString = text.slice(jsonStart, jsonEnd);

        const questions = JSON.parse(jsonString);
        setQuizQuestions(questions);
      } catch (error) {
        console.error("Quiz Generation Error:", error);
        // Fallback questions if API fails
        setQuizQuestions([
          {
            question: "Which classical dance form originated in Tamil Nadu?",
            options: ["Kathak", "Bharatanatyam", "Manipuri", "Odissi"],
            correctAnswer: "Bharatanatyam",
            explanation: "Bharatanatyam originated in Tamil Nadu temples.",
            difficulty: "Medium",
            category: "Arts",
            region: "Tamil Nadu"
          },
          {
            question: "Which river is considered sacred in Hinduism?",
            options: ["Yamuna", "Godavari", "Ganges", "Brahmaputra"],
            correctAnswer: "Ganges",
            explanation: "The Ganges is revered as a goddess in Hinduism.",
            difficulty: "Easy",
            category: "Geography",
            region: "North India"
          }
        ]);
      } finally {
        setIsGeneratingQuiz(false);
      }
    };

    if (model) {
      generateQuizQuestions();
    }
  }, [model]);

  // Generate AI Insight when requested
  const generateAiInsight = useCallback(async (question) => {
    if (!model) return;

    setIsLoadingAiInsight(true);
    setAiInsight(null);
    setAiInsightError(null);

    try {
      const prompt = `Provide a cultural insight about: "${question}"
      
      Structure your response as:
      {
        "historicalContext": "...",
        "culturalSignificance": "...",
        "personalStory": "..."
      }`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      let text = response.text();
      
      const jsonStart = text.indexOf('{');
      const jsonEnd = text.lastIndexOf('}') + 1;
      const jsonString = text.slice(jsonStart, jsonEnd);

      const insight = JSON.parse(jsonString);
      setAiInsight(insight);
    } catch (error) {
      console.error("AI Insight Error:", error);
      setAiInsightError("Couldn't generate insight. Please try again.");
      setAiInsight({
        historicalContext: "Interesting historical context about this topic",
        culturalSignificance: "This holds cultural significance in India",
        personalStory: "There's a fascinating story related to this"
      });
    } finally {
      setIsLoadingAiInsight(false);
    }
  }, [model]);

  // Timer Effect
  useEffect(() => {
    let timer;
    if (timerActive && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      handleAnswerSelect(null); // Auto-submit when time runs out
    }
    return () => clearInterval(timer);
  }, [timerActive, timeRemaining]);

  // Question Change Effect
  useEffect(() => {
    if (quizQuestions.length > 0) {
      setTimeRemaining(15);
      setTimerActive(true);
      setTimeBonus(15);
      setSelectedAnswer(null);
      setAiInsight(null);
      setShowInsightButton(false);
    }
  }, [currentQuestion, quizQuestions]);

  // Handle Answer Selection
  const handleAnswerSelect = useCallback((answer) => {
    if (selectedAnswer !== null) return;
    
    setTimerActive(false);
    setSelectedAnswer(answer || "No answer"); // Handle timeout case
    setShowInsightButton(true); // Show the insight button after answer is selected
    
    if (answer === quizQuestions[currentQuestion]?.correctAnswer) {
      const bonus = Math.max(0, timeRemaining);
      setScore(prev => prev + 1 + Math.floor(bonus / 3));
      setTimeBonus(bonus);
    }
  }, [selectedAnswer, currentQuestion, quizQuestions, timeRemaining]);

  // Move to Next Question
  const moveToNextQuestion = useCallback(() => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setQuizCompleted(true);
    }
  }, [currentQuestion, quizQuestions.length]);

  // Reset Quiz
  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setQuizCompleted(false);
    setTimerActive(true);
    setQuizQuestions([]);
    setIsGeneratingQuiz(true);
  };

  // Score Description
  const getScoreDescription = () => {
    const percentage = quizQuestions.length > 0 ? (score / quizQuestions.length) * 100 : 0;
    if (percentage === 100) return { title: "Cultural Grandmaster", icon: <Medal className="text-gold-500" /> };
    if (percentage >= 80) return { title: "Cultural Connoisseur", icon: <Trophy className="text-yellow-500" /> };
    if (percentage >= 60) return { title: "Cultural Expert", icon: <Star className="text-purple-500" /> };
    if (percentage >= 40) return { title: "Cultural Explorer", icon: <Globe className="text-blue-500" /> };
    return { title: "Cultural Novice", icon: <Info className="text-gray-500" /> };
  };

  // Render AI Insight
  const renderAiInsight = () => {
    if (!selectedAnswer || !aiInsight) return null;
    if (isLoadingAiInsight) return (
      <div className="bg-purple-100 p-4 rounded-lg mb-4 text-center animate-pulse">
        <p className="text-purple-700">Loading cultural insight...</p>
      </div>
    );

    if (aiInsightError) return (
      <div className="bg-red-50 p-4 rounded-lg mb-4 text-red-600">
        <p>{aiInsightError}</p>
      </div>
    );

    return (
      <div className="bg-purple-50 p-4 rounded-lg mb-4">
        <h4 className="font-bold text-purple-800 mb-2">Cultural Insight</h4>
        <div className="space-y-3">
          <div>
            <h5 className="text-sm font-semibold text-purple-700">Historical Context</h5>
            <p className="text-sm text-purple-600">{aiInsight?.historicalContext}</p>
          </div>
          <div>
            <h5 className="text-sm font-semibold text-purple-700">Cultural Significance</h5>
            <p className="text-sm text-purple-600">{aiInsight?.culturalSignificance}</p>
          </div>
          <div>
            <h5 className="text-sm font-semibold text-purple-700">Story/Legend</h5>
            <p className="text-sm text-purple-600 italic">{aiInsight?.personalStory}</p>
          </div>
        </div>
      </div>
    );
  };

  if (isGeneratingQuiz) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-purple-700">Generating your cultural quiz...</p>
        </div>
      </div>
    );
  }

  if (quizQuestions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-purple-800 mb-4">Quiz Unavailable</h2>
          <p className="text-purple-600 mb-4">Could not generate quiz questions.</p>
          <button 
            onClick={resetQuiz}
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-purple-50 to-indigo-100 min-h-screen flex items-center justify-center p-4 mt-12">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden">
        {!quizCompleted ? (
          <div className="relative p-6 md:p-8">
            {/* Timer and Score */}
            <div className="absolute top-4 right-4 flex space-x-4">
              <div className="flex items-center bg-purple-100 px-3 py-1 rounded-full">
                <Clock className="mr-2 text-purple-600" size={20} />
                <span className="text-purple-800 font-semibold">{timeRemaining}s</span>
              </div>
              <div className="flex items-center bg-purple-100 px-3 py-1 rounded-full">
                <Star className="mr-2 text-purple-600" size={20} />
                <span className="text-purple-800 font-semibold">{score}</span>
              </div>
            </div>

            {/* Question Header */}
            <h2 className="text-2xl font-bold text-center mb-6 text-purple-900 mt-12">
              <Globe className="inline mr-2" /> Indian Cultural Quiz
            </h2>

            {/* Question Area */}
            <div className="bg-purple-50 p-5 rounded-2xl mb-6">
              <h3 className="text-xl font-semibold text-purple-900 mb-3">
                {quizQuestions[currentQuestion].question}
              </h3>
              <div className="flex flex-wrap gap-2 text-xs text-purple-600">
                <span className="bg-purple-200 px-2 py-1 rounded">{quizQuestions[currentQuestion].difficulty}</span>
                <span className="bg-purple-200 px-2 py-1 rounded">{quizQuestions[currentQuestion].category}</span>
                <span className="bg-purple-200 px-2 py-1 rounded">{quizQuestions[currentQuestion].region}</span>
              </div>
            </div>

            {/* Answer Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
              {quizQuestions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(option)}
                  disabled={selectedAnswer !== null}
                  className={`
                    p-3 rounded-lg transition-all text-left
                    ${selectedAnswer === option 
                      ? (option === quizQuestions[currentQuestion].correctAnswer 
                        ? 'bg-green-500 text-white' 
                        : 'bg-red-500 text-white')
                      : 'bg-purple-100 hover:bg-purple-200 text-purple-800'}
                  `}
                >
                  {option}
                </button>
              ))}
            </div>

            {/* Insight Button (only shows after answer) */}
            {showInsightButton && !aiInsight && (
              <button
                onClick={() => generateAiInsight(quizQuestions[currentQuestion].question)}
                disabled={isLoadingAiInsight}
                className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 mb-4"
              >
                {isLoadingAiInsight ? (
                  <span>Loading Insight...</span>
                ) : (
                  <span>Get Cultural Insight</span>
                )}
              </button>
            )}

            {/* AI Insight (only shows when available) */}
            {renderAiInsight()}

            {/* Explanation and Next Button */}
            {selectedAnswer && (
              <div className="mt-4 p-4 rounded-lg bg-purple-50">
                <p className="font-medium mb-3">
                  {selectedAnswer === quizQuestions[currentQuestion].correctAnswer 
                    ? <CheckCircle2 className="inline mr-2 text-green-500" /> 
                    : <XCircle className="inline mr-2 text-red-500" />}
                  {quizQuestions[currentQuestion].explanation}
                </p>
                {selectedAnswer === quizQuestions[currentQuestion].correctAnswer && timeBonus > 0 && (
                  <p className="text-sm text-green-600 mb-3">⏱️ Time Bonus: +{Math.floor(timeBonus / 3)}</p>
                )}
                <button 
                  onClick={moveToNextQuestion}
                  className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700"
                >
                  {currentQuestion === quizQuestions.length - 1 ? 'Finish Quiz' : 'Next Question'}
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="p-6 md:p-8 text-center">
            <div className="text-5xl mb-4">
              {getScoreDescription().icon}
            </div>
            <h2 className="text-2xl font-bold text-purple-800 mb-4">Quiz Completed!</h2>
            <div className="bg-purple-50 p-4 rounded-lg mb-6 max-w-md mx-auto">
              <p className="text-xl font-semibold">
                Score: {score}/{quizQuestions.length}
              </p>
              <p className="text-lg text-purple-700">
                ({Math.round((score / quizQuestions.length) * 100)}%)
              </p>
            </div>
            <h3 className="text-xl font-semibold text-purple-700 mb-6">
              {getScoreDescription().title}
            </h3>
            <button 
              onClick={resetQuiz}
              className="bg-purple-600 text-white py-2 px-5 rounded-lg hover:bg-purple-700"
            >
              <RefreshCw className="inline mr-2" /> Restart Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CulturalQuiz;