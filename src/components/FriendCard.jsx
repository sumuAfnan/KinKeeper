import React from 'react';
import { Link } from 'react-router-dom';

const FriendCard = ({ friend }) => {
 
  const getStatusStyles = (status) => {
    switch (status) {
      case 'overdue': 
        return 'bg-[#ef4444] text-white';
      case 'almost due': 
        return 'bg-[#f0ad4e] text-white'; 
      case 'on-track': 
        return 'bg-[#10b981] text-white';
      default: 
        return 'bg-slate-400 text-white';
    }
  };

  return (
    <Link 
      to={`/friend/${friend.id}`} 
      className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-50 flex flex-col items-center text-center group hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
    >
     
      <div className="mb-5">
        <img
          src={friend.picture}
          alt={friend.name}
          className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-sm group-hover:scale-105 transition-transform"
        />
      </div>

      
      
      <h3 className="text-2xl font-black text-[#1e293b] mb-1">
        {friend.name}
      </h3>

     
      <div className="text-slate-400 text-sm font-medium mb-4 italic">
        {friend.days_since_contact}d ago
      </div>

     
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {friend.tags.map((tag, idx) => (
          <span 
            key={idx} 
            className="bg-[#dcfce7] text-[#166534] px-4 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest"
          >
            {tag}
          </span>
        ))}
      </div>

      
      <div className={`px-8 py-2.5 rounded-full text-sm font-bold shadow-md tracking-wide ${getStatusStyles(friend.status)}`}>
        {friend.status === 'on-track' ? 'On-Track' : 
         friend.status === 'almost due' ? 'Almost Due' : 'Overdue'}
      </div>
    </Link>
  );
};

export default FriendCard;