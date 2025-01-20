import { signOut } from "@/auth";
import { sampleBooks } from "@/constants";

import { Button } from "@/components/ui/button";
import BookList from "@/components/BookList";

const page = () => {
  return (
    <>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
        className="mb-10"
      >
        <Button>Logout</Button>
      </form>
      <BookList title="Borrowed Books" books={sampleBooks} />
    </>
  );
};
export default page;
