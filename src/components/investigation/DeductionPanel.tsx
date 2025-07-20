import React, { useState } from 'react';
import { Target, CheckCircle, XCircle, Trophy, RotateCcw } from 'lucide-react';
import { useCase } from '../../context/CaseContext';
import { submitDeduction } from '../../services/aiService';

const DeductionPanel: React.FC = () => {
  const { currentCase } = useCase();
  const [selectedSuspect, setSelectedSuspect] = useState('');
  const [selectedMotive, setSelectedMotive] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<any>(null);

  if (!currentCase) return null;

  const motives = [
    'Financial Gain',
    'Revenge',
    'Jealousy',
    'Self-Defense',
    'Accident',
    'Cover-up',
    'Mental Illness',
    'Unknown'
  ];

  const methods = [
    'Poisoning',
    'Shooting',
    'Stabbing',
    'Strangulation',
    'Blunt Force',
    'Drowning',
    'Fire',
    'Other'
  ];

  const handleSubmitDeduction = async () => {
    if (!selectedSuspect || !selectedMotive || !selectedMethod) return;

    setIsSubmitting(true);
    
    try {
      const deduction = {
        suspect: selectedSuspect,
        motive: selectedMotive,
        method: selectedMethod
      };

      const response = await submitDeduction(deduction, currentCase);
      setResult(response);
    } catch (error) {
      console.error('Deduction submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSelectedSuspect('');
    setSelectedMotive('');
    setSelectedMethod('');
    setResult(null);
  };

  const isFormComplete = selectedSuspect && selectedMotive && selectedMethod;

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="bg-gray-800/50 border-b border-gray-700 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold text-white flex items-center space-x-3">
              <Target className="text-violet-400" size={28} />
              <span>Final Deduction</span>
            </h3>
            <p className="text-gray-400">Present your solution to solve the case</p>
          </div>
          
          {result && (
            <button
              onClick={handleReset}
              className="bg-gray-700 text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors flex items-center space-x-2"
            >
              <RotateCcw size={16} />
              <span>New Deduction</span>
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        {!result ? (
          <div className="max-w-4xl mx-auto">
            {/* Deduction Form */}
            <div className="grid lg:grid-cols-3 gap-8 mb-8">
              {/* Suspect Selection */}
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                <h4 className="text-lg font-bold text-red-400 mb-4 flex items-center space-x-2">
                  <Target size={20} />
                  <span>Who is the culprit?</span>
                </h4>
                
                <div className="space-y-3">
                  {currentCase.suspects.map((suspect) => (
                    <label
                      key={suspect.id}
                      className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all ${
                        selectedSuspect === suspect.name
                          ? 'bg-red-500/20 border border-red-500/30'
                          : 'bg-gray-700/50 hover:bg-gray-700'
                      }`}
                    >
                      <input
                        type="radio"
                        name="suspect"
                        value={suspect.name}
                        checked={selectedSuspect === suspect.name}
                        onChange={(e) => setSelectedSuspect(e.target.value)}
                        className="text-red-400"
                      />
                      <img
                        src={suspect.image}
                        alt={suspect.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div>
                        <div className="font-semibold text-white text-sm">{suspect.name}</div>
                        <div className="text-gray-400 text-xs">{suspect.role}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Motive Selection */}
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                <h4 className="text-lg font-bold text-yellow-400 mb-4">What was the motive?</h4>
                
                <div className="space-y-2">
                  {motives.map((motive) => (
                    <label
                      key={motive}
                      className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all ${
                        selectedMotive === motive
                          ? 'bg-yellow-500/20 border border-yellow-500/30'
                          : 'bg-gray-700/50 hover:bg-gray-700'
                      }`}
                    >
                      <input
                        type="radio"
                        name="motive"
                        value={motive}
                        checked={selectedMotive === motive}
                        onChange={(e) => setSelectedMotive(e.target.value)}
                        className="text-yellow-400"
                      />
                      <span className="text-white text-sm">{motive}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Method Selection */}
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                <h4 className="text-lg font-bold text-blue-400 mb-4">How was it done?</h4>
                
                <div className="space-y-2">
                  {methods.map((method) => (
                    <label
                      key={method}
                      className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all ${
                        selectedMethod === method
                          ? 'bg-blue-500/20 border border-blue-500/30'
                          : 'bg-gray-700/50 hover:bg-gray-700'
                      }`}
                    >
                      <input
                        type="radio"
                        name="method"
                        value={method}
                        checked={selectedMethod === method}
                        onChange={(e) => setSelectedMethod(e.target.value)}
                        className="text-blue-400"
                      />
                      <span className="text-white text-sm">{method}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                onClick={handleSubmitDeduction}
                disabled={!isFormComplete || isSubmitting}
                className="bg-gradient-to-r from-violet-500 to-purple-600 text-white px-12 py-4 rounded-xl font-bold text-lg hover:from-violet-400 hover:to-purple-500 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-2xl shadow-violet-500/25"
              >
                {isSubmitting ? (
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Analyzing Deduction...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-3">
                    <Target size={24} />
                    <span>Submit Final Deduction</span>
                  </div>
                )}
              </button>
              
              {!isFormComplete && (
                <p className="text-gray-400 mt-4 text-sm">
                  Please select a suspect, motive, and method to submit your deduction
                </p>
              )}
            </div>
          </div>
        ) : (
          /* Results Display */
          <div className="max-w-4xl mx-auto text-center">
            <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 ${
              result.correct ? 'bg-green-500/20' : 'bg-red-500/20'
            }`}>
              {result.correct ? (
                <CheckCircle className="text-green-400" size={48} />
              ) : (
                <XCircle className="text-red-400" size={48} />
              )}
            </div>

            <h2 className={`text-4xl font-bold mb-4 ${
              result.correct ? 'text-green-400' : 'text-red-400'
            }`}>
              {result.correct ? 'Case Solved!' : 'Case Unsolved'}
            </h2>

            <p className="text-xl text-gray-300 mb-8">
              {result.message}
            </p>

            {result.correct && (
              <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-6 mb-8">
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <Trophy className="text-yellow-400" size={24} />
                  <span className="text-lg font-bold text-yellow-400">Detective Achievement</span>
                </div>
                <p className="text-green-300">
                  Congratulations! You've successfully solved the case. Your deductive reasoning and investigation skills have brought justice to this mystery.
                </p>
              </div>
            )}

            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Case Summary</h3>
              <div className="grid md:grid-cols-3 gap-4 text-left">
                <div>
                  <h4 className="font-semibold text-cyan-400 mb-2">Your Deduction</h4>
                  <p className="text-gray-300 text-sm">Suspect: {selectedSuspect}</p>
                  <p className="text-gray-300 text-sm">Motive: {selectedMotive}</p>
                  <p className="text-gray-300 text-sm">Method: {selectedMethod}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-cyan-400 mb-2">Actual Solution</h4>
                  <p className="text-gray-300 text-sm">Suspect: {currentCase.solution.suspect}</p>
                  <p className="text-gray-300 text-sm">Motive: {currentCase.solution.motive}</p>
                  <p className="text-gray-300 text-sm">Method: {currentCase.solution.method}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-cyan-400 mb-2">Score</h4>
                  <p className="text-gray-300 text-sm">Accuracy: {result.score}%</p>
                  <p className="text-gray-300 text-sm">Difficulty: {result.difficulty}</p>
                  <p className="text-gray-300 text-sm">Time: {result.timeSpent}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeductionPanel;