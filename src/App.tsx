import { Download, RotateCcw } from 'lucide-react';
import { StreamGrid } from './components/StreamGrid';
import { StreamControls } from './components/StreamControls';
import { useStreamStore } from './store/streamStore';
import { exportConfig } from './utils/export';

function App() {
  const { streams, setStreamOffset, resetOffsets } = useStreamStore();

  const handleExport = () => {
    exportConfig(streams);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-6">Multi-Camera Stream Tool</h1>
          
          <StreamControls />

          <div className="flex gap-4 mb-6">
            <button
              onClick={resetOffsets}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
            >
              <RotateCcw size={20} />
              Reset Positions
            </button>
            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded-lg transition"
            >
              <Download size={20} />
              Export Configuration
            </button>
          </div>

          <div className="relative overflow-x-auto bg-gray-900 rounded-lg p-4 min-h-[600px]">
            <StreamGrid
              streams={streams}
              onDrag={(id, offset) => setStreamOffset(id, offset)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;