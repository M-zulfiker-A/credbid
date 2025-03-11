"use client";
import { Button } from "@/components/ui/button";
import {
  DialogHeader,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { client } from "@/lib/rpc";
import { LoaderPinwheel } from "lucide-react";
import { useState } from "react";
import Markdown from "react-markdown";

const Page = () => {
  const [summary, setSummary] = useState<string>("");
  const [dialogTrigger, setDialogTrigger] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const productLink = formData.get("productLink") as string;
    const res = await client.api["ai-summary"].$post({
      json: { url: productLink },
    });

    if (res.status === 500) {
      const { error }: { error: string } = await res.json();
      console.error(error);
      setLoading(false);
      setDialogTrigger(false);

      return;
    }

    const jsonRes = await res.text();
    setSummary(jsonRes);
    setLoading(false);
    setDialogTrigger(false);
  };
  return (
    <>
      <Dialog open={dialogTrigger} onOpenChange={setDialogTrigger}>
        <DialogTrigger>Post My Product</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Post the Link to you product here</DialogTitle>
            <div>
              <form onSubmit={handleSubmit}>
                <Input type="text" name="productLink" />
                {loading ? (
                  <LoaderPinwheel className="animate-spin" />
                ) : (
                  <Button type="submit">Post</Button>
                )}
              </form>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      {summary && <Markdown>{summary}</Markdown>}
    </>
  );
};

export default Page;
