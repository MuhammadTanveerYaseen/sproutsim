import assert from "node:assert";
import { testMongoConnection, getDb, getMongoClient } from "../app/lib/mongodb.ts";

export async function testMongoSuite(): Promise<{ name: string; passed: boolean; message: string }[]> {
  const results: { name: string; passed: boolean; message: string }[] = [];

  // Test 1: Diagnostic Ping Test
  try {
    const conn = await testMongoConnection();
    assert.strictEqual(conn.success, true, `Mongo connection ping failed: ${conn.error || conn.message}`);
    assert.ok(conn.latencyMs < 5000, `Latency too high: ${conn.latencyMs}ms`);
    results.push({
      name: "MongoDB Atlas Ping & Latency",
      passed: true,
      message: `Connected to ${conn.database} in ${conn.latencyMs}ms (Collections: ${conn.collections?.join(", ")})`,
    });
  } catch (err: any) {
    results.push({ name: "MongoDB Atlas Ping & Latency", passed: false, message: err.message });
  }

  // Test 2: Collections Existence
  try {
    const db = await getDb();
    const collections = await db.listCollections().toArray();
    const collNames = collections.map((c) => c.name);

    assert.ok(collNames.includes("esims") || collNames.includes("orders"), "Expected collections to exist");
    results.push({
      name: "MongoDB Collections Verification",
      passed: true,
      message: `Verified collections: ${collNames.join(", ")}`,
    });
  } catch (err: any) {
    results.push({ name: "MongoDB Collections Verification", passed: false, message: err.message });
  }

  // Test 3: Write, Read, and Clean Test Document in Audit Logs
  try {
    const db = await getDb();
    const testDoc = {
      testId: `TEST-${Date.now()}`,
      action: "AUTOMATED_HEALTH_CHECK",
      timestamp: new Date(),
      status: "SUCCESS",
    };

    const insertRes = await db.collection("audit_logs").insertOne(testDoc);
    assert.ok(insertRes.insertedId, "Document should be inserted with an ObjectId");

    const found = await db.collection("audit_logs").findOne({ testId: testDoc.testId });
    assert.strictEqual(found?.action, "AUTOMATED_HEALTH_CHECK", "Found document should match inserted data");

    // Clean up
    await db.collection("audit_logs").deleteOne({ testId: testDoc.testId });
    results.push({
      name: "MongoDB CRUD Operations (Write, Read, Clean)",
      passed: true,
      message: `Successfully wrote test document, verified read, and cleaned up record (${testDoc.testId})`,
    });
  } catch (err: any) {
    results.push({ name: "MongoDB CRUD Operations", passed: false, message: err.message });
  }

  return results;
}
