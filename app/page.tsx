'use client';

import { useState, useEffect } from 'react';

export default function Page() {
  const [activeTab, setActiveTab] = useState('memory');
  const [memoryContent, setMemoryContent] = useState('');
  const [instructionsContent, setInstructionsContent] = useState('');
  const [repoStructure, setRepoStructure] = useState<string[]>([]);
  const [logStats, setLogStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: BUG - `console.log` statements should be removed in production.
    // A wrapper for logging that can be disabled in production should be used.
    console.log('[INFO] Application started');
    loadContent();
  }, []);

  const loadContent = async () => {
    const startTime = Date.now();

    try {
      // TODO: BUG - `console.log` statements should be removed in production.
      console.log('[INFO] Loading content started');

      // Load memory
      // TODO: BUG - Lack of user feedback on partial failures. If some of these fetches
      // fail, the UI doesn't clearly indicate what went wrong.
      const memoryRes = await fetch('/api/memory');
      if (memoryRes.ok) {
        setMemoryContent(await memoryRes.text());
        console.log('[INFO] Memory content loaded');
      }

      // Load instructions
      const instructionsRes = await fetch('/api/instructions');
      if (instructionsRes.ok) {
        setInstructionsContent(await instructionsRes.text());
        console.log('[INFO] Instructions content loaded');
      }

      // Load repos
      const repoRes = await fetch('/api/repos');
      if (repoRes.ok) {
        const repos = await repoRes.json();
        setRepoStructure(repos);
        console.log(
          `[INFO] Repository structure loaded (${repos.length} repos)`
        );
      }

      // Load log stats
      const logsRes = await fetch('/api/logs');
      if (logsRes.ok) {
        const logs = await logsRes.json();
        setLogStats(logs);
        console.log('[INFO] Log stats loaded');
      }

      const duration = Date.now() - startTime;
      console.log(`[INFO] Content loading completed in ${duration}ms`);
    } catch (error) {
      const duration = Date.now() - startTime;
      console.error(`[ERROR] Content loading failed in ${duration}ms:`, error);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (tabId: string) => {
    console.log(`[INFO] Tab changed: ${activeTab} -> ${tabId}`);
    setActiveTab(tabId);
  };

  const cleanupLogs = async () => {
    try {
      const response = await fetch('/api/logs', { method: 'POST' });
      if (response.ok) {
        const result = await response.json();
        setLogStats(prev => ({ ...prev, currentStats: result.stats }));
        console.log('[INFO] Log cleanup completed');
      }
      // TODO: BUG - No user feedback on failed cleanup. The UI should show a toast or
      // a message if the cleanup operation fails.
    } catch (error) {
      console.error('[ERROR] Log cleanup failed:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="font-mono text-gray-500">loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-gray-800 p-4">
        <h1 className="font-mono text-gray-300">copilot_and_me</h1>
      </header>

      <div className="max-w-6xl mx-auto p-4">
        {/* Tabs */}
        <div className="flex border-b border-gray-800 mb-6">
          {[
            { id: 'memory', label: 'memory' },
            { id: 'instructions', label: 'instructions' },
            { id: 'repos', label: 'repos' },
            { id: 'logs', label: 'logs' },
          ].map(({ id, label }) => (
            <button
              key={id}
              onClick={() => handleTabChange(id)}
              className={`px-4 py-2 font-mono text-sm transition-colors ${
                activeTab === id
                  ? 'text-white border-b-2 border-white'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div>
          {activeTab === 'memory' && (
            <div>
              <h2 className="font-mono text-gray-400 text-sm mb-4">
                memory_notepad.md
              </h2>
              <pre className="font-mono text-sm text-gray-300 bg-gray-950 p-4 rounded border border-gray-800 whitespace-pre-wrap overflow-auto max-h-screen">
                {memoryContent}
              </pre>
            </div>
          )}

          {activeTab === 'instructions' && (
            <div>
              <h2 className="font-mono text-gray-400 text-sm mb-4">
                copilot-instructions.md
              </h2>
              <pre className="font-mono text-sm text-gray-300 bg-gray-950 p-4 rounded border border-gray-800 whitespace-pre-wrap overflow-auto max-h-screen">
                {instructionsContent}
              </pre>
            </div>
          )}

          {activeTab === 'repos' && (
            <div>
              <h2 className="font-mono text-gray-400 text-sm mb-4">
                repo_analysis/ (read-only)
              </h2>
              <div className="bg-gray-950 p-4 rounded border border-gray-800">
                {repoStructure.length > 0 ? (
                  <div className="font-mono text-sm space-y-1">
                    {repoStructure.map((repo, index) => (
                      <div
                        key={index}
                        className="text-gray-300 border-l-2 border-gray-700 pl-3"
                      >
                        {repo}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-gray-500 font-mono text-sm">
                    no repositories found
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'logs' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-mono text-gray-400 text-sm">
                  logs/ (rotating)
                </h2>
                <button
                  onClick={cleanupLogs}
                  className="px-3 py-1 font-mono text-xs bg-gray-800 text-gray-300 rounded hover:bg-gray-700"
                >
                  cleanup
                </button>
              </div>
              <div className="bg-gray-950 p-4 rounded border border-gray-800">
                {logStats ? (
                  <div className="font-mono text-sm space-y-2">
                    <div className="text-gray-300">
                      <span className="text-gray-500">Status:</span>{' '}
                      {logStats.status}
                    </div>
                    <div className="text-gray-300">
                      <span className="text-gray-500">Retention:</span>{' '}
                      {logStats.logRotation.maxDays} days
                    </div>
                    <div className="text-gray-300">
                      <span className="text-gray-500">Max size:</span>{' '}
                      {logStats.logRotation.maxFileSize}
                    </div>
                    <div className="text-gray-300">
                      <span className="text-gray-500">Current files:</span>{' '}
                      {logStats.logRotation.currentStats.fileCount}
                    </div>
                    <div className="text-gray-300">
                      <span className="text-gray-500">Total size:</span>{' '}
                      {logStats.logRotation.currentStats.totalSize}
                    </div>
                    {logStats.logRotation.currentStats.files.length > 0 && (
                      <div className="mt-3 border-t border-gray-800 pt-3">
                        <div className="text-gray-500 text-xs mb-2">
                          Log files:
                        </div>
                        {logStats.logRotation.currentStats.files.map(
                          (file, index) => (
                            <div key={index} className="text-gray-400 text-xs">
                              {file}
                            </div>
                          )
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-gray-500 font-mono text-sm">
                    log stats unavailable
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
