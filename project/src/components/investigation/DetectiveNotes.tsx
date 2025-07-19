import React, { useEffect } from 'react';
import { FileText, Save, Download } from 'lucide-react';
import { useCase } from '../../context/CaseContext';

const DetectiveNotes: React.FC = () => {
  const { notes, setNotes, currentCase } = useCase();

  // Auto-save notes to localStorage
  useEffect(() => {
    if (currentCase) {
      const savedNotes = localStorage.getItem(`notes-${currentCase.id}`);
      if (savedNotes) {
        setNotes(savedNotes);
      }
    }
  }, [currentCase, setNotes]);

  useEffect(() => {
    if (currentCase && notes) {
      localStorage.setItem(`notes-${currentCase.id}`, notes);
    }
  }, [notes, currentCase]);

  const handleDownload = () => {
    if (!currentCase) return;
    
    const content = `Detective Notes - ${currentCase.title}\nCase ID: ${currentCase.id}\n\n${notes}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `detective-notes-${currentCase.id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!currentCase) return null;

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="bg-gray-800/50 border-b border-gray-700 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold text-white flex items-center space-x-3">
              <FileText className="text-blue-400" size={28} />
              <span>Detective's Notes</span>
            </h3>
            <p className="text-gray-400">Record your observations and theories</p>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 text-green-400">
              <Save size={16} />
              <span className="text-sm">Auto-saved</span>
            </div>
            <button
              onClick={handleDownload}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-400 transition-colors flex items-center space-x-2"
            >
              <Download size={16} />
              <span>Download</span>
            </button>
          </div>
        </div>
      </div>

      {/* Notes Area */}
      <div className="flex-1 p-6">
        <div className="h-full bg-gray-800/50 border border-gray-700 rounded-xl p-6">
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder={`Start documenting your investigation for ${currentCase.title}...

Some ideas to get you started:
• Key observations about suspects
• Timeline inconsistencies
• Evidence connections
• Potential motives
• Questions to ask
• Working theories`}
            className="w-full h-full bg-transparent text-gray-200 placeholder-gray-500 resize-none focus:outline-none font-mono text-sm leading-relaxed"
            style={{ minHeight: '500px' }}
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gray-800/50 border-t border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-400">
            Case: {currentCase.title} | Characters: {notes.length}
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setNotes(notes + '\n\n--- New Entry ---\n')}
              className="text-blue-400 hover:text-blue-300 transition-colors text-sm"
            >
              Add Entry
            </button>
            <button
              onClick={() => setNotes(notes + `\n\nSuspect Analysis - ${new Date().toLocaleString()}:\n`)}
              className="text-yellow-400 hover:text-yellow-300 transition-colors text-sm"
            >
              Add Suspect Note
            </button>
            <button
              onClick={() => setNotes(notes + `\n\nEvidence Review - ${new Date().toLocaleString()}:\n`)}
              className="text-green-400 hover:text-green-300 transition-colors text-sm"
            >
              Add Evidence Note
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetectiveNotes;