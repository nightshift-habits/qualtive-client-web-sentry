import type { Event, Integration } from "@sentry/core";
import { registerSentryEvent } from "./registerEvent";

export function qualtiveIntegration(): Integration {
  return {
    name: "Qualtive",
    processEvent(event: Event) {
      registerSentryEvent(event);
      return event;
    },
  };
}
