import React, { createContext, useContext, useState, useEffect } from 'react';

export type AgentType = 'claude' | 'chatgpt' | 'custom';
export type TimePreferenceType = 'As soon as possible' | 'This weekend' | 'Pick a date';

interface BookingContextProps {
  selectedAgent: AgentType;
  setSelectedAgent: (agent: AgentType) => void;
  spendLimit: number;
  setSpendLimit: (limit: number) => void;
  requireApproval: boolean;
  setRequireApproval: (require: boolean) => void;
  requestText: string;
  setRequestText: (text: string) => void;
  timePreference: TimePreferenceType;
  setTimePreference: (pref: TimePreferenceType) => void;
  dateValue: string;
  setDateValue: (date: string) => void;
  selectedProviderId: string | null;
  setSelectedProviderId: (id: string | null) => void;
  bookingRef: string;
  regenerateBookingRef: () => void;
  resetBooking: () => void;
}

const BookingContext = createContext<BookingContextProps | undefined>(undefined);

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedAgent, setSelectedAgent] = useState<AgentType>('claude');
  const [spendLimit, setSpendLimit] = useState<number>(150);
  const [requireApproval, setRequireApproval] = useState<boolean>(true);
  const [requestText, setRequestText] = useState<string>('');
  const [timePreference, setTimePreference] = useState<TimePreferenceType>('This weekend');
  const [dateValue, setDateValue] = useState<string>('2026-07-04'); // default Saturday
  const [selectedProviderId, setSelectedProviderId] = useState<string | null>(null);
  const [bookingRef, setBookingRef] = useState<string>('TCK-2025-4821');

  const regenerateBookingRef = () => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    setBookingRef(`TCK-2025-${randomSuffix}`);
  };

  const resetBooking = () => {
    // Keep agent selection but reset details
    setRequestText('');
    setTimePreference('This weekend');
    setDateValue('2026-07-04');
    setSelectedProviderId(null);
    regenerateBookingRef();
  };

  useEffect(() => {
    regenerateBookingRef();
  }, []);

  return (
    <BookingContext.Provider
      value={{
        selectedAgent,
        setSelectedAgent,
        spendLimit,
        setSpendLimit,
        requireApproval,
        setRequireApproval,
        requestText,
        setRequestText,
        timePreference,
        setTimePreference,
        dateValue,
        setDateValue,
        selectedProviderId,
        setSelectedProviderId,
        bookingRef,
        regenerateBookingRef,
        resetBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
