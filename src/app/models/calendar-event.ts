export interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  description?: string;
  location?: string;
  therapyType?: string;
  selectedPatient?: string;
  doctor?: string; 
}
