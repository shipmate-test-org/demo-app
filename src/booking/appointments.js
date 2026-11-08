// Online booking: a patient picks a doctor and a free time slot to book an appointment.
const doctors = [
  { id: 'd1', name: 'Dr. An', specialty: 'General dentistry' },
  { id: 'd2', name: 'Dr. Binh', specialty: 'Orthodontics' },
];

const workingHours = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'];
const appointments = [];

function listDoctors() {
  return doctors;
}

// Free slots of a doctor on a date (YYYY-MM-DD): the working hours that nobody has booked yet.
function freeSlots(doctorId, date) {
  const taken = appointments
    .filter((a) => a.doctorId === doctorId && a.date === date)
    .map((a) => a.time);
  return workingHours.filter((time) => !taken.includes(time));
}

// A patient books one free slot with the chosen doctor.
function bookAppointment({ patientName, doctorId, date, time }) {
  if (!doctors.some((d) => d.id === doctorId)) {
    throw new Error('Unknown doctor');
  }
  if (!freeSlots(doctorId, date).includes(time)) {
    throw new Error('That time slot is not available');
  }
  const appointment = { id: appointments.length + 1, patientName, doctorId, date, time };
  appointments.push(appointment);
  return appointment;
}

module.exports = { listDoctors, freeSlots, bookAppointment };
