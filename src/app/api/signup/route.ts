import { users } from "@/lib/userStore";
export async function POST(request: Request) {
  const body = await request.json();
  const { id, password } = body;   
  const userId = BigInt(id);      
  const exists = users.some(u => u.id === userId);

  if (exists) {
    return Response.json(
      { message: "User already exists" },
      { status: 400 }
    );
  }
  users.push({
    id: userId,
    password
  });

  return Response.json(
    {
      message: "Signup successful",
      storedType: typeof userId,        
      storedValue: userId.toString()    
    },
    { status: 200 }
  );
}
