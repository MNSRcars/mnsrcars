import type { UserRole } from "./roles";

type Permission =
  | "dashboard:view"
  | "vehicles:view" | "vehicles:manage"
  | "reservations:view" | "reservations:manage"
  | "customers:view" | "customers:manage"
  | "payments:view" | "payments:manage"
  | "maintenance:view" | "maintenance:manage"
  | "gps:view" | "gps:manage"
  | "users:view" | "users:manage"
  | "settings:view" | "settings:manage"
  | "audit:view";

const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  super_admin: [
    "dashboard:view", "vehicles:view", "vehicles:manage",
    "reservations:view", "reservations:manage",
    "customers:view", "customers:manage",
    "payments:view", "payments:manage",
    "maintenance:view", "maintenance:manage",
    "gps:view", "gps:manage",
    "users:view", "users:manage",
    "settings:view", "settings:manage",
    "audit:view",
  ],
  admin: [
    "dashboard:view", "vehicles:view", "vehicles:manage",
    "reservations:view", "reservations:manage",
    "customers:view", "customers:manage",
    "payments:view", "payments:manage",
    "maintenance:view", "maintenance:manage",
    "gps:view", "gps:manage",
    "users:view", "settings:view", "settings:manage",
    "audit:view",
  ],
  manager: [
    "dashboard:view", "vehicles:view", "vehicles:manage",
    "reservations:view", "reservations:manage",
    "customers:view", "customers:manage",
    "payments:view", "maintenance:view", "maintenance:manage",
    "gps:view", "gps:manage", "settings:view",
  ],
  agent: [
    "dashboard:view", "vehicles:view",
    "reservations:view", "reservations:manage",
    "customers:view", "customers:manage",
    "maintenance:view", "gps:view",
  ],
  accountant: [
    "dashboard:view", "vehicles:view",
    "reservations:view", "customers:view",
    "payments:view", "payments:manage", "audit:view",
  ],
};

export function userCan(role: UserRole, permission: Permission): boolean {
  return ROLE_PERMISSIONS[role]?.includes(permission) ?? false;
}
