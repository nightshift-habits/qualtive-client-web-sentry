import { qualtiveIntegration } from "./index";
import type { Event, Client } from "@sentry/core";

describe("qualtiveIntegration", () => {
  it('should return an integration with name "Qualtive"', () => {
    const integration = qualtiveIntegration();
    expect(integration.name).toBe("Qualtive");
  });

  it("should process events and call registerSentryEvent", () => {
    const integration = qualtiveIntegration();
    const event: Event = { event_id: "test_event_id" };

    // Mock registerSentryEvent
    const registerSentryEventSpy = jest.spyOn(
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      require("./registerEvent"),
      "registerSentryEvent",
    );

    integration.processEvent!(event, {}, {} as Client);

    expect(registerSentryEventSpy).toHaveBeenCalledWith(event);
  });
});
