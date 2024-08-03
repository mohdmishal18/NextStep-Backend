import nodemailer from "nodemailer";

// Function to send email
async function sendEmail(to: string, subject: string, text: string, html: string) {
    // Compose email message
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL, 
            pass: process.env.PASS 
        }
    });
    
    const mailOptions = {
        from: process.env.EMAIL,
        to: to,
        subject: subject,
        text: text, // Plain text fallback
        html: html  // HTML content
    };

    // Send email
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
    } catch (error) {
        console.error('Error sending email:', error);
        throw error; // Throw error for handling in the caller function
    }
}

export { sendEmail };
