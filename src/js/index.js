// This function will automaticly update year at the footer
const footerYear = () => {
    // Selecting span element with class .year
    const yearElement = document.querySelector('.year');
    const date = new Date();
    const year = String(date.getFullYear());
    const month = String(date);
    yearElement.textContent = `${year}/${month.slice(4,7)}`
};
// For updating year and month
footerYear();