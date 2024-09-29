import { google } from "googleapis";
import { redirect } from "@remix-run/node";

export async function loader({ request }: { request: Request }) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");

  if (!code) {
    return redirect("/");
  }

  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );

  const { tokens } = await oauth2Client.getToken(code);
  const accessToken = tokens.access_token;

  return redirect("/forms", {
    headers: {
      "Set-Cookie": `accessToken=${accessToken}; HttpOnly; Path=/`,
    },
  });
}
