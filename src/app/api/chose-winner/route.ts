import { NextRequest } from "next/server";

export async function GET(request: NextRequest, response: Response) {
  const participants = request.nextUrl.searchParams.get("participants");
  if (!participants) {
    return new Response("", { status: 500 });
  }
  const participantsArray = participants.replaceAll(", ", ",").split(",");

  const res: Record<string, number> = {};

  for (let i = 0; i < participantsArray.length * 4000 + 1; i += 1) {
    const kek = Math.trunc(Math.random() * participantsArray.length);
    if (res[participantsArray[kek]] === undefined)
      res[participantsArray[kek]] = 1;
    else res[participantsArray[kek]] += 1;
  }

  const temp = Object.entries(res);
  temp.sort((a, b) => b[1] - a[1]);

  return new Response(JSON.stringify(temp));
}
