import React from 'react';

interface DigitalPanelProps {
  timeElapsed: number;
  score: number;
  level: number;
  difficulty: number;
  isPlaying: boolean;
}

export const DigitalPanel: React.FC<DigitalPanelProps> = ({
  timeElapsed,
  score,
  level,
  difficulty,
  isPlaying
}) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="digital-panel p-6 rounded-xl">
      <div className="grid grid-cols-4 gap-8 items-center">
        {/* Timer */}
        <div className="text-center">
          <div className="digital-text text-sm opacity-80 mb-1">TEMPO</div>
          <div className={`digital-text text-2xl ${isPlaying ? 'pulse-glow' : ''}`}>
            {formatTime(timeElapsed)}
          </div>
        </div>

        {/* Score */}
        <div className="text-center">
          <div className="digital-text text-sm opacity-80 mb-1">PONTOS</div>
          <div className="digital-text text-2xl">
            {score.toLocaleString()}
          </div>
        </div>

        {/* Level */}
        <div className="text-center">
          <div className="digital-text text-sm opacity-80 mb-1">NÍVEL</div>
          <div className="digital-text text-2xl">
            {level.toString().padStart(2, '0')}
          </div>
        </div>

        {/* Difficulty */}
        <div className="text-center">
          <div className="digital-text text-sm opacity-80 mb-1">DIFICULDADE</div>
          <div className="digital-text text-2xl">
            {difficulty}
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="mt-4 h-1 bg-gray-800 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-green-500 to-cyan-400 transition-all duration-300"
          style={{ width: isPlaying ? '100%' : '0%' }}
        />
      </div>
    </div>
  );
};