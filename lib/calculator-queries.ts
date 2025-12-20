import { sql } from './db';
import { unstable_cache } from 'next/cache';

// Types
export interface CalculatorPackage {
  id: number;
  type: string;
  name: string;
  base_price: number;
  tag: string;
  tag_classes: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
  features?: PackageFeature[];
}

export interface PackageFeature {
  id: number;
  package_id: number;
  feature: string;
  sort_order: number;
}

export interface CalculatorDuration {
  id: number;
  months: number;
  discount_percent: number;
  label: string;
  is_active: boolean;
  sort_order: number;
}

export interface OneTimeService {
  id: number;
  name: string;
  price: number;
  description: string | null;
  is_active: boolean;
  sort_order: number;
}

export interface EpisodeCount {
  id: number;
  count: number;
  discount_percent: number;
  label: string;
  is_active: boolean;
  sort_order: number;
}

export interface CalculatorSubmission {
  id: number;
  name: string;
  company: string | null;
  email: string;
  phone: string | null;
  message: string | null;
  calculator_mode: 'subscription' | 'one_time';
  selected_package: string | null;
  selected_package_name: string | null;
  duration_months: number | null;
  selected_services: string | null;
  episode_count: number | null;
  monthly_price: number | null;
  total_price: number | null;
  discount_amount: number | null;
  created_at: string;
  is_read: boolean;
}

// ============ PUBLIC QUERIES (Cached) ============

export const getActivePackages = unstable_cache(
  async (): Promise<CalculatorPackage[]> => {
    const packages = await sql`
      SELECT * FROM calculator_packages
      WHERE is_active = true
      ORDER BY sort_order ASC
    `;

    // Get features for each package
    const packagesWithFeatures = await Promise.all(
      (packages as CalculatorPackage[]).map(async (pkg) => {
        const features = await sql`
          SELECT * FROM calculator_package_features
          WHERE package_id = ${pkg.id}
          ORDER BY sort_order ASC
        `;
        return { ...pkg, features: features as PackageFeature[] };
      })
    );

    return packagesWithFeatures;
  },
  ['calculator-packages'],
  { tags: ['calculator-packages'], revalidate: 60 }
);

export const getActiveDurations = unstable_cache(
  async (): Promise<CalculatorDuration[]> => {
    const result = await sql`
      SELECT * FROM calculator_durations
      WHERE is_active = true
      ORDER BY sort_order ASC
    `;
    return result as CalculatorDuration[];
  },
  ['calculator-durations'],
  { tags: ['calculator-durations'], revalidate: 60 }
);

export const getActiveOneTimeServices = unstable_cache(
  async (): Promise<OneTimeService[]> => {
    const result = await sql`
      SELECT * FROM calculator_one_time_services
      WHERE is_active = true
      ORDER BY sort_order ASC
    `;
    return result as OneTimeService[];
  },
  ['calculator-services'],
  { tags: ['calculator-services'], revalidate: 60 }
);

export const getActiveEpisodeCounts = unstable_cache(
  async (): Promise<EpisodeCount[]> => {
    const result = await sql`
      SELECT * FROM calculator_episode_counts
      WHERE is_active = true
      ORDER BY sort_order ASC
    `;
    return result as EpisodeCount[];
  },
  ['calculator-episodes'],
  { tags: ['calculator-episodes'], revalidate: 60 }
);

// ============ ADMIN QUERIES (Not Cached) ============

// Packages
export async function getAllPackages(): Promise<CalculatorPackage[]> {
  const packages = await sql`
    SELECT * FROM calculator_packages
    ORDER BY sort_order ASC
  `;

  const packagesWithFeatures = await Promise.all(
    (packages as CalculatorPackage[]).map(async (pkg) => {
      const features = await sql`
        SELECT * FROM calculator_package_features
        WHERE package_id = ${pkg.id}
        ORDER BY sort_order ASC
      `;
      return { ...pkg, features: features as PackageFeature[] };
    })
  );

  return packagesWithFeatures;
}

export async function getPackageById(id: number): Promise<CalculatorPackage | null> {
  const result = await sql`
    SELECT * FROM calculator_packages WHERE id = ${id} LIMIT 1
  `;

  if (!result[0]) return null;

  const features = await sql`
    SELECT * FROM calculator_package_features
    WHERE package_id = ${id}
    ORDER BY sort_order ASC
  `;

  return { ...(result[0] as CalculatorPackage), features: features as PackageFeature[] };
}

export async function createPackage(data: {
  type: string;
  name: string;
  base_price: number;
  tag: string;
  tag_classes: string;
  is_active?: boolean;
  sort_order?: number;
}): Promise<CalculatorPackage> {
  const result = await sql`
    INSERT INTO calculator_packages (type, name, base_price, tag, tag_classes, is_active, sort_order)
    VALUES (${data.type}, ${data.name}, ${data.base_price}, ${data.tag}, ${data.tag_classes}, ${data.is_active ?? true}, ${data.sort_order ?? 0})
    RETURNING *
  `;
  return result[0] as CalculatorPackage;
}

export async function updatePackage(id: number, data: Partial<{
  type: string;
  name: string;
  base_price: number;
  tag: string;
  tag_classes: string;
  is_active: boolean;
  sort_order: number;
}>): Promise<CalculatorPackage | null> {
  const result = await sql`
    UPDATE calculator_packages
    SET
      type = COALESCE(${data.type ?? null}, type),
      name = COALESCE(${data.name ?? null}, name),
      base_price = COALESCE(${data.base_price ?? null}, base_price),
      tag = COALESCE(${data.tag ?? null}, tag),
      tag_classes = COALESCE(${data.tag_classes ?? null}, tag_classes),
      is_active = COALESCE(${data.is_active ?? null}, is_active),
      sort_order = COALESCE(${data.sort_order ?? null}, sort_order),
      updated_at = NOW()
    WHERE id = ${id}
    RETURNING *
  `;
  return result[0] as CalculatorPackage || null;
}

export async function deletePackage(id: number): Promise<boolean> {
  const result = await sql`
    DELETE FROM calculator_packages WHERE id = ${id}
  `;
  return true;
}

// Package Features
export async function addPackageFeature(packageId: number, feature: string, sortOrder: number): Promise<PackageFeature> {
  const result = await sql`
    INSERT INTO calculator_package_features (package_id, feature, sort_order)
    VALUES (${packageId}, ${feature}, ${sortOrder})
    RETURNING *
  `;
  return result[0] as PackageFeature;
}

export async function updatePackageFeature(id: number, feature: string, sortOrder?: number): Promise<PackageFeature | null> {
  const result = await sql`
    UPDATE calculator_package_features
    SET feature = ${feature}, sort_order = COALESCE(${sortOrder ?? null}, sort_order)
    WHERE id = ${id}
    RETURNING *
  `;
  return result[0] as PackageFeature || null;
}

export async function deletePackageFeature(id: number): Promise<boolean> {
  await sql`DELETE FROM calculator_package_features WHERE id = ${id}`;
  return true;
}

export async function setPackageFeatures(packageId: number, features: string[]): Promise<void> {
  // Delete existing features
  await sql`DELETE FROM calculator_package_features WHERE package_id = ${packageId}`;

  // Insert new features
  for (let i = 0; i < features.length; i++) {
    await sql`
      INSERT INTO calculator_package_features (package_id, feature, sort_order)
      VALUES (${packageId}, ${features[i]}, ${i + 1})
    `;
  }
}

// Durations
export async function getAllDurations(): Promise<CalculatorDuration[]> {
  const result = await sql`SELECT * FROM calculator_durations ORDER BY sort_order ASC`;
  return result as CalculatorDuration[];
}

export async function createDuration(data: {
  months: number;
  discount_percent: number;
  label: string;
  is_active?: boolean;
  sort_order?: number;
}): Promise<CalculatorDuration> {
  const result = await sql`
    INSERT INTO calculator_durations (months, discount_percent, label, is_active, sort_order)
    VALUES (${data.months}, ${data.discount_percent}, ${data.label}, ${data.is_active ?? true}, ${data.sort_order ?? 0})
    RETURNING *
  `;
  return result[0] as CalculatorDuration;
}

export async function updateDuration(id: number, data: Partial<{
  months: number;
  discount_percent: number;
  label: string;
  is_active: boolean;
  sort_order: number;
}>): Promise<CalculatorDuration | null> {
  const result = await sql`
    UPDATE calculator_durations
    SET
      months = COALESCE(${data.months ?? null}, months),
      discount_percent = COALESCE(${data.discount_percent ?? null}, discount_percent),
      label = COALESCE(${data.label ?? null}, label),
      is_active = COALESCE(${data.is_active ?? null}, is_active),
      sort_order = COALESCE(${data.sort_order ?? null}, sort_order)
    WHERE id = ${id}
    RETURNING *
  `;
  return result[0] as CalculatorDuration || null;
}

export async function deleteDuration(id: number): Promise<boolean> {
  await sql`DELETE FROM calculator_durations WHERE id = ${id}`;
  return true;
}

// One-Time Services
export async function getAllOneTimeServices(): Promise<OneTimeService[]> {
  const result = await sql`SELECT * FROM calculator_one_time_services ORDER BY sort_order ASC`;
  return result as OneTimeService[];
}

export async function createOneTimeService(data: {
  name: string;
  price: number;
  description?: string;
  is_active?: boolean;
  sort_order?: number;
}): Promise<OneTimeService> {
  const result = await sql`
    INSERT INTO calculator_one_time_services (name, price, description, is_active, sort_order)
    VALUES (${data.name}, ${data.price}, ${data.description ?? null}, ${data.is_active ?? true}, ${data.sort_order ?? 0})
    RETURNING *
  `;
  return result[0] as OneTimeService;
}

export async function updateOneTimeService(id: number, data: Partial<{
  name: string;
  price: number;
  description: string;
  is_active: boolean;
  sort_order: number;
}>): Promise<OneTimeService | null> {
  const result = await sql`
    UPDATE calculator_one_time_services
    SET
      name = COALESCE(${data.name ?? null}, name),
      price = COALESCE(${data.price ?? null}, price),
      description = COALESCE(${data.description ?? null}, description),
      is_active = COALESCE(${data.is_active ?? null}, is_active),
      sort_order = COALESCE(${data.sort_order ?? null}, sort_order)
    WHERE id = ${id}
    RETURNING *
  `;
  return result[0] as OneTimeService || null;
}

export async function deleteOneTimeService(id: number): Promise<boolean> {
  await sql`DELETE FROM calculator_one_time_services WHERE id = ${id}`;
  return true;
}

// Episode Counts
export async function getAllEpisodeCounts(): Promise<EpisodeCount[]> {
  const result = await sql`SELECT * FROM calculator_episode_counts ORDER BY sort_order ASC`;
  return result as EpisodeCount[];
}

export async function createEpisodeCount(data: {
  count: number;
  discount_percent: number;
  label: string;
  is_active?: boolean;
  sort_order?: number;
}): Promise<EpisodeCount> {
  const result = await sql`
    INSERT INTO calculator_episode_counts (count, discount_percent, label, is_active, sort_order)
    VALUES (${data.count}, ${data.discount_percent}, ${data.label}, ${data.is_active ?? true}, ${data.sort_order ?? 0})
    RETURNING *
  `;
  return result[0] as EpisodeCount;
}

export async function updateEpisodeCount(id: number, data: Partial<{
  count: number;
  discount_percent: number;
  label: string;
  is_active: boolean;
  sort_order: number;
}>): Promise<EpisodeCount | null> {
  const result = await sql`
    UPDATE calculator_episode_counts
    SET
      count = COALESCE(${data.count ?? null}, count),
      discount_percent = COALESCE(${data.discount_percent ?? null}, discount_percent),
      label = COALESCE(${data.label ?? null}, label),
      is_active = COALESCE(${data.is_active ?? null}, is_active),
      sort_order = COALESCE(${data.sort_order ?? null}, sort_order)
    WHERE id = ${id}
    RETURNING *
  `;
  return result[0] as EpisodeCount || null;
}

export async function deleteEpisodeCount(id: number): Promise<boolean> {
  await sql`DELETE FROM calculator_episode_counts WHERE id = ${id}`;
  return true;
}

// Submissions
export async function getAllSubmissions(): Promise<CalculatorSubmission[]> {
  const result = await sql`SELECT * FROM calculator_submissions ORDER BY created_at DESC`;
  return result as CalculatorSubmission[];
}

export async function getSubmissionById(id: number): Promise<CalculatorSubmission | null> {
  const result = await sql`SELECT * FROM calculator_submissions WHERE id = ${id} LIMIT 1`;
  return result[0] as CalculatorSubmission || null;
}

export async function createSubmission(data: {
  name: string;
  company?: string;
  email: string;
  phone?: string;
  message?: string;
  calculator_mode: 'subscription' | 'one_time';
  selected_package?: string;
  selected_package_name?: string;
  duration_months?: number;
  selected_services?: string;
  episode_count?: number;
  monthly_price?: number;
  total_price?: number;
  discount_amount?: number;
}): Promise<CalculatorSubmission> {
  const result = await sql`
    INSERT INTO calculator_submissions (
      name, company, email, phone, message, calculator_mode,
      selected_package, selected_package_name, duration_months,
      selected_services, episode_count, monthly_price, total_price, discount_amount
    )
    VALUES (
      ${data.name}, ${data.company ?? null}, ${data.email}, ${data.phone ?? null}, ${data.message ?? null}, ${data.calculator_mode},
      ${data.selected_package ?? null}, ${data.selected_package_name ?? null}, ${data.duration_months ?? null},
      ${data.selected_services ?? null}, ${data.episode_count ?? null}, ${data.monthly_price ?? null}, ${data.total_price ?? null}, ${data.discount_amount ?? null}
    )
    RETURNING *
  `;
  return result[0] as CalculatorSubmission;
}

export async function markSubmissionAsRead(id: number): Promise<boolean> {
  await sql`UPDATE calculator_submissions SET is_read = true WHERE id = ${id}`;
  return true;
}

export async function deleteSubmission(id: number): Promise<boolean> {
  await sql`DELETE FROM calculator_submissions WHERE id = ${id}`;
  return true;
}

export async function getUnreadSubmissionsCount(): Promise<number> {
  const result = await sql`SELECT COUNT(*) as count FROM calculator_submissions WHERE is_read = false`;
  return Number((result[0] as { count: string }).count);
}
