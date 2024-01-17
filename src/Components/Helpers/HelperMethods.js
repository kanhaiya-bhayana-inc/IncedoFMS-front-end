export function convertUTCToPST(utcTimeString) {
  const options = { timeZone: 'America/Los_Angeles' }; // PST time zone

  // Create a Date object from the UTC time string
  const utcDate = new Date(utcTimeString);

  // Use toLocaleString with the options to convert to PST
  return utcDate.toLocaleString('en-US', options);
};

export function convertTimeStampToDate(timestamp) {

  const formattedDate = (new Date(timestamp)).toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric'
  });
  return formattedDate;
  // console.log(formattedDate); // Output: "11/30/2023"

}