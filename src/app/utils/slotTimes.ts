type Horario = { dia_semana: number; hora_inicio: string; hora_fin: string };

export function generateTimeSlots(schedules: Horario[], interval: string): { dia_semana: number; time_slots: string[] }[] {
  // Base start time is fixed at 08:00
  const baseStartTime = '08:00:00';
  
  // Parse interval to minutes
  const [intervalHours, intervalMinutes] = interval.split(':').map(Number);
  const intervalInMinutes = intervalHours * 60 + intervalMinutes;
  
  // Function to convert time string to minutes since midnight
  const timeToMinutes = (timeStr: string) => {
    const [hours, minutes, seconds = '00'] = timeStr.split(':').map(String);
    return parseInt(hours) * 60 + parseInt(minutes);
  };
  
  // Function to convert minutes since midnight to time string
  const minutesToTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  };
  
  // Calculate all possible slots for a full day starting from 08:00
  const possibleSlots: { startMinutes: number; endMinutes: number; start: string; end: string; }[] = [];
  let slotStartMinutes = timeToMinutes(baseStartTime);
  
  while (slotStartMinutes < 24 * 60) {
    const slotEndMinutes = slotStartMinutes + intervalInMinutes;
    
    possibleSlots.push({
      startMinutes: slotStartMinutes,
      endMinutes: slotEndMinutes,
      start: minutesToTime(slotStartMinutes),
      end: minutesToTime(slotEndMinutes >= 24 * 60 ? slotEndMinutes - 24 * 60 : slotEndMinutes)
    });
    
    slotStartMinutes += intervalInMinutes;
  }
  
  // Create result with the correct format
  const result: { dia_semana: number; time_slots: string[] }[] = [];
  
  // Process each schedule
  schedules.forEach(schedule => {
    const dayNumber = schedule.dia_semana; // Assuming each schedule entry has one day
    
    // Find or create the day entry in result
    let dayEntry = result.find(d => d.dia_semana === dayNumber);
    if (!dayEntry) {
      dayEntry = {
        dia_semana: dayNumber,
        time_slots: []
      };
      result.push(dayEntry);
    }
    
    const scheduleStartMinutes = timeToMinutes(schedule.hora_inicio);
    const scheduleEndMinutes = timeToMinutes(schedule.hora_fin);
    
    // Find slots that fit within this schedule period
    possibleSlots.forEach(slot => {
      // Include slots that start AT OR AFTER the schedule start time
      // AND end AT OR BEFORE the schedule end time
      if (slot.startMinutes >= scheduleStartMinutes && slot.endMinutes <= scheduleEndMinutes) {
        const timeSlotString = `${slot.start} - ${slot.end}`;
        
        if (!dayEntry.time_slots.includes(timeSlotString)) {
          dayEntry.time_slots.push(timeSlotString);
        }
      }
    });
  });
  
  // Sort timeSlots for each day
  result.forEach(dayEntry => {
    dayEntry.time_slots.sort();
  });
  
  return result;
}


export function generateTimeSlotsEsp(schedules: Array<any>, interval: string): Array<any> {
  // Base start time is fixed at 08:00
  const baseStartTime = '08:00:00';
  
  // Parse interval to minutes
  const [intervalHours, intervalMinutes] = interval.split(':').map(Number);
  const intervalInMinutes = intervalHours * 60 + intervalMinutes;
  
  // Function to convert time string to minutes since midnight
  const timeToMinutes = (timeStr: string) => {
    const [hours, minutes, seconds = '00'] = timeStr.split(':').map(String);
    return parseInt(hours) * 60 + parseInt(minutes);
  };
  
  // Function to convert minutes since midnight to time string
  const minutesToTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  };
  
  // Calculate all possible slots for a full day starting from 08:00
  const possibleSlots: { startMinutes: number; endMinutes: number; start: string; end: string; }[] = [];
  let slotStartMinutes = timeToMinutes(baseStartTime);
  
  while (slotStartMinutes < 24 * 60) {
    const slotEndMinutes = slotStartMinutes + intervalInMinutes;
    
    possibleSlots.push({
      startMinutes: slotStartMinutes,
      endMinutes: slotEndMinutes,
      start: minutesToTime(slotStartMinutes),
      end: minutesToTime(slotEndMinutes >= 24 * 60 ? slotEndMinutes - 24 * 60 : slotEndMinutes)
    });
    
    slotStartMinutes += intervalInMinutes;
  }
  
  // Create result with the correct format
  const result: any[] = [];
  
  // Process each schedule
  schedules.forEach(schedule => {
    const dayNumber = schedule.daysOfWeek[0]; // Assuming each schedule entry has one day
    
    // Find or create the day entry in result
    let dayEntry = result.find(d => d.dia_semana === dayNumber);
    if (!dayEntry) {
      dayEntry = {
        dia_semana: dayNumber,
        time_slots: []
      };
      result.push(dayEntry);
    }
    
    const scheduleStartMinutes = timeToMinutes(schedule.startTime);
    const scheduleEndMinutes = timeToMinutes(schedule.endTime);
    
    // Find slots that fit within this schedule period
    possibleSlots.forEach(slot => {
      // Include slots that start AT OR AFTER the schedule start time
      // AND end AT OR BEFORE the schedule end time
      if (slot.startMinutes >= scheduleStartMinutes && slot.endMinutes <= scheduleEndMinutes) {
        const timeSlotString = `${slot.start} - ${slot.end}`;
        
        if (!dayEntry.time_slots.includes(timeSlotString)) {
          dayEntry.time_slots.push(timeSlotString);
        }
      }
    });
  });
  
  // Sort timeSlots for each day
  result.forEach(dayEntry => {
    dayEntry.time_slots.sort();
  });
  
  return result;
}