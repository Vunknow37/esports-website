"use server";

import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters long." }),
  email: z.string().email({ message: "Please provide a valid email address." }),
  subject: z.string().min(3, { message: "Subject must be at least 3 characters long." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters long." }),
});

export async function sendContactEmail(data) {
  // 1. Server-side validation via Zod
  const result = contactSchema.safeParse(data);
  if (!result.success) {
    const errorMsg = result.error.errors.map((e) => e.message).join(", ");
    return { success: false, error: errorMsg };
  }

  const { name, email, subject, message } = result.data;

  try {
    // 2. Integration hook for Resend or Nodemailer:
    // ----------------------------------------------------
    // EXAMPLE WITH RESEND:
    // const { Resend } = require("resend");
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: "IITR Esports <contact@iitresports.com>",
    //   to: "admin@iitresports.com",
    //   reply_to: email,
    //   subject: `[Contact Form] ${subject}`,
    //   text: `From: ${name} (${email})\n\nMessage:\n${message}`,
    // });
    // ----------------------------------------------------

    // Simulate async transmission
    await new Promise((res) => setTimeout(res, 800));

    console.log(`[Contact Submission] From: ${name} (${email}) | Subject: ${subject}`);
    return { success: true };
  } catch (err) {
    console.error("Failed to send contact email:", err);
    return { success: false, error: "Failed to deliver message. Please try again later." };
  }
}

