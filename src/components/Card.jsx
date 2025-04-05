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

  // Add a border for matched cards
  const cardClasses = `
    card 
    relative 
    w-[120px] 
    h-[160px] 
    [perspective:1000px] 
    cursor-pointer
    ${card.status === 'matched' ? 'border-2 border-green-500' : ''}
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
    >
      {/* Contenedor que rota */}
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
        {/* Cara frontal */}
        <div
          className="card__face card__face--front absolute w-full h-full bg-white rounded-md shadow-md"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <img
            src={card.image}
            alt={card.name}
            className="object-cover w-full h-[80%] rounded-t-md"
          />
          <div className="flex items-center justify-center h-[20%] px-2 text-center">
            <span className="text-gray-700 font-semibold text-sm truncate">{card.name}</span>
          </div>
        </div>

        {/* Cara trasera */}
        <div
          className="card__face card__face--back absolute w-full h-full bg-blue-500 flex items-center justify-center rounded-md shadow-md"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(0deg)',
          }}
        >
          <span className="text-white font-bold text-2xl">?</span>
        </div>
      </div>
    </article>
  );
};

export default Card;