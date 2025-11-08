import React, { useState, useMemo } from 'react';
import { SearchIcon } from './icons/SearchIcon';
import { useLocale } from '../contexts/LocaleContext';

type Status = 'Under Review' | 'In Progress' | 'Completed';
type Category = 'Infrastructure' | 'Sanitation' | 'Public Safety' | 'Parks & Rec';

interface AgendaItem {
  id: number;
  title: string;
  description: string;
  status: Status;
  category: Category;
}

const agendaItems: AgendaItem[] = [
  {
    id: 1,
    title: 'Repair Potholes on Main Street',
    description: 'Multiple reports of deep potholes causing vehicle damage near the downtown area.',
    status: 'In Progress',
    category: 'Infrastructure',
  },
  {
    id: 2,
    title: 'Increase Garbage Collection Frequency in Park Slope',
    description: 'Overflowing public bins have been reported, requesting an additional pickup day.',
    status: 'Under Review',
    category: 'Sanitation',
  },
  {
    id: 3,
    title: 'Install New Streetlights on 5th Ave',
    description: 'Community request for better lighting to improve safety after dark.',
    status: 'Completed',
    category: 'Public Safety',
  },
  {
    id: 4,
    title: 'Upgrade Playground Equipment at Central Park',
    description: 'Old swings and slides need replacement to meet modern safety standards.',
    status: 'In Progress',
    category: 'Parks & Rec',
  },
  {
    id: 5,
    title: 'Graffiti Removal Program Expansion',
    description: 'Proposal to expand the city-wide graffiti cleanup initiative to more neighborhoods.',
    status: 'Under Review',
    category: 'Sanitation',
  },
  {
    id: 6,
    title: 'Crosswalk Repainting at Elm & Oak Intersection',
    description: 'Faded crosswalk lines are creating a hazard for pedestrians.',
    status: 'Completed',
    category: 'Infrastructure',
  },
];

const statusConfig: { [key in Status]: { color: string; bg: string } } = {
  'Under Review': { color: 'text-yellow-300', bg: 'bg-yellow-900/50' },
  'In Progress': { color: 'text-cyan-300', bg: 'bg-cyan-900/50' },
  Completed: { color: 'text-green-300', bg: 'bg-green-900/50' },
};

const categoryConfig: { [key in Category]: { color: string; bg: string } } = {
  Infrastructure: { color: 'text-indigo-300', bg: 'bg-indigo-900' },
  Sanitation: { color: 'text-pink-300', bg: 'bg-pink-900' },
  'Public Safety': { color: 'text-red-300', bg: 'bg-red-900' },
  'Parks & Rec': { color: 'text-teal-300', bg: 'bg-teal-900' },
};

const AgendaCard: React.FC<{ item: AgendaItem }> = ({ item }) => (
  <div className="bg-slate-800 rounded-lg p-4 shadow-md border border-slate-700 hover:border-orange-500 transition-all duration-200 hover:scale-[1.02]">
    <div className="flex justify-between items-start mb-2">
      <span
        className={`px-2 py-0.5 text-xs font-semibold rounded-full ${
          categoryConfig[item.category].color
        } ${categoryConfig[item.category].bg}`}
      >
        {item.category}
      </span>
    </div>
    <h3 className="font-bold text-lg mb-1 text-white">{item.title}</h3>
    <p className="text-slate-400 text-sm">{item.description}</p>
  </div>
);

const AgendaColumn: React.FC<{ title: Status; items: AgendaItem[] }> = ({ title, items }) => {
  const { t } = useLocale();
  const translatedTitle = t(`agenda.status.${title.toLowerCase().replace(' ', '')}`);
  return (
    <div className="bg-slate-800/50 rounded-lg p-4 flex-1">
      <div
        className={`px-3 py-1 text-sm font-bold rounded-md inline-block mb-4 ${statusConfig[title].color} ${statusConfig[title].bg}`}
      >
        {translatedTitle}
      </div>
      <div className="space-y-4">
        {items.length > 0 ? (
          items.map((item) => <AgendaCard key={item.id} item={item} />)
        ) : (
          <p className="text-slate-500 text-sm text-center italic">{t('agenda.noItems')}</p>
        )}
      </div>
    </div>
  );
};

export function AgendaBoard() {
  const [searchTerm, setSearchTerm] = useState('');
  const { t } = useLocale();

  const filteredAgendaItems = useMemo(() => {
    if (!searchTerm.trim()) {
      return agendaItems;
    }
    const lowercasedFilter = searchTerm.toLowerCase();
    return agendaItems.filter(item =>
      item.title.toLowerCase().includes(lowercasedFilter) ||
      item.description.toLowerCase().includes(lowercasedFilter)
    );
  }, [searchTerm]);

  const columns: { [key in Status]: AgendaItem[] } = {
    'Under Review': filteredAgendaItems.filter((item) => item.status === 'Under Review'),
    'In Progress': filteredAgendaItems.filter((item) => item.status === 'In Progress'),
    Completed: filteredAgendaItems.filter((item) => item.status === 'Completed'),
  };

  return (
    <main className="flex-grow container mx-auto p-4 md:p-8 overflow-y-auto flex flex-col">
       <div className="mb-6 text-center">
        <h2 className="text-3xl font-bold text-white mb-2">{t('agenda.title')}</h2>
        <p className="text-slate-400">{t('agenda.description')}</p>
      </div>

      <div className="mb-6 relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={t('agenda.searchPlaceholder')}
          className="w-full bg-slate-700 text-white placeholder-slate-400 rounded-md px-4 py-3 pl-10 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
          aria-label="Search agendas"
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <SearchIcon className="w-5 h-5 text-slate-400" />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <AgendaColumn title="Under Review" items={columns['Under Review']} />
        <AgendaColumn title="In Progress" items={columns['In Progress']} />
        <AgendaColumn title="Completed" items={columns['Completed']} />
      </div>
    </main>
  );
}