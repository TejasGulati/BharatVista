import { useState, useEffect } from 'react';
import { getCulturalInsights } from '../services/AIService';

function LocationDetails({ location }) {
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInsights = async () => {
      setLoading(true);
      try {
        const result = await getCulturalInsights(location);
        if (result.error) {
          setError(result.error);
        } else {
          setInsights(result);
        }
      } catch (err) {
        setError('Failed to load cultural insights');
      } finally {
        setLoading(false);
      }
    };

    fetchInsights();
  }, [location]);

  if (loading) return <div>Loading cultural insights...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">{location.name}</h2>
      {insights && (
        <>
          <div className="mb-4">
            <h3 className="text-xl font-semibold mb-2">Historical Background</h3>
            <p>{insights.historicalBackground}</p>
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-semibold mb-2">Cultural Significance</h3>
            <p>{insights.culturalSignificance}</p>
          </div>
          {insights.mythsAndStories.length > 0 && (
            <div className="mb-4">
              <h3 className="text-xl font-semibold mb-2">Myths and Stories</h3>
              <ul className="list-disc pl-5">
                {insights.mythsAndStories.map((story, index) => (
                  <li key={index}>{story}</li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default LocationDetails;