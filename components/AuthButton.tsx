import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AuthButton() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const signOut = async () => {
    "use server";

    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect("/login");
  };

  return user ? (
    <div className="flex items-center gap-4">
      <p className="text-warning">{user.email?.split("@")[0]}</p>
      <form action={signOut}>
        <button className="py-2 px-4 rounded-md no-underline text-base-100 btn-sm btn-error btn">
          Logout
        </button>
      </form>
    </div>
  ) : (
    <Link
      href="/login"
      className="py-2 px-3 flex rounded-md no-underline text-neutral-content btn-neutral btn btn-sm"
    >
      Login
    </Link>
  );
}
