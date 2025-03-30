import { z } from 'zod';
export declare const TelemetryEventSchema: z.ZodObject<{
    event: z.ZodEnum<["assertion_used", "command_used", "eval_ran", "feature_used", "funnel", "webui_api", "webui_page_view"]>;
    packageVersion: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    properties: z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodArray<z.ZodString, "many">]>>;
}, "strip", z.ZodTypeAny, {
    event: "assertion_used" | "command_used" | "eval_ran" | "feature_used" | "funnel" | "webui_api" | "webui_page_view";
    packageVersion: string;
    properties: Record<string, string | number | boolean | string[]>;
}, {
    event: "assertion_used" | "command_used" | "eval_ran" | "feature_used" | "funnel" | "webui_api" | "webui_page_view";
    properties: Record<string, string | number | boolean | string[]>;
    packageVersion?: string | undefined;
}>;
export type TelemetryEvent = z.infer<typeof TelemetryEventSchema>;
export type TelemetryEventTypes = TelemetryEvent['event'];
export type EventProperties = TelemetryEvent['properties'];
export declare class Telemetry {
    private events;
    private telemetryDisabledRecorded;
    get disabled(): boolean;
    private recordTelemetryDisabled;
    record(eventName: TelemetryEventTypes, properties: EventProperties): void;
    private recordedEvents;
    /**
     * Record an event once, unique by event name and properties.
     *
     * @param eventName - The name of the event to record.
     * @param properties - The properties of the event to record.
     */
    recordOnce(eventName: TelemetryEventTypes, properties: EventProperties): void;
    recordAndSend(eventName: TelemetryEventTypes, properties: EventProperties): Promise<void>;
    recordAndSendOnce(eventName: TelemetryEventTypes, properties: EventProperties): Promise<void>;
    send(): Promise<void>;
    /**
     * This is a separate endpoint to save consent used only for redteam data synthesis for "harmful" plugins.
     */
    saveConsent(email: string, metadata?: Record<string, string>): Promise<void>;
}
declare const telemetry: Telemetry;
export default telemetry;
//# sourceMappingURL=telemetry.d.ts.map