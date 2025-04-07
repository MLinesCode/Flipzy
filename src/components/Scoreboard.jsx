const Scoreboard = ({ mistakes, matches, total, formattedTime }) => {
  // Calculate the progress percentage
  const progress = total > 0 ? (matches / total) * 100 : 0;
  
  // Extract minutes and seconds from formattedTime (format: "MM:SS")
  const [minutes, seconds] = formattedTime.split(':');
  
  return (
    <section 
      className="scoreboard relative overflow-hidden rounded-lg shadow-md mb-6 lg:max-w-4xl lg:mx-auto"
      style={{ backgroundColor: '#F7FAFC', borderTop: '4px solid #4FD1C5' }}
      aria-label="Game statistics"
    >
      <div className="scoreboard__content p-5">
        {/* Stats grid */}
        <div className="scoreboard__stats-grid grid grid-cols-3 gap-2 mb-5">
          {/* Timer Stat */}
          <div className="scoreboard__stat flex flex-col items-center justify-center p-3 rounded-lg bg-white shadow-sm">
            <span 
              className="scoreboard__stat-label text-xs font-semibold uppercase tracking-wider mb-1"
              style={{ color: '#718096' }}
              aria-hidden="true"
            >
              Time
            </span>
            <div className="scoreboard__timer flex items-baseline" aria-live="polite">
              <span 
                className="scoreboard__timer-minutes text-2xl font-bold mr-1"
                style={{ color: '#8F67FF' }}
              >
                {minutes}
              </span>
              <span 
                className="scoreboard__timer-separator text-lg font-medium"
                style={{ color: '#A0AEC0' }}
              >
                :
              </span>
              <span 
                className="scoreboard__timer-seconds text-xl font-medium"
                style={{ color: '#4FD1C5' }}
              >
                {seconds}
              </span>
              <span className="sr-only">Minutes: {parseInt(minutes)}, Seconds: {parseInt(seconds)}</span>
            </div>
          </div>
          
          {/* Errors Stat */}
          <div className="scoreboard__stat flex flex-col items-center justify-center p-3 rounded-lg bg-white shadow-sm">
            <span 
              className="scoreboard__stat-label text-xs font-semibold uppercase tracking-wider mb-1"
              style={{ color: '#718096' }}
              aria-hidden="true"
            >
              Errors
            </span>
            <div className="scoreboard__errors" aria-live="polite">
              <span 
                className="scoreboard__errors-value text-2xl font-bold"
                style={{ color: '#E53E3E' }}
              >
                {mistakes}
              </span>
              <span className="sr-only">Errors made: {mistakes}</span>
            </div>
          </div>
          
          {/* Matches Stat */}
          <div className="scoreboard__stat flex flex-col items-center justify-center p-3 rounded-lg bg-white shadow-sm">
            <span 
              className="scoreboard__stat-label text-xs font-semibold uppercase tracking-wider mb-1"
              style={{ color: '#718096' }}
              aria-hidden="true"
            >
              Matches
            </span>
            <div className="scoreboard__matches" aria-live="polite">
              <span 
                className="scoreboard__matches-value text-2xl font-bold"
                style={{ color: '#38A169' }}
              >
                {matches}
              </span>
              <span 
                className="scoreboard__matches-total text-sm text-gray-500 ml-1"
              >
                / {total}
              </span>
              <span className="sr-only">Matches found: {matches} out of {total}</span>
            </div>
          </div>
        </div>
        
        {/* Progress indicator */}
        <div className="scoreboard__progress relative">
          <div className="scoreboard__progress-label flex justify-between text-xs mb-1">
            <span 
              className="font-medium"
              style={{ color: '#4A5568' }}
            >
              Progress
            </span>
            <span 
              className="font-semibold"
              style={{ color: progress >= 75 ? '#38A169' : '#4A5568' }}
            >
              {Math.round(progress)}%
            </span>
          </div>
          
          <div 
            className="scoreboard__progress-track w-full h-2 rounded-full overflow-hidden"
            style={{ backgroundColor: '#E2E8F0' }}
            role="progressbar"
            aria-valuemin="0"
            aria-valuemax="100"
            aria-valuenow={Math.round(progress)}
            aria-label={`Game progress: ${Math.round(progress)}%`}
          >
            <div 
              className="scoreboard__progress-bar h-full rounded-full transition-all duration-500 ease-out"
              style={{ 
                width: `${progress}%`,
                backgroundColor: progress < 30 ? '#8F67FF' : 
                                progress < 70 ? '#4FD1C5' : 
                                '#38A169',
                boxShadow: progress > 0 ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
              }}
            ></div>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div 
        className="absolute top-0 right-0 w-20 h-20 -mr-10 -mt-10 rounded-full opacity-5"
        style={{ background: 'radial-gradient(circle, #8F67FF 0%, transparent 70%)' }}
        aria-hidden="true"
      ></div>
      <div 
        className="absolute bottom-0 left-0 w-16 h-16 -ml-8 -mb-8 rounded-full opacity-5"
        style={{ background: 'radial-gradient(circle, #4FD1C5 0%, transparent 70%)' }}
        aria-hidden="true"
      ></div>
    </section>
  );
};

export default Scoreboard;
