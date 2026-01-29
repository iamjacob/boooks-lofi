// core/telemetry/deviceTelemetry.ts
import { ID } from '@/core/ids/id';

export interface DeviceTelemetry {
  deviceId: ID;

  /** Capability hints (best-effort) */
  cpuCores?: number;
  memoryGB?: number;
  gpu?: string;

  /** Environment */
  userAgent?: string;
  language?: string;
  timezone?: string;

  /** When snapshot was taken */
  capturedAt: number;
}

// export function collectTelemetry(deviceId: ID): DeviceTelemetry {
//   return {
//     deviceId,
//     cpuCores: navigator.hardwareConcurrency,
//     memoryGB: (navigator as any).deviceMemory,
//     userAgent: navigator.userAgent,
//     language: navigator.language,
//     timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
//     capturedAt: Date.now(),
//   };
// }
