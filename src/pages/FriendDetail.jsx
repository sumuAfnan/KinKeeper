import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useFriends } from '../context/FriendContext';
import { toast } from 'react-toastify';
import { Mail, Calendar, Target, Clock, Activity, ChevronLeft, Trash2 } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';

// Assets
import callIcon from '../assets/call.png';
import textIcon from '../assets/text.png';
import videoIcon from '../assets/video.png';

const FriendDetail = () => {
  const { id } = useParams();
  const { friends, addInteraction, loading } = useFriends();
  
  // URL theke asa  ID diye bondhu k khuje ber kora
  const friend = friends.find(f => f.id === parseInt(id));

  if (loading) return <LoadingSpinner />;
  if (!friend) return <div className="text-center py-20 font-bold text-2xl text-gray-800">Friend Not Found</div>;

  const handleAction = (type) => {
    // here friend.name er bodole friend.idpathate hobe cz amr Context ID diye data process kore
    addInteraction(friend.id, type); 
    toast.success(`${type} with ${friend.name} logged successfully!`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'overdue': return 'bg-rose-100 text-rose-600 border-rose-200';
      case 'almost due': return 'bg-amber-100 text-amber-600 border-amber-200';
      case 'on-track': return 'bg-emerald-100 text-emerald-600 border-emerald-200';
      default: return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link to="/" className="flex items-center gap-1 text-[#2d4a43] font-bold mb-8 hover:opacity-80 transition-all">
        <ChevronLeft size={20} /> Back to Dashboard
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column - Friend Profile */}
        <div className="lg:col-span-4">
          <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-8 text-center border-b border-gray-50">
              <div className="relative inline-block mb-6">
                <img 
                  src={friend.picture} 
                  alt={friend.name} 
                  className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg mx-auto"
                />
                <div className={`absolute bottom-1 right-1 w-6 h-6 border-4 border-white rounded-full ${friend.status === 'on-track' ? 'bg-emerald-500' : friend.status === 'almost due' ? 'bg-amber-500' : 'bg-rose-500'}`}></div>
              </div>
              <h2 className="text-2xl font-black text-gray-900 mb-2">{friend.name}</h2>
              <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${getStatusColor(friend.status)}`}>
                {friend.status}
              </span>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {friend.tags.map((tag, idx) => (
                  <span key={idx} className="bg-[#dcfce7] text-[#166534] px-3 py-1 rounded-full text-[10px] font-extrabold uppercase">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">About</h4>
              <p className="text-gray-600 text-sm leading-relaxed">{friend.bio}</p>
              <div className="flex items-center gap-3 text-gray-600">
                <Mail size={16} className="text-[#2d4a43]" />
                <span className="text-sm font-bold">{friend.email}</span>
              </div>
            </div>

            <div className="p-6 bg-gray-50 flex flex-col gap-3">
              <button className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-gray-200 bg-white text-gray-700 font-bold hover:bg-gray-100 text-sm transition-all">
                <Clock size={18} /> Snooze 2 Weeks
              </button>
              <button className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-rose-100 bg-white text-rose-600 font-bold hover:bg-rose-50 text-sm transition-all">
                <Trash2 size={18} /> Delete
              </button>
            </div>
          </div>
        </div>

        {/* Right Column - Stats & Actions */}
        <div className="lg:col-span-8 space-y-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-50 flex flex-col items-center text-center">
              <Activity className="text-rose-500 mb-3" size={24} />
              <span className="text-2xl font-black text-gray-900">{friend.days_since_contact}</span>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Days Since Contact</span>
            </div>
            <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-50 flex flex-col items-center text-center">
              <Target className="text-[#2d4a43] mb-3" size={24} />
              <span className="text-2xl font-black text-gray-900">{friend.goal}</span>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Goal (Days)</span>
            </div>
            <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-50 flex flex-col items-center text-center">
              <Calendar className="text-amber-500 mb-3" size={24} />
              <span className="text-lg font-black text-gray-900">{friend.next_due_date}</span>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Next Due Date</span>
            </div>
          </div>

          {/* Quick Check-In Card */}
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-50">
            <h3 className="text-xl font-black text-gray-900 mb-8 flex items-center gap-2">
              <Activity size={20} className="text-rose-500" />
              Quick Check-In
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <button onClick={() => handleAction('Call')} className="flex flex-col items-center gap-3 p-6 rounded-[2rem] bg-slate-50 hover:bg-emerald-50 border-2 border-transparent hover:border-emerald-100 transition-all group">
                <div className="p-4 bg-white rounded-2xl shadow-sm group-hover:scale-110 transition-transform">
                  <img src={callIcon} alt="Call" className="w-12 h-12 object-contain" />
                </div>
                <span className="font-black text-xs uppercase tracking-widest text-gray-700">Log Call</span>
              </button>
              <button onClick={() => handleAction('Text')} className="flex flex-col items-center gap-3 p-6 rounded-[2rem] bg-slate-50 hover:bg-purple-50 border-2 border-transparent hover:border-purple-100 transition-all group">
                <div className="p-4 bg-white rounded-2xl shadow-sm group-hover:scale-110 transition-transform">
                  <img src={textIcon} alt="Text" className="w-12 h-12 object-contain" />
                </div>
                <span className="font-black text-xs uppercase tracking-widest text-gray-700">Log Text</span>
              </button>
              <button onClick={() => handleAction('Video')} className="flex flex-col items-center gap-3 p-6 rounded-[2rem] bg-slate-50 hover:bg-amber-50 border-2 border-transparent hover:border-amber-100 transition-all group">
                <div className="p-4 bg-white rounded-2xl shadow-sm group-hover:scale-110 transition-transform">
                  <img src={videoIcon} alt="Video" className="w-12 h-12 object-contain" />
                </div>
                <span className="font-black text-xs uppercase tracking-widest text-gray-700">Log Video</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendDetail;