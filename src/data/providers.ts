export interface Provider {
  id: string;
  name: string;
  initials: string;
  service: string;
  bio?: string;
  rating: number;
  reviewCount: number;
  price: number;
  priceUnit: "flat" | "hourly";
  availability: string;
  distanceMiles: number;
  verified: boolean;
  tags: string[];
  matchScore: number;
  matchReason?: string;
}

export const mockProviders: Provider[] = [
  {
    id: "pro-001",
    name: "James P.",
    initials: "JP",
    service: "Licensed Plumber",
    bio: "15 years fixing Bay Area homes. Drain specialist.",
    rating: 4.9,
    reviewCount: 128,
    price: 120,
    priceUnit: "flat",
    availability: "Sat 9–11 AM",
    distanceMiles: 2.4,
    verified: true,
    tags: ["Drain repair", "Emergency", "Licensed"],
    matchScore: 98,
    matchReason: "Best availability match for Saturday, within your $150 budget, and 47 five-star reviews for similar repairs."
  },
  {
    id: "pro-002",
    name: "Mike R.",
    initials: "MR",
    service: "Master Plumber",
    bio: "Specializing in residential and light commercial plumbing.",
    rating: 4.7,
    reviewCount: 84,
    price: 145,
    priceUnit: "flat",
    availability: "Sat 10 AM–12 PM",
    distanceMiles: 3.1,
    verified: true,
    tags: ["Pipe repair", "Water heater"],
    matchScore: 82,
    matchReason: "Good availability match, close distance, but slightly higher pricing."
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
    availability: "Sat 8–10 AM",
    distanceMiles: 4.2,
    verified: false,
    tags: ["Gas lines", "Drain", "Remodels"],
    matchScore: 76,
    matchReason: "Meets budget requirement, but has lower review volume and further distance."
  }
];
