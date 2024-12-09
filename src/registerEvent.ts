import type { Event } from "@sentry/core";

export function registerSentryEvent(event: Event) {
  const { event_id } = event;
  if (!event_id) {
    console.warn("Event ID is missing", event);
    return;
  }

  // Get existing references from cookie if any
  let references: { type: string; id: string }[] = [];
  try {
    const existingCookie = document.cookie.match(/qualtiveREFs=([^;]+)/)?.[1];
    references = existingCookie
      ? JSON.parse(decodeURIComponent(existingCookie))
      : [];
  } catch (error) {
    console.error("Error parsing qualtive references cookie", error);
  }

  // Add new event data
  references.push({
    type: "sentryEvent",
    id: event_id,
  });

  // Save updated references back to cookie with proper attributes
  const date = new Date();
  date.setTime(date.getTime() + 7 * 24 * 60 * 60 * 1000); // 7 days expiry
  const cookieValue = encodeURIComponent(JSON.stringify(references));
  document.cookie = `qualtiveREFs=${cookieValue};expires=${date.toUTCString()};path=/`;
}
