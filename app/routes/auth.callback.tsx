import { OAuth2Client } from "google-auth-library";
import { redirect } from "@remix-run/node";

export async function loader({ request }: { request: Request }) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");

  if (!code) {
    return redirect("/");
  }

  const client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );
  const { tokens } = await client.getToken(code);
  const accessToken = tokens.access_token;

  return redirect("/forms", {
    headers: {
      "Set-Cookie": `accessToken=${accessToken}; HttpOnly; Path=/`,
    },
  });
}
