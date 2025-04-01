import { Button } from "@/components/ui/button";
import { auth, signIn } from "../../auth";

export default async function Home() {
  const session = await auth();
  return (
    <div>
      {JSON.stringify(session)}
      <form
        action={async () => {
          "use server";

          signIn();
        }}
      >
        <Button>Login</Button>
      </form>
    </div>
  );
}
