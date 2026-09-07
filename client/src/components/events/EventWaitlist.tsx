import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Mail, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const waitlistSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
});

type WaitlistValues = z.infer<typeof waitlistSchema>;

type EventWaitlistProps = {
  eventName: string;
  source: string;
  blurb: string;
  privacyNote: string;
};

export function EventWaitlist({
  eventName,
  source,
  blurb,
  privacyNote,
}: EventWaitlistProps) {
  const { toast } = useToast();
  const form = useForm<WaitlistValues>({
    resolver: zodResolver(waitlistSchema),
    defaultValues: { email: "" },
  });

  const mutation = useMutation({
    mutationFn: async (values: WaitlistValues) => {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Waitlist Signup",
          email: values.email,
          message: `Waitlist signup for ${eventName}`,
          source,
        }),
      });
      if (!response.ok) throw new Error("Failed to submit form");
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "You're on the list!",
        description: `We'll notify you about the next ${eventName} event.`,
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });

  return (
    <section
      id="get-notified"
      className="py-24 bg-primary text-primary-foreground relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-primary opacity-90 z-0" />
      <div className="container px-4 md:px-6 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white/10 border border-white/20 mx-auto mb-6">
              <Mail className="w-7 h-7 text-white" />
            </div>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-4">
              Stay in the Loop
            </h2>
            <p className="text-white/80 text-lg mb-10 max-w-md mx-auto">{blurb}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white text-foreground rounded-2xl p-8 shadow-2xl max-w-md mx-auto"
          >
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit((values) => mutation.mutate(values))}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Your email address"
                          {...field}
                          className="bg-muted/30 border-border h-12"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full h-12 text-base font-semibold"
                  disabled={mutation.isPending}
                >
                  {mutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Join the Waitlist"
                  )}
                </Button>
              </form>
            </Form>
            <p className="text-xs text-muted-foreground mt-4">{privacyNote}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
