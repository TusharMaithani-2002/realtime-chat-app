import Button from "@/components/ui/Button";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

async function DashBoard() {
  const session = await getServerSession(authOptions);
  return (
    <div>
      <Button>hello world!</Button>
    </div>
  );
}

export default DashBoard;
