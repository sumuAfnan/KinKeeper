import React, { useState } from 'react';
import { useFriends } from '../context/FriendContext';
import { Calendar, History } from 'lucide-react';

// Assets
import callIcon from '../assets/call.png';
import textIcon from '../assets/text.png';
import videoIcon from '../assets/video.png';

const Timeline = () => {
  const { interactions } = useFriends();
  const [filter, setFilter] = useState('All');

   // filter logic: interactions theke type onujayi data alada kora
 
  const filteredInteractions = filter === 'All' 
    ? interactions 
    : interactions.filter(i => i.type === filter);

  //  icone rendering function
  const getIcon = (type) => {
    switch (type) {
      case 'Call': return <img src={callIcon} className="w-10 h-10 object-contain" alt="Call" />;
      case 'Text': return <img src={textIcon} className="w-10 h-10 object-contain" alt="Text" />;
      case 'Video': return <img src={videoIcon} className="w-10 h-10 object-contain" alt="Video" />;
      default: return <span className="text-2xl">🤝</span>;
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header & Filter Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <h1 className="text-4xl font-black text-gray-900 tracking-tight">Timeline</h1>
        
        <select 
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="bg-white border border-gray-200 px-4 py-2.5 rounded-xl font-bold text-sm outline-none shadow-sm cursor-pointer hover:border-gray-300 transition-colors"
        >
          <option value="All">Filter timeline</option>
          <option value="Call">Call</option>
          <option value="Text">Text</option>
          <option value="Video">Video</option>
        </select>
      </div>

      {/* Main Content Area */}
      {filteredInteractions.length === 0 ? (
        /* Empty State: jokhon kno log thakbe na */
        <div className="text-center py-24 bg-white rounded-[3rem] border-2 border-dashed border-gray-100 flex flex-col items-center justify-center">
          <div className="bg-slate-50 p-6 rounded-full mb-6">
            <History className="text-gray-200" size={64} />
          </div>
          <h3 className="text-2xl font-black text-gray-900 mb-2">No history yet</h3>
          <p className="text-gray-400 max-w-sm mx-auto text-sm font-medium">
            Head over to a friend's profile to record your first check-in!
          </p>
        </div>
      ) : (
        /* Timeline List: jokhon log kora data thakbe*/
        <div className="space-y-4">
          {filteredInteractions.map((interaction) => (
            <div 
              key={interaction.id} 
              className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-6 hover:shadow-md transition-all group animate-in fade-in slide-in-from-bottom-3"
            >
              {/* Icon Container ##### */}
              <div className="flex-shrink-0 p-4 bg-slate-50 rounded-2xl group-hover:bg-white group-hover:shadow-inner transition-all">
                {getIcon(interaction.type)}
              </div>
              
              {/* ekhane Entry Information */}
              <div className="flex-grow">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                  <h3 className="text-lg font-black text-gray-800 leading-none">
                    {interaction.type} 
                    <span className="text-gray-400 font-bold text-sm ml-2">with {interaction.friendName}</span>
                  </h3>
                  
                  {/* ekhane Date Badge */}
                  <div className="flex items-center gap-2 text-[11px] font-black text-gray-400 uppercase tracking-widest bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                    <Calendar size={14} className="text-gray-300" /> 
                    {interaction.date}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Timeline;