import { pgTable, uuid, text, timestamp, integer, boolean, json, pgEnum, date, serial, index } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// Enums
export const userRoleEnum = pgEnum("user_role", ["USER", "ADMIN"]);
export const bookingStatusEnum = pgEnum("booking_status", ["DRAFT", "PENDING_PAYMENT", "CONFIRMED", "CANCELLED", "COMPLETED"]);

// Users Table
export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name"),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  role: userRoleEnum("role").default("USER").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => {
  return {
    emailIdx: index("email_idx").on(table.email),
  };
});

// RefreshTokens Table
export const refreshTokens = pgTable("refresh_tokens", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  tokenHash: text("token_hash").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  revoked: boolean("revoked").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// RoomTypes Table
export const roomTypes = pgTable("room_types", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  basePrice: integer("base_price").notNull(), // stored in cents
  capacity: integer("capacity").notNull(),
  amenities: json("amenities").$type<string[]>().default([]),
  images: json("images").$type<string[]>().default([]),
});

// Rooms Table
export const rooms = pgTable("rooms", {
  id: serial("id").primaryKey(),
  roomTypeId: integer("room_type_id").references(() => roomTypes.id, { onDelete: "cascade" }).notNull(),
  roomNumber: text("room_number").notNull().unique(),
  isActive: boolean("is_active").default(true).notNull(),
});

// Bookings Table
export const bookings = pgTable("bookings", {
  id: uuid("id").defaultRandom().primaryKey(), // UUID for bookings is safer
  userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  roomId: integer("room_id").references(() => rooms.id).notNull(),
  startDate: date("start_date").notNull(), // 'date' type in Postgres returns string in JS usually
  endDate: date("end_date").notNull(),
  totalPrice: integer("total_price").notNull(), // in cents
  status: bookingStatusEnum("status").default("DRAFT").notNull(),
  expiresAt: timestamp("expires_at"), // for DRAFT/PENDING expiry
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  bookings: many(bookings),
  refreshTokens: many(refreshTokens),
}));

export const refreshTokensRelations = relations(refreshTokens, ({ one }) => ({
  user: one(users, {
    fields: [refreshTokens.userId],
    references: [users.id],
  }),
}));

export const roomTypesRelations = relations(roomTypes, ({ many }) => ({
  rooms: many(rooms),
}));

export const roomsRelations = relations(rooms, ({ one, many }) => ({
  roomType: one(roomTypes, {
    fields: [rooms.roomTypeId],
    references: [roomTypes.id],
  }),
  bookings: many(bookings),
}));

export const bookingsRelations = relations(bookings, ({ one }) => ({
  user: one(users, {
    fields: [bookings.userId],
    references: [users.id],
  }),
  room: one(rooms, {
    fields: [bookings.roomId],
    references: [rooms.id],
  }),
}));
