import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BookingProvider } from './context/BookingContext';
import { Layout } from './components/Layout';
import { Landing } from './pages/Landing';
import { Chat } from './pages/Chat';
import { Track } from './pages/Track';
import { Demo } from './pages/Demo';

const App: React.FC = () => {
  return (
    <BookingProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/track" element={<Track />} />
            <Route path="/demo" element={<Demo />} />
            {/* Fallback route */}
            <Route path="*" element={<Landing />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </BookingProvider>
  );
};

export default App;
