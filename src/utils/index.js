import dayjs from "dayjs";

// *For getting the years list
export function generateYearOptions() {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, function (_, index) {
    const yearValue = currentYear + index;
    return { label: yearValue.toString(), value: yearValue };
  });

  return years;
}

// *To calculate the distance between two points
export function getUserDistance(lat1, lng1, lat2, lng2) {
  const R = 3958.8;
  const dLat = deg2Rad(lat2 - lat1);
  const dLng = deg2Rad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2Rad(lat1)) *
      Math.cos(deg2Rad(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;

  const roundedNumber = round(d);
  return roundedNumber;
}
function deg2Rad(deg) {
  return deg * (Math.PI / 180);
}
function round(num) {
  let m = Number((Math.abs(num) * 100).toPrecision(2));
  const result = (Math.round(m) / 100) * Math.sign(num);
  return result;
}

export const getTimeIntervals = () => {
  const asapTime = { label: "ASAP", value: "ASAP" };

  const otherTimes = Array.from({ length: 95 }, (_, index) => {
    const totalMinutes = (index + 1) * 15;
    const hours = Math.floor(totalMinutes / 60) % 12 || 12; // 12-hour format
    const minutes = totalMinutes % 60;
    const period = totalMinutes < 720 ? "AM" : "PM"; // AM if before 12:00 PM, PM otherwise

    const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
    const formattedMinutes = minutes === 0 ? "00" : `${minutes}`;

    const label = `${formattedHours}:${formattedMinutes} ${period} EST`;

    return { label, value: label }; // You can set 'value' to 'label' or any other value you need
  });

  return [asapTime, ...otherTimes];
};

export function getDaysFromToday() {
  const days = [
    { label: "Today", value: dayjs().format("YYYY-MM-DD") },
    { label: "Tomorrow", value: dayjs().add(1, "day").format("YYYY-MM-DD") },
  ];
  const today = dayjs();
  for (let i = 2; i < 7; i++) {
    const day = today.add(i, "day");
    const formattedDate = day.format("YYYY-MM-DD");
    const formattedDay = day.format("dddd");
    days.push({ label: formattedDay, value: formattedDate });
  }
  return days;
}

export function getFixedValue(value) {
  return Number(value).toFixed(2);
}
