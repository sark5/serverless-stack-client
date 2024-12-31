// src/reportWebVitals.js

// Remove the import of reportWebVitals
// import { reportWebVitals } from 'web-vitals';  // This line is not needed

// Define the function locally (no need to import reportWebVitals anymore)
const reportWebVitals = (onPerfEntry) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

// Export the local function to be used elsewhere
export default reportWebVitals;
