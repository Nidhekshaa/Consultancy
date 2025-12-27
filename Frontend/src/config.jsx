const config = {
  // Check environment: development (localhost) vs production (deployed)
  API_BASE_URL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:5000"
      : "https://consultancy-2-eavm.onrender.com"
};

export default config;
