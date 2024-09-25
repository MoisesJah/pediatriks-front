
export function getWeekStartEndDates(date = new Date()) {
    const dayOfWeek = date.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    const startOfWeek = new Date(date.setDate(date.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1)));
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 6);
  
    return {
      startOfWeek,
      endOfWeek,
    };
  }
