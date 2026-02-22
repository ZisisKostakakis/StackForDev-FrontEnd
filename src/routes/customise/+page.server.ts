import { API_URL, API_KEY } from "$env/static/private";
import { fail } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const actions: Actions = {
  generate: async ({ request }) => {
    const data = await request.formData();
    const config = JSON.parse(data.get("config") as string);

    const res = await fetch(`${API_URL}/generate-dockerfile`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
      },
      body: JSON.stringify({ config }),
    });

    const json = await res.json();

    if (!res.ok) {
      return fail(res.status, { error: json.error || `Request failed with status ${res.status}` });
    }

    return { dockerfile: json.dockerfile };
  },
};
