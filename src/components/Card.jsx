const Card = ({ card, flipCard }) => {
  const handleClick = () => {
    if (card.status === 'hidden') {
      flipCard(card.id);
    }
  };

  // Classes based on card state
  const cardInnerClasses = `
    card__inner 
    relative 
    w-full 
    h-full 
    transition-transform 
    duration-500
    transform-gpu
    ${card.status === 'flipped' || card.status === 'matched' ? 'rotate-y-180' : ''}
    [transform-style:preserve-3d]
  `;

  // Add classes for matched cards
  const cardClasses = `
    card 
    relative 
    w-[120px] 
    h-[160px] 
    [perspective:1000px] 
    hover:shadow-lg
    transition-shadow
    duration-300
    ${card.status === 'matched' ? 'matched' : ''}
  `;

  return (
    <article
      className={cardClasses}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter') handleClick();
      }}
      style={{ 
        cursor: card.status === 'hidden' ? 'pointer' : 'default',
      }}
    >
      {/* Container that rotates */}
      <div
        className={cardInnerClasses}
        style={{
          transform:
            card.status === 'flipped' || card.status === 'matched'
              ? 'rotateY(180deg)'
              : 'rotateY(0deg)',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Front face */}
        <div
          className="card__face card__face--front absolute w-full h-full rounded-lg shadow-md overflow-hidden"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            border: card.status === 'matched' ? '3px solid #38A169' : '1px solid #E2E8F0',
            backgroundColor: 'white',
          }}
        >
          <div className="relative h-[80%]">
            <img
              src={card.image}
              alt={card.name}
              className="object-cover w-full h-full"
            />
            {card.status === 'matched' && (
              <div 
                className="absolute inset-0 bg-green-500 bg-opacity-20 flex items-center justify-center"
                aria-label="Matched card"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </div>
          <div className="flex items-center justify-center h-[20%] px-2 bg-white">
            <span className="text-gray-700 font-medium text-sm truncate">{card.name}</span>
          </div>
        </div>

        {/* Back face */}
        <div
          className="card__face card__face--back absolute w-full h-full flex items-center justify-center rounded-lg shadow-md"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(0deg)',
            background: `linear-gradient(135deg, #8F67FF 0%, #7C4DFF 100%)`,
            border: '1px solid #E2E8F0',
          }}
        >
          {/* Card pattern */}
          <div className="absolute inset-4 opacity-15">
            <div className="grid grid-cols-3 grid-rows-4 gap-1 h-full">
              {Array(12).fill(0).map((_, i) => (
                <div key={i} className="rounded-full bg-white"></div>
              ))}
            </div>
          </div>
          
          {/* Question mark */}
          <div className="relative bg-white w-10 h-10 rounded-full flex items-center justify-center shadow-md">
            <span className="text-purple-600 font-bold text-2xl">?</span>
          </div>
        </div>
      </div>
      
      {/* Animation effect for matched cards */}
      {card.status === 'matched' && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -inset-0.5 rounded-lg animate-pulse" 
            style={{ 
              background: 'linear-gradient(90deg, #38A169, #4FD1C5)',
              opacity: 0.5,
              filter: 'blur(4px)',
            }}>
          </div>
        </div>
      )}
    </article>
  );
};

export default Card;