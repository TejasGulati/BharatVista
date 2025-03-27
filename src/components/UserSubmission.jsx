import { useState } from 'react';
import { validateCulturalSubmission } from '../services/AIService';

function UserSubmission() {
  const [formData, setFormData] = useState({
    type: 'festival',
    title: '',
    location: '',
    description: '',
    dateTime: '',
    notes: ''
  });
  const [validationResult, setValidationResult] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const result = await validateCulturalSubmission(formData);
      setValidationResult(result);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Form fields */}
        <button 
          type="submit" 
          className="px-4 py-2 bg-green-600 text-white rounded"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Validating...' : 'Submit for Validation'}
        </button>
      </form>

      {validationResult && (
        <div className="mt-6 p-4 border rounded-lg">
          <h3 className="text-xl font-bold mb-2">Validation Results</h3>
          {validationResult.isValid ? (
            <p className="text-green-600">✓ This submission appears valid</p>
          ) : (
            <p className="text-yellow-600">⚠ This submission needs review</p>
          )}
          <div className="mt-4">
            <h4 className="font-semibold">Suggested Improvements:</h4>
            <p>{validationResult.improvementSuggestions}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserSubmission;