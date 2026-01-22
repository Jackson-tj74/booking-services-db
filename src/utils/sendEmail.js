
import nodemailer from "nodemailer";

const sendBookingEmail = async ({ to, name, service, price }) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"online booking" <${process.env.EMAIL_USER}>`,
      to,
      subject: "Booking Confirmation ",
      html: `
        <h2>Hello ${name}</h2>
        <p>Your booking has been successfully created.</p>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Price:</strong> $${price}</p>
        <p>Thank you for choosing us 🙏</p>
      `,
    });

    console.log(" Booking email sent to:", to);
  } catch (error) {
    console.error(" Email error:", error.message);
  }
};

export default sendBookingEmail;
