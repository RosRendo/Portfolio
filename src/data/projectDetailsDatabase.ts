export interface DatabaseField {
  name: string;
  type: string;
  isPrimary?: boolean;
  isForeign?: boolean;
  isNullable?: boolean;
  notes?: string;
}

export interface DatabaseEntity {
  name: string;
  tableName: string;
  description: string;
  fields: DatabaseField[];
  indexes?: string[];
  relations?: { to: string; type: "1:1" | "1:N" | "N:M"; description: string }[];
}

export interface ProjectDatabase {
  engine: string;
  overview: string;
  tablesCount: number;
  entities: DatabaseEntity[];
  rawSchema?: string;
}

export interface ApiEndpoint {
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "WS";
  path: string;
  description: string;
  authRequired: boolean;
  requestBody?: string;
  responseSample: string;
  latency?: string;
}

export interface SecurityMatrixItem {
  feature: string;
  description: string;
}

export interface ProjectTechnicalSpec {
  database: ProjectDatabase;
  apiEndpoints: ApiEndpoint[];
  securityMatrix: SecurityMatrixItem[];
  tierDetails?: {
    client?: string;
    gateway?: string;
    services?: string;
    database?: string;
    cache?: string;
    external?: string;
  };
}

export const projectTechnicalSpecs: Record<string, ProjectTechnicalSpec> = {
  servicefinder: {
    database: {
      engine: "PostgreSQL 16 via Prisma ORM (Driver Adapters Enabled)",
      overview:
        "High-density multi-tenant relational schema modeling service companies, contractor scheduling, localized service requests, dispute arbitration, and immutable audit logs.",
      tablesCount: 14,
      entities: [
        {
          name: "User",
          tableName: "users",
          description: "Core authentication and multi-role identity profile (Customer, Contractor, Admin)",
          fields: [
            { name: "id", type: "BigInt", isPrimary: true, notes: "Auto-increment primary key" },
            { name: "fullName", type: "VarChar(100)", notes: "Full legal or business name" },
            { name: "email", type: "VarChar(150)", isNullable: true, notes: "Unique index" },
            { name: "phone", type: "VarChar(20)", isNullable: true, notes: "Unique index" },
            { name: "role", type: "UserRole", notes: "CUSTOMER | CONTRACTOR | ADMIN" },
            { name: "status", type: "UserStatus", notes: "active | suspended | pending" },
            { name: "workingStatus", type: "String", notes: "online | busy | offline" },
            { name: "latitude", type: "Decimal(10, 7)", isNullable: true, notes: "Geospatial coordinate" },
            { name: "longitude", type: "Decimal(10, 7)", isNullable: true, notes: "Geospatial coordinate" },
            { name: "mfaEnabled", type: "Boolean", notes: "Default false" },
          ],
          indexes: ["@@index([email])", "@@index([role])", "@@index([latitude, longitude])"],
          relations: [
            { to: "Company", type: "1:N", description: "Owns contractors or service businesses" },
            { to: "Booking", type: "1:N", description: "Customer reservations history" },
            { to: "Dispute", type: "1:N", description: "Filed arbitration cases" },
          ],
        },
        {
          name: "Company",
          tableName: "companies",
          description: "Registered trade business entity with verified credentials and rating metrics",
          fields: [
            { name: "id", type: "BigInt", isPrimary: true },
            { name: "ownerId", type: "BigInt", isForeign: true, notes: "FK -> User.id" },
            { name: "name", type: "VarChar(150)", notes: "Company business trade name" },
            { name: "slug", type: "VarChar(150)", notes: "Unique public URL slug" },
            { name: "category", type: "String", notes: "Plumbing, Electrical, HVAC, etc." },
            { name: "rating", type: "Decimal(3, 2)", notes: "Aggregated 5.0 score" },
            { name: "isVerified", type: "Boolean", notes: "Manual admin verification" },
          ],
          indexes: ["@@unique([slug])", "@@index([category])", "@@index([ownerId])"],
          relations: [
            { to: "Service", type: "1:N", description: "Offered catalog services" },
            { to: "Booking", type: "1:N", description: "Incoming customer bookings" },
            { to: "CompanyStaff", type: "1:N", description: "Technicians and dispatchers" },
          ],
        },
        {
          name: "Booking",
          tableName: "bookings",
          description: "Time-locked service appointment reservation with state machine transitions",
          fields: [
            { name: "id", type: "BigInt", isPrimary: true },
            { name: "bookingNumber", type: "VarChar(50)", notes: "Unique human-readable reference" },
            { name: "customerId", type: "BigInt", isForeign: true, notes: "FK -> User.id" },
            { name: "companyId", type: "BigInt", isForeign: true, notes: "FK -> Company.id" },
            { name: "serviceId", type: "BigInt", isForeign: true, notes: "FK -> Service.id" },
            { name: "scheduledAt", type: "DateTime", notes: "Target service timestamp" },
            { name: "durationMinutes", type: "Int", notes: "Allocated work window" },
            { name: "status", type: "BookingStatus", notes: "PENDING | CONFIRMED | IN_PROGRESS | COMPLETED | CANCELLED" },
            { name: "totalPrice", type: "Decimal(10, 2)", notes: "Quoted total in USD" },
            { name: "paymentStatus", type: "PaymentStatus", notes: "UNPAID | ESCROW_HELD | RELEASED" },
          ],
          indexes: ["@@index([scheduledAt])", "@@index([customerId, status])", "@@index([companyId, scheduledAt])"],
          relations: [
            { to: "Payment", type: "1:N", description: "Payment ledger records" },
            { to: "Dispute", type: "1:1", description: "Associated arbitration if contested" },
          ],
        },
        {
          name: "Payment",
          tableName: "payments",
          description: "Transactional financial ledger for booking fees, deposits, and payouts",
          fields: [
            { name: "id", type: "BigInt", isPrimary: true },
            { name: "bookingId", type: "BigInt", isForeign: true, notes: "FK -> Booking.id" },
            { name: "amount", type: "Decimal(10, 2)", notes: "Gross transaction amount" },
            { name: "currency", type: "VarChar(3)", notes: "USD / KHR" },
            { name: "provider", type: "String", notes: "STRIPE | ABA_PAYWAY | CASH" },
            { name: "transactionRef", type: "String", notes: "Gateway transaction ID" },
            { name: "status", type: "PaymentStatus", notes: "PENDING | SUCCESS | REFUNDED" },
          ],
          indexes: ["@@index([bookingId])", "@@index([transactionRef])"],
          relations: [
            { to: "Booking", type: "1:1", description: "Originating appointment" },
          ],
        },
        {
          name: "Dispute",
          tableName: "disputes",
          description: "Customer-contractor conflict resolution record with evidence upload audit",
          fields: [
            { name: "id", type: "BigInt", isPrimary: true },
            { name: "bookingId", type: "BigInt", isForeign: true, notes: "FK -> Booking.id" },
            { name: "customerId", type: "BigInt", isForeign: true, notes: "FK -> User.id" },
            { name: "reason", type: "String", notes: "No-show, unsatisfactory, damage" },
            { name: "status", type: "DisputeStatus", notes: "OPEN | UNDER_REVIEW | RESOLVED | REJECTED" },
            { name: "resolution", type: "String", isNullable: true, notes: "Admin decision memo" },
          ],
          indexes: ["@@index([bookingId])", "@@index([status])"],
          relations: [
            { to: "Booking", type: "1:1", description: "Contested appointment" },
          ],
        },
      ],
      rawSchema: `// ServiceFinder Production Prisma Schema
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider        = "prisma-client-js"
  previewFeatures = ["driverAdapters"]
}

model User {
  id                        BigInt                    @id @default(autoincrement())
  fullName                  String                    @map("full_name") @db.VarChar(100)
  email                     String?                   @unique @db.VarChar(150)
  phone                     String?                   @unique @db.VarChar(20)
  role                      UserRole
  status                    UserStatus                @default(active)
  latitude                  Decimal?                  @db.Decimal(10, 7)
  longitude                 Decimal?                  @db.Decimal(10, 7)
  mfaEnabled                Boolean                   @default(false) @map("mfa_enabled")
  createdAt                 DateTime                  @default(now()) @map("created_at")

  ownedCompanies            Company[]                 @relation("CompanyOwner")
  bookingsAsCustomer        Booking[]                 @relation("CustomerBookings")
  disputesAsCustomer        Dispute[]                 @relation("DisputeCustomer")
  payments                  Payment[]

  @@index([email])
  @@index([role])
}

model Company {
  id              BigInt    @id @default(autoincrement())
  ownerId         BigInt    @map("owner_id")
  name            String    @db.VarChar(150)
  slug            String    @unique @db.VarChar(150)
  category        String
  rating          Decimal   @default(5.0) @db.Decimal(3, 2)
  isVerified      Boolean   @default(false) @map("is_verified")

  owner           User      @relation("CompanyOwner", fields: [ownerId], references: [id])
  bookings        Booking[]
  services        Service[]

  @@index([category])
  @@index([ownerId])
}

model Booking {
  id              BigInt         @id @default(autoincrement())
  bookingNumber   String         @unique @map("booking_number")
  customerId      BigInt         @map("customer_id")
  companyId       BigInt         @map("company_id")
  scheduledAt     DateTime       @map("scheduled_at")
  status          BookingStatus  @default(PENDING)
  totalPrice      Decimal        @map("total_price") @db.Decimal(10, 2)

  customer        User           @relation("CustomerBookings", fields: [customerId], references: [id])
  company         Company        @relation(fields: [companyId], references: [id])
  payments        Payment[]
  dispute         Dispute?

  @@index([scheduledAt])
  @@index([companyId, scheduledAt])
}`,
    },
    apiEndpoints: [
      {
        method: "POST",
        path: "/api/v1/bookings/reserve",
        description: "Atomically locks an appointment time slot and creates a pending reservation with concurrency guard",
        authRequired: true,
        requestBody: `{\n  "companyId": "comp_984",\n  "serviceId": "srv_12",\n  "scheduledAt": "2026-11-12T09:00:00Z",\n  "durationMinutes": 90,\n  "address": "St 2004, Phnom Penh"\n}`,
        responseSample: `{\n  "success": true,\n  "bookingNumber": "BK-2026-9812",\n  "status": "CONFIRMED",\n  "holdExpiresAt": "2026-11-12T09:15:00Z",\n  "totalPrice": 65.00\n}`,
        latency: "< 38ms",
      },
      {
        method: "GET",
        path: "/api/v1/contractors/availability",
        description: "Evaluates contractor calendar matrix against confirmed jobs and travel buffers",
        authRequired: false,
        responseSample: `{\n  "date": "2026-11-12",\n  "availableSlots": [\n    { "start": "09:00", "end": "10:30", "isFree": true },\n    { "start": "11:00", "end": "12:30", "isFree": false },\n    { "start": "14:00", "end": "15:30", "isFree": true }\n  ]\n}`,
        latency: "< 24ms",
      },
      {
        method: "POST",
        path: "/api/v1/payments/webhook",
        description: "Idempotent payment webhook handler validating HMAC signature and transitioning booking state",
        authRequired: false,
        requestBody: `{\n  "event": "payment.succeeded",\n  "transactionRef": "tx_9012a8",\n  "bookingNumber": "BK-2026-9812",\n  "amount": 65.00\n}`,
        responseSample: `{\n  "received": true,\n  "stateUpdated": "ESCROW_HELD",\n  "idempotencyMatched": false\n}`,
        latency: "< 19ms",
      },
    ],
    securityMatrix: [
      {
        feature: "Pessimistic Row Locking",
        description: "Uses SELECT FOR UPDATE on booking timeslots within atomic Prisma transactions to prevent overlapping reservation race conditions.",
      },
      {
        feature: "Cryptographic Role Claims",
        description: "Signs user role in encrypted JWT session tokens to permit instantaneous route guards without database roundtrips.",
      },
      {
        feature: "HMAC Signature Verification",
        description: "Validates all incoming payment webhooks via shared secret HMAC-SHA256 digests to prevent spoofed checkout completions.",
      },
      {
        feature: "Zod Schema Boundary Isolation",
        description: "Strictly strips and validates every incoming controller payload against typed runtime schemas before reaching SQL builders.",
      },
    ],
    tierDetails: {
      client: "Next.js 16 App Router with React Server Components, ISR catalog caching, and Lucide motion UI.",
      gateway: "Edge Middleware with JWT verification, CORS isolation, and IP rate limiting (100 req/min).",
      services: "NestJS / Express modular services (BookingStateMachine, ContractorScheduler, NotificationWorker).",
      database: "PostgreSQL 16 with Prisma ORM, B-tree indexes, and pgBouncer connection pooling.",
      cache: "In-memory LRU cache for contractor profiles and localized category taxonomies.",
      external: "Stripe Checkout, ABA PayWay KHQR gateway, and AWS SES for email dispatch.",
    },
  },

  safedeal: {
    database: {
      engine: "PostgreSQL 16 with Append-Only Transaction Ledger",
      overview:
        "Double-entry escrow ledger modeling immutable transaction events, inspection countdown timers, cryptographic release authorizations, and mediator disputes.",
      tablesCount: 8,
      entities: [
        {
          name: "User",
          tableName: "users",
          description: "Platform participant with merchant trust rating, deal counter, and verification tier",
          fields: [
            { name: "id", type: "String (cuid)", isPrimary: true },
            { name: "email", type: "String", notes: "Unique index" },
            { name: "name", type: "String", notes: "Trader display handle" },
            { name: "role", type: "String", notes: "buyer | seller | admin" },
            { name: "rating", type: "Float", notes: "5.0 merchant score" },
            { name: "dealCount", type: "Int", notes: "Total completed escrow transactions" },
            { name: "status", type: "String", notes: "Active | Suspended" },
          ],
          indexes: ["@@unique([email])", "@@index([role])"],
          relations: [
            { to: "Listing", type: "1:N", description: "Inventory items published" },
            { to: "Order", type: "1:N", description: "Buy and sell orders" },
            { to: "Payout", type: "1:N", description: "Disbursed withdrawal receipts" },
          ],
        },
        {
          name: "Listing",
          tableName: "listings",
          description: "Digital asset or gaming account held for escrow sale with automated delivery vault",
          fields: [
            { name: "id", type: "String", isPrimary: true },
            { name: "sellerId", type: "String", isForeign: true, notes: "FK -> User.id" },
            { name: "title", type: "String", notes: "Item title" },
            { name: "category", type: "String", notes: "accounts | keys | social | currency" },
            { name: "price", type: "Float", notes: "Listing price in USD" },
            { name: "deliveryType", type: "String", notes: "instant | manual_inspection" },
            { name: "keysInVault", type: "Int", notes: "Encrypted credentials remaining in vault" },
            { name: "status", type: "String", notes: "Active | Paused | Sold" },
          ],
          indexes: ["@@index([sellerId])", "@@index([category, status])"],
          relations: [
            { to: "Order", type: "1:N", description: "Escrow deals initiated" },
          ],
        },
        {
          name: "Order",
          tableName: "orders",
          description: "Active escrow agreement enforcing state machine transitions from deposit to release",
          fields: [
            { name: "id", type: "String", isPrimary: true },
            { name: "buyerId", type: "String", isForeign: true, notes: "FK -> User.id" },
            { name: "sellerId", type: "String", isForeign: true, notes: "FK -> User.id" },
            { name: "listingId", type: "String", isForeign: true, notes: "FK -> Listing.id" },
            { name: "amount", type: "Float", notes: "Deal gross amount" },
            { name: "escrowFee", type: "Float", notes: "Platform protective commission" },
            { name: "status", type: "OrderStatus", notes: "CREATED | FUNDED | INSPECTION | RELEASED | DISPUTED" },
            { name: "lockExpiresAt", type: "DateTime", notes: "Inspection timeout deadline" },
          ],
          indexes: ["@@index([buyerId])", "@@index([sellerId])", "@@index([status])"],
          relations: [
            { to: "Payout", type: "1:1", description: "Final funds disbursement" },
            { to: "DisputeTicket", type: "1:1", description: "Mediator arbitration log" },
          ],
        },
        {
          name: "Payout",
          tableName: "payouts",
          description: "Cryptographically verified funds disbursement record to seller bank or crypto wallet",
          fields: [
            { name: "id", type: "String", isPrimary: true },
            { name: "sellerId", type: "String", isForeign: true, notes: "FK -> User.id" },
            { name: "orderId", type: "String", isForeign: true, notes: "FK -> Order.id" },
            { name: "amount", type: "Float", notes: "Net payout after fees" },
            { name: "status", type: "String", notes: "PENDING | PROCESSED | FAILED" },
            { name: "payoutMethod", type: "String", notes: "USDT_TRC20 | BANK_WIRE | ABA" },
          ],
          indexes: ["@@index([sellerId])", "@@index([orderId])"],
          relations: [
            { to: "Order", type: "1:1", description: "Related escrow agreement" },
          ],
        },
      ],
      rawSchema: `// EscrowDeal Production Schema
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id           String    @id @default(cuid())
  name         String
  email        String    @unique
  role         String    @default("buyer")
  rating       Float     @default(5.0)
  dealCount    Int       @default(0)
  status       String    @default("Active")
  createdAt    DateTime  @default(now())

  listings     Listing[]
  buyerOrders  Order[]   @relation("BuyerOrders")
  sellerOrders Order[]   @relation("SellerOrders")
  payouts      Payout[]
}

model Order {
  id              String       @id @default(cuid())
  buyerId         String
  sellerId        String
  listingId       String
  amount          Float
  escrowFee       Float
  status          OrderStatus  @default(CREATED)
  lockExpiresAt   DateTime?
  createdAt       DateTime     @default(now())

  buyer           User         @relation("BuyerOrders", fields: [buyerId], references: [id])
  seller          User         @relation("SellerOrders", fields: [sellerId], references: [id])
  listing         Listing      @relation(fields: [listingId], references: [id])
  payout          Payout?

  @@index([buyerId])
  @@index([sellerId])
  @@index([status])
}`,
    },
    apiEndpoints: [
      {
        method: "POST",
        path: "/api/v1/escrow/create-deal",
        description: "Initiates a legally binding escrow deal with asset vault reservation and unique deal hash",
        authRequired: true,
        requestBody: `{\n  "listingId": "list_7721",\n  "inspectionWindowHours": 24,\n  "deliveryType": "instant"\n}`,
        responseSample: `{\n  "orderId": "ord_99014",\n  "status": "CREATED",\n  "escrowDepositAddress": "0x7a2...4f1",\n  "amountRequired": 350.00\n}`,
        latency: "< 32ms",
      },
      {
        method: "POST",
        path: "/api/v1/escrow/:id/release-funds",
        description: "Buyer confirms asset inspection, unlocking escrow vault and queuing seller payout ledger",
        authRequired: true,
        responseSample: `{\n  "orderId": "ord_99014",\n  "status": "RELEASED",\n  "disbursedAmount": 332.50,\n  "feeCollected": 17.50\n}`,
        latency: "< 41ms",
      },
    ],
    securityMatrix: [
      {
        feature: "Finite State Machine Guards",
        description: "Prevents invalid state jumps. A transaction can never reach RELEASED without first passing verified FUNDED and INSPECTION statuses.",
      },
      {
        feature: "Double-Entry Balance Verification",
        description: "Guarantees vault balances match sum of deposits minus releases at every mutation step to ensure zero double-spend payouts.",
      },
      {
        feature: "Idempotency-Key Header Enforcement",
        description: "All payment transactions reject repeat network submissions with identical idempotency hashes.",
      },
    ],
  },

  staypilot: {
    database: {
      engine: "PostgreSQL 16 with Multi-Tenant Row Isolation",
      overview:
        "Hospitality PMS data model featuring strict tenant isolation, room inventory tape-charts, dynamic rate plans, and local KHQR payment gateways.",
      tablesCount: 10,
      entities: [
        {
          name: "Hotel",
          tableName: "hotels",
          description: "Top-level tenant entity with isolated subdomain, currency rules, and check-in policies",
          fields: [
            { name: "id", type: "String (uuid)", isPrimary: true },
            { name: "slug", type: "String", notes: "Subdomain or URL path" },
            { name: "name", type: "String", notes: "Hotel or resort title" },
            { name: "domain", type: "String", isNullable: true, notes: "Custom vanity domain" },
            { name: "currency", type: "String", notes: "USD / KHR" },
            { name: "checkInTime", type: "String", notes: "14:00 default" },
            { name: "checkOutTime", type: "String", notes: "11:00 default" },
          ],
          indexes: ["@@unique([slug])", "@@index([domain])"],
          relations: [
            { to: "RoomType", type: "1:N", description: "Configured room categories" },
            { to: "Reservation", type: "1:N", description: "Direct and OTA reservations" },
            { to: "Guest", type: "1:N", description: "CRM guest profiles" },
          ],
        },
        {
          name: "RoomType",
          tableName: "room_types",
          description: "Room category specifications, base pricing, and total physical inventory count",
          fields: [
            { name: "id", type: "String (uuid)", isPrimary: true },
            { name: "hotelId", type: "String", isForeign: true, notes: "FK -> Hotel.id" },
            { name: "name", type: "String", notes: "Deluxe Villa, King Suite, etc." },
            { name: "basePrice", type: "Decimal(10, 2)", notes: "Standard nightly rate in USD" },
            { name: "maxOccupancy", type: "Int", notes: "Guest headcount cap" },
            { name: "totalInventory", type: "Int", notes: "Total available units" },
          ],
          indexes: ["@@index([hotelId])"],
          relations: [
            { to: "Room", type: "1:N", description: "Physical room instances" },
            { to: "RatePlan", type: "1:N", description: "Seasonal and promotional pricing" },
          ],
        },
        {
          name: "Reservation",
          tableName: "reservations",
          description: "Centralized booking record preventing overbooking via atomic date-range intersection queries",
          fields: [
            { name: "id", type: "String (uuid)", isPrimary: true },
            { name: "hotelId", type: "String", isForeign: true, notes: "FK -> Hotel.id" },
            { name: "guestId", type: "String", isForeign: true, notes: "FK -> Guest.id" },
            { name: "checkIn", type: "DateTime", notes: "Arrival date" },
            { name: "checkOut", type: "DateTime", notes: "Departure date" },
            { name: "totalAmount", type: "Decimal(10, 2)", notes: "Total stay charge" },
            { name: "status", type: "ReservationStatus", notes: "CONFIRMED | CHECKED_IN | CHECKED_OUT | CANCELLED" },
          ],
          indexes: ["@@index([hotelId, checkIn, checkOut])", "@@index([guestId])"],
          relations: [
            { to: "Hotel", type: "1:1", description: "Tenant scope" },
            { to: "Guest", type: "1:1", description: "Booking guest" },
          ],
        },
      ],
      rawSchema: `// StayPilot Multi-Tenant Schema
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Hotel {
  id           String        @id @default(uuid())
  slug         String        @unique
  name         String
  currency     String        @default("USD")
  roomTypes    RoomType[]
  reservations Reservation[]
  guests       Guest[]
  createdAt    DateTime      @default(now())
}

model RoomType {
  id             String    @id @default(uuid())
  hotelId        String
  name           String
  basePrice      Decimal   @db.Decimal(10, 2)
  totalInventory Int
  hotel          Hotel     @relation(fields: [hotelId], references: [id], onDelete: Cascade)
  rooms          Room[]

  @@index([hotelId])
}

model Reservation {
  id          String   @id @default(uuid())
  hotelId     String
  checkIn     DateTime
  checkOut    DateTime
  totalAmount Decimal  @db.Decimal(10, 2)
  status      String   @default("CONFIRMED")
  hotel       Hotel    @relation(fields: [hotelId], references: [id], onDelete: Cascade)

  @@index([hotelId, checkIn, checkOut])
}`,
    },
    apiEndpoints: [
      {
        method: "POST",
        path: "/api/v1/reservations/hold-room",
        description: "Atomically acquires a temporary 15-minute room hold to prevent concurrent double-booking during checkout",
        authRequired: false,
        requestBody: `{\n  "hotelSlug": "eco-villa-kampot",\n  "roomTypeId": "rt_deluxe_01",\n  "checkIn": "2026-12-20",\n  "checkOut": "2026-12-23"\n}`,
        responseSample: `{\n  "holdId": "hold_9812",\n  "expiresAt": "2026-11-06T14:35:00Z",\n  "nights": 3,\n  "totalUsd": 240.00\n}`,
        latency: "< 29ms",
      },
      {
        method: "GET",
        path: "/api/v1/inventory/availability",
        description: "Computes tape-chart inventory remaining across calendar dates with sub-30ms cache lookup",
        authRequired: false,
        responseSample: `{\n  "hotelId": "eco-villa-kampot",\n  "month": "2026-12",\n  "availableRooms": 8,\n  "occupancyRate": "62%"\n}`,
        latency: "< 18ms",
      },
    ],
    securityMatrix: [
      {
        feature: "Automatic Tenant Isolation (TenantInterceptor)",
        description: "Injects hotelId into all Prisma query filters at runtime, mathematically preventing cross-tenant data exposure.",
      },
      {
        feature: "Overlap-Safe Room Inventory Lock",
        description: "SQL date-range intersection checks prevent double-booking across walk-in, phone, and online channels.",
      },
      {
        feature: "KHQR Payload Integrity",
        description: "Generates cryptographic Bakong KHQR strings with HMAC validation to confirm local mobile payments instantly.",
      },
    ],
  },

  stackgen: {
    database: {
      engine: "PostgreSQL 16 + Vector Embeddings",
      overview:
        "Architectural blueprint generation and audit engine schema mapping stacks, normalized schemas, and CI/CD checklists.",
      tablesCount: 7,
      entities: [
        {
          name: "Blueprint",
          tableName: "blueprints",
          description: "Full AI CTO software architecture specification generated from product requirements",
          fields: [
            { name: "id", type: "String", isPrimary: true },
            { name: "title", type: "String", notes: "SaaS or Mobile App title" },
            { name: "productPrompt", type: "String", notes: "Raw natural language brief" },
            { name: "architectureTier", type: "String", notes: "MVP | Startup | Enterprise" },
            { name: "frontendStack", type: "String", notes: "Next.js / Expo" },
            { name: "backendStack", type: "String", notes: "NestJS / Fastify / Node" },
            { name: "databaseStack", type: "String", notes: "PostgreSQL / Redis / ClickHouse" },
          ],
          indexes: ["@@index([architectureTier])"],
          relations: [
            { to: "SchemaEntity", type: "1:N", description: "Generated ERD database models" },
            { to: "ChecklistTask", type: "1:N", description: "Master engineering roadmap tasks" },
          ],
        },
        {
          name: "SchemaEntity",
          tableName: "schema_entities",
          description: "Synthesized relational database model with primary keys, fields, and foreign constraints",
          fields: [
            { name: "id", type: "String", isPrimary: true },
            { name: "blueprintId", type: "String", isForeign: true, notes: "FK -> Blueprint.id" },
            { name: "entityName", type: "String", notes: "User, Tenant, Subscription, etc." },
            { name: "rawSql", type: "String", notes: "Executable DDL CREATE TABLE statement" },
            { name: "fieldsJson", type: "Json", notes: "Structured column definitions" },
          ],
          indexes: ["@@index([blueprintId])"],
          relations: [{ to: "Blueprint", type: "1:1", description: "Parent blueprint" }],
        },
      ],
      rawSchema: `// StackGen Blueprint Schema
model Blueprint {
  id               String         @id @default(cuid())
  title            String
  productPrompt    String
  architectureTier String         @default("MVP")
  entities         SchemaEntity[]
  createdAt        DateTime       @default(now())
}

model SchemaEntity {
  id          String    @id @default(cuid())
  blueprintId String
  entityName  String
  rawSql      String
  blueprint   Blueprint @relation(fields: [blueprintId], references: [id])

  @@index([blueprintId])
}`,
    },
    apiEndpoints: [
      {
        method: "POST",
        path: "/api/v1/architect/generate",
        description: "Analyzes product prompts through deterministic LLM parsers and outputs production stacks and schemas",
        authRequired: true,
        requestBody: `{\n  "prompt": "Multi-tenant B2B invoicing SaaS with Stripe and audit logs",\n  "tier": "Production"\n}`,
        responseSample: `{\n  "blueprintId": "bp_4410",\n  "stack": { "frontend": "Next.js 16", "backend": "NestJS", "db": "PostgreSQL" },\n  "entitiesCount": 6\n}`,
        latency: "< 950ms (AI Streaming)",
      },
    ],
    securityMatrix: [
      {
        feature: "Sanitized Prompt Injection Guard",
        description: "Validates and strips malicious jailbreak prompts before processing by architecture synthesis models.",
      },
      {
        feature: "Deterministic Schema Linting",
        description: "Validates synthesized SQL DDL against strict syntax parsers before outputting to prevent broken schemas.",
      },
    ],
  },

  cvgen: {
    database: {
      engine: "PostgreSQL 16 via Prisma ORM",
      overview:
        "Structured CV JSON schema with immutable version snapshots, ATS compliance scoring, and client-side vector print formatting.",
      tablesCount: 4,
      entities: [
        {
          name: "User",
          tableName: "users",
          description: "Authenticated resume creator with subscription plan and AI credit quota",
          fields: [
            { name: "id", type: "String (cuid)", isPrimary: true },
            { name: "email", type: "String", notes: "Unique index" },
            { name: "name", type: "String", isNullable: true },
            { name: "plan", type: "String", notes: "free | pro" },
            { name: "createdAt", type: "DateTime" },
          ],
          indexes: ["@@unique([email])"],
          relations: [{ to: "CV", type: "1:N", description: "Created resumes" }],
        },
        {
          name: "CV",
          tableName: "cvs",
          description: "Living resume document holding design tokens, typography, and structured section data",
          fields: [
            { name: "id", type: "String (cuid)", isPrimary: true },
            { name: "userId", type: "String", isForeign: true, isNullable: true },
            { name: "title", type: "String", notes: "Resume title" },
            { name: "templateId", type: "String", notes: "classic | modern | technical" },
            { name: "colorTheme", type: "String", notes: "slate | navy | emerald" },
            { name: "fontFamily", type: "String", notes: "sans | serif | khmer" },
            { name: "data", type: "Json", notes: "Validated JSON matching CVDataSchema" },
            { name: "isPublished", type: "Boolean", notes: "Public portfolio share status" },
          ],
          indexes: ["@@index([userId])"],
          relations: [
            { to: "User", type: "1:1", description: "Author account" },
            { to: "CVVersion", type: "1:N", description: "Historical snapshots" },
          ],
        },
        {
          name: "CVVersion",
          tableName: "cv_versions",
          description: "Point-in-time immutable backup enabling instant undo and rollback across edits",
          fields: [
            { name: "id", type: "String (cuid)", isPrimary: true },
            { name: "cvId", type: "String", isForeign: true },
            { name: "versionNumber", type: "Int", notes: "Incremental version integer" },
            { name: "data", type: "Json", notes: "Frozen resume snapshot" },
          ],
          indexes: ["@@index([cvId])"],
          relations: [{ to: "CV", type: "1:1", description: "Originating resume" }],
        },
      ],
      rawSchema: `// CVGen Production Prisma Schema
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  plan      String   @default("free")
  cvs       CV[]
  createdAt DateTime @default(now())

  @@map("users")
}

model CV {
  id          String      @id @default(cuid())
  userId      String?
  title       String      @default("Untitled CV")
  templateId  String      @default("classic")
  data        Json
  isPublished Boolean     @default(false)
  versions    CVVersion[]
  user        User?       @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
  @@map("cvs")
}`,
    },
    apiEndpoints: [
      {
        method: "PUT",
        path: "/api/v1/cv/:id/autosave",
        description: "Optimistic debounced JSON autosave with background version snapshotting",
        authRequired: true,
        requestBody: `{\n  "title": "Senior Staff Engineer Resume",\n  "templateId": "technical",\n  "data": { "basics": { "name": "Ros Rendo" } }\n}`,
        responseSample: `{\n  "saved": true,\n  "version": 4,\n  "lastSavedAt": "2026-11-06T14:20:00Z"\n}`,
        latency: "< 26ms",
      },
    ],
    securityMatrix: [
      {
        feature: "Client-Side Vector Print Sandboxing",
        description: "Renders print stylesheets directly in browser memory without server-side headless browser security vectors.",
      },
      {
        feature: "Zod Schema Type Enforcement",
        description: "Ensures complex nested resume JSON matches strict schema before persisting to PostgreSQL jsonb column.",
      },
    ],
  },

  realestate: {
    database: {
      engine: "PostgreSQL 16 + PostGIS Spatial Engine",
      overview:
        "Geospatial property listing and lead CRM schema supporting 360-degree panorama media, agent assignments, and coordinate bounding queries.",
      tablesCount: 9,
      entities: [
        {
          name: "Property",
          tableName: "properties",
          description: "Real estate listing with coordinate geospatial point, pricing, and architectural tags",
          fields: [
            { name: "id", type: "String", isPrimary: true },
            { name: "title", type: "String", notes: "Luxury Villa, Penthouse, etc." },
            { name: "slug", type: "String", notes: "SEO URL slug" },
            { name: "purpose", type: "ListingPurpose", notes: "BUY | RENT" },
            { name: "tier", type: "ListingTier", notes: "BASIC | ADVANCED | PREMIUM" },
            { name: "price", type: "Decimal(12, 2)", notes: "Listing price in USD" },
            { name: "latitude", type: "Decimal(10, 7)", notes: "Geocoded coordinate" },
            { name: "longitude", type: "Decimal(10, 7)", notes: "Geocoded coordinate" },
            { name: "status", type: "ListingStatus", notes: "DRAFT | PUBLISHED | ARCHIVED" },
          ],
          indexes: ["@@unique([slug])", "@@index([latitude, longitude])", "@@index([purpose, status])"],
          relations: [
            { to: "Media", type: "1:N", description: "360-degree tours & gallery photos" },
            { to: "Lead", type: "1:N", description: "Buyer inquiries & tour bookings" },
          ],
        },
        {
          name: "Media",
          tableName: "media",
          description: "Rich media asset holding 360 panorama projection cubemaps, 3D models, and floor plans",
          fields: [
            { name: "id", type: "String", isPrimary: true },
            { name: "propertyId", type: "String", isForeign: true, notes: "FK -> Property.id" },
            { name: "type", type: "MediaType", notes: "PHOTO | VIDEO | PANORAMA_360 | MODEL_3D | FLOOR_PLAN" },
            { name: "url", type: "String", notes: "CDN asset path" },
            { name: "status", type: "MediaStatus", notes: "UPLOADED | PROCESSING | READY | FAILED" },
          ],
          indexes: ["@@index([propertyId])"],
          relations: [{ to: "Property", type: "1:1", description: "Parent listing" }],
        },
        {
          name: "Lead",
          tableName: "leads",
          description: "Prospective property buyer or tenant lead record with scheduled viewing calendar",
          fields: [
            { name: "id", type: "String", isPrimary: true },
            { name: "propertyId", type: "String", isForeign: true, notes: "FK -> Property.id" },
            { name: "name", type: "String", notes: "Client full name" },
            { name: "phone", type: "String", notes: "Contact phone" },
            { name: "email", type: "String", notes: "Contact email" },
            { name: "status", type: "LeadStatus", notes: "NEW | CONTACTED | VIEWING_REQUESTED | CLOSED" },
          ],
          indexes: ["@@index([propertyId])", "@@index([status])"],
          relations: [{ to: "Property", type: "1:1", description: "Inquired listing" }],
        },
      ],
      rawSchema: `// RealEstate OS Production Prisma Schema
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum ListingPurpose {
  BUY
  RENT
}

enum MediaType {
  PHOTO
  VIDEO
  PANORAMA_360
  MODEL_3D
  FLOOR_PLAN
}

model Property {
  id        String         @id @default(cuid())
  title     String
  slug      String         @unique
  purpose   ListingPurpose @default(BUY)
  price     Decimal        @db.Decimal(12, 2)
  latitude  Decimal        @db.Decimal(10, 7)
  longitude Decimal        @db.Decimal(10, 7)
  media     Media[]
  leads     Lead[]

  @@index([latitude, longitude])
  @@index([purpose])
}

model Media {
  id         String    @id @default(cuid())
  propertyId String
  type       MediaType
  url        String
  property   Property  @relation(fields: [propertyId], references: [id], onDelete: Cascade)

  @@index([propertyId])
}`,
    },
    apiEndpoints: [
      {
        method: "GET",
        path: "/api/v1/properties/geo-query",
        description: "Executes bounding-box geospatial query returning map markers with sub-30ms spatial index lookup",
        authRequired: false,
        responseSample: `{\n  "bounds": { "north": 11.58, "south": 11.54, "east": 104.93, "west": 104.89 },\n  "count": 28,\n  "properties": [\n    { "id": "prop_12", "title": "BKK1 Sky Penthouse", "price": 450000, "lat": 11.552, "lng": 104.921 }\n  ]\n}`,
        latency: "< 24ms",
      },
      {
        method: "POST",
        path: "/api/v1/leads/inquire",
        description: "Dispatches direct WhatsApp / Telegram lead notification to assigned listing agent",
        authRequired: false,
        requestBody: `{\n  "propertyId": "prop_12",\n  "name": "Alex Mercer",\n  "phone": "+855 12 345 678",\n  "preferredDate": "2026-11-15"\n}`,
        responseSample: `{\n  "leadId": "lead_981",\n  "status": "VIEWING_REQUESTED",\n  "agentNotified": true\n}`,
        latency: "< 45ms",
      },
    ],
    securityMatrix: [
      {
        feature: "Geospatial Bounding Box Sanitization",
        description: "Validates coordinate bounds against numerical ranges to prevent heavy denial-of-service PostGIS polygon queries.",
      },
      {
        feature: "Presigned S3 Panorama Uploads",
        description: "Issues short-lived HMAC-signed S3 put authorizations for gigapixel 360 images without passing heavy binaries through API server memory.",
      },
    ],
  },

  tokmenu: {
    database: {
      engine: "PostgreSQL 16 + Real-Time WebSocket Order Bus",
      overview:
        "Contactless QR restaurant menu and POS ticketing schema with cryptographic table tokens, split billing, and instant kitchen display synchronization.",
      tablesCount: 8,
      entities: [
        {
          name: "Restaurant",
          tableName: "restaurants",
          description: "Establishment profile with menu tax rates, operating hours, and currency configuration",
          fields: [
            { name: "id", type: "String", isPrimary: true },
            { name: "name", type: "String", notes: "Restaurant brand name" },
            { name: "slug", type: "String", notes: "Subdomain or URL path" },
            { name: "currency", type: "String", notes: "USD / KHR" },
            { name: "taxRate", type: "Float", notes: "10% VAT default" },
            { name: "isOpen", type: "Boolean", notes: "Active kitchen flag" },
          ],
          indexes: ["@@unique([slug])"],
          relations: [
            { to: "Table", type: "1:N", description: "Dining tables" },
            { to: "MenuItem", type: "1:N", description: "Catalog menu items" },
            { to: "Order", type: "1:N", description: "Daily guest tickets" },
          ],
        },
        {
          name: "Table",
          tableName: "tables",
          description: "Physical dining table linked to dynamic QR token for authenticated mobile guest orders",
          fields: [
            { name: "id", type: "String", isPrimary: true },
            { name: "restaurantId", type: "String", isForeign: true },
            { name: "tableNumber", type: "String", notes: "Table 01, VIP 04" },
            { name: "qrCodeToken", type: "String", notes: "Cryptographically signed QR token" },
            { name: "activeOrderId", type: "String", isNullable: true, notes: "Current active bill" },
          ],
          indexes: ["@@unique([qrCodeToken])", "@@index([restaurantId])"],
          relations: [{ to: "Restaurant", type: "1:1", description: "Parent restaurant" }],
        },
        {
          name: "Order",
          tableName: "orders",
          description: "Live kitchen ticket streaming updates to kitchen staff and cashier POS",
          fields: [
            { name: "id", type: "String", isPrimary: true },
            { name: "restaurantId", type: "String", isForeign: true },
            { name: "tableId", type: "String", isForeign: true },
            { name: "items", type: "Json", notes: "Array of selected items, quantities, and notes" },
            { name: "subtotal", type: "Float", notes: "Net total" },
            { name: "status", type: "String", notes: "PENDING | PREPARING | SERVED | PAID" },
          ],
          indexes: ["@@index([restaurantId, status])", "@@index([tableId])"],
          relations: [{ to: "Table", type: "1:1", description: "Dining table" }],
        },
      ],
      rawSchema: `// TokMenu Production Schema
model Restaurant {
  id         String     @id @default(cuid())
  name       String
  slug       String     @unique
  currency   String     @default("USD")
  tables     Table[]
  orders     Order[]
}

model Table {
  id           String   @id @default(cuid())
  restaurantId String
  tableNumber  String
  qrCodeToken  String   @unique
  restaurant   Restaurant @relation(fields: [restaurantId], references: [id])
  orders       Order[]

  @@index([restaurantId])
}

model Order {
  id           String     @id @default(cuid())
  restaurantId String
  tableId      String
  items        Json
  subtotal     Float
  status       String     @default("PENDING")
  table        Table      @relation(fields: [tableId], references: [id])
  restaurant   Restaurant @relation(fields: [restaurantId], references: [id])

  @@index([restaurantId, status])
}`,
    },
    apiEndpoints: [
      {
        method: "GET",
        path: "/api/v1/menu/public/:token",
        description: "Validates signed table QR token and returns instant mobile menu with dietary filters",
        authRequired: false,
        responseSample: `{\n  "tableNumber": "12",\n  "restaurant": "Nomad Bistro",\n  "categories": [\n    { "name": "Appetizers", "itemsCount": 8 }\n  ]\n}`,
        latency: "< 16ms",
      },
      {
        method: "POST",
        path: "/api/v1/orders/place",
        description: "Places order and broadcasts WebSocket event to kitchen display terminal (KDS)",
        authRequired: false,
        requestBody: `{\n  "qrToken": "qr_tok_table12_88a",\n  "items": [{ "id": "item_14", "qty": 2, "notes": "No onions" }]\n}`,
        responseSample: `{\n  "orderId": "ord_8812",\n  "status": "PREPARING",\n  "estimatedMinutes": 15\n}`,
        latency: "< 22ms",
      },
    ],
    securityMatrix: [
      {
        feature: "Tamper-Resistant QR Tokens",
        description: "Signs table tokens with HMAC secret so customers cannot spoof orders for adjacent tables.",
      },
      {
        feature: "WebSocket Channel Isolation",
        description: "Scopes real-time order broadcasts strictly to authorized kitchen and staff sockets.",
      },
    ],
  },

  journex: {
    database: {
      engine: "PostgreSQL 16 + Vectorized Numerical Arrays",
      overview:
        "High-frequency trade logging and backtesting math schema with typed execution arrays and risk-reward performance indexing.",
      tablesCount: 6,
      entities: [
        {
          name: "Trade",
          tableName: "trades",
          description: "Individual executed market position with slippage, commissions, and R-multiple metrics",
          fields: [
            { name: "id", type: "String", isPrimary: true },
            { name: "symbol", type: "String", notes: "EURUSD, BTCUSDT, NVDA" },
            { name: "side", type: "String", notes: "LONG | SHORT" },
            { name: "entryPrice", type: "Decimal(14, 5)" },
            { name: "exitPrice", type: "Decimal(14, 5)" },
            { name: "size", type: "Decimal(12, 4)" },
            { name: "pnl", type: "Decimal(12, 2)", notes: "Realized Net P&L in USD" },
            { name: "rMultiple", type: "Float", notes: "Risk unit reward multiplier" },
          ],
          indexes: ["@@index([symbol])", "@@index([entryPrice])"],
        },
        {
          name: "Strategy",
          tableName: "strategies",
          description: "Trading playbook setup definition tracking win rate, profit factor, and maximum drawdown",
          fields: [
            { name: "id", type: "String", isPrimary: true },
            { name: "name", type: "String", notes: "Breakout, Mean Reversion, ICT Silver Bullet" },
            { name: "winRate", type: "Float", notes: "Calculated winning percentage" },
            { name: "profitFactor", type: "Float", notes: "Gross profits / gross losses" },
          ],
        },
      ],
      rawSchema: `// Journex High-Performance Trading Schema
model Trade {
  id         String   @id @default(cuid())
  symbol     String
  side       String
  entryPrice Decimal  @db.Decimal(14, 5)
  exitPrice  Decimal  @db.Decimal(14, 5)
  size       Decimal  @db.Decimal(12, 4)
  pnl        Decimal  @db.Decimal(12, 2)
  rMultiple  Float
  executedAt DateTime @default(now())

  @@index([symbol])
}`,
    },
    apiEndpoints: [
      {
        method: "POST",
        path: "/api/v1/trades/log",
        description: "Logs raw broker trade fills and recalculates cumulative equity curve asynchronously",
        authRequired: true,
        requestBody: `{\n  "symbol": "BTCUSDT",\n  "side": "LONG",\n  "entry": 68450,\n  "exit": 70200,\n  "size": 0.5\n}`,
        responseSample: `{\n  "tradeId": "tr_9901",\n  "pnl": 875.00,\n  "rMultiple": 2.45\n}`,
        latency: "< 19ms",
      },
    ],
    securityMatrix: [
      {
        feature: "Encrypted Broker API Keys",
        description: "Encrypts Binance, MetaTrader, and Interactive Brokers API secrets using AES-256-GCM envelope encryption.",
      },
    ],
  },

  rendoos: {
    database: {
      engine: "Local-First SQLite / Dexie.js + PostgreSQL Cloud Sync",
      overview:
        "Clean room minimalist workspace schema engineered for zero-latency keyboard-first task management and offline CRDT sync.",
      tablesCount: 5,
      entities: [
        {
          name: "Workspace",
          tableName: "workspaces",
          description: "Ergonomic workspace container storing keybinding presets, layouts, and active tabs",
          fields: [
            { name: "id", type: "String", isPrimary: true },
            { name: "name", type: "String" },
            { name: "activeLayout", type: "String", notes: "split | zen | command" },
            { name: "theme", type: "String", notes: "obsidian | monochrome | titanium" },
          ],
        },
        {
          name: "Note",
          tableName: "notes",
          description: "Fast markdown document with zero-latency local caching and optimistic server push",
          fields: [
            { name: "id", type: "String", isPrimary: true },
            { name: "title", type: "String" },
            { name: "contentMarkdown", type: "String" },
            { name: "isPinned", type: "Boolean" },
          ],
        },
      ],
      rawSchema: `// RendoOs Clean Room Schema
model Workspace {
  id           String   @id @default(cuid())
  name         String
  activeLayout String   @default("zen")
  notes        Note[]
  tasks        Task[]
}

model Note {
  id              String    @id @default(cuid())
  workspaceId     String
  title           String
  contentMarkdown String
  isPinned        Boolean   @default(false)
  workspace       Workspace @relation(fields: [workspaceId], references: [id])
}`,
    },
    apiEndpoints: [
      {
        method: "POST",
        path: "/api/v1/sync/push",
        description: "Pushes offline CRDT transaction batch to cloud PostgreSQL with zero-data-loss merge",
        authRequired: true,
        responseSample: `{\n  "synced": true,\n  "conflictsResolved": 0,\n  "serverTimestamp": 1730900000\n}`,
        latency: "< 28ms",
      },
    ],
    securityMatrix: [
      {
        feature: "Zero-Knowledge Local Storage",
        description: "Local notes are encrypted with client passphrase before syncing to cloud storage.",
      },
    ],
  },

  techtune: {
    database: {
      engine: "PostgreSQL 16 & TimescaleDB for Telemetry",
      overview:
        "HIPAA-compliant relational schema modeling patient vital sign telemetry streams, doctor on-call scheduling matrices, triage warnings, and diagnostic lab tracking.",
      tablesCount: 8,
      entities: [
        {
          name: "Patient",
          tableName: "patients",
          description: "Encrypted patient identity, medical record number (MRN), and emergency contact",
          fields: [
            { name: "id", type: "UUID", isPrimary: true },
            { name: "mrn", type: "VarChar(64)", notes: "Unique encrypted medical record number" },
            { name: "fullName", type: "VarChar(120)", notes: "Encrypted AES-GCM" },
            { name: "bloodType", type: "String", notes: "A+, O-, B+, etc." },
            { name: "triageStatus", type: "TriageLevel", notes: "CRITICAL | STABLE | DISCHARGED" },
          ],
          indexes: ["@@unique([mrn])", "@@index([triageStatus])"],
          relations: [
            { to: "VitalTelemetry", type: "1:N", description: "Streamed vitals" },
            { to: "Appointment", type: "1:N", description: "Consultations" },
            { to: "LabReport", type: "1:N", description: "Diagnostic tests" },
          ],
        },
        {
          name: "VitalTelemetry",
          tableName: "vital_telemetry",
          description: "High-frequency vital sign time series: heart rate, blood pressure, and SpO2",
          fields: [
            { name: "id", type: "BigInt", isPrimary: true },
            { name: "patientId", type: "UUID", isForeign: true, notes: "FK -> Patient.id" },
            { name: "heartRate", type: "SmallInt", notes: "BPM" },
            { name: "bloodPressureSys", type: "SmallInt", notes: "Systolic mmHg" },
            { name: "bloodPressureDia", type: "SmallInt", notes: "Diastolic mmHg" },
            { name: "spO2", type: "SmallInt", notes: "Blood oxygen percentage" },
            { name: "recordedAt", type: "DateTime", notes: "Timestamp microsecond precision" },
          ],
          indexes: ["@@index([patientId, recordedAt])"],
          relations: [{ to: "Patient", type: "1:1", description: "Monitored patient" }],
        },
        {
          name: "Doctor",
          tableName: "doctors",
          description: "Medical specialist with on-call rotation matrix, department, and license",
          fields: [
            { name: "id", type: "UUID", isPrimary: true },
            { name: "name", type: "VarChar(100)", notes: "Dr. Full Name" },
            { name: "department", type: "String", notes: "Cardiology, ER, Triage" },
            { name: "isAvailable", type: "Boolean", notes: "Current room status" },
          ],
          indexes: ["@@index([department])"],
          relations: [{ to: "Appointment", type: "1:N", description: "Scheduled consultations" }],
        },
        {
          name: "Appointment",
          tableName: "appointments",
          description: "Doctor consultation window with room allocation and conflict-free calendar lock",
          fields: [
            { name: "id", type: "BigInt", isPrimary: true },
            { name: "patientId", type: "UUID", isForeign: true, notes: "FK -> Patient.id" },
            { name: "doctorId", type: "UUID", isForeign: true, notes: "FK -> Doctor.id" },
            { name: "scheduledAt", type: "DateTime", notes: "Appointment start" },
            { name: "roomNumber", type: "String", notes: "Clinic room" },
          ],
          indexes: ["@@index([doctorId, scheduledAt])"],
          relations: [
            { to: "Patient", type: "1:1", description: "Patient" },
            { to: "Doctor", type: "1:1", description: "Consulting physician" },
          ],
        },
      ],
    },
    apiEndpoints: [
      {
        method: "POST",
        path: "/api/v1/telemetry/stream",
        description: "Ingests high-frequency vital signs with sub-20ms latency and threshold anomaly detection",
        authRequired: true,
        requestBody: `{\n  "patientId": "pt_8819",\n  "heartRate": 82,\n  "bloodPressure": "120/80",\n  "spO2": 99\n}`,
        responseSample: `{\n  "recorded": true,\n  "warning": false,\n  "serverTimestamp": 1730900000\n}`,
        latency: "< 16ms",
      },
      {
        method: "GET",
        path: "/api/v1/doctors/schedule-matrix",
        description: "Fetches live room and physician availability with zero calendar conflict guarantees",
        authRequired: true,
        responseSample: `{\n  "department": "Cardiology",\n  "onDuty": 4,\n  "slotsFree": 12\n}`,
        latency: "< 24ms",
      },
    ],
    securityMatrix: [
      {
        feature: "HIPAA-Grade Field Encryption",
        description: "Patient personal health information (PHI) is encrypted at rest using AES-256-GCM envelope keys.",
      },
      {
        feature: "Time-Series Anomaly Interceptor",
        description: "Real-time edge worker flags critical tachycardic and hypotensive vitals within 5ms of stream ingestion.",
      },
    ],
    tierDetails: {
      client: "Next.js 16 with lightweight SVG waveform visualizers and ergonomic 60Hz telemetry monitors.",
      gateway: "Edge Middleware with encrypted physician JWT sessions and medical device mutual TLS.",
      services: "Node.js WebSocket streaming engine and appointment conflict-detection controllers.",
      database: "PostgreSQL 16 & TimescaleDB hypertables for time-series vitals storage.",
      cache: "Redis in-memory vital sign buffer with sliding 60-second window snapshots.",
      external: "Hospital HL7 / FHIR protocol bridges and automated SMS emergency dispatch.",
    },
  },

  cloudorchestrator: {
    database: {
      engine: "PostgreSQL 16 & Redis Pub/Sub for Agent Runstates",
      overview:
        "Multi-tenant agent orchestration schema managing distributed LLM tool runs, container sandbox sessions, cron automation pipelines, and MCP server bindings.",
      tablesCount: 9,
      entities: [
        {
          name: "Workspace",
          tableName: "workspaces",
          description: "Isolated organization tenant with agent quotas, API keys, and sandbox compute limits",
          fields: [
            { name: "id", type: "UUID", isPrimary: true },
            { name: "name", type: "VarChar(100)", notes: "Workspace title" },
            { name: "apiKeyHash", type: "VarChar(128)", notes: "SHA-256 key digest" },
            { name: "concurrentLimit", type: "SmallInt", notes: "Max active subagents" },
          ],
          indexes: ["@@unique([apiKeyHash])"],
          relations: [
            { to: "AgentSession", type: "1:N", description: "Agent execution sessions" },
            { to: "CronJob", type: "1:N", description: "Scheduled tasks" },
          ],
        },
        {
          name: "AgentSession",
          tableName: "agent_sessions",
          description: "Discrete autonomous agent lifecycle run with prompt history, memory, and token usage",
          fields: [
            { name: "id", type: "UUID", isPrimary: true },
            { name: "workspaceId", type: "UUID", isForeign: true, notes: "FK -> Workspace.id" },
            { name: "role", type: "String", notes: "Subagent role definition" },
            { name: "status", type: "String", notes: "RUNNING | COMPLETED | FAILED" },
            { name: "totalTokens", type: "Integer", notes: "Input + Output usage" },
          ],
          indexes: ["@@index([workspaceId, status])"],
          relations: [
            { to: "Workspace", type: "1:1", description: "Parent workspace" },
            { to: "ToolExecution", type: "1:N", description: "Invoked tool logs" },
          ],
        },
        {
          name: "ToolExecution",
          tableName: "tool_executions",
          description: "Atomic tool invocation record storing input arguments, sandbox exit codes, and output payloads",
          fields: [
            { name: "id", type: "BigInt", isPrimary: true },
            { name: "sessionId", type: "UUID", isForeign: true, notes: "FK -> AgentSession.id" },
            { name: "toolName", type: "String", notes: "read_file, run_command, etc." },
            { name: "durationMs", type: "Integer", notes: "Execution time in milliseconds" },
            { name: "status", type: "String", notes: "SUCCESS | ERROR" },
          ],
          indexes: ["@@index([sessionId])"],
          relations: [{ to: "AgentSession", type: "1:1", description: "Parent agent run" }],
        },
      ],
    },
    apiEndpoints: [
      {
        method: "POST",
        path: "/api/v1/agents/dispatch",
        description: "Dispatches an autonomous agent into an isolated sandbox container with telemetry streaming",
        authRequired: true,
        requestBody: `{\n  "role": "Database Debugger",\n  "prompt": "Analyze query performance and recommend index.",\n  "model": "gemini-pro"\n}`,
        responseSample: `{\n  "sessionId": "ses_90128a",\n  "status": "DISPATCHED",\n  "sandboxPort": 8080\n}`,
        latency: "< 28ms",
      },
    ],
    securityMatrix: [
      {
        feature: "Containerized Subprocess Sandboxing",
        description: "Agent execution runs in isolated firejail/docker containers without network access unless explicitly approved.",
      },
      {
        feature: "Ephemeral Secret Masking",
        description: "Environment credentials and API tokens are injected into memory and sanitized from execution logs.",
      },
    ],
    tierDetails: {
      client: "Next.js 16 terminal UI with real-time SSE stream log visualizers and multi-session tab dock.",
      gateway: "Edge Middleware with workspace API key authentication and token-bucket concurrency limiter.",
      services: "BullMQ worker queues orchestrating agent task lifecycles across Docker compute nodes.",
      database: "PostgreSQL 16 for session logs and Redis for agent pub/sub state coordination.",
      cache: "In-memory LRU cache storing MCP server tool schemas and agent tool manifests.",
      external: "Anthropic Claude API, Google Gemini API, GitHub Webhooks, and Telegram notification bots.",
    },
  },

  ecommerce: {
    database: {
      engine: "PostgreSQL 16 with Inventory Concurrency Locking",
      overview:
        "High-throughput luxury e-commerce schema modeling SKU inventory locks, multi-currency checkout sessions, localized tax calculation, and order fulfillment.",
      tablesCount: 9,
      entities: [
        {
          name: "Product",
          tableName: "products",
          description: "Catalog catalog merchandise with title, slug, localized pricing, and media gallery",
          fields: [
            { name: "id", type: "BigInt", isPrimary: true },
            { name: "title", type: "VarChar(150)", notes: "Item title" },
            { name: "slug", type: "VarChar(150)", notes: "Unique URL slug" },
            { name: "basePrice", type: "Decimal(10, 2)", notes: "USD base price" },
            { name: "isArchived", type: "Boolean", notes: "Catalog visibility" },
          ],
          indexes: ["@@unique([slug])"],
          relations: [{ to: "ProductVariant", type: "1:N", description: "Color & size variations" }],
        },
        {
          name: "ProductVariant",
          tableName: "product_variants",
          description: "Discrete SKU with physical inventory balance and warehouse shelf location",
          fields: [
            { name: "id", type: "BigInt", isPrimary: true },
            { name: "productId", type: "BigInt", isForeign: true, notes: "FK -> Product.id" },
            { name: "sku", type: "VarChar(64)", notes: "Unique SKU code" },
            { name: "stockCount", type: "Integer", notes: "Available units" },
            { name: "reservedCount", type: "Integer", notes: "Units in active carts" },
          ],
          indexes: ["@@unique([sku])", "@@index([productId])"],
          relations: [
            { to: "Product", type: "1:1", description: "Parent product" },
            { to: "OrderItem", type: "1:N", description: "Order line items" },
          ],
        },
        {
          name: "Order",
          tableName: "orders",
          description: "Confirmed customer purchase order with shipping address, tax breakdown, and payment status",
          fields: [
            { name: "id", type: "BigInt", isPrimary: true },
            { name: "orderNumber", type: "VarChar(32)", notes: "Unique public code" },
            { name: "totalAmount", type: "Decimal(10, 2)", notes: "Final charged total" },
            { name: "status", type: "String", notes: "PENDING | PAID | SHIPPED" },
          ],
          indexes: ["@@unique([orderNumber])"],
          relations: [{ to: "OrderItem", type: "1:N", description: "Purchased SKUs" }],
        },
      ],
    },
    apiEndpoints: [
      {
        method: "POST",
        path: "/api/v1/checkout/session",
        description: "Creates Stripe checkout session and atomically holds stock with 15-minute expiration lock",
        authRequired: false,
        requestBody: `{\n  "items": [{ "sku": "SKU-BLK-M", "quantity": 1 }],\n  "currency": "USD"\n}`,
        responseSample: `{\n  "sessionId": "cs_test_881a",\n  "url": "https://checkout.stripe.com/c/pay/cs_test_881a"\n}`,
        latency: "< 34ms",
      },
    ],
    securityMatrix: [
      {
        feature: "Pessimistic SKU Inventory Hold",
        description: "Locks stock units with SELECT FOR UPDATE during checkout initiation to prevent overselling.",
      },
      {
        feature: "Cryptographic Stripe Webhook Signing",
        description: "Verifies stripe-signature header against endpoint secret before fulfilling order goods.",
      },
    ],
    tierDetails: {
      client: "Next.js 16 App Router with instant optimistic cart mutations and responsive checkout drawer.",
      gateway: "Edge Middleware with localized currency detection and CSRF cookie token verification.",
      services: "Checkout state machine, inventory reservation scheduler, and Stripe webhook worker.",
      database: "PostgreSQL 16 with Prisma ORM and row-level checkout transaction locks.",
      cache: "Redis cache storing active shopping cart sessions with 15-minute stock TTL.",
      external: "Stripe Checkout API, EasyPost shipping label generator, and Resend transactional emails.",
    },
  },

  javis: {
    database: {
      engine: "Vector Database (pgvector) & PostgreSQL 16",
      overview:
        "Neural HUD assistant schema storing semantic user memories, real-time voice command transcripts, device control state machines, and contextual embeddings.",
      tablesCount: 7,
      entities: [
        {
          name: "UserIdentity",
          tableName: "user_identities",
          description: "Authenticated neural operator with biometric signature and voice profile embeddings",
          fields: [
            { name: "id", type: "UUID", isPrimary: true },
            { name: "callsign", type: "VarChar(64)", notes: "Operator handle" },
            { name: "biometricHash", type: "VarChar(128)", notes: "Voiceprint verification hash" },
          ],
          indexes: ["@@unique([callsign])"],
          relations: [
            { to: "VoiceSession", type: "1:N", description: "Voice command interactions" },
            { to: "NeuralMemory", type: "1:N", description: "Long-term episodic memories" },
          ],
        },
        {
          name: "NeuralMemory",
          tableName: "neural_memories",
          description: "Episodic and semantic memory bank with 1536-dimensional vector embeddings for RAG retrieval",
          fields: [
            { name: "id", type: "BigInt", isPrimary: true },
            { name: "userId", type: "UUID", isForeign: true, notes: "FK -> UserIdentity.id" },
            { name: "content", type: "Text", notes: "Retained knowledge fact" },
            { name: "embedding", type: "vector(1536)", notes: "Cosine similarity index" },
            { name: "importance", type: "SmallInt", notes: "Retention score 1-10" },
          ],
          indexes: ["@@index([userId])", "@@index([embedding] vector_cosine_ops)"],
          relations: [{ to: "UserIdentity", type: "1:1", description: "Memory author" }],
        },
      ],
    },
    apiEndpoints: [
      {
        method: "POST",
        path: "/api/v1/voice/stream",
        description: "Streams audio chunks and returns low-latency streaming transcription and tool execution intent",
        authRequired: true,
        responseSample: `{\n  "transcript": "Turn on office studio lighting",\n  "intent": "IOT_DEVICE_CONTROL",\n  "confidence": 0.98\n}`,
        latency: "< 22ms",
      },
    ],
    securityMatrix: [
      {
        feature: "Zero-Retention Audio Buffer",
        description: "Raw speech audio buffers are processed in volatile RAM and purged immediately upon tokenization.",
      },
      {
        feature: "Encrypted Vector Embeddings",
        description: "Vector memories are stored with tenant-specific encryption keys to prevent semantic model leakage.",
      },
    ],
    tierDetails: {
      client: "Three.js / WebGL Cybernetic HUD with 60 FPS real-time audio reactive audio spectrum visualizer.",
      gateway: "WebRTC and WebSocket media gateway with low-latency binary audio stream processing.",
      services: "Whisper speech-to-text pipeline, LangChain agent reasoning loop, and HomeAssistant IoT router.",
      database: "PostgreSQL 16 with pgvector extension for sub-millisecond semantic similarity lookups.",
      cache: "Redis in-memory store maintaining real-time smart home device toggle states.",
      external: "OpenAI Whisper & Embeddings API, ElevenLabs Neural TTS, and Philips Hue / HomeAssistant IoT.",
    },
  },
};

export function getProjectTechnicalSpec(slugOrId: string): ProjectTechnicalSpec {
  const normalized = (slugOrId || "").toLowerCase().trim();
  const cleaned = normalized.replace(/[^a-z0-9]/g, "");

  const aliasMap: Record<string, string> = {
    "trading-tools": "journex",
    "tradingtools": "journex",
    "journex": "journex",
    "cloud-orchestrator": "cloudorchestrator",
    "cloudorchestrator": "cloudorchestrator",
    "orchestrator": "cloudorchestrator",
    "techtune": "techtune",
    "techtunehealer": "techtune",
    "ecommerce": "ecommerce",
    "atelierecommerce": "ecommerce",
    "javis": "javis",
    "javisai": "javis",
    "safedeal": "safedeal",
    "escrowdeal": "safedeal",
    "staypilot": "staypilot",
    "tokmenu": "tokmenu",
    "cvgen": "cvgen",
    "realestate": "realestate",
    "stackgen": "stackgen",
    "rendoos": "rendoos",
    "servicefinder": "servicefinder",
  };

  const targetKey = aliasMap[normalized] || aliasMap[cleaned] || normalized || cleaned;
  if (projectTechnicalSpecs[targetKey]) return projectTechnicalSpecs[targetKey];
  if (projectTechnicalSpecs[normalized]) return projectTechnicalSpecs[normalized];
  if (projectTechnicalSpecs[cleaned]) return projectTechnicalSpecs[cleaned];

  // Return fallback for any other project
  return {
    database: {
      engine: "PostgreSQL 16 via Prisma ORM",
      overview: `Relational architecture supporting transactional guarantees and foreign-key integrity for ${slugOrId}.`,
      tablesCount: 6,
      entities: [
        {
          name: "User",
          tableName: "users",
          description: "Authenticated user identity with role claims and session tokens",
          fields: [
            { name: "id", type: "UUID / BigInt", isPrimary: true },
            { name: "email", type: "VarChar(150)", notes: "Unique index" },
            { name: "role", type: "String", notes: "Role-based access claims" },
            { name: "createdAt", type: "DateTime" },
          ],
          indexes: ["@@unique([email])", "@@index([role])"],
          relations: [{ to: "CoreRecord", type: "1:N", description: "Owned application records" }],
        },
        {
          name: "CoreRecord",
          tableName: "core_records",
          description: "Primary domain transactional record",
          fields: [
            { name: "id", type: "UUID / String", isPrimary: true },
            { name: "userId", type: "UUID", isForeign: true, notes: "FK -> User.id" },
            { name: "status", type: "String", notes: "Active / Completed" },
            { name: "payload", type: "JsonB", notes: "Normalized attributes" },
          ],
          indexes: ["@@index([userId])", "@@index([status])"],
          relations: [{ to: "User", type: "1:1", description: "Author / Owner" }],
        },
        {
          name: "AuditLog",
          tableName: "audit_logs",
          description: "Immutable compliance and operational activity trail",
          fields: [
            { name: "id", type: "BigInt", isPrimary: true },
            { name: "action", type: "String", notes: "Action signature" },
            { name: "actorId", type: "UUID", isForeign: true },
            { name: "timestamp", type: "DateTime" },
          ],
          indexes: ["@@index([actorId])", "@@index([timestamp])"],
        },
      ],
    },
    apiEndpoints: [
      {
        method: "GET",
        path: `/api/v1/${slugOrId}/records`,
        description: "Fetches paginated records with tenant isolation and cache headers",
        authRequired: true,
        responseSample: `{\n  "data": [],\n  "total": 12,\n  "page": 1\n}`,
        latency: "< 35ms",
      },
      {
        method: "POST",
        path: `/api/v1/${slugOrId}/dispatch`,
        description: "Executes atomic state mutation with idempotency protection",
        authRequired: true,
        requestBody: `{\n  "action": "EXECUTE",\n  "params": {}\n}`,
        responseSample: `{\n  "success": true,\n  "status": "COMPLETED"\n}`,
        latency: "< 42ms",
      },
    ],
    securityMatrix: [
      {
        feature: "Strict Cryptographic Authentication",
        description: "Validates signed JWT session cookies with tamper-evident claims.",
      },
      {
        feature: "Zod Schema Input Boundaries",
        description: "Enforces strict input validation on all mutation endpoints to prevent injection.",
      },
      {
        feature: "Row-Level Query Isolation",
        description: "Guarantees users can only access records scoped to their authenticated ID.",
      },
    ],
  };
}
