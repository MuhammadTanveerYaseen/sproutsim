import { MongoClient, Db, Collection } from "mongodb";

/**
 * MongoDB Atlas Connection Manager for SproutSIM
 * Provides cached client across hot-reloads and connection helpers
 */

const uri =
  process.env.MONGODB_URI ||
  "mongodb+srv://muhammadtanveer0135_db_user:mBNaR94tbS45ummQ@cluster0.s0u095x.mongodb.net/sproutsim?retryWrites=true&w=majority&appName=Cluster0";

const defaultDbName = process.env.MONGODB_DB_NAME || "sproutsim";

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (!process.env.MONGODB_URI) {
  console.warn("[MongoDB] MONGODB_URI not found in env, using configured fallback");
}

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
    });
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, {
    maxPoolSize: 20,
    serverSelectionTimeoutMS: 5000,
  });
  clientPromise = client.connect();
}

/**
 * Get connected MongoClient instance
 */
export async function getMongoClient(): Promise<MongoClient> {
  return await clientPromise;
}

/**
 * Get database instance
 */
export async function getDb(dbName: string = defaultDbName): Promise<Db> {
  const connectedClient = await getMongoClient();
  return connectedClient.db(dbName);
}

/**
 * Collection Helpers
 */
export async function getOrdersCollection(): Promise<Collection> {
  const db = await getDb();
  return db.collection("orders");
}

export async function getEsimsCollection(): Promise<Collection> {
  const db = await getDb();
  return db.collection("esims");
}

export async function getAuditLogsCollection(): Promise<Collection> {
  const db = await getDb();
  return db.collection("audit_logs");
}

export async function getEmailLogsCollection(): Promise<Collection> {
  const db = await getDb();
  return db.collection("email_logs");
}

/**
 * Diagnostic ping test for MongoDB Atlas
 */
export async function testMongoConnection(): Promise<{
  success: boolean;
  latencyMs: number;
  database: string;
  message: string;
  collections?: string[];
  error?: string;
}> {
  const startTime = Date.now();
  try {
    const db = await getDb();
    // Ping the admin database
    await db.command({ ping: 1 });
    const latencyMs = Date.now() - startTime;
    const collectionsList = await db.listCollections().toArray();
    const collectionNames = collectionsList.map((c) => c.name);

    return {
      success: true,
      latencyMs,
      database: db.databaseName,
      message: "MongoDB Atlas Cluster0 connected successfully!",
      collections: collectionNames,
    };
  } catch (err: any) {
    return {
      success: false,
      latencyMs: Date.now() - startTime,
      database: defaultDbName,
      message: "Failed to connect to MongoDB Atlas",
      error: err?.message || String(err),
    };
  }
}

/**
 * Seed initial records into MongoDB Atlas if collections are currently empty
 */
export async function seedInitialDatabaseIfEmpty() {
  try {
    const ordersCol = await getOrdersCollection();
    const esimsCol = await getEsimsCollection();
    const auditCol = await getAuditLogsCollection();
    const emailCol = await getEmailLogsCollection();

    const ordersCount = await ordersCol.countDocuments();
    if (ordersCount === 0) {
      console.log("[MongoDB] Seeding initial customer orders...");
      await ordersCol.insertMany([
        {
          orderNumber: "ORD-9482-PK",
          customerName: "Danyal Sheikh",
          customerEmail: "danyal.sheikh@example.com",
          customerPhone: "+92 300 8472910",
          planName: "10 GB Monthly (Hot)",
          packageCode: "GLO_PK_10GB_30D",
          dataMB: 10240,
          dataFormatted: "10 GB",
          amountPKR: 2225,
          amountUSD: 7.99,
          wholesaleCostUSD: 2.10,
          grossMarginUSD: 5.89,
          grossMarginPct: 73.7,
          status: "ACTIVE",
          paymentMethod: "Stripe",
          iccid: "8988228044928812901",
          lpaCode: "LPA:1$smdp.gloesim.com$GLO-PK-889123-ACTIVATION",
          createdAt: "2026-09-30 14:22",
          carrier: "Jazz 4G LTE / Zong 4G",
          emailDispatched: true,
        },
        {
          orderNumber: "ORD-9481-PK",
          customerName: "Ayesha Malik",
          customerEmail: "ayesha.m@travelpak.net",
          customerPhone: "+92 321 4459102",
          planName: "20 GB Pro Streamer",
          packageCode: "GLO_PK_20GB_30D",
          dataMB: 20480,
          dataFormatted: "20 GB",
          amountPKR: 3895,
          amountUSD: 13.99,
          wholesaleCostUSD: 3.80,
          grossMarginUSD: 10.19,
          grossMarginPct: 72.8,
          status: "ACTIVE",
          paymentMethod: "Stripe",
          iccid: "8988228033819920192",
          lpaCode: "LPA:1$smdp.gloesim.com$GLO-PK-774910-ACTIVATION",
          createdAt: "2026-09-30 12:05",
          carrier: "Jazz 4G LTE / Zong 4G",
          emailDispatched: true,
        },
        {
          orderNumber: "ORD-9480-PK",
          customerName: "Bilal Farooq",
          customerEmail: "bilal.farooq@outlook.com",
          customerPhone: "+92 333 9981240",
          planName: "50 GB Power User",
          packageCode: "GLO_PK_50GB_30D",
          dataMB: 51200,
          dataFormatted: "50 GB",
          amountPKR: 6995,
          amountUSD: 24.99,
          wholesaleCostUSD: 7.20,
          grossMarginUSD: 17.79,
          grossMarginPct: 71.2,
          status: "ACTIVE",
          paymentMethod: "JazzCash",
          iccid: "8988228011293847291",
          lpaCode: "LPA:1$smdp.gloesim.com$GLO-PK-448190-ACTIVATION",
          createdAt: "2026-09-30 09:41",
          carrier: "Jazz 4G LTE / Zong 4G / Telenor",
          emailDispatched: true,
        },
        {
          orderNumber: "ORD-9479-PK",
          customerName: "Hamza Tariq",
          customerEmail: "hamza.t@lahore.dev",
          customerPhone: "+92 345 1102948",
          planName: "3 GB Weekly Pass",
          packageCode: "GLO_PK_3GB_7D",
          dataMB: 3072,
          dataFormatted: "3 GB",
          amountPKR: 1195,
          amountUSD: 4.29,
          wholesaleCostUSD: 1.15,
          grossMarginUSD: 3.14,
          grossMarginPct: 73.2,
          status: "ACTIVE",
          paymentMethod: "EasyPaisa",
          iccid: "8988228099238471203",
          lpaCode: "LPA:1$smdp.gloesim.com$GLO-PK-110294-ACTIVATION",
          createdAt: "2026-09-29 18:30",
          carrier: "Jazz 4G LTE",
          emailDispatched: true,
        },
        {
          orderNumber: "ORD-9478-PK",
          customerName: "Zainab Raza",
          customerEmail: "zainab.raza@islamabad.org",
          customerPhone: "+92 301 5592817",
          planName: "1 GB Starter Trial",
          packageCode: "GLO_PK_1GB_7D",
          dataMB: 1024,
          dataFormatted: "1 GB",
          amountPKR: 525,
          amountUSD: 1.89,
          wholesaleCostUSD: 0.90,
          grossMarginUSD: 0.99,
          grossMarginPct: 52.4,
          status: "COMPLETED",
          paymentMethod: "Stripe",
          iccid: "8988228077651239012",
          lpaCode: "LPA:1$smdp.gloesim.com$GLO-PK-559102-ACTIVATION",
          createdAt: "2026-09-29 11:15",
          carrier: "Jazz 4G LTE",
          emailDispatched: true,
        },
      ]);
    }

    const esimsCount = await esimsCol.countDocuments();
    if (esimsCount === 0) {
      console.log("[MongoDB] Seeding initial eSIM profiles...");
      await esimsCol.insertMany([
        {
          iccid: "8988228044928812901",
          customerEmail: "danyal.sheikh@example.com",
          customerName: "Danyal Sheikh",
          deviceModel: "Apple iPhone 15 Pro",
          planName: "10 GB Monthly (Hot)",
          packageCode: "GLO_PK_10GB_30D",
          totalMB: 10240,
          usedMB: 3686,
          remainingMB: 6554,
          status: "ACTIVE",
          operator: "Jazz 4G LTE",
          mccMnc: "410-01",
          validUntil: "2026-10-30",
          lpaCode: "LPA:1$smdp.gloesim.com$GLO-PK-889123-ACTIVATION",
          smdpAddress: "smdp.gloesim.com",
          matchingId: "GLO-PK-889123-ACTIVATION",
          sessionsCount: 42,
          lastActive: "12 mins ago",
        },
        {
          iccid: "8988228033819920192",
          customerEmail: "ayesha.m@travelpak.net",
          customerName: "Ayesha Malik",
          deviceModel: "Samsung Galaxy S24 Ultra",
          planName: "20 GB Pro Streamer",
          packageCode: "GLO_PK_20GB_30D",
          totalMB: 20480,
          usedMB: 5120,
          remainingMB: 15360,
          status: "ACTIVE",
          operator: "Zong 4G LTE",
          mccMnc: "410-04",
          validUntil: "2026-10-30",
          lpaCode: "LPA:1$smdp.gloesim.com$GLO-PK-774910-ACTIVATION",
          smdpAddress: "smdp.gloesim.com",
          matchingId: "GLO-PK-774910-ACTIVATION",
          sessionsCount: 78,
          lastActive: "3 mins ago",
        },
        {
          iccid: "8988228011293847291",
          customerEmail: "bilal.farooq@outlook.com",
          customerName: "Bilal Farooq",
          deviceModel: "Google Pixel 8 Pro",
          planName: "50 GB Power User",
          packageCode: "GLO_PK_50GB_30D",
          totalMB: 51200,
          usedMB: 12288,
          remainingMB: 38912,
          status: "ACTIVE",
          operator: "Jazz 4G LTE",
          mccMnc: "410-01",
          validUntil: "2026-10-30",
          lpaCode: "LPA:1$smdp.gloesim.com$GLO-PK-448190-ACTIVATION",
          smdpAddress: "smdp.gloesim.com",
          matchingId: "GLO-PK-448190-ACTIVATION",
          sessionsCount: 112,
          lastActive: "Just now",
        },
        {
          iccid: "8988228099238471203",
          customerEmail: "hamza.t@lahore.dev",
          customerName: "Hamza Tariq",
          deviceModel: "Apple iPhone 14 Pro",
          planName: "3 GB Weekly Pass",
          packageCode: "GLO_PK_3GB_7D",
          totalMB: 3072,
          usedMB: 2100,
          remainingMB: 972,
          status: "ACTIVE",
          operator: "Jazz 4G LTE",
          mccMnc: "410-01",
          validUntil: "2026-10-07",
          lpaCode: "LPA:1$smdp.gloesim.com$GLO-PK-110294-ACTIVATION",
          smdpAddress: "smdp.gloesim.com",
          matchingId: "GLO-PK-110294-ACTIVATION",
          sessionsCount: 19,
          lastActive: "45 mins ago",
        },
      ]);
    }

    const auditCount = await auditCol.countDocuments();
    if (auditCount === 0) {
      await auditCol.insertMany([
        {
          timestamp: new Date().toISOString().replace("T", " ").substring(0, 19),
          actor: "muhammadtanveer0135_db_user",
          action: "MONGODB_CLUSTER_INITIALIZED",
          target: "Cluster0 (sproutsim)",
          ip: "127.0.0.1",
          status: "SUCCESS",
        },
      ]);
    }
  } catch (err) {
    console.error("[MongoDB Seed Warning]", err);
  }
}
