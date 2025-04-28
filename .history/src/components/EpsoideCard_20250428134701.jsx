import React from 'react';

const EpisodeCard = ({ episode, media seasonNumber, onClick }) => {
  return (
   <div className='flex p-1  hover:bg-gray-400 group flex-col w-fit rounded-lg overflow-hidden hover:scale-105 transition-transform cursor-pointer' onClick={onClick}>
    <img 
      className=' rounded-lg object-cover' 
      src={`https://image.tmdb.org/t/p/w500${episode.still_path}`|| ''} 
      alt={episode.name}
      onError={(e) => {
        e.target.src = 'https://via.placeholder.com/176x96?text=No+Image';
      }}
    />
    <div className='p-2 '>
        
        <h1 className='md:text-sm text-xs group-hover:text-black font-semibold text-white line-clamp-1'>{episode.name}</h1>
        <div className='flex  justify-between items-center mt-1'>
          <span className='text-xs group-hover:text-black text-gray-400'>S{seasonNumber} E{episode.episode_number}</span>
          {episode.vote_average > 0 && (
            <span className='text-xs group-hover:text-black text-yellow-400'>{episode.vote_average.toFixed(1)} ⭐</span>
          )}
        </div>
    </div>
   </div>
  );
};

export default EpisodeCard;