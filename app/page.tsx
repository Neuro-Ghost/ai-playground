'use client';

import { useState } from 'react';

export default function Home() {
  // Declare state variables to hold our dashboard controls and output data
  const [systemPrompt, setSystemPrompt] = useState('');
  const [temperature, setTemperature] = useState(0.7);
  const [userPrompt, setUserPrompt] = useState('');
  const [aiOutput, setAiOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // The communication function that talks directly to our /api/generate backend route
  const handleRunPrompt = async () => {
    if (!userPrompt.trim()) return; // Prevent execution if user prompt is empty
    
    setIsLoading(true);
    setAiOutput('Waiting for Gemini engine response...');
    
    try {
      // Post our UI settings data to our backend route handler
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          systemPrompt,
          temperature,
          userPrompt,
        }),
      });

      const data = await response.json();

      // Handle errors securely if something broke on the server side
      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate content');
      }

      // Mount the real AI response text directly onto our screen state
      setAiOutput(data.text);

    } catch (error: any) {
      console.error('Frontend Fetch Error:', error);
      setAiOutput(`[System Error]: ${error.message || 'Check your terminal console logs.'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen bg-slate-950 text-slate-100">
      
      {/* LEFT PANEL: CONTROLS */}
      <section className="w-1/2 border-r border-slate-800 p-8 flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">AI Control Panel</h1>
          <p className="text-sm text-slate-400 mt-1">Configure your model parameters and prompts.</p>
        </div>

        {/* System Prompt Input */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">System Prompt</label>
          <textarea 
            value={systemPrompt}
            onChange={(e) => setSystemPrompt(e.target.value)}
            className="w-full h-32 rounded-lg bg-slate-900 border border-slate-800 p-3 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-blue-500 transition resize-none"
            placeholder="e.g., You are a strict code reviewer who only answers in bullet points..."
          />
        </div>

        {/* Temperature Slider */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Temperature</label>
            <span className="text-xs font-mono font-bold text-blue-400 bg-blue-950/50 border border-blue-900/50 px-2 py-0.5 rounded">
              {temperature.toFixed(1)}
            </span>
          </div>
          <input 
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={temperature}
            onChange={(e) => setTemperature(parseFloat(e.target.value))}
            className="w-full h-2 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-blue-500 border border-slate-800"
          />
          <div className="flex justify-between text-[10px] text-slate-500 px-1">
            <span>Precise / Robotic (0.0)</span>
            <span>Creative / Wild (1.0)</span>
          </div>
        </div>

        {/* User Prompt Input */}
        <div className="flex flex-col gap-2 mt-auto">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">User Prompt / Question</label>
          <textarea 
            value={userPrompt}
            onChange={(e) => setUserPrompt(e.target.value)}
            className="w-full h-24 rounded-lg bg-slate-900 border border-slate-800 p-3 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-blue-500 transition resize-none"
            placeholder="Type your prompt here..."
          />
          <button 
            onClick={handleRunPrompt}
            disabled={isLoading || !userPrompt.trim()}
            className="w-full py-3 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed font-medium text-sm rounded-lg transition text-white shadow-lg shadow-blue-950/50 mt-2"
          >
            {isLoading ? 'Processing...' : 'Run Prompt'}
          </button>
        </div>
      </section>

      {/* RIGHT PANEL: OUTPUT */}
      <section className="w-1/2 p-8 flex flex-col bg-slate-950">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-white">Streaming Output</h2>
          <p className="text-sm text-slate-400">Watch the AI construct its response in real-time.</p>
        </div>

        {/* Console/Terminal Window */}
        <div className="flex-1 w-full bg-slate-900 border border-slate-800 rounded-xl p-6 font-mono text-sm text-slate-300 overflow-y-auto shadow-inner whitespace-pre-wrap">
          {aiOutput ? (
            <span className="text-emerald-400">{aiOutput}</span>
          ) : (
            <span className="text-slate-500">// AI response will show here...</span>
          )}
        </div>
      </section>

    </main>
  );
}