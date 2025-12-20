'use client';

import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

// Font will be registered when component is rendered with baseUrl
let fontRegistered = false;

export function registerFonts(baseUrl: string) {
  if (fontRegistered) return;

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
    marginBottom: 40,
    paddingBottom: 20,
    borderBottom: '1px solid #27272a',
  },
  logo: {
    fontSize: 24,
    fontWeight: 700,
    color: '#f59e0b',
  },
  date: {
    fontSize: 10,
    color: '#71717a',
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
    marginBottom: 40,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 600,
    color: '#f59e0b',
    marginBottom: 16,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  card: {
    backgroundColor: '#18181b',
    borderRadius: 8,
    padding: 20,
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    fontSize: 11,
    color: '#a1a1aa',
  },
  value: {
    fontSize: 11,
    fontWeight: 600,
    color: '#ffffff',
  },
  featureList: {
    marginTop: 12,
  },
  feature: {
    fontSize: 10,
    color: '#d4d4d8',
    marginBottom: 4,
    paddingLeft: 12,
  },
  priceSection: {
    backgroundColor: '#18181b',
    borderRadius: 8,
    padding: 24,
    marginTop: 20,
  },
  originalPrice: {
    fontSize: 14,
    color: '#ef4444',
    textDecoration: 'line-through',
    marginBottom: 4,
  },
  finalPrice: {
    fontSize: 32,
    fontWeight: 700,
    color: '#22c55e',
  },
  currency: {
    fontSize: 16,
    fontWeight: 400,
  },
  savings: {
    backgroundColor: '#22c55e20',
    color: '#22c55e',
    padding: '4 8',
    borderRadius: 4,
    fontSize: 10,
    fontWeight: 600,
    marginTop: 8,
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    left: 40,
    right: 40,
    borderTop: '1px solid #27272a',
    paddingTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerText: {
    fontSize: 9,
    color: '#71717a',
  },
  contactInfo: {
    marginTop: 30,
  },
  contactTitle: {
    fontSize: 12,
    fontWeight: 600,
    color: '#f59e0b',
    marginBottom: 12,
  },
  contactRow: {
    fontSize: 10,
    color: '#d4d4d8',
    marginBottom: 4,
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
}

export function ProposalPDF({
  mode,
  packageName,
  packageType,
  features = [],
  durationLabel,
  durationMonths,
  services = [],
  episodeCount,
  originalPrice,
  finalPrice,
  monthlyPrice,
  savings,
}: ProposalPDFProps) {
  const today = new Date().toLocaleDateString('ka-GE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const formatPrice = (price: number) => price.toLocaleString('ka-GE');

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.logo}>KP.ge</Text>
          <Text style={styles.date}>{today}</Text>
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
                  <Text style={styles.label}>პაკეტი:</Text>
                  <Text style={styles.value}>{packageName}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>ხანგრძლივობა:</Text>
                  <Text style={styles.value}>{durationLabel}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>თვიური ღირებულება:</Text>
                  <Text style={styles.value}>{formatPrice(monthlyPrice)} GEL</Text>
                </View>
                {features.length > 0 && (
                  <View style={styles.featureList}>
                    <Text style={[styles.label, { marginBottom: 8 }]}>შეტანილი სერვისები:</Text>
                    {features.map((feature, idx) => (
                      <Text key={idx} style={styles.feature}>• {feature}</Text>
                    ))}
                  </View>
                )}
              </>
            ) : (
              <>
                <View style={styles.row}>
                  <Text style={styles.label}>ეპიზოდების რაოდენობა:</Text>
                  <Text style={styles.value}>{episodeCount}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>ფასი/ეპიზოდი:</Text>
                  <Text style={styles.value}>{formatPrice(monthlyPrice)} GEL</Text>
                </View>
                {services.length > 0 && (
                  <View style={styles.featureList}>
                    <Text style={[styles.label, { marginBottom: 8 }]}>არჩეული სერვისები:</Text>
                    {services.map((service, idx) => (
                      <Text key={idx} style={styles.feature}>• {service}</Text>
                    ))}
                  </View>
                )}
              </>
            )}
          </View>
        </View>

        {/* Price Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ჯამური ღირებულება</Text>
          <View style={styles.priceSection}>
            {savings > 0 && (
              <Text style={styles.originalPrice}>{formatPrice(originalPrice)} GEL</Text>
            )}
            <Text style={styles.finalPrice}>
              {formatPrice(finalPrice)} <Text style={styles.currency}>GEL</Text>
            </Text>
            {savings > 0 && (
              <Text style={styles.savings}>დაზოგავთ {formatPrice(savings)} GEL</Text>
            )}
          </View>
        </View>

        {/* Contact Info */}
        <View style={styles.contactInfo}>
          <Text style={styles.contactTitle}>საკონტაქტო ინფორმაცია</Text>
          <Text style={styles.contactRow}>Email: gvantsa@kp.ge</Text>
          <Text style={styles.contactRow}>Website: kp.ge</Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>ცოდნისმოყვარე პოდკასტი</Text>
          <Text style={styles.footerText}>kp.ge</Text>
        </View>
      </Page>
    </Document>
  );
}
