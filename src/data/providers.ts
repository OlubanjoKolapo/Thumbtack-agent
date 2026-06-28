// Import profile photos
import person1 from '../assets/person 1.webp';
import person2 from '../assets/person 2.jpg';
import person3 from '../assets/person 3.jpg';
import person4 from '../assets/person 4.jfif';
import person5 from '../assets/person 5.jfif';

export interface Provider {
  id: string;
  name: string;
  initials: string;
  service: string;
  bio?: string;
  rating: number;
  reviewCount: number;
  price: number;
  priceUnit: "hr" | "flat" | "hourly";
  flatRate?: number;
  availability: string[];
  distanceMiles: number;
  responseTime: string;
  hireCount: number;
  similarJobsNearby: number;
  verified: boolean;
  tags: string[];
  matchScore: number;
  reviews: string[];
  matchReason?: string;
  imageSrc?: string;
}

export const mockProviders: Provider[] = [
  {
    id: "pro-001",
    name: "James P.",
    initials: "JP",
    service: "Licensed Plumber",
    bio: "15 years fixing Bay Area homes. Drain and pipe specialist.",
    rating: 4.9,
    reviewCount: 128,
    price: 90,
    priceUnit: "hr",
    flatRate: 120,
    availability: ["Sat 9–11 AM", "Sun 2–4 PM"],
    distanceMiles: 2.4,
    responseTime: "2 hours",
    hireCount: 1200,
    similarJobsNearby: 247,
    verified: true,
    tags: ["Drain repair", "Emergency", "Licensed"],
    matchScore: 98,
    reviews: [
      "James was on time, professional, fixed the issue quickly. Highly recommend.",
      "Great work, fair price, very communicative throughout."
    ],
    matchReason: "Best availability for Saturday, within your $150 budget, and 47 five-star reviews for similar repairs near you.",
    imageSrc: person1
  },
  {
    id: "pro-002",
    name: "Mike R.",
    initials: "MR",
    service: "Master Plumber",
    bio: "Specializing in residential and light commercial plumbing.",
    rating: 4.7,
    reviewCount: 84,
    price: 110,
    priceUnit: "hr",
    flatRate: 145,
    availability: ["Sat 10 AM–12 PM", "Sun 1–3 PM"],
    distanceMiles: 3.1,
    responseTime: "2 hours",
    hireCount: 340,
    similarJobsNearby: 84,
    verified: true,
    tags: ["Pipe repair", "Water heater"],
    matchScore: 82,
    reviews: [
      "Fixed my pipe issue in under an hour. Clean and professional.",
      "A bit expensive but got the job done when others couldn't."
    ],
    matchReason: "Good availability match, close distance, but slightly higher pricing.",
    imageSrc: person2
  },
  {
    id: "pro-003",
    name: "Dave L.",
    initials: "DL",
    service: "Plumbing and Gas",
    bio: "Local plumber focused on installations and quick fixes.",
    rating: 4.8,
    reviewCount: 62,
    price: 130,
    priceUnit: "flat",
    availability: ["Sat 8–10 AM", "Sun 9–11 AM"],
    distanceMiles: 4.2,
    responseTime: "1 hour",
    hireCount: 450,
    similarJobsNearby: 112,
    verified: false,
    tags: ["Gas lines", "Drain", "Remodels"],
    matchScore: 76,
    reviews: [
      "Very friendly and explained what was wrong. Good service.",
      "Quick response and scheduled me in early next morning."
    ],
    matchReason: "Meets budget requirement, but has lower review volume and further distance.",
    imageSrc: person3
  },
  {
    id: "pro-004",
    name: "Sarah M.",
    initials: "SM",
    service: "Professional House Cleaner",
    bio: "Eco-friendly deep cleaning. Licensed and bonded team.",
    rating: 4.8,
    reviewCount: 192,
    price: 55,
    priceUnit: "hr",
    availability: ["Sat 1–4 PM", "Sun 10 AM–1 PM"],
    distanceMiles: 1.8,
    responseTime: "30 mins",
    hireCount: 342,
    similarJobsNearby: 184,
    verified: true,
    tags: ["Eco-friendly", "Deep clean", "Bonded"],
    matchScore: 92,
    reviews: [
      "My house was absolutely spotless. Highly recommend Sarah's team!",
      "Super responsive, efficient, and used all-natural products."
    ],
    matchReason: "Excellent local proximity, great pricing, and outstanding review counts.",
    imageSrc: person4
  },
  {
    id: "pro-005",
    name: "Marcus K.",
    initials: "MK",
    service: "Residential Electrician",
    bio: "Fault finding, outlet repairs, and light installations.",
    rating: 4.9,
    reviewCount: 210,
    price: 95,
    priceUnit: "hr",
    availability: ["Sat 2–4 PM", "Sun 9–11 AM"],
    distanceMiles: 2.9,
    responseTime: "1 hour",
    hireCount: 890,
    similarJobsNearby: 156,
    verified: true,
    tags: ["Outlet repair", "Wiring", "Licensed"],
    matchScore: 95,
    reviews: [
      "Marcus fixed my kitchen outlet issue safely and fast.",
      "Clear quote upfront. Very detail-oriented technician."
    ],
    matchReason: "Highly rated licensed specialist with great weekend morning slots.",
    imageSrc: person5
  },
  {
    id: "pro-006",
    name: "Elena D.",
    initials: "ED",
    service: "House Cleaner",
    bio: "Dependable, thorough cleaning for homes and apartments.",
    rating: 4.6,
    reviewCount: 78,
    price: 60,
    priceUnit: "hr",
    availability: ["Sat 9 AM–12 PM", "Sun 12–3 PM"],
    distanceMiles: 5.1,
    responseTime: "2 hours",
    hireCount: 110,
    similarJobsNearby: 48,
    verified: false,
    tags: ["Appartment clean", "Weekly cleaning"],
    matchScore: 78,
    reviews: [
      "Prompt arrival and focused on detail. Friendly.",
      "Good solid cleaning service. Will hire again."
    ],
    matchReason: "Reasonable hourly rates, though slightly lower ranking metrics."
  },
  {
    id: "pro-007",
    name: "David S.",
    initials: "DS",
    service: "General Contractor",
    bio: "Home repairs, assemblies, painting and minor drywalls.",
    rating: 4.7,
    reviewCount: 150,
    price: 105,
    priceUnit: "hr",
    availability: ["Sat 11 AM–2 PM", "Sun 11 AM–2 PM"],
    distanceMiles: 6.2,
    responseTime: "3 hours",
    hireCount: 412,
    similarJobsNearby: 92,
    verified: true,
    tags: ["Drywall", "Painting", "Assembly"],
    matchScore: 80,
    reviews: [
      "Did an excellent job repairing the drywall in our hallway.",
      "Polite, kept the workspace clean, and finished on time."
    ],
    matchReason: "Good overall rating, but further distance than other candidates."
  },
  {
    id: "pro-008",
    name: "Lisa T.",
    initials: "LT",
    service: "Electrician",
    bio: "Licensed local electrician for panel upgrades and small fixes.",
    rating: 4.8,
    reviewCount: 98,
    price: 85,
    priceUnit: "hr",
    availability: ["Sat 11 AM–1 PM", "Sun 3–5 PM"],
    distanceMiles: 3.4,
    responseTime: "1 hour",
    hireCount: 310,
    similarJobsNearby: 76,
    verified: true,
    tags: ["Panel upgrade", "Lighting", "Licensed"],
    matchScore: 88,
    reviews: [
      "Lisa solved our breaker issue quickly. Highly professional.",
      "Clear explanation of the work required and fair pricing."
    ],
    matchReason: "Competitive hourly rate, solid review rating, and licensed verification."
  },
  {
    id: "pro-009",
    name: "Robert B.",
    initials: "RB",
    service: "Handyman Pro",
    bio: "TV mounting, gutter cleaning, and basic carpentry repairs.",
    rating: 4.5,
    reviewCount: 84,
    price: 70,
    priceUnit: "hr",
    availability: ["Sat 12–3 PM", "Sun 1–3 PM"],
    distanceMiles: 2.1,
    responseTime: "2 hours",
    hireCount: 98,
    similarJobsNearby: 52,
    verified: false,
    tags: ["TV Mounting", "Gutter cleaning", "Carpentry"],
    matchScore: 74,
    reviews: [
      "Robert mounted our TV perfectly. Will use again.",
      "Friendly guy, came with all his own tools."
    ],
    matchReason: "Convenient location and budget friendly, but lower average rating."
  }
];
