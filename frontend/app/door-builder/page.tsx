import { redirect } from "next/navigation";

// The builder now lives inside the Request a Quote hub.
export default function DoorBuilderRedirect() {
  redirect("/request-quote?tab=builder");
}
