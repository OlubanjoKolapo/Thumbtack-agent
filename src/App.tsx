import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BookingProvider } from './context/BookingContext';
import { Layout } from './components/Layout';
import { Landing } from './pages/Landing';
import { Connect } from './pages/Connect';
import { Request } from './pages/Request';
import { Searching } from './pages/Searching';
import { Results } from './pages/Results';
import { Approve } from './pages/Approve';
import { Confirmed } from './pages/Confirmed';
import { Track } from './pages/Track';

const App: React.FC = () => {
  return (
    <BookingProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/connect" element={<Connect />} />
            <Route path="/request" element={<Request />} />
            <Route path="/searching" element={<Searching />} />
            <Route path="/results" element={<Results />} />
            <Route path="/approve" element={<Approve />} />
            <Route path="/confirmed" element={<Confirmed />} />
            <Route path="/track" element={<Track />} />
            {/* Fallback route */}
            <Route path="*" element={<Landing />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </BookingProvider>
  );
};

export default App;
