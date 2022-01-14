const config = {
  api: {
    serverURL: process.env.NEXT_PUBLIC_API_SERVER_URL || "http://localhost:5000"
  },
  googleClientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""
};

export default config;
