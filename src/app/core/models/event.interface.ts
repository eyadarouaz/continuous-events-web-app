export interface Events {
    id: number;
    title: string;
    location: string;
    startDate: Date;
    endDate: Date;
    status: string;
    attendees?: number;
  }