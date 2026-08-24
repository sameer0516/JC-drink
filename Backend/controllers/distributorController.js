const nodemailer = require("nodemailer");

const sendDistributorEmail = async (req, res) => {
  const { firstName, lastName, contactNo, email, subject, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: "dailyreport015@gmail.com",
      subject: `New Distributor Inquiry: ${subject}`,
      html: `
        <h3>New Distributor Application - jcDrink</h3>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Contact No:</strong> ${contactNo}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    };

    const userMailOptions = {
      from: `"jcDrink" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Thank you for your interest in jcDrink Distributorship!`,
      html: `
        <h3>Thank you for reaching out to jcDrink!</h3>
        <p>Hi ${firstName},</p>
        <p>We've received your distributorship inquiry regarding "<strong>${subject}</strong>". Our team will review your details and get back to you shortly.</p>
        <br/>
        <p><strong>Your details:</strong></p>
        <p>Phone: ${contactNo}</p>
        <p>Message: ${message}</p>
        <br/>
        <p>Cheers,</p>
        <p>Team jcDrink</p>
      `,
    };

    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(userMailOptions);

    res.status(200).json({ success: true, message: "Inquiry sent successfully!" });
  } catch (error) {
    console.error("Error sending distributor email:", error);
    res.status(500).json({ success: false, message: "Failed to send inquiry. Please try again later." });
  }
};

module.exports = { sendDistributorEmail };