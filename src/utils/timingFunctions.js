export function getTimeWithTwoMinInterval(
  durationInMinutes = 240,
  intervalInMinutes = 2
) {
  const currentTime = new Date();
  const endTime = new Date(currentTime.getTime() + durationInMinutes * 60000);

  const timeArray = [];

  // Add "Now" to the array
  timeArray.push("Now");

  // Loop to add the remaining time intervals
  while (currentTime <= endTime) {
    const startTimeString = currentTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    currentTime.setMinutes(currentTime.getMinutes() + intervalInMinutes);

    const endTimeString = currentTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    timeArray.push(`${startTimeString} - ${endTimeString}`);
  }

  return timeArray;
}

// Example usage: Get time array for the next 4 hours with a 2-minute interval
// const timeArray = getTimeArray(240, 2);
// console.log(timeArray);

export function getTimeAfter1AM(
  durationInMinutes = 240,
  intervalInMinutes = 2
) {
  const currentTime = new Date();

  // Find the next 1 AM
  const next1AM = new Date(currentTime);
  next1AM.setHours(1, 0, 0, 0);

  // If the current time is already past 1 AM, set the next 1 AM to be tomorrow
  if (currentTime >= next1AM) {
    next1AM.setDate(next1AM.getDate() + 1);
  }

  const endTime = new Date(next1AM.getTime() + durationInMinutes * 60000);

  const timeArray = [];

  // Loop to add the time intervals starting from the next 1 AM
  while (next1AM <= endTime) {
    const startTimeString = next1AM.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    next1AM.setMinutes(next1AM.getMinutes() + intervalInMinutes);

    const endTimeString = next1AM.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    timeArray.push(`${startTimeString} - ${endTimeString}`);
  }

  return timeArray;
}

// Example usage: Get time array starting from the next 1 AM for the next 4 hours with a 2-minute interval
// const timeArrayAfter1AM = getTimeAfter1AM(240, 2);
// console.log(timeArrayAfter1AM);

export function getDateRange(timezoneOffset = 0) {
  const now = new Date(); // Current date and time
  const currentUTC = now.getTime() + now.getTimezoneOffset() * 60000; // Adjust for local timezone
  const currentLocalTime = new Date(currentUTC + 60000 * timezoneOffset);

  // Tomorrow's date
  const tomorrow = new Date(currentLocalTime);
  tomorrow.setDate(currentLocalTime.getDate() + 1);

  return {
    currentDate: currentLocalTime.toISOString().split("T")[0], // Format: YYYY-MM-DD
    tomorrowDate: tomorrow.toISOString().split("T")[0], // Format: YYYY-MM-DD
  };
}

// Example usage:
// const dateRange = getDateRange(-300); // Adjust the timezone offset as needed
// console.log('Current Date:', dateRange.currentDate);
// console.log('Tomorrow Date:', dateRange.tomorrowDate);
