import { testGloEsimSuite } from "./gloesim.test.ts";
import { testMongoSuite } from "./mongodb.test.ts";
import { testMailSuite } from "./mail.test.ts";
import { testGraphQLSuite } from "./graphql.test.ts";

async function runAll() {
  console.log("\n========================================================");
  console.log("       SPROUTSIM SYSTEM INTEGRATION TEST SUITE          ");
  console.log("========================================================");
  console.log(`Started at: ${new Date().toISOString()}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`GloEsim URL: ${process.env.GLOESIM_API_URL || "sandbox"}\n`);

  const suites = [
    { title: "1. GloEsim Enterprise B2B API", runner: testGloEsimSuite },
    { title: "2. MongoDB Atlas Database", runner: testMongoSuite },
    { title: "3. Hostinger SMTP Email Delivery", runner: testMailSuite },
    { title: "4. GraphQL Yoga API & Resolvers", runner: testGraphQLSuite },
  ];

  let totalTests = 0;
  let totalPassed = 0;
  let totalFailed = 0;

  for (const suite of suites) {
    console.log(`\n--- ${suite.title} ---`);
    const startTime = Date.now();
    try {
      const results = await suite.runner();
      const duration = Date.now() - startTime;

      for (const res of results) {
        totalTests++;
        if (res.passed) {
          totalPassed++;
          console.log(`  \x1b[32m✔ PASS\x1b[0m: ${res.name}`);
          console.log(`         \x1b[90m↳ ${res.message}\x1b[0m`);
        } else {
          totalFailed++;
          console.log(`  \x1b[31m✖ FAIL\x1b[0m: ${res.name}`);
          console.log(`         \x1b[31m↳ Error: ${res.message}\x1b[0m`);
        }
      }
      console.log(`\x1b[90m  Suite completed in ${duration}ms\x1b[0m`);
    } catch (err: any) {
      console.error(`\x1b[31m  Fatal error in suite "${suite.title}": ${err.message}\x1b[0m`);
    }
  }

  console.log("\n========================================================");
  console.log("                   TEST SUMMARY                         ");
  console.log("========================================================");
  console.log(`Total Tests Run:  ${totalTests}`);
  console.log(`Total Passed:     \x1b[32m${totalPassed}\x1b[0m`);
  console.log(`Total Failed:     ${totalFailed > 0 ? `\x1b[31m${totalFailed}\x1b[0m` : `\x1b[32m0\x1b[0m`}`);
  console.log("========================================================");

  if (totalFailed > 0) {
    console.log("\x1b[31mSome tests failed. Please review the errors above.\x1b[0m\n");
    process.exit(1);
  } else {
    console.log("\x1b[32mALL SYSTEMS OPERATIONAL & FULLY TESTED!\x1b[0m\n");
    process.exit(0);
  }
}

runAll();
