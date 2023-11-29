import { getServerSession } from "next-auth";
import LoginForm from "./components/LoginForm";
import "./globals.css";
import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (session) {
    return redirect("/dashboard");
  }
  return (
    <main>
      <LoginForm />
    </main>
  );
}
