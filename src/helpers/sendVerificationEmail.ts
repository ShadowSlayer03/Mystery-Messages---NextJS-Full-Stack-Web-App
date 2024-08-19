import { Resend } from "resend";
import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    const { data } = await resend.emails.send({
      from: "Mystery Messages Anonymous Feedback <onboarding@resend.dev>",
      to: ["delivered@resend.dev"], //
      subject: "Verification Email for Mystery Messages",
      react: VerificationEmail({ username, otp: verifyCode }),
    });

    console.log("Data returned after sending mail:",data);
 
    return {
      success: true,
      message: "Verification Email sent successfully!",
    };
  } catch (emailErr) {
    console.error("Error sending verification email!", emailErr);
    return {
      success: false,
      message: "Failed to send verification email!",
    };
  }
}
