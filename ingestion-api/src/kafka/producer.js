// src/kafka/producer.js

import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "streamsphere-ingestion",
  brokers: ["localhost:9092"], 
});

const producer = kafka.producer();

export async function connectKafka() {
  try {
    await producer.connect();
    console.log("✅ Kafka Producer connected");
  } catch (err) {
    console.error("❌ Kafka connection failed:", err);
  }
}

export async function sendEventToKafka(topic, eventData) {
  try {
    await producer.send({
      topic,
      messages: [
        {
          value: JSON.stringify(eventData),
        },
      ],
    });
    console.log(`📦 Event sent to Kafka topic: ${topic}`);
  } catch (err) {
    console.error("❌ Failed to send event:", err);
  }
}
