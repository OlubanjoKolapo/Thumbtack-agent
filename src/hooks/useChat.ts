import { useState, useEffect } from 'react';
import { mockProviders } from '../data/providers';
import type { Provider } from '../data/providers';

export type ChatState = 
  | 'idle'
  | 'user_sent'
  | 'location'
  | 'searching'
  | 'results'
  | 'follow_up'
  | 'booking'
  | 'confirmed'
  | 'estimate_sent';

export interface Message {
  id: string;
  type: 
    | 'user' 
    | 'tack_text' 
    | 'tack_location' 
    | 'tack_searching'
    | 'tack_results' 
    | 'tack_confirmation' 
    | 'tack_estimate';
  content: string;
  providers?: Provider[];
  timestamp: Date;
}

export const useChat = () => {
  const [chatState, setChatState] = useState<ChatState>('idle');
  const [messages, setMessages] = useState<Message[]>([]);
  const [activeProvider, setActiveProvider] = useState<Provider | null>(null);
  const [locationValue, setLocationValue] = useState<string>('');
  const [filteredPros, setFilteredPros] = useState<Provider[]>(mockProviders.slice(0, 5));
  const [currentQuery, setCurrentQuery] = useState<string>('');

  // Stagger searching rows
  const [searchCheckpoints, setSearchCheckpoints] = useState<('pending' | 'loading' | 'done')[]>([
    'pending', 'pending', 'pending', 'pending', 'pending'
  ]);

  const addMessage = (message: Omit<Message, 'id' | 'timestamp'>) => {
    const newMsg: Message = {
      ...message,
      id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMsg]);
    return newMsg;
  };

  // 1. Initial trigger (User submits request from landing page or input bar)
  const startChat = (query: string) => {
    if (!query.trim()) return;
    handleReset();
    setCurrentQuery(query);
    setChatState('user_sent');
    
    addMessage({
      type: 'user',
      content: query
    });
  };

  // Reset helper
  const handleReset = () => {
    setChatState('idle');
    setMessages([]);
    setActiveProvider(null);
    setLocationValue('');
    setFilteredPros(mockProviders.slice(0, 5));
    setSearchCheckpoints(['pending', 'pending', 'pending', 'pending', 'pending']);
  };

  // Stagger location request after user message appears (300ms)
  useEffect(() => {
    if (chatState === 'user_sent') {
      const timer = setTimeout(() => {
        setChatState('location');
        addMessage({
          type: 'tack_location',
          content: 'Got it. To find pros near you, I need your location.'
        });
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [chatState]);

  // 2. Location confirmed -> start searching
  const confirmLocation = (location: string) => {
    setLocationValue(location);
    setChatState('searching');
    
    // Add searching indicator message
    addMessage({
      type: 'tack_searching',
      content: 'GATHERING INTELLIGENCE'
    });
  };

  // Stagger intelligence rows checklist logic
  useEffect(() => {
    if (chatState === 'searching') {
      setSearchCheckpoints(['loading', 'pending', 'pending', 'pending', 'pending']);
      
      const t1 = setTimeout(() => setSearchCheckpoints(['done', 'loading', 'pending', 'pending', 'pending']), 500);
      const t2 = setTimeout(() => setSearchCheckpoints(['done', 'done', 'loading', 'pending', 'pending']), 1000);
      const t3 = setTimeout(() => setSearchCheckpoints(['done', 'done', 'done', 'loading', 'pending']), 1500);
      const t4 = setTimeout(() => setSearchCheckpoints(['done', 'done', 'done', 'done', 'loading']), 2000);
      const t5 = setTimeout(() => setSearchCheckpoints(['done', 'done', 'done', 'done', 'done']), 2500);
      
      const tFinished = setTimeout(() => {
        // Transition to results state
        setChatState('results');
        
        // Match specific keywords to rank/filter results on load if appropriate
        let initialPros = mockProviders.slice(0, 5); // default top 5 matching pros
        const lowerQuery = currentQuery.toLowerCase();
        if (lowerQuery.includes('clean')) {
          initialPros = mockProviders.filter(p => p.service.toLowerCase().includes('clean')).slice(0, 5);
        } else if (lowerQuery.includes('electrician') || lowerQuery.includes('electrical')) {
          initialPros = mockProviders.filter(p => p.service.toLowerCase().includes('electrician')).slice(0, 5);
        } else if (lowerQuery.includes('handyman')) {
          initialPros = mockProviders.filter(p => p.service.toLowerCase().includes('handyman')).slice(0, 5);
        } else if (lowerQuery.includes('plumber') || lowerQuery.includes('pipe') || lowerQuery.includes('leak')) {
          initialPros = mockProviders.filter(p => p.service.toLowerCase().includes('plumber')).slice(0, 5);
        }

        addMessage({
          type: 'tack_results',
          content: 'Found 5 pros near you',
          providers: initialPros
        });
        
        // Follow-up helper explanation
        addMessage({
          type: 'tack_text',
          content: 'Tap any pro to see their full profile and reviews. Or ask me anything — "Why is James better?" "Anyone available Sunday?" "Under $80 only?"'
        });

      }, 2900);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
        clearTimeout(t4);
        clearTimeout(t5);
        clearTimeout(tFinished);
      };
    }
  }, [chatState, currentQuery]);

  // 3. User asks follow-up questions
  const askFollowUp = (question: string) => {
    if (!question.trim()) return;

    addMessage({
      type: 'user',
      content: question
    });

    const lowerQuestion = question.toLowerCase();
    
    // Simulate thinking state
    setChatState('follow_up');

    setTimeout(() => {
      // 1. Question comparing James & Mike
      if (lowerQuestion.includes('james') && (lowerQuestion.includes('better') || lowerQuestion.includes('mike') || lowerQuestion.includes('compare'))) {
        addMessage({
          type: 'tack_text',
          content: "James has a 4.9 vs Mike's 4.7 rating, is available earlier on Saturday (9am vs 10am), and has 247 similar jobs done near you compared to Mike's 84. He's also $20/hr cheaper."
        });
      }
      // 2. Filter Sunday-available pros
      else if (lowerQuestion.includes('sunday')) {
        const sundayPros = mockProviders.filter(p => 
          p.availability.some(slot => slot.toLowerCase().includes('sun'))
        );
        addMessage({
          type: 'tack_results',
          content: 'Here are the pros available Sunday:',
          providers: sundayPros
        });
      }
      // 3. Filter Under $80
      else if (lowerQuestion.includes('80') || lowerQuestion.includes('under')) {
        const cheapPros = mockProviders.filter(p => p.price < 80);
        addMessage({
          type: 'tack_results',
          content: 'Got it — here are pros under $80/hr:',
          providers: cheapPros
        });
      }
      // General fallbacks
      else {
        addMessage({
          type: 'tack_text',
          content: "I've checked the details. James P. remains our highest recommended match for plumbing based on location and rating. Would you like to confirm the booking or see alternative estimates?"
        });
      }

      setChatState('results'); // keep interactive in results/followup state
    }, 800);
  };

  // 4. Modal state handlers
  const initiateBooking = (pro: Provider) => {
    setActiveProvider(pro);
    setChatState('booking');
  };

  const cancelBooking = () => {
    setActiveProvider(null);
    setChatState('results');
  };

  const approveBooking = () => {
    if (!activeProvider) return;
    
    setChatState('confirmed');
    
    // Close modal, add confirmation message
    addMessage({
      type: 'tack_confirmation',
      content: `${activeProvider.name} is confirmed for Saturday, May 3 at 9:00 AM.`
    });
    
    // Save confirmation target to localStorage for Tracker page sync
    localStorage.setItem('booked_pro_id', activeProvider.id);
  };

  const sendEstimate = (pro: Provider, _details: string) => {
    setChatState('estimate_sent');
    
    addMessage({
      type: 'tack_estimate',
      content: `Estimate requested from ${pro.name}. You'll hear back within 2 hours.`
    });
    
    setActiveProvider(null);
  };

  return {
    chatState,
    messages,
    filteredPros,
    activeProvider,
    locationValue,
    searchCheckpoints,
    startChat,
    confirmLocation,
    askFollowUp,
    initiateBooking,
    cancelBooking,
    approveBooking,
    sendEstimate,
    handleReset,
    currentQuery
  };
};
