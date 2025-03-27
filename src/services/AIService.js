import { GoogleGenerativeAI } from '@google/generative-ai';

// Configure Gemini AI (Replace with your actual API key)
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

/**
 * Get cultural insights about a specific location in India
 * @param {Object} locationData - Data about the cultural location
 * @returns {Promise<Object>} - AI-generated cultural insights
 */
async function getCulturalInsights(locationData) {
  const prompt = `
  Analyze this cultural location in India and provide detailed insights:
  
  Location: ${locationData.name}
  State: ${locationData.state}
  Type: ${locationData.type} (e.g., temple, festival, historical site)
  Significance: ${locationData.significance}
  Best Time to Visit: ${locationData.bestTime || 'Not specified'}
  User Rating: ${locationData.rating || 'Not rated yet'}

  Provide:
  1. Historical background
  2. Cultural significance
  3. Associated myths or stories
  4. Visitor recommendations
  5. Nearby cultural attractions

  Respond in this JSON format:
  \`\`\`json
  {
    "historicalBackground": "",
    "culturalSignificance": "",
    "mythsAndStories": [],
    "visitorRecommendations": [],
    "nearbyAttractions": []
  }
  \`\`\`
  `;

  try {
    const result = await model.generateContent({
      contents: [{ parts: [{ text: prompt }]}]
    });

    // Extract text response
    let text = result.response.candidates[0].content.parts[0].text;

    // Remove Markdown code block (` ```json ` and ` ``` `)
    text = text.replace(/^```json\n/, "").replace(/\n```$/, "");

    return JSON.parse(text);
  } catch (error) {
    console.error("AI Error:", error);
    return { error: "Failed to generate cultural insights" };
  }
}

/**
 * Generate festival recommendations based on date and location
 * @param {Object} festivalData - Date and location filters
 * @returns {Promise<Object>} - AI-generated festival recommendations
 */
async function getFestivalRecommendations(festivalData) {
  const prompt = `
  Recommend Indian cultural festivals based on these criteria:
  
  Month: ${festivalData.month || 'Any'}
  State: ${festivalData.state || 'All India'}
  Festival Type: ${festivalData.type || 'Any'}
  Duration: ${festivalData.duration || 'Any'}

  Provide:
  1. List of recommended festivals with:
    - Name
    - Date(s)
    - Location(s)
    - Brief description
    - Cultural significance
  2. Best ways to experience each festival
  3. Travel tips

  Respond in this JSON format:
  \`\`\`json
  {
    "festivals": [
      {
        "name": "",
        "dates": "",
        "location": "",
        "description": "",
        "significance": "",
        "experienceTips": "",
        "travelTips": ""
      }
    ]
  }
  \`\`\`
  `;

  try {
    const result = await model.generateContent({
      contents: [{ parts: [{ text: prompt }]}]
    });

    let text = result.response.candidates[0].content.parts[0].text;
    text = text.replace(/^```json\n/, "").replace(/\n```$/, "");

    return JSON.parse(text);
  } catch (error) {
    console.error("AI Error:", error);
    return { error: "Failed to generate festival recommendations" };
  }
}

/**
 * Validate and enhance user-submitted cultural information
 * @param {Object} userSubmission - User-submitted cultural data
 * @returns {Promise<Object>} - Validated and enhanced cultural data
 */
async function validateCulturalSubmission(userSubmission) {
  const prompt = `
  Validate and enhance this user-submitted cultural information about India:
  
  Submission Type: ${userSubmission.type}
  Title: ${userSubmission.title}
  Location: ${userSubmission.location}
  Description: ${userSubmission.description}
  Date/Time: ${userSubmission.dateTime || 'Not specified'}
  User Notes: ${userSubmission.notes || 'None'}

  Please:
  1. Verify the factual accuracy
  2. Suggest improvements to the description
  3. Add any relevant historical/cultural context
  4. Identify potential duplicate entries
  5. Provide categorization suggestions

  Respond in this JSON format:
  \`\`\`json
  {
    "isValid": true/false,
    "verifiedData": {
      "title": "",
      "location": "",
      "description": "",
      "type": "",
      "historicalContext": "",
      "tags": []
    },
    "improvementSuggestions": "",
    "potentialDuplicates": [],
    "status": "approved"/"needsReview"/"rejected"
  }
  \`\`\`
  `;

  try {
    const result = await model.generateContent({
      contents: [{ parts: [{ text: prompt }]}]
    });

    let text = result.response.candidates[0].content.parts[0].text;
    text = text.replace(/^```json\n/, "").replace(/\n```$/, "");

    return JSON.parse(text);
  } catch (error) {
    console.error("AI Error:", error);
    return { error: "Failed to validate submission" };
  }
}

export { getCulturalInsights, getFestivalRecommendations, validateCulturalSubmission };