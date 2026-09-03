import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { UserRole } from "./roles";

type Profile = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: UserRole;
  is_active: boolean;
};

export async function getCurrentProfile(): Promise<Profile | null> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("id, email, first_name, last_name, role, is_active")
    .eq("id", user.id)
    .single();

  if (error || !profile) return null;
  
  // Cast forcé pour satisfaire TypeScript temporairement
  const p = profile as unknown as Profile;
  if (!p.is_active) return null;

  return p;
}

export async function requireUser(): Promise<Profile> {
  const profile = await getCurrentProfile();
  if (!profile) redirect("/login");
  return profile;
}

export async function requireRole(allowed: UserRole[]): Promise<Profile> {
  const profile = await requireUser();
  if (!allowed.includes(profile.role)) redirect("/login?error=forbidden");
  return profile;
}
