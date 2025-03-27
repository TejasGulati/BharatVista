import { useState } from 'react';
import { getFestivalRecommendations } from '../services/AIService';

function FestivalFinder() {
  const [filters, setFilters] = useState({
    month: '',
    state: '',
    type: '',
    duration: ''
  });
  const [festivals, setFestivals] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const result = await getFestivalRecommendations(filters);
      if (result.festivals) {
        setFestivals(result.festivals);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <div className="flex flex-wrap gap-4 mb-6">
        <select 
          className="p-2 border rounded"
          value={filters.month}
          onChange={(e) => setFilters({...filters, month: e.target.value})}
        >
          <option value="">All Months</option>
          {/* Month options */}
        </select>
        <select 
          className="p-2 border rounded"
          value={filters.state}
          onChange={(e) => setFilters({...filters, state: e.target.value})}
        >
          <option value="">All States</option>
          {/* State options */}
        </select>
        <button 
          className="px-4 py-2 bg-blue-600 text-white rounded"
          onClick={handleSearch}
          disabled={loading}
        >
          {loading ? 'Searching...' : 'Find Festivals'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {festivals.map((festival, index) => (
          <div key={index} className="p-4 border rounded-lg shadow">
            <h3 className="text-xl font-bold">{festival.name}</h3>
            <p className="text-gray-600">{festival.dates} • {festival.location}</p>
            <p className="mt-2">{festival.description}</p>
            <div className="mt-4">
              <h4 className="font-semibold">Experience Tips:</h4>
              <p>{festival.experienceTips}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FestivalFinder;