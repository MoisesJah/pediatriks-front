type Horario = { dia_semana: number; hora_inicio: string; hora_fin: string };

export function generateTimeSlots(horarios: Horario[], slotInterval = '01:00:00') {
  // Helper function to add time intervals
  function addTime(time: string, interval: string) {
    const [hours, minutes, seconds] = interval.split(':').map(Number);
    const date = new Date(`1970-01-01T${time}`);
    date.setHours(date.getHours() + hours);
    date.setMinutes(date.getMinutes() + minutes);
    date.setSeconds(date.getSeconds() + seconds);
    return date.toTimeString().slice(0, 8);
  }

  // Step 1: Group horarios by dia_semana
  const grouped = horarios.reduce((acc: any, horario) => {
    const { dia_semana, hora_inicio, hora_fin } = horario;

    if (!acc[dia_semana]) {
      acc[dia_semana] = [];
    }
    acc[dia_semana].push({ hora_inicio, hora_fin });
    return acc;
  }, {});

  // Step 2: Generate time slots for each dia_semana
  const result = Object.keys(grouped).map((diaKey) => {
    const ranges = grouped[diaKey];
    const slots: string[] = [];

    ranges.forEach((range: { hora_inicio: any; hora_fin: any; }) => {
      const { hora_inicio, hora_fin } = range;
      let currentTime = hora_inicio;

      while (currentTime < hora_fin) {
        const slotStart = currentTime;
        const slotEnd = addTime(currentTime, slotInterval);
        slots.push(`${slotStart} - ${slotEnd}`);
        currentTime = slotEnd;
      }
    });

    return {
      dia_semana: parseInt(diaKey), // Ensure dia_semana is a number
      time_slots: slots,
    };
  });

  return result;
}
