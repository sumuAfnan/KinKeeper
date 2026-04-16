import React from 'react';
import { useFriends } from '../context/FriendContext';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { BarChart3, Users, Heart, TrendingUp } from 'lucide-react';

const Stats = () => {
  const { interactions, friends } = useFriends();
  
 
  const hasInteractions = interactions.length > 0;

  // Aggregate Data for Pie Chart
  const dataMap = interactions.reduce((acc, curr) => {
    acc[curr.type] = (acc[curr.type] || 0) + 1;
    return acc;
  }, { Call: 0, Text: 0, Video: 0 });

  const chartData = [
    { name: 'Call', value: dataMap.Call, color: '#10B981' }, 
    { name: 'Text', value: dataMap.Text, color: '#8B5CF6' }, 
    { name: 'Video', value: dataMap.Video, color: '#F59E0B' }, 
  ];

  // Analytics Calculation
  const topFriend = friends.length > 0 ? friends.reduce((prev, current) => (prev.days_since_contact < current.days_since_contact) ? prev : current) : null;
  const healthScore = friends.length > 0 ? Math.round((friends.filter(f => f.status === 'on-track').length / friends.length) * 100) : 0;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-12">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">Friendship Analytics</h1>
        <p className="text-gray-500">Insights into how you're maintaining your social connections.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        
        <div className="lg:col-span-2 card p-8 h-[500px] flex flex-col bg-white rounded-[2.5rem] border border-gray-100 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 mb-8 flex items-center gap-2">
            <BarChart3 size={20} className="text-emerald-600" />
            Interaction Distribution
          </h3>
          <div className="flex-grow">
            {hasInteractions ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={140}
                    paddingAngle={5}
                    dataKey="value"
                    animationDuration={1500}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none' }} />
                  <Legend verticalAlign="bottom" height={36}/>
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-4">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center">
                   <BarChart3 className="opacity-20" size={32} />
                </div>
                <p className="font-medium italic">No interaction data to display yet. Log a call or text to see stats!</p>
              </div>
            )}
          </div>
        </div>

       
        <div className="space-y-6">
          {hasInteractions ? (
          
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-700">
              
              <div className="card p-6 bg-emerald-50 border-emerald-100 rounded-[2rem] shadow-sm">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-white rounded-xl text-emerald-600 shadow-sm">
                    <Heart size={24} />
                  </div>
                  <h4 className="font-bold text-emerald-900">Health Score</h4>
                </div>
                <div className="flex items-end gap-2">
                  <span className="text-4xl font-black text-emerald-600">{healthScore}%</span>
                  <span className="text-emerald-700 text-sm font-medium mb-1">On-Track</span>
                </div>
                <p className="text-emerald-700/70 text-xs mt-3">Percentage of friends in "on-track" status.</p>
              </div>

              <div className="card p-6 rounded-[2rem] bg-white border border-gray-100 shadow-sm">
                <div className="flex items-center gap-4 mb-4">
                   <div className="p-3 bg-gray-50 rounded-xl text-emerald-600">
                    <Users size={24} />
                  </div>
                  <h4 className="font-bold text-gray-900">Total Contacts</h4>
                </div>
                <div className="text-3xl font-black text-gray-900">{friends.length}</div>
                <p className="text-gray-500 text-xs mt-2">Friends managed in your personal circle.</p>
              </div>

              {topFriend && (
                <div className="card p-6 border-l-4 border-amber-400 rounded-[2rem] bg-white shadow-sm">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-1 bg-amber-50 rounded-full border border-amber-100 overflow-hidden">
                      <img src={topFriend.picture} alt="" className="w-10 h-10 rounded-full object-cover" />
                    </div>
                    <h4 className="font-bold text-gray-900">Most Consistent</h4>
                  </div>
                  <div className="font-bold text-lg text-amber-600">{topFriend.name}</div>
                </div>
              )}
            </div>
          ) : (
           
            <div className="h-[450px] border-2 border-dashed border-gray-100 rounded-[2.5rem] flex flex-col items-center justify-center p-8 text-center bg-gray-50/30">
               <TrendingUp className="text-gray-200 mb-4" size={48} />
               <p className="text-gray-400 text-sm font-medium leading-relaxed">
                 Stats are hidden. <br/> Please log an interaction to reveal your analytics.
               </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Stats;