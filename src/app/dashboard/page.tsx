import { getServerSession } from "next-auth";
import DashBoard from "../components/DashBoard";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <div>
      <DashBoard />
    </div>
  );
}
