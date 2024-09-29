import { google } from "googleapis";
import { redirect } from "@remix-run/node";

export async function loader() {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );

  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: ["https://www.googleapis.com/auth/forms.responses.readonly"],
    include_granted_scopes: true
  });

  return redirect(authUrl);
}
