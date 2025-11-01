import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
  projectId: { type: String, required: true },
  userId: { type: String },
  anonymousId: { type: String },
  sessionId: { type: String },
  eventName: { type: String, required: true },
  eventType: { type: String },

  // Properties: event-specific custom data
  properties: {
    type: Object, // or you can use Map<String, String>
    default: {},
  },

  // Metadata: environment or system-level data
  metadata: {
    url: { type: String },
    referrer: { type: String },
    userAgent: { type: String },
    deviceType: { type: String },
    os: { type: String },
    browser: { type: String },
    screenResolution: { type: String },
    ip: { type: String },
    sdkVersion: { type: String },
    source: { type: String }
  },

  timestamp: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
  processed: { type: Boolean, default: false },
});

export default mongoose.model("Event", EventSchema);
