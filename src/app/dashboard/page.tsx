"use client";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

type Props = {};

const page = (props: Props) => {
  const { data: session } = useSession();

  if (!session) {
    redirect("/auth?flow=signin");
  }
  return (
    <>
      <h1> Hi {session?.user?.name}</h1>
      <Button
        onClick={() => signOut()}
        className="w-full bg-white text-dark font-semibold py-2 px-4 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg flex items-center justify-center"
      >
        SignOut
      </Button>
    </>
  );
};

export default page;
