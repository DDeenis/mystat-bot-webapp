import { PostHog } from "posthog-node";
import { getBaseUrl } from "./routes";

export default function PostHogClient() {
  return new PostHog(
    process.env.NEXT_PUBLIC_POSTHOG_KEY ??
      "phc_yB9RYtfoSuBRrzBPmw52jdQSqLaD6YAIUXjsXNVUY79",
    { host: `${getBaseUrl()}/ingest`, flushAt: 1, flushInterval: 0 }
  );
}