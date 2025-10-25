import React from 'react'
import { 
  Heart, 
  Brain, 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Info, 
  Zap, 
  Activity,
  Droplets,
  Flame,
  Star,
  TrendingUp,
  TrendingDown,
  Minus
} from 'lucide-react'

interface HealthRisk {
  risk_type: string
  severity: 'low' | 'medium' | 'high'
  description: string
  affected_ingredients: string[]
  scientific_evidence?: string
  prevention_tips?: string[]
}

interface NutritionalInsight {
  protein_content: string
  fiber_content: string
  vitamin_content: string
  mineral_content: string
  processing_level: string
  sugar_level: string
  sodium_level: string
  fat_quality: string
}

interface AnalysisData {
  health_score: number
  health_risks: HealthRisk[]
  nutritional_insights: NutritionalInsight
  extracted_ingredients: string[]
  risk_ingredients: string[]
  tags: string[]
  allergen_warnings: string[]
  alternative_suggestions: string[]
  sustainability_score: number
  cost_effectiveness: number
  processing_level: number
}

interface MedicalGradeAnalysisProps {
  analysis: AnalysisData
}

const MedicalGradeAnalysis: React.FC<MedicalGradeAnalysisProps> = ({ analysis }) => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200'
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'low': return 'text-blue-600 bg-blue-50 border-blue-200'
      default: return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high': return <AlertTriangle className="h-5 w-5" />
      case 'medium': return <Info className="h-5 w-5" />
      case 'low': return <CheckCircle className="h-5 w-5" />
      default: return <Info className="h-5 w-5" />
    }
  }

  const getTrendIcon = (level: string) => {
    switch (level) {
      case 'high': return <TrendingUp className="h-4 w-4 text-red-500" />
      case 'medium': return <Minus className="h-4 w-4 text-yellow-500" />
      case 'low': return <TrendingDown className="h-4 w-4 text-green-500" />
      default: return <Minus className="h-4 w-4 text-gray-500" />
    }
  }

  const getQualityIcon = (quality: string) => {
    switch (quality) {
      case 'excellent': return <Star className="h-4 w-4 text-green-500" />
      case 'good': return <CheckCircle className="h-4 w-4 text-blue-500" />
      case 'fair': return <Info className="h-4 w-4 text-yellow-500" />
      case 'poor': return <AlertTriangle className="h-4 w-4 text-red-500" />
      default: return <Info className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <div className="space-y-8">
      {/* Medical-Grade Health Score */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 border-2 border-blue-200 rounded-xl p-8">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm mb-4">
            <Activity className="h-5 w-5 text-blue-600" />
            <span className="text-sm font-semibold text-blue-600">Medical-Grade Analysis</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Comprehensive Health Assessment</h2>
          <p className="text-gray-600">Professional health risk evaluation based on scientific research</p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className={`absolute inset-0 rounded-3xl ${
              analysis.health_score >= 80 ? 'bg-green-200' : 
              analysis.health_score >= 60 ? 'bg-yellow-200' : 'bg-red-200'
            } blur-xl`}></div>
            <div className={`relative rounded-3xl border-4 ${
              analysis.health_score >= 80 ? 'border-green-500 bg-green-50' : 
              analysis.health_score >= 60 ? 'border-yellow-500 bg-yellow-50' : 'border-red-500 bg-red-50'
            } px-20 py-12`}>
              <div className="text-center">
                <div className="mb-4 flex items-center justify-center gap-3">
                  {analysis.health_score >= 80 ? (
                    <CheckCircle className="h-12 w-12 text-green-600" />
                  ) : analysis.health_score >= 60 ? (
                    <Info className="h-12 w-12 text-yellow-600" />
                  ) : (
                    <AlertTriangle className="h-12 w-12 text-red-600" />
                  )}
                  <span className={`text-8xl font-bold ${
                    analysis.health_score >= 80 ? 'text-green-600' : 
                    analysis.health_score >= 60 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {analysis.health_score}/100
                  </span>
                </div>
                <p className={`text-2xl font-bold ${
                  analysis.health_score >= 80 ? 'text-green-600' : 
                  analysis.health_score >= 60 ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {analysis.health_score >= 80 ? 'Excellent Health Profile' : 
                   analysis.health_score >= 60 ? 'Good Health Profile' : 
                   analysis.health_score >= 40 ? 'Fair Health Profile' : 'Poor Health Profile'}
                </p>
                <p className="text-lg text-gray-600 mt-2">
                  {analysis.health_score >= 80 ? 'This product supports optimal health and nutrition' :
                   analysis.health_score >= 60 ? 'This product has moderate health benefits with some concerns' :
                   analysis.health_score >= 40 ? 'This product has significant health concerns' :
                   'This product poses multiple health risks and should be avoided'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Health Risks */}
      {analysis.health_risks && analysis.health_risks.length > 0 && (
        <div className="bg-white border-2 border-gray-200 rounded-xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">Health Risk Assessment</h3>
              <p className="text-gray-600">Detailed analysis of potential health concerns</p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {analysis.health_risks.map((risk, index) => (
              <div key={index} className={`border-2 p-6 rounded-xl ${getSeverityColor(risk.severity)}`}>
                <div className="flex items-start gap-4">
                  <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl ${
                    risk.severity === 'high' ? 'bg-red-200' :
                    risk.severity === 'medium' ? 'bg-yellow-200' :
                    'bg-blue-200'
                  }`}>
                    {getSeverityIcon(risk.severity)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className={`text-lg font-bold ${
                        risk.severity === 'high' ? 'text-red-600' :
                        risk.severity === 'medium' ? 'text-yellow-600' :
                        'text-blue-600'
                      }`}>
                        {risk.risk_type.replace('_', ' ').toUpperCase()}
                      </h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        risk.severity === 'high' ? 'bg-red-200 text-red-800' :
                        risk.severity === 'medium' ? 'bg-yellow-200 text-yellow-800' :
                        'bg-blue-200 text-blue-800'
                      }`}>
                        {risk.severity.toUpperCase()}
                      </span>
                    </div>
                    <p className={`text-sm mb-3 ${
                      risk.severity === 'high' ? 'text-red-700' :
                      risk.severity === 'medium' ? 'text-yellow-700' :
                      'text-blue-700'
                    }`}>
                      {risk.description}
                    </p>
                    {risk.affected_ingredients && risk.affected_ingredients.length > 0 && (
                      <div className="mb-3">
                        <p className="text-xs font-semibold mb-1">Problematic Ingredients:</p>
                        <div className="flex flex-wrap gap-1">
                          {risk.affected_ingredients.map((ingredient, idx) => (
                            <span key={idx} className="px-2 py-1 bg-white border rounded text-xs">
                              {ingredient}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {risk.scientific_evidence && (
                      <div className="text-xs text-gray-600 italic">
                        <strong>Scientific Evidence:</strong> {risk.scientific_evidence}
                      </div>
                    )}
                    {risk.prevention_tips && risk.prevention_tips.length > 0 && (
                      <div className="mt-3">
                        <p className="text-xs font-semibold mb-1">Prevention Tips:</p>
                        <ul className="text-xs space-y-1">
                          {risk.prevention_tips.map((tip, idx) => (
                            <li key={idx} className="flex items-start gap-1">
                              <CheckCircle className="h-3 w-3 mt-0.5 flex-shrink-0" />
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Nutritional Insights */}
      {analysis.nutritional_insights && (
        <div className="bg-white border-2 border-gray-200 rounded-xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">
              <Flame className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">Nutritional Profile Analysis</h3>
              <p className="text-gray-600">Detailed breakdown of nutritional content and quality</p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {Object.entries(analysis.nutritional_insights).map(([key, value]) => (
              <div key={key} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  {key.includes('quality') ? getQualityIcon(value as string) : getTrendIcon(value as string)}
                  <h4 className="font-semibold text-gray-900 capitalize">
                    {key.replace('_', ' ')}
                  </h4>
                </div>
                <p className={`text-sm font-medium ${
                  value === 'high' || value === 'excellent' ? 'text-green-600' :
                  value === 'medium' || value === 'good' ? 'text-blue-600' :
                  value === 'low' || value === 'fair' ? 'text-yellow-600' :
                  'text-red-600'
                }`}>
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Ingredient Analysis */}
      {analysis.extracted_ingredients && analysis.extracted_ingredients.length > 0 && (
        <div className="bg-white border-2 border-gray-200 rounded-xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
              <Brain className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">Ingredient Analysis</h3>
              <p className="text-gray-600">Detailed breakdown of each ingredient and its health impact</p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {analysis.extracted_ingredients.map((ingredient, index) => {
              const isRiskIngredient = analysis.risk_ingredients?.some(risk => 
                risk.toLowerCase().includes(ingredient.toLowerCase()) || 
                ingredient.toLowerCase().includes(risk.toLowerCase())
              )
              
              return (
                <div key={index} className={`border-2 p-4 rounded-lg ${
                  isRiskIngredient ? 'border-red-200 bg-red-50' : 'border-green-200 bg-green-50'
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    {isRiskIngredient ? (
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                    ) : (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    )}
                    <h4 className={`font-semibold ${
                      isRiskIngredient ? 'text-red-600' : 'text-green-600'
                    }`}>
                      {ingredient}
                    </h4>
                  </div>
                  <p className={`text-sm ${
                    isRiskIngredient ? 'text-red-700' : 'text-green-700'
                  }`}>
                    {isRiskIngredient 
                      ? 'This ingredient may pose health risks and should be consumed in moderation.'
                      : 'This ingredient is generally safe and may provide nutritional benefits.'
                    }
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Healthier Alternatives */}
      {analysis.alternative_suggestions && analysis.alternative_suggestions.length > 0 && (
        <div className="bg-white border-2 border-gray-200 rounded-xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">Healthier Alternatives</h3>
              <p className="text-gray-600">Better options for improved health and nutrition</p>
            </div>
          </div>

          <div className="space-y-4">
            {analysis.alternative_suggestions.map((suggestion, index) => (
              <div key={index} className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <p className="text-green-700">{suggestion}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Allergen Warnings */}
      {analysis.allergen_warnings && analysis.allergen_warnings.length > 0 && (
        <div className="bg-white border-2 border-red-200 rounded-xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100">
              <Shield className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">Allergen Warnings</h3>
              <p className="text-gray-600">Important allergen information for your safety</p>
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            {analysis.allergen_warnings.map((allergen, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0" />
                <span className="text-red-700 font-medium">{allergen}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Additional Metrics */}
      <div className="grid gap-6 md:grid-cols-3">
        <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100">
              <Zap className="h-5 w-5 text-blue-600" />
            </div>
            <h4 className="text-lg font-bold text-gray-900">Processing Level</h4>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {analysis.processing_level}/10
            </div>
            <p className="text-sm text-gray-600">
              {analysis.processing_level <= 3 ? 'Minimally Processed' :
               analysis.processing_level <= 6 ? 'Moderately Processed' :
               analysis.processing_level <= 8 ? 'Highly Processed' : 'Ultra-Processed'}
            </p>
          </div>
        </div>

        <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100">
              <Droplets className="h-5 w-5 text-green-600" />
            </div>
            <h4 className="text-lg font-bold text-gray-900">Sustainability</h4>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {analysis.sustainability_score}/10
            </div>
            <p className="text-sm text-gray-600">
              {analysis.sustainability_score >= 8 ? 'Excellent' :
               analysis.sustainability_score >= 6 ? 'Good' :
               analysis.sustainability_score >= 4 ? 'Fair' : 'Poor'}
            </p>
          </div>
        </div>

        <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100">
              <Star className="h-5 w-5 text-purple-600" />
            </div>
            <h4 className="text-lg font-bold text-gray-900">Value</h4>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {analysis.cost_effectiveness}/10
            </div>
            <p className="text-sm text-gray-600">
              {analysis.cost_effectiveness >= 8 ? 'Excellent Value' :
               analysis.cost_effectiveness >= 6 ? 'Good Value' :
               analysis.cost_effectiveness >= 4 ? 'Fair Value' : 'Poor Value'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MedicalGradeAnalysis

