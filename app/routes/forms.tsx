import { redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export async function loader({ request }: { request: Request }) {
  const accessToken = request.headers.get("Cookie")?.split("accessToken=")[1];

  if (!accessToken) {
    return redirect("/auth");
  }

  const formId = process.env.GOOGLE_FORM_ID;

  const res = await fetch(
    `https://forms.googleapis.com/v1/forms/${formId}/responses`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error("レスポンスの取得に失敗しました");
  }

  const data = await res.json();

  return data;
}

export default function Index() {
  const data = useLoaderData<typeof loader>();

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
