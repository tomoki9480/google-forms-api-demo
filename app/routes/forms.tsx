import { redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { google } from "googleapis";

export async function loader({ request }: { request: Request }) {
  const accessToken = request.headers.get("Cookie")?.split("accessToken=")[1];

  if (!accessToken) {
    return redirect("/auth");
  }

  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({ access_token: accessToken });

  const formId = process.env.GOOGLE_FORM_ID;
  const forms = google.forms({ version: "v1", auth: oauth2Client });
  
  const res = await forms.forms.responses.list({ formId });

  if (!res.data) {
    throw new Error("レスポンスの取得に失敗しました");
  }

  return res.data;
}

export default function Index() {
  const data = useLoaderData<typeof loader>();

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
