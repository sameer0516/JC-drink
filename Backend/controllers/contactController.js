const nodemailer = require("nodemailer");

const sendContactEmail = async (req, res) => {
  // Yahan phone aur subject add kar diye hain
  const { firstName, lastName, email, phone, subject, message } = req.body; 

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
      subject: `New Contact Form Submission: ${subject || 'jcDrink'}`,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not Provided'}</p>
        <p><strong>Subject:</strong> ${subject || 'Not Provided'}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    };

    const userMailOptions = {
      from: `"jcDrink" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `We've received your message, ${firstName}!`,
      html: `
        <h3>Thank you for contacting jcDrink!</h3>
        <p>Hi ${firstName},</p>
        <p>We've received your message and our team will get back to you shortly.</p>
        <br/>
        <p><strong>Your message:</strong></p>
        <p>${message}</p>
        <br/>
        <p>Cheers,</p>
        <p>Team jcDrink</p>
      `,
    };

    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(userMailOptions);

    res.status(200).json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ success: false, message: "Failed to send message. Please try again later." });
  }
};

module.exports = { sendContactEmail };