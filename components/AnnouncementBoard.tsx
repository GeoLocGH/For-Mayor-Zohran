import React from 'react';
import { useLocale } from '../contexts/LocaleContext';

interface Announcement {
  id: number;
  title: string;
  date: string;
  content: string;
}

const announcements: Announcement[] = [
  {
    id: 1,
    title: 'Town Hall Meeting on Public Transport',
    date: 'July 28, 2024',
    content: 'Join the Mayor for a discussion on improving our city\'s public transportation system. The meeting will be held at City Hall at 7 PM.'
  },
  {
    id: 2,
    title: 'Summer Streets Program Kick-off',
    date: 'July 25, 2024',
    content: 'Park Avenue will be closed to traffic and open to the public for recreation this Saturday from 7 AM to 1 PM. Enjoy walking, biking, and more!'
  },
  {
    id: 3,
    title: 'New Recycling Guidelines',
    date: 'July 22, 2024',
    content: 'Please be aware of the new city-wide recycling guidelines effective August 1st. Details can be found on the sanitation department website.'
  },
  {
    id: 4,
    title: 'Community Garden Volunteer Day',
    date: 'July 20, 2024',
    content: 'Lend a hand at the East Village Community Garden this Sunday. All are welcome, no experience necessary. Tools will be provided.'
  }
];

const AnnouncementCard: React.FC<{ announcement: Announcement }> = ({ announcement }) => (
  <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
    <h4 className="font-bold text-md text-white">{announcement.title}</h4>
    <p className="text-xs text-slate-500 mb-2">{announcement.date}</p>
    <p className="text-sm text-slate-400">{announcement.content}</p>
  </div>
);

export function AnnouncementBoard() {
  const { t } = useLocale();
  return (
    <div className="flex flex-col h-full">
      <h2 className="text-xl font-semibold mb-4 text-center">{t('welcomePage.announcementsTitle')}</h2>
      <div className="space-y-4 overflow-y-auto flex-grow pr-2 h-0" style={{'minHeight': '300px'}}>
        {announcements.map(announcement => (
          <AnnouncementCard key={announcement.id} announcement={announcement} />
        ))}
      </div>
    </div>
  );
}