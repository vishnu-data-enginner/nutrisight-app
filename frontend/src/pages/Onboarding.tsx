import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { saveHealthProfile, markOnboardingCompleted } from '../lib/supabase';
import { 
  Heart, 
  Target, 
  Leaf, 
  CheckCircle, 
  ArrowRight, 
  ArrowLeft,
  Sparkles,
  User,
  Activity,
  Zap
} from 'lucide-react';

interface HealthProfile {
  gender: string;
  age_range: string;
  diabetes: boolean;
  blood_pressure: boolean;
  pcos_thyroid: boolean;
  heart_conditions: boolean;
  digestive_issues: boolean;
  allergies: string[];
  primary_goal: string;
  secondary_goals: string[];
  diet_type: string;
  restrictions: string[];
  activity_level: string;
}

const Onboarding = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<HealthProfile>({
    gender: '',
    age_range: '',
    diabetes: false,
    blood_pressure: false,
    pcos_thyroid: false,
    heart_conditions: false,
    digestive_issues: false,
    allergies: [],
    primary_goal: '',
    secondary_goals: [],
    diet_type: 'omnivore',
    restrictions: [],
    activity_level: 'moderate'
  });

  const totalSteps = 4;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSave = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      // Save health profile
      const { error: profileError } = await saveHealthProfile(user.id, profile);
      if (profileError) throw profileError;

      // Mark onboarding as completed
      const { error: updateError } = await markOnboardingCompleted(user.id);
      if (updateError) throw updateError;

      navigate('/dashboard');
    } catch (error) {
      console.error('Error saving health profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = (field: keyof HealthProfile, value: any) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const toggleArrayValue = (field: keyof HealthProfile, value: string) => {
    const currentArray = profile[field] as string[];
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value];
    updateProfile(field, newArray);
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <User className="h-8 w-8 text-emerald-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Tell us about yourself</h2>
        <p className="text-gray-600">This helps us personalize your nutrition insights</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Gender</label>
          <div className="grid grid-cols-2 gap-3">
            {['male', 'female', 'other', 'prefer_not_to_say'].map((option) => (
              <button
                key={option}
                onClick={() => updateProfile('gender', option)}
                className={`p-3 rounded-lg border-2 transition-all ${
                  profile.gender === option
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                    : 'border-gray-200 hover:border-emerald-300'
                }`}
              >
                {option.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Age Range</label>
          <div className="grid grid-cols-2 gap-3">
            {['18-25', '26-35', '36-50', '50+'].map((range) => (
              <button
                key={range}
                onClick={() => updateProfile('age_range', range)}
                className={`p-3 rounded-lg border-2 transition-all ${
                  profile.age_range === range
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                    : 'border-gray-200 hover:border-emerald-300'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Heart className="h-8 w-8 text-red-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Health Conditions</h2>
        <p className="text-gray-600">Do you have any existing conditions we should consider?</p>
      </div>

      <div className="space-y-4">
        {[
          { key: 'diabetes', label: 'Diabetes', icon: '🩸' },
          { key: 'blood_pressure', label: 'High Blood Pressure', icon: '💓' },
          { key: 'pcos_thyroid', label: 'PCOS / Thyroid Issues', icon: '🦋' },
          { key: 'heart_conditions', label: 'Heart Conditions', icon: '❤️' },
          { key: 'digestive_issues', label: 'Digestive Issues', icon: '🌿' }
        ].map((condition) => (
          <button
            key={condition.key}
            onClick={() => updateProfile(condition.key as keyof HealthProfile, !profile[condition.key as keyof HealthProfile])}
            className={`w-full p-4 rounded-lg border-2 transition-all flex items-center gap-3 ${
              profile[condition.key as keyof HealthProfile]
                ? 'border-red-500 bg-red-50 text-red-700'
                : 'border-gray-200 hover:border-red-300'
            }`}
          >
            <span className="text-2xl">{condition.icon}</span>
            <span className="font-medium">{condition.label}</span>
            {profile[condition.key as keyof HealthProfile] && (
              <CheckCircle className="h-5 w-5 ml-auto" />
            )}
          </button>
        ))}
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Target className="h-8 w-8 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Health Goals</h2>
        <p className="text-gray-600">What's your main health objective?</p>
      </div>

      <div className="space-y-4">
        {[
          { key: 'sugar_management', label: 'Manage Sugar & Insulin', icon: '🩸', desc: 'Control blood sugar levels' },
          { key: 'weight_loss', label: 'Lose or Maintain Weight', icon: '⚖️', desc: 'Healthy weight management' },
          { key: 'muscle_gain', label: 'Build Muscle', icon: '💪', desc: 'Strength and muscle development' },
          { key: 'clean_eating', label: 'Eat Cleaner', icon: '🥗', desc: 'Whole, unprocessed foods' },
          { key: 'heart_health', label: 'Heart Health', icon: '❤️', desc: 'Cardiovascular wellness' },
          { key: 'wellness', label: 'Overall Wellness', icon: '🌿', desc: 'General health improvement' }
        ].map((goal) => (
          <button
            key={goal.key}
            onClick={() => updateProfile('primary_goal', goal.key)}
            className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
              profile.primary_goal === goal.key
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-200 hover:border-blue-300'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{goal.icon}</span>
              <div>
                <div className="font-medium">{goal.label}</div>
                <div className="text-sm opacity-75">{goal.desc}</div>
              </div>
              {profile.primary_goal === goal.key && (
                <CheckCircle className="h-5 w-5 ml-auto" />
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Leaf className="h-8 w-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Dietary Preferences</h2>
        <p className="text-gray-600">Any dietary restrictions or preferences?</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Diet Type</label>
          <div className="grid grid-cols-2 gap-3">
            {['omnivore', 'vegetarian', 'vegan', 'pescatarian'].map((diet) => (
              <button
                key={diet}
                onClick={() => updateProfile('diet_type', diet)}
                className={`p-3 rounded-lg border-2 transition-all ${
                  profile.diet_type === diet
                    ? 'border-green-500 bg-green-50 text-green-700'
                    : 'border-gray-200 hover:border-green-300'
                }`}
              >
                {diet.charAt(0).toUpperCase() + diet.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Restrictions (Select all that apply)</label>
          <div className="grid grid-cols-2 gap-3">
            {['gluten_free', 'dairy_free', 'low_sodium', 'low_sugar', 'keto', 'paleo'].map((restriction) => (
              <button
                key={restriction}
                onClick={() => toggleArrayValue('restrictions', restriction)}
                className={`p-3 rounded-lg border-2 transition-all ${
                  profile.restrictions.includes(restriction)
                    ? 'border-green-500 bg-green-50 text-green-700'
                    : 'border-gray-200 hover:border-green-300'
                }`}
              >
                {restriction.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1: return renderStep1();
      case 2: return renderStep2();
      case 3: return renderStep3();
      case 4: return renderStep4();
      default: return renderStep1();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="bg-white/80 backdrop-blur-sm border border-emerald-100 rounded-2xl shadow-xl p-8">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">
                Step {currentStep} of {totalSteps}
              </span>
              <span className="text-sm font-medium text-emerald-600">
                {Math.round((currentStep / totalSteps) * 100)}% Complete
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Step Content */}
          {renderCurrentStep()}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-emerald-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="h-4 w-4" />
              Previous
            </button>

            {currentStep < totalSteps ? (
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all duration-200"
              >
                Next
                <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                onClick={handleSave}
                disabled={loading}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    Complete Setup
                  </>
                )}
              </button>
            )}
          </div>

          {/* Skip Option */}
          <div className="text-center mt-6">
            <button
              onClick={() => navigate('/dashboard')}
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              Skip for now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
