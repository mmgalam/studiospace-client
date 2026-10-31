export interface Studio {
  _id: string;
  title: string;
  category: string;
  hourlyRate: number;
  securityDeposit: number;
  maxCapacity: number;
  location: string;
  image: string;
  amenities: string[];
  overview: string;
  rating: number;
  ownerName: string;
  ownerEmail: string;
}

export interface Booking {
  _id: string;
  studioId: string;
  studioTitle: string;
  studioImage: string;
  studioLocation: string;
  date: string;
  startTime: string;
  endTime: string;
  hours: number;
  totalPrice: number;
  securityDeposit: number;
  status: "Pending" | "Confirmed" | "Completed" | "Cancelled";
  userName: string;
  userEmail: string;
}
