import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import React from "react";
import {
  Linking,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useColors } from "@/hooks/useColors";

export default function AboutScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 : 0;

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={{
        paddingTop: topPad + 16,
        paddingBottom: bottomPad + 100,
      }}
      showsVerticalScrollIndicator={false}
    >
      {/* Meet Debbie */}
      <View style={[styles.section, styles.heroSection]}>
        <View
          style={[
            styles.avatarPlaceholder,
            { backgroundColor: colors.primary + "20" },
          ]}
        >
          <MaterialCommunityIcons
            name="flower"
            size={48}
            color={colors.primary}
          />
        </View>
        <View
          style={[
            styles.heroBadge,
            { backgroundColor: colors.primary + "18" },
          ]}
        >
          <Text style={[styles.heroBadgeText, { color: colors.primary }]}>
            Eastern NC, Since 2022
          </Text>
        </View>
        <Text style={[styles.debbieTitle, { color: colors.foreground }]}>
          Meet Debbie
        </Text>
        <Text style={[styles.debbieQuote, { color: colors.primary }]}>
          "I put my whole heart into every wreath I make."
        </Text>
        <Text style={[styles.debbieStory, { color: colors.mutedForeground }]}>
          Debbie is a Southern crafter based in Eastern North Carolina with a
          passion for turning ribbon, florals, and greenery into one-of-a-kind
          door wreaths. Every piece she creates is made with love, attention to
          detail, and a whole lot of Southern charm.
        </Text>
        <Text
          style={[styles.debbieStory, { color: colors.mutedForeground, marginTop: 10 }]}
        >
          Whether you want a full floral statement piece, a coastal-inspired
          design, or a heartfelt memorial arrangement — Debbie will work with
          you to bring your vision to life.
        </Text>
      </View>

      {/* What She Makes */}
      <View
        style={[
          styles.section,
          styles.makeSection,
          { backgroundColor: colors.muted },
        ]}
      >
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          What Debbie Creates
        </Text>
        {[
          { icon: "flower-outline" as const, label: "Custom Wreaths", desc: "Door wreaths in any style — floral, coastal, farmhouse, and more." },
          { icon: "ribbon-outline" as const, label: "Decorative Bows", desc: "Beautiful bows for mailboxes, chairs, lanterns, and gifts." },
          { icon: "leaf-outline" as const, label: "Table & Floral Settings", desc: "Stunning centerpieces and floral arrangements for any occasion." },
          { icon: "heart-outline" as const, label: "Memorial Arrangements", desc: "Thoughtful, heartfelt grave and funeral pieces." },
          { icon: "sunny-outline" as const, label: "Lantern Decor", desc: "Bow and floral arrangements that dress up any lantern." },
        ].map((item) => (
          <View key={item.label} style={styles.makeItem}>
            <View
              style={[
                styles.makeIcon,
                { backgroundColor: colors.primary + "20" },
              ]}
            >
              <Ionicons name={item.icon} size={22} color={colors.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={[styles.makeLabel, { color: colors.foreground }]}
              >
                {item.label}
              </Text>
              <Text
                style={[styles.makeDesc, { color: colors.mutedForeground }]}
              >
                {item.desc}
              </Text>
            </View>
          </View>
        ))}
      </View>

      {/* Payment */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Send Payment
        </Text>
        <Text style={[styles.sectionSub, { color: colors.mutedForeground }]}>
          Payment is sent directly to Debbie after she confirms your order.
        </Text>

        <Pressable
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            Linking.openURL(
              "https://venmo.com/code?user_id=4171770093373114764&created=1780754179"
            );
          }}
          style={({ pressed }) => [
            styles.payBtn,
            { backgroundColor: "#3D95CE", opacity: pressed ? 0.85 : 1 },
          ]}
          testID="about-venmo-btn"
        >
          <Ionicons name="logo-venmo" size={22} color="#fff" />
          <Text style={styles.payBtnText}>Pay with Venmo</Text>
        </Pressable>

        <Pressable
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            Linking.openURL("https://cash.app/$Didiswreaths1");
          }}
          style={({ pressed }) => [
            styles.payBtn,
            {
              backgroundColor: "#00D632",
              opacity: pressed ? 0.85 : 1,
              marginTop: 12,
            },
          ]}
          testID="about-cashapp-btn"
        >
          <Ionicons name="cash-outline" size={22} color="#fff" />
          <Text style={styles.payBtnText}>CashApp · $Didiswreaths1</Text>
        </Pressable>
      </View>

      {/* FAQ */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Common Questions
        </Text>
        {[
          {
            q: "How long does it take?",
            a: "Debbie typically completes orders in 5–7 business days after payment is received.",
          },
          {
            q: "Do you ship?",
            a: "Yes! Debbie ships anywhere in the US. She also offers local delivery in Eastern NC for multiple items.",
          },
          {
            q: "How does pricing work?",
            a: "Standard 16\", 18\", and 20\" wreaths are the same price. Custom sizes and special materials are quoted individually.",
          },
          {
            q: "Can I request something custom?",
            a: "Absolutely — that's the whole point! Debbie loves bringing your vision to life. Be as specific or vague as you'd like in the order notes.",
          },
          {
            q: "What if I'm not happy with my order?",
            a: "Debbie will always work with you to make it right. Reach out before payment if you have any concerns.",
          },
        ].map((faq, i) => (
          <View
            key={i}
            style={[
              styles.faqCard,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
          >
            <Text style={[styles.faqQ, { color: colors.foreground }]}>
              {faq.q}
            </Text>
            <Text style={[styles.faqA, { color: colors.mutedForeground }]}>
              {faq.a}
            </Text>
          </View>
        ))}
      </View>

      {/* CTA */}
      <View style={[styles.section, styles.ctaSection]}>
        <Text style={[styles.ctaTitle, { color: colors.foreground }]}>
          Ready to order?
        </Text>
        <Text style={[styles.ctaSub, { color: colors.mutedForeground }]}>
          Place a custom order in just a few taps.
        </Text>
        <Pressable
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            router.push("/(tabs)/order");
          }}
          style={({ pressed }) => [
            styles.ctaBtn,
            { backgroundColor: colors.primary, opacity: pressed ? 0.85 : 1 },
          ]}
          testID="about-order-btn"
        >
          <Text style={[styles.ctaBtnText, { color: colors.primaryForeground }]}>
            Start a Custom Order
          </Text>
          <Ionicons
            name="arrow-forward"
            size={16}
            color={colors.primaryForeground}
          />
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  section: {
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  heroSection: {
    alignItems: "center",
    paddingBottom: 32,
  },
  makeSection: {
    paddingHorizontal: 24,
  },
  avatarPlaceholder: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  heroBadge: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 12,
  },
  heroBadgeText: {
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 0.4,
  },
  debbieTitle: {
    fontSize: 32,
    fontWeight: "700",
    fontFamily: "PlayfairDisplay_700Bold",
    marginBottom: 8,
    textAlign: "center",
  },
  debbieQuote: {
    fontSize: 16,
    fontStyle: "italic",
    textAlign: "center",
    marginBottom: 16,
    fontFamily: "PlayfairDisplay_700Bold",
  },
  debbieStory: {
    fontSize: 15,
    lineHeight: 23,
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    fontFamily: "PlayfairDisplay_700Bold",
    marginBottom: 6,
  },
  sectionSub: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  makeItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 14,
    marginTop: 16,
  },
  makeIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  makeLabel: {
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 3,
  },
  makeDesc: {
    fontSize: 13,
    lineHeight: 19,
  },
  payBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingVertical: 15,
    borderRadius: 30,
  },
  payBtnText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
  faqCard: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 16,
    marginTop: 10,
    gap: 6,
  },
  faqQ: {
    fontSize: 15,
    fontWeight: "700",
  },
  faqA: {
    fontSize: 14,
    lineHeight: 21,
  },
  ctaSection: {
    alignItems: "center",
    paddingTop: 8,
    paddingBottom: 32,
  },
  ctaTitle: {
    fontSize: 24,
    fontWeight: "700",
    fontFamily: "PlayfairDisplay_700Bold",
    marginBottom: 6,
    textAlign: "center",
  },
  ctaSub: {
    fontSize: 14,
    marginBottom: 20,
    textAlign: "center",
  },
  ctaBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 30,
  },
  ctaBtnText: {
    fontSize: 15,
    fontWeight: "600",
  },
});
