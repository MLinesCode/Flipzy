const Scoreboard = ({ mistakes, matches, total, formattedTime }) => {
  // Calculate the progress percentage
  const progress = total > 0 ? (matches / total) * 100 : 0;
  
  return (
    <section className="scoreboard my-4 p-4 bg-white rounded-lg shadow">
      <div className="scoreboard__stats flex flex-wrap justify-between items-center mb-3">
        <div className="scoreboard__item">
          <span className="scoreboard__label font-bold text-red-600">Errors:</span>{' '}
          <span className="scoreboard__value">{mistakes}</span>
        </div>
        
        <div className="scoreboard__item">
          <span className="scoreboard__label font-bold text-blue-600">Time:</span>{' '}
          <span className="scoreboard__value">{formattedTime}</span>
        </div>
        
        <div className="scoreboard__item">
          <span className="scoreboard__label font-bold text-green-600">Achieved:</span>{' '}
          <span className="scoreboard__value">{matches}</span>
          <span className="text-gray-500 text-sm ml-1">of {total}</span>
        </div>
      </div>
      
      {/* Progress bar */}
      <div className="scoreboard__progress w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className="scoreboard__progress-bar bg-green-600 h-2.5 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
          aria-valuenow={progress}
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
      </div>
    </section>
  );
};

export default Scoreboard;