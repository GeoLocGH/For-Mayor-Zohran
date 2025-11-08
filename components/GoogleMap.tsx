import React, { useState } from 'react';
import { XIcon } from './icons/XIcon';
import { ViewfinderCircleIcon } from './icons/ViewfinderCircleIcon';
import { useLocale } from '../contexts/LocaleContext';

interface GoogleMapProps {
    onConfirm: (data: {
        location: { lat: number; lng: number };
        info: { name: string; district: string; contact: string };
    }) => void;
    onClose: () => void;
    initialLocation: { lat: number; lng: number } | null;
    initialInfo: { name: string; district: string; contact: string } | null;
}

export const GoogleMap: React.FC<GoogleMapProps> = ({ onConfirm, onClose, initialLocation, initialInfo }) => {
    const [latInput, setLatInput] = useState(initialLocation ? initialLocation.lat.toString() : '');
    const [lngInput, setLngInput] = useState(initialLocation ? initialLocation.lng.toString() : '');
    const [nameInput, setNameInput] = useState(initialInfo ? initialInfo.name : '');
    const [districtInput, setDistrictInput] = useState(initialInfo ? initialInfo.district : '');
    const [contactInput, setContactInput] = useState(initialInfo ? initialInfo.contact : '');
    const [error, setError] = useState<string | null>(null);
    const [isFetchingLocation, setIsFetchingLocation] = useState(false);
    const { t } = useLocale();

    const handleFetchLocation = () => {
        if (!navigator.geolocation) {
            setError(t('map.error.notSupported'));
            return;
        }
        
        setIsFetchingLocation(true);
        setError(null);

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLatInput(position.coords.latitude.toFixed(6));
                setLngInput(position.coords.longitude.toFixed(6));
                setIsFetchingLocation(false);
            },
            () => {
                setError(t('map.error.unableToRetrieve'));
                setIsFetchingLocation(false);
            }
        );
    };

    const handleConfirm = () => {
        const lat = parseFloat(latInput);
        const lng = parseFloat(lngInput);

        if (nameInput.trim() === '') {
            setError(t('map.error.nameRequired'));
            return;
        }
        if (districtInput.trim() === '') {
            setError(t('map.error.districtRequired'));
            return;
        }
        if (latInput.trim() === '' || lngInput.trim() === '') {
            setError(t('map.error.latLngRequired'));
            return;
        }
        if (isNaN(lat) || isNaN(lng)) {
            setError(t('map.error.invalidLatLng'));
            return;
        }
        if (lat < -90 || lat > 90) {
            setError(t('map.error.invalidLatRange'));
            return;
        }
        if (lng < -180 || lng > 180) {
            setError(t('map.error.invalidLngRange'));
            return;
        }
        setError(null);

        onConfirm({
            location: { lat, lng },
            info: {
                name: nameInput.trim(),
                district: districtInput.trim(),
                contact: contactInput.trim()
            }
        });
        onClose();
    };


    return (
        <div
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 animate-fade-in"
            aria-modal="true"
            role="dialog"
        >
            <div className="bg-slate-800 rounded-lg shadow-xl w-full max-w-md border border-slate-700 transform transition-all animate-slide-up flex flex-col">
                <header className="p-4 flex justify-between items-center border-b border-slate-700">
                    <h3 className="text-xl font-semibold text-white">{t('map.title')}</h3>
                    <button
                        onClick={onClose}
                        className="p-1 rounded-full text-slate-400 hover:bg-slate-700 transition-colors"
                        aria-label="Close"
                    >
                        <XIcon className="w-6 h-6" />
                    </button>
                </header>

                <main className="p-6 space-y-4">
                    <div>
                        <label htmlFor="reporterName" className="block text-sm font-medium text-slate-300 mb-1">{t('map.nameLabel')} <span className="text-red-400">*</span></label>
                        <input
                            id="reporterName"
                            type="text"
                            value={nameInput}
                            onChange={(e) => { setNameInput(e.target.value); setError(null); }}
                            placeholder={t('map.namePlaceholder')}
                            aria-label="Reporter's Name"
                            className="w-full bg-slate-700 text-white placeholder-slate-400 rounded-md px-3 py-2 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-orange-500 transition text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="district" className="block text-sm font-medium text-slate-300 mb-1">{t('map.districtLabel')} <span className="text-red-400">*</span></label>
                        <input
                            id="district"
                            type="text"
                            value={districtInput}
                            onChange={(e) => { setDistrictInput(e.target.value); setError(null); }}
                            placeholder={t('map.districtPlaceholder')}
                            aria-label="District"
                            className="w-full bg-slate-700 text-white placeholder-slate-400 rounded-md px-3 py-2 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-orange-500 transition text-sm"
                        />
                    </div>
                     <div>
                        <label htmlFor="contact" className="block text-sm font-medium text-slate-300 mb-1">{t('map.contactLabel')} <span className="text-slate-500">({t('map.optional')})</span></label>
                        <input
                            id="contact"
                            type="text"
                            value={contactInput}
                            onChange={(e) => { setContactInput(e.target.value); setError(null); }}
                            placeholder={t('map.contactPlaceholder')}
                            aria-label="Email or Phone Number"
                            className="w-full bg-slate-700 text-white placeholder-slate-400 rounded-md px-3 py-2 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-orange-500 transition text-sm"
                        />
                    </div>

                    <div className="pt-2">
                        <div className="flex justify-between items-center mb-1">
                             <label className="block text-sm font-medium text-slate-300">{t('map.locationLabel')} <span className="text-red-400">*</span></label>
                             <button
                                onClick={handleFetchLocation}
                                disabled={isFetchingLocation}
                                className="flex items-center gap-1.5 text-xs px-2 py-1 bg-slate-600 text-white rounded-md hover:bg-slate-500 transition disabled:bg-slate-700 disabled:cursor-wait"
                             >
                                 <ViewfinderCircleIcon className="w-4 h-4" />
                                 {isFetchingLocation ? t('map.fetching') : t('map.useCurrentLocation')}
                             </button>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="latitude" className="sr-only">Latitude</label>
                                <input
                                    id="latitude"
                                    type="number"
                                    step="0.000001"
                                    value={latInput}
                                    onChange={(e) => { setLatInput(e.target.value); setError(null); }}
                                    placeholder={t('map.latitude')}
                                    aria-label="Latitude"
                                    className="w-full bg-slate-700 text-white placeholder-slate-400 rounded-md px-3 py-2 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-orange-500 transition text-sm"
                                />
                            </div>
                            <div>
                                <label htmlFor="longitude" className="sr-only">Longitude</label>
                                <input
                                    id="longitude"
                                    type="number"
                                    step="0.000001"
                                    value={lngInput}
                                    onChange={(e) => { setLngInput(e.target.value); setError(null); }}
                                    placeholder={t('map.longitude')}
                                    aria-label="Longitude"
                                    className="w-full bg-slate-700 text-white placeholder-slate-400 rounded-md px-3 py-2 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-orange-500 transition text-sm"
                                />
                            </div>
                        </div>
                    </div>


                    {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}
                </main>

                <footer className="bg-slate-800/50 border-t border-slate-700 px-6 py-4 rounded-b-lg flex justify-end items-center gap-4">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 bg-slate-600 text-white text-sm font-semibold rounded-md hover:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-slate-500"
                    >
                        {t('map.cancel')}
                    </button>
                    <button
                        onClick={handleConfirm}
                        className="px-6 py-2 bg-orange-500 text-white text-sm font-semibold rounded-md hover:bg-orange-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-orange-500"
                    >
                        {t('map.confirm')}
                    </button>
                </footer>
            </div>
        </div>
    );
};