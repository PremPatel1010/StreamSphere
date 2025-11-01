// src/utils/validateEvent.js
import Joi from "joi";

// 1️⃣ Define the structure (schema) of a valid event
export const eventSchema = Joi.object({
  // Core identifiers
  projectId: Joi.string().required().messages({
    "any.required": "projectId is required",
    "string.base": "projectId must be a string",
  }),

  userId: Joi.string().optional().allow(null, ""),
  anonymousId: Joi.string().optional().allow(null, ""),
  sessionId: Joi.string().optional().allow(null, ""),

  // Event details
  eventName: Joi.string().required().messages({
    "any.required": "eventName is required",
    "string.base": "eventName must be a string",
  }),
  eventType: Joi.string()
    .valid("page", "track", "identify", "custom")
    .default("track"),

  // Dynamic custom properties (user actions, attributes)
  properties: Joi.object().unknown(true).default({}),

  // Metadata object — environmental info (browser, os, etc.)
  metadata: Joi.object({
    url: Joi.string().uri().optional(),
    referrer: Joi.string().optional().allow(null, ""),
    userAgent: Joi.string().optional(),
    deviceType: Joi.string().optional(),
    os: Joi.string().optional(),
    browser: Joi.string().optional(),
    screenResolution: Joi.string().optional(),
    ip: Joi.string().optional(),
    sdkVersion: Joi.string().optional(),
    source: Joi.string().optional().default("web"),
  }).default({}),

  // Time-related
 // Time-related
timestamp: Joi.date().optional().default(() => new Date()),

});

// 2️⃣ Function to validate incoming event
export function validateEvent(eventData) {
  const { error, value } = eventSchema.validate(eventData, { abortEarly: false });

  if (error) {
    return {
      valid: false,
      errors: error.details.map((err) => err.message),
    };
  }

  return { valid: true, data: value };
}
