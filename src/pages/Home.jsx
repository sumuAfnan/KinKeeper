import React from 'react';
import { useFriends } from '../context/FriendContext';
import LoadingSpinner from '../components/LoadingSpinner';
import FriendCard from '../components/FriendCard';
import { UserPlus, Users, CheckCircle, AlertCircle, MessageCircle } from 'lucide-react';
localStorage.clear();

const Home = () => {
  const { friends, interactions, loading } = useFriends();

  if (loading) return <LoadingSpinner />;

  const totalFriends = friends.length;
  const onTrackCount = friends.filter(f => f.status === 'on-track').length;
  
 
  const almostDueCount = friends.filter(f => f.status === 'almost due').length;
  const overdueCount = friends.filter(f => f.status === 'overdue').length;
  const needAttention = almostDueCount + overdueCount;
  
  
  const currentMonthInteractions = interactions.length; 

  const summaryCards = [
    { 
      title: 'Total Friends', 
      value: totalFriends, 
      icon: <Users size={24} />, 
      color: 'bg-blue-50 text-blue-600' 
    },
    { 
      title: 'On Track', 
      value: onTrackCount, 
      icon: <CheckCircle size={24} />, 
      color: 'bg-emerald-50 text-emerald-600' 
    },
    { 
      title: 'Need Attention', 
      value: needAttention, 
      icon: <AlertCircle size={24} />, 
      color: 'bg-rose-50 text-rose-600' 
    },
    { 
      title: 'Interactions This Month', 
      value: currentMonthInteractions, 
      icon: <MessageCircle size={24} />, 
      color: 'bg-amber-50 text-amber-600' 
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#1e293b] mb-4 tracking-tight">
          Friends to keep close in your life
        </h1>
        <p className="text-gray-500 mb-8 max-w-2xl mx-auto leading-relaxed">
          Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.
        </p>
        <button className="flex items-center gap-2 bg-[#2d4a43] hover:bg-[#1f332e] text-white px-6 py-3 rounded-md font-medium mx-auto transition-all shadow-sm">
          <UserPlus size={18} />
          Add a Friend
        </button>
      </section>

     
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {summaryCards.map((card, idx) => (
          <div key={idx} className="bg-white p-8 rounded-xl border border-gray-50 shadow-sm flex flex-col items-center justify-center text-center hover:shadow-md transition-shadow">
            <h3 className="text-3xl font-bold text-[#1e293b] mb-2">{card.value}</h3>
            <p className="text-sm font-medium text-gray-400">{card.title}</p>
          </div>
        ))}
      </section>

     
      <section>
        <h2 className="text-2xl font-bold text-[#1e293b] mb-8">Your Friends</h2>
        
        {friends.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
            <p className="text-gray-500">No friends added yet. Start by adding one!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-8">
         
            {friends.map(friend => (
              <FriendCard key={friend.id} friend={friend} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;