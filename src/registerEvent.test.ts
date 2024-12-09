import type { Event } from "@sentry/core";
import { registerSentryEvent } from "./registerEvent";

describe("registerSentryEvent", () => {
  afterEach(() => {
    // Clear the cookies after each test
    document.cookie =
      "qualtiveREFs=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
  });

  it("should warn if event_id is missing", () => {
    console.warn = jest.fn();
    const event: Event = {};
    registerSentryEvent(event);

    expect(console.warn).toHaveBeenCalledWith("Event ID is missing", event);
  });

  it("should add new event data to cookie when no existing references", () => {
    const event: Event = { event_id: "new_event_id" };
    registerSentryEvent(event);

    const cookieMatch = document.cookie.match(/qualtiveREFs=([^;]+)/);
    expect(cookieMatch).not.toBeNull();

    const references = JSON.parse(decodeURIComponent(cookieMatch![1]));
    expect(references).toEqual([{ type: "sentryEvent", id: "new_event_id" }]);
  });

  it("should append event data to existing references in cookie", () => {
    const existingReferences = [
      { type: "sentryEvent", id: "existing_event_id" },
    ];
    document.cookie = `qualtiveREFs=${encodeURIComponent(JSON.stringify(existingReferences))};path=/`;

    const event: Event = { event_id: "new_event_id" };
    registerSentryEvent(event);

    const cookieMatch = document.cookie.match(/qualtiveREFs=([^;]+)/);
    const references = JSON.parse(decodeURIComponent(cookieMatch![1]));

    expect(references).toEqual([
      { type: "sentryEvent", id: "existing_event_id" },
      { type: "sentryEvent", id: "new_event_id" },
    ]);
  });

  it("should handle invalid JSON in existing cookie gracefully", () => {
    document.cookie = "qualtiveREFs=invalid_json;path=/";
    console.error = jest.fn();

    const event: Event = { event_id: "test_event_id" };
    registerSentryEvent(event);

    expect(console.error).toHaveBeenCalledWith(
      "Error parsing qualtive references cookie",
      expect.any(SyntaxError),
    );

    const cookieMatch = document.cookie.match(/qualtiveREFs=([^;]+)/);
    const references = JSON.parse(decodeURIComponent(cookieMatch![1]));

    expect(references).toEqual([{ type: "sentryEvent", id: "test_event_id" }]);
  });
});
