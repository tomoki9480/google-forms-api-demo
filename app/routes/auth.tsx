import { OAuth2Client } from "google-auth-library";
import { redirect } from "@remix-run/node";

export async function loader() {
  const client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );

  const authUrl = client.generateAuthUrl({
    access_type: "offline",
    scope: [
      "https://www.googleapis.com/auth/forms.responses.readonly",
    ],
    prompt: "consent",
  });

  return redirect(authUrl);
}
