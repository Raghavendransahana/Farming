import { users } from "@/lib/userStore";
export async function POST(request: Request) {
  const body = await request.json();
  const { id, password } = body
  const userId = BigInt(id);
  const user = users.find(
    u => u.id === userId && u.password === password
  );
  if (!user) {
    return Response.json(
      { message: "Credentials Incorrect?" },
      { status: 401 }
    );
  }
  return Response.json(
    {
      message: "Login successful",
      userId: user.id.toString()  
    },
    { status: 200 }
  );
}
