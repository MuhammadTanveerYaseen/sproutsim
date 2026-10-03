import assert from "node:assert";
import { POST } from "../app/api/graphql/route.ts";

export async function testGraphQLSuite(): Promise<{ name: string; passed: boolean; message: string }[]> {
  const results: { name: string; passed: boolean; message: string }[] = [];

  // Helper to execute GraphQL POST
  async function executeGraphQL(query: string, variables: any = {}) {
    const req = new Request("http://localhost:3000/api/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ query, variables }),
    });

    const res = await POST(req);
    return await res.json();
  }

  // Test 1: Query System Health
  try {
    const healthQuery = `
      query GetHealth {
        health {
          timestamp
          mongodb {
            connected
            database
            latencyMs
          }
          smtp {
            connected
            host
            sender
          }
          gloesim {
            status
            apiUrl
            partnerId
          }
        }
      }
    `;

    const res = await executeGraphQL(healthQuery);
    assert.ok(!res.errors, `GraphQL errors: ${JSON.stringify(res.errors)}`);
    assert.ok(res.data?.health, "health object should be present");
    assert.strictEqual(res.data.health.mongodb.connected, true, "MongoDB should report connected");
    assert.strictEqual(res.data.health.smtp.connected, true, "SMTP should report connected");

    results.push({
      name: "GraphQL Query: health (Tri-Service Status)",
      passed: true,
      message: `Verified: Mongo (${res.data.health.mongodb.database}, ${res.data.health.mongodb.latencyMs}ms), SMTP (${res.data.health.smtp.host}), GloEsim (${res.data.health.gloesim.status})`,
    });
  } catch (err: any) {
    results.push({ name: "GraphQL Query: health", passed: false, message: err.message });
  }

  // Test 2: Query Pakistan Packages
  try {
    const packagesQuery = `
      query GetPackages {
        packages {
          id
          code
          name
          dataFormatted
          retailPricePKR
          wholesalePriceUSD
          operator
        }
      }
    `;

    const res = await executeGraphQL(packagesQuery);
    assert.ok(!res.errors, `GraphQL errors: ${JSON.stringify(res.errors)}`);
    assert.ok(Array.isArray(res.data?.packages), "packages should be an array");
    assert.ok(res.data.packages.length >= 4, "Should return at least 4 packages");

    results.push({
      name: "GraphQL Query: packages (Pakistan Catalogue)",
      passed: true,
      message: `Returned ${res.data.packages.length} active packages with pricing and carrier operators`,
    });
  } catch (err: any) {
    results.push({ name: "GraphQL Query: packages", passed: false, message: err.message });
  }

  // Test 3: Mutation GloEsim Ping via GraphQL
  try {
    const pingMutation = `
      mutation PingGloEsim {
        pingGloEsim {
          success
          latencyMs
          message
        }
      }
    `;

    const res = await executeGraphQL(pingMutation);
    assert.ok(!res.errors, `GraphQL errors: ${JSON.stringify(res.errors)}`);
    assert.strictEqual(res.data?.pingGloEsim?.success, true, "GloEsim ping should succeed");

    results.push({
      name: "GraphQL Query: pingGloEsim (Real-Time Ping)",
      passed: true,
      message: `Gateway responded in ${res.data.pingGloEsim.latencyMs}ms: ${res.data.pingGloEsim.message}`,
    });
  } catch (err: any) {
    results.push({ name: "GraphQL Query: pingGloEsim", passed: false, message: err.message });
  }

  return results;
}
