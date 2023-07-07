import Button from "@/components/ui/Button";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

async function DashBoard() {
  const session = await getServerSession(authOptions);
  return <div className="h-screen">{JSON.stringify(session)}</div>;
}

export default DashBoard;
