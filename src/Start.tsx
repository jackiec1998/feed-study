import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./components/ui/form";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { useContext } from "react";
import { Context } from "./App";

/**
 * Documentation: https://ui.shadcn.com/docs/components/form
 * */

const passcodes = ["cat"];

const formSchema = z
  .object({
    passcode: z.string(),
  })
  .refine(({ passcode }) => passcode.length !== 0, {
    message: "Passcode is required.",
    path: ["passcode"],
  });

export function Start() {
  const navigate = useNavigate();
  const { setPasscode } = useContext(Context);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      passcode: "",
    },
  });

  function onSubmit({ passcode }: z.infer<typeof formSchema>) {
    if (passcodes.includes(passcode)) {
      setPasscode(passcode);
      navigate("/feed");
    } else {
      form.control.setError("passcode", {
        type: "custom",
        message: "Invalid passcode.",
      });
    }
  }

  function render({ field }: { field: object }) {
    return (
      <FormItem>
        <FormLabel>Passcode</FormLabel>
        <FormControl>
          <Input {...field} />
        </FormControl>
        <FormDescription>Passcode given by research team.</FormDescription>
        <FormMessage />
      </FormItem>
    );
  }

  return (
    <div className="flex flex-row min-h-screen justify-center items-center">
      <div className="w-2/6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField control={form.control} name="passcode" render={render} />
            <Button type="submit" className="mt-2">
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
