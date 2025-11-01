import EventSchema from "../models/Event.js";
import { validateEvent } from "../utils/validateEvent.js"
import { sendEventToKafka } from "../kafka/producer.js";

export const trackEvent = async (req,res) => {
  try {
    
    const { valid, errors, data} = validateEvent(req.body);
    if(!valid) return res.status(400).json({success: false, errors});

    const event = new EventSchema(data);
    await event.save();

    await sendEventToKafka("raw-events", data);

    
    return res.status(201).json({
      success: true,
      message: "Event captured successfully",
    });

  } catch (error) {
    console.error("❌ Error in trackEvent:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}