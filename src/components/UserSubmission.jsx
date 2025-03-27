import React, { useState } from 'react';
import { Plus } from 'lucide-react';

function UserSubmission() {
  const [formData, setFormData] = useState({
    type: 'festival',
    title: '',
    location: '',
    description: '',
    dateTime: '',
    notes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    // Simulate submission process
    setTimeout(() => {
      console.log('Submitted form data:', formData);
      setIsSubmitting(false);
      alert('Submission received! It will be reviewed and updated if correct.');
    }, 1000);
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-12">
      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="bg-indigo-600 text-white px-6 py-4 flex items-center">
          <Plus className="mr-3" size={24} />
          <h2 className="text-xl font-semibold">Contribute Cultural Insight</h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Type Selection */}
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-slate-700 mb-2">
              Event Type
            </label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md 
                focus:outline-none focus:ring-2 focus:ring-indigo-500 
                transition-all duration-300"
            >
              <option value="festival">Festival</option>
              <option value="concert">Concert</option>
              <option value="exhibition">Exhibition</option>
            </select>
          </div>

          {/* Title Input */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-slate-700 mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md 
                focus:outline-none focus:ring-2 focus:border-indigo-500 focus:ring-indigo-300"
              placeholder="Enter event title"
            />
          </div>

          {/* Location Input */}
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-slate-700 mb-2">
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md 
                focus:outline-none focus:ring-2 focus:border-indigo-500 focus:ring-indigo-300"
              placeholder="Enter event location"
            />
          </div>

          {/* DateTime Input */}
          <div>
            <label htmlFor="dateTime" className="block text-sm font-medium text-slate-700 mb-2">
              Date and Time
            </label>
            <input
              type="datetime-local"
              id="dateTime"
              name="dateTime"
              value={formData.dateTime}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md 
                focus:outline-none focus:ring-2 focus:border-indigo-500 focus:ring-indigo-300"
            />
          </div>

          {/* Description Textarea */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-2">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md 
                focus:outline-none focus:ring-2 focus:border-indigo-500 focus:ring-indigo-300"
              placeholder="Describe the event"
              rows={4}
            />
          </div>

          {/* Optional Notes */}
          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-slate-700 mb-2">
              Additional Notes (Optional)
            </label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md 
                focus:outline-none focus:ring-2 focus:border-indigo-500 focus:ring-indigo-300"
              placeholder="Any additional information"
              rows={3}
            />
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            className={`w-full px-4 py-2 rounded-md text-white font-semibold 
              transition-all duration-300
              ${isSubmitting 
                ? 'bg-indigo-400 cursor-not-allowed' 
                : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Contribution'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default UserSubmission;