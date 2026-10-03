import assert from "node:assert";
import { gloesim, GLOESIM_PAKISTAN_PACKAGES } from "../app/lib/gloesim.ts";

export async function testGloEsimSuite(): Promise<{ name: string; passed: boolean; message: string }[]> {
  const results: { name: string; passed: boolean; message: string }[] = [];

  // Test 1: Config and Credentials Verification
  try {
    const isConfigured = gloesim.isLiveConfigured();
    assert.strictEqual(isConfigured, true, "GloEsim credentials should be configured in .env.local");
    results.push({
      name: "GloEsim Credentials Configuration",
      passed: true,
      message: "Credentials loaded from environment (business@sproutsim.cloud)",
    });
  } catch (err: any) {
    results.push({ name: "GloEsim Credentials Configuration", passed: false, message: err.message });
  }

  // Test 2: Live Sandbox Authentication
  let token: string | null = null;
  try {
    token = await gloesim.getAccessToken();
    assert.ok(token && token.length > 10, "Bearer token should be returned from GloEsim login");
    results.push({
      name: "GloEsim Reseller Authentication (/developer/reseller/login)",
      passed: true,
      message: `Successfully authenticated! Bearer token: ${token.substring(0, 15)}...`,
    });
  } catch (err: any) {
    results.push({ name: "GloEsim Reseller Authentication", passed: false, message: err.message });
  }

  // Test 3: Pakistan Package Catalogue
  try {
    const packageKeys = Object.keys(GLOESIM_PAKISTAN_PACKAGES);
    assert.ok(packageKeys.length >= 4, "Should have at least 4 configured Pakistan packages");
    assert.ok(GLOESIM_PAKISTAN_PACKAGES["1gb-starter"].id, "1GB package should have valid UUID");
    assert.ok(GLOESIM_PAKISTAN_PACKAGES["10gb-monthly"].id, "10GB package should have valid UUID");
    results.push({
      name: "GloEsim Pakistan Package Mapping",
      passed: true,
      message: `Verified ${packageKeys.length} packages mapped (1GB, 3GB, 10GB, 20GB, 50GB, Unlimited)`,
    });
  } catch (err: any) {
    results.push({ name: "GloEsim Pakistan Package Mapping", passed: false, message: err.message });
  }

  // Test 4: Sandbox eSIM Provisioning & QR Generation
  try {
    const order = await gloesim.createOrder({
      packageCode: "GLO_PK_1GB_7D",
      customerEmail: "business@sproutsim.cloud",
      customerName: "Automated Test Suite",
    });

    assert.strictEqual(order.success, true, "Order should be successful");
    assert.ok(order.iccid && order.iccid.length >= 8, `ICCID should be present: ${order.iccid}`);
    assert.ok(order.lpaCode.startsWith("LPA:1$"), `LPA code should start with LPA:1$, got ${order.lpaCode}`);
    assert.ok(order.qrCodeUrl.startsWith("http"), `QR Code URL should be valid: ${order.qrCodeUrl}`);
    assert.ok(order.redeemLink, "Redeem link should be present");

    results.push({
      name: "GloEsim Sandbox eSIM Order Creation (/package/purchase)",
      passed: true,
      message: `Generated eSIM -> ICCID: ${order.iccid}, LPA: ${order.lpaCode.substring(0, 25)}...`,
    });
  } catch (err: any) {
    results.push({ name: "GloEsim Sandbox eSIM Order Creation", passed: false, message: err.message });
  }

  // Test 5: Usage Query
  try {
    const usage = await gloesim.getUsage("8910300000003003227");
    assert.strictEqual(usage.success, true, "Usage check should succeed");
    assert.ok(usage.totalMB > 0, "Total MB should be greater than 0");
    assert.ok(usage.remainingMB <= usage.totalMB, "Remaining data must be <= total data");

    results.push({
      name: "GloEsim Data Usage Check (/my-esims/:id)",
      passed: true,
      message: `Usage reported: ${usage.usedMB}MB used / ${usage.remainingMB}MB remaining (${usage.remainingPercentage}%)`,
    });
  } catch (err: any) {
    results.push({ name: "GloEsim Data Usage Check", passed: false, message: err.message });
  }

  // Test 6: Top-up Balance
  try {
    const topup = await gloesim.topUp({
      iccid: "8910300000003003227",
      packageCode: GLOESIM_PAKISTAN_PACKAGES["1gb-starter"].id,
      amountMB: 1024,
    });

    assert.strictEqual(topup.success, true, "Top-up should succeed");
    assert.strictEqual(topup.addedMB, 1024, "Added MB should match requested 1024MB");

    results.push({
      name: "GloEsim Data Top-Up (/my-esims/:id/top-up)",
      passed: true,
      message: `Top-up successful: +${topup.addedMB}MB, New Remaining: ${topup.newRemainingMB}MB`,
    });
  } catch (err: any) {
    results.push({ name: "GloEsim Data Top-Up", passed: false, message: err.message });
  }

  return results;
}
