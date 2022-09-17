export default () => ({
  port: parseInt(process.env.PORT, 10),
  otp_secret: process.env.OTP_SECRET,
  redis_url: process.env.REDIS_URL,
});
