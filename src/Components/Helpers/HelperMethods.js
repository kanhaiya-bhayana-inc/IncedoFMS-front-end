export function convertUTCToPST (utcTimeString) {
    const options = { timeZone: 'America/Los_Angeles' }; // PST time zone

    // Create a Date object from the UTC time string
    const utcDate = new Date(utcTimeString);

    // Use toLocaleString with the options to convert to PST
    return utcDate.toLocaleString('en-US', options);
  };