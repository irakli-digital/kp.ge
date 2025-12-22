'use client';

import { Document, Page, Text, View, StyleSheet, Font, Image } from '@react-pdf/renderer';

// Font will be registered when component is rendered with baseUrl
let fontRegistered = false;
let registeredBaseUrl = '';

export function registerFonts(baseUrl: string) {
  if (fontRegistered && registeredBaseUrl === baseUrl) return;

  Font.register({
    family: 'NotoSansGeorgian',
    fonts: [
      { src: `${baseUrl}/fonts/NotoSansGeorgian-Regular.ttf`, fontWeight: 400 },
      { src: `${baseUrl}/fonts/NotoSansGeorgian-Bold.ttf`, fontWeight: 700 },
    ],
  });

  // Disable hyphenation to avoid issues with Georgian text
  Font.registerHyphenationCallback(word => [word]);

  fontRegistered = true;
  registeredBaseUrl = baseUrl;
}

const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: '#0f0f10',
    color: '#ffffff',
    fontFamily: 'NotoSansGeorgian',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    paddingBottom: 20,
    borderBottom: '2px solid #f59e0b',
  },
  logo: {
    width: 120,
    height: 40,
  },
  logoText: {
    fontSize: 28,
    fontWeight: 700,
    color: '#f59e0b',
  },
  headerRight: {
    alignItems: 'flex-end',
  },
  date: {
    fontSize: 10,
    color: '#71717a',
  },
  proposalNumber: {
    fontSize: 9,
    color: '#52525b',
    marginTop: 4,
  },
  // Stats banner
  statsBanner: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#18181b',
    borderRadius: 8,
    padding: 16,
    marginBottom: 30,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 700,
    color: '#f59e0b',
  },
  statLabel: {
    fontSize: 8,
    color: '#71717a',
    marginTop: 2,
  },
  title: {
    fontSize: 28,
    fontWeight: 700,
    marginBottom: 8,
    color: '#ffffff',
  },
  subtitle: {
    fontSize: 12,
    color: '#a1a1aa',
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 700,
    color: '#f59e0b',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  card: {
    backgroundColor: '#18181b',
    borderRadius: 8,
    padding: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingBottom: 10,
    borderBottom: '1px solid #27272a',
  },
  rowLast: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 0,
    paddingBottom: 0,
    borderBottom: 'none',
  },
  label: {
    fontSize: 11,
    color: '#a1a1aa',
  },
  value: {
    fontSize: 11,
    fontWeight: 700,
    color: '#ffffff',
  },
  featureList: {
    marginTop: 16,
    paddingTop: 16,
    borderTop: '1px solid #27272a',
  },
  featureTitle: {
    fontSize: 10,
    color: '#71717a',
    marginBottom: 10,
  },
  feature: {
    fontSize: 10,
    color: '#d4d4d8',
    marginBottom: 6,
    paddingLeft: 8,
  },
  // Two column layout for price section
  priceContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  priceCard: {
    flex: 1,
    backgroundColor: '#18181b',
    borderRadius: 8,
    padding: 20,
  },
  priceCardHighlight: {
    flex: 1,
    backgroundColor: '#18181b',
    borderRadius: 8,
    padding: 20,
    borderWidth: 2,
    borderColor: '#22c55e',
  },
  priceLabel: {
    fontSize: 10,
    color: '#71717a',
    marginBottom: 4,
  },
  originalPrice: {
    fontSize: 16,
    color: '#ef4444',
    textDecoration: 'line-through',
  },
  finalPrice: {
    fontSize: 36,
    fontWeight: 700,
    color: '#22c55e',
  },
  currency: {
    fontSize: 14,
    fontWeight: 400,
    color: '#22c55e',
  },
  savingsBadge: {
    marginTop: 8,
    backgroundColor: '#22c55e',
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
    alignSelf: 'flex-start',
  },
  savingsText: {
    fontSize: 10,
    fontWeight: 700,
    color: '#000000',
  },
  // Why partner section
  whyPartner: {
    marginTop: 24,
    backgroundColor: '#1c1917',
    borderRadius: 8,
    padding: 20,
    borderLeft: '4px solid #f59e0b',
  },
  whyPartnerTitle: {
    fontSize: 12,
    fontWeight: 700,
    color: '#f59e0b',
    marginBottom: 12,
  },
  whyPartnerItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  checkmark: {
    fontSize: 10,
    color: '#22c55e',
    marginRight: 8,
  },
  whyPartnerText: {
    fontSize: 10,
    color: '#d4d4d8',
    flex: 1,
  },
  // Contact and CTA
  ctaSection: {
    marginTop: 24,
    flexDirection: 'row',
    gap: 16,
  },
  contactCard: {
    flex: 1,
    backgroundColor: '#18181b',
    borderRadius: 8,
    padding: 16,
  },
  contactTitle: {
    fontSize: 10,
    fontWeight: 700,
    color: '#f59e0b',
    marginBottom: 10,
  },
  contactRow: {
    fontSize: 10,
    color: '#d4d4d8',
    marginBottom: 4,
  },
  validityCard: {
    flex: 1,
    backgroundColor: '#422006',
    borderRadius: 8,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  validityText: {
    fontSize: 10,
    color: '#fbbf24',
    textAlign: 'center',
  },
  validityDate: {
    fontSize: 12,
    fontWeight: 700,
    color: '#fbbf24',
    marginTop: 4,
  },
  // Footer
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    borderTop: '1px solid #27272a',
    paddingTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  footerText: {
    fontSize: 8,
    color: '#52525b',
  },
  footerLink: {
    fontSize: 9,
    color: '#f59e0b',
  },
});

interface ProposalPDFProps {
  mode: 'subscription' | 'one_time';
  packageName?: string;
  packageType?: string;
  features?: string[];
  durationLabel?: string;
  durationMonths?: number;
  services?: string[];
  episodeCount?: number;
  originalPrice: number;
  finalPrice: number;
  monthlyPrice: number;
  savings: number;
  baseUrl?: string;
}

export function ProposalPDF({
  mode,
  packageName,
  features = [],
  durationLabel,
  services = [],
  episodeCount,
  originalPrice,
  finalPrice,
  monthlyPrice,
  savings,
  baseUrl = '',
}: ProposalPDFProps) {
  const today = new Date();
  const formattedDate = today.toLocaleDateString('ka-GE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Validity date (30 days from now)
  const validUntil = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);
  const validUntilFormatted = validUntil.toLocaleDateString('ka-GE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Generate proposal number
  const proposalNumber = `KP-${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, '0')}${String(today.getDate()).padStart(2, '0')}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

  const formatPrice = (price: number) => price.toLocaleString('ka-GE');
  const savingsPercent = originalPrice > 0 ? Math.round((savings / originalPrice) * 100) : 0;

  const logoUrl = baseUrl ? `${baseUrl}/images/Logo/logo-light.png` : '';

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header with Logo */}
        <View style={styles.header}>
          {logoUrl ? (
            <Image src={logoUrl} style={styles.logo} />
          ) : (
            <Text style={styles.logoText}>KP.ge</Text>
          )}
          <View style={styles.headerRight}>
            <Text style={styles.date}>{formattedDate}</Text>
            <Text style={styles.proposalNumber}>{proposalNumber}</Text>
          </View>
        </View>

        {/* Stats Banner */}
        <View style={styles.statsBanner}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>3.3M+</Text>
            <Text style={styles.statLabel}>ნახვა YouTube-ზე</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>100K+</Text>
            <Text style={styles.statLabel}>გამომწერი</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>200+</Text>
            <Text style={styles.statLabel}>ეპიზოდი</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>25-45</Text>
            <Text style={styles.statLabel}>აუდიტორიის ასაკი</Text>
          </View>
        </View>

        {/* Title */}
        <Text style={styles.title}>სპონსორობის შეთავაზება</Text>
        <Text style={styles.subtitle}>
          {mode === 'subscription'
            ? 'გრძელვადიანი პარტნიორობის პაკეტი'
            : 'ერთჯერადი სერვისების პაკეტი'}
        </Text>

        {/* Selected Options */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>არჩეული პარამეტრები</Text>
          <View style={styles.card}>
            {mode === 'subscription' ? (
              <>
                <View style={styles.row}>
                  <Text style={styles.label}>პაკეტი</Text>
                  <Text style={styles.value}>{packageName}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>ხანგრძლივობა</Text>
                  <Text style={styles.value}>{durationLabel}</Text>
                </View>
                <View style={styles.rowLast}>
                  <Text style={styles.label}>თვიური ღირებულება</Text>
                  <Text style={styles.value}>{formatPrice(monthlyPrice)} GEL</Text>
                </View>
                {features.length > 0 && (
                  <View style={styles.featureList}>
                    <Text style={styles.featureTitle}>შეტანილი სერვისები:</Text>
                    {features.map((feature, idx) => (
                      <Text key={idx} style={styles.feature}>✓ {feature}</Text>
                    ))}
                  </View>
                )}
              </>
            ) : (
              <>
                <View style={styles.row}>
                  <Text style={styles.label}>ეპიზოდების რაოდენობა</Text>
                  <Text style={styles.value}>{episodeCount}</Text>
                </View>
                <View style={styles.rowLast}>
                  <Text style={styles.label}>ფასი თითო ეპიზოდზე</Text>
                  <Text style={styles.value}>{formatPrice(monthlyPrice)} GEL</Text>
                </View>
                {services.length > 0 && (
                  <View style={styles.featureList}>
                    <Text style={styles.featureTitle}>არჩეული სერვისები:</Text>
                    {services.map((service, idx) => (
                      <Text key={idx} style={styles.feature}>✓ {service}</Text>
                    ))}
                  </View>
                )}
              </>
            )}
          </View>
        </View>

        {/* Price Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ინვესტიცია</Text>
          <View style={savings > 0 ? styles.priceCardHighlight : styles.priceCard}>
            {savings > 0 && (
              <>
                <Text style={styles.priceLabel}>ორიგინალი ფასი</Text>
                <Text style={styles.originalPrice}>{formatPrice(originalPrice)} GEL</Text>
              </>
            )}
            <Text style={[styles.priceLabel, { marginTop: savings > 0 ? 8 : 0 }]}>ჯამური ღირებულება</Text>
            <Text style={styles.finalPrice}>
              {formatPrice(finalPrice)} <Text style={styles.currency}>GEL</Text>
            </Text>
            {savings > 0 && (
              <View style={styles.savingsBadge}>
                <Text style={styles.savingsText}>დაზოგავთ {formatPrice(savings)} GEL ({savingsPercent}%)</Text>
              </View>
            )}
          </View>
        </View>

        {/* Why Partner With Us */}
        <View style={styles.whyPartner}>
          <Text style={styles.whyPartnerTitle}>რატომ ცოდნისმოყვარე პოდკასტი?</Text>
          <View style={styles.whyPartnerItem}>
            <Text style={styles.checkmark}>●</Text>
            <Text style={styles.whyPartnerText}>პრემიუმ აუდიტორია - განათლებული, გადაწყვეტილების მიმღები პროფესიონალები</Text>
          </View>
          <View style={styles.whyPartnerItem}>
            <Text style={styles.checkmark}>●</Text>
            <Text style={styles.whyPartnerText}>მაღალი ჩართულობა - საშუალო ნახვის დრო 15+ წუთი</Text>
          </View>
          <View style={styles.whyPartnerItem}>
            <Text style={styles.checkmark}>●</Text>
            <Text style={styles.whyPartnerText}>ორგანული ინტეგრაცია - ბრენდის ავთენტური წარდგენა</Text>
          </View>
        </View>

        {/* Contact & Validity */}
        <View style={styles.ctaSection}>
          <View style={styles.contactCard}>
            <Text style={styles.contactTitle}>საკონტაქტო ინფორმაცია</Text>
            <Text style={styles.contactRow}>Email: gvantsa@kp.ge</Text>
            <Text style={styles.contactRow}>Website: kp.ge</Text>
            <Text style={styles.contactRow}>YouTube: @kp_podcast</Text>
          </View>
          <View style={styles.validityCard}>
            <Text style={styles.validityText}>შეთავაზება მოქმედებს</Text>
            <Text style={styles.validityDate}>{validUntilFormatted}</Text>
            <Text style={styles.validityText}>თარიღამდე</Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.footerLeft}>
            <Text style={styles.footerText}>ცოდნისმოყვარე პოდკასტი © {today.getFullYear()}</Text>
          </View>
          <Text style={styles.footerLink}>kp.ge</Text>
        </View>
      </Page>
    </Document>
  );
}
