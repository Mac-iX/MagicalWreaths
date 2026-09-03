import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import React, { useRef } from "react";
import {
  Animated,
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useColors } from "@/hooks/useColors";

const PRODUCT_TYPES = [
  {
    id: "wreath",
    label: "Custom Wreaths",
    desc: "Door wreaths in any style",
    icon: "flower-outline" as const,
    color: "#C5869A",
  },
  {
    id: "bow",
    label: "Decorative Bows",
    desc: "Mailboxes, lanterns & more",
    icon: "ribbon-outline" as const,
    color: "#9DC0CB",
  },
  {
    id: "table-setting",
    label: "Table & Floral",
    desc: "Centerpieces & arrangements",
    icon: "leaf-outline" as const,
    color: "#8FAF9A",
  },
  {
    id: "funeral-grave",
    label: "Memorial",
    desc: "Heartfelt arrangements",
    icon: "heart-outline" as const,
    color: "#D4A4B0",
  },
  {
    id: "lantern-decor",
    label: "Lantern Decor",
    desc: "Floral lantern arrangements",
    icon: "sunny-outline" as const,
    color: "#C9B89A",
  },
];

const STYLES = [
  {
    id: "full-floral",
    name: "Full Floral",
    desc: "Lush and bursting with blooms",
    tag: "Most Popular",
    bgColor: "#FCF0F3",
  },
  {
    id: "coastal",
    name: "Coastal",
    desc: "Seashells, driftwood & ocean hues",
    tag: "Seasonal",
    bgColor: "#EFF5F8",
  },
  {
    id: "farmhouse",
    name: "Farmhouse",
    desc: "Rustic charm with burlap & gingham",
    tag: "Classic",
    bgColor: "#F5F2ED",
  },
  {
    id: "everyday-greenery",
    name: "Everyday Greenery",
    desc: "Classic, timeless, and elegant",
    tag: "Timeless",
    bgColor: "#EEF3EF",
  },
  {
    id: "holiday",
    name: "Holiday",
    desc: "Festive and bright for celebrations",
    tag: "Seasonal",
    bgColor: "#FCF2EF",
  },
  {
    id: "seasonal",
    name: "Seasonal",
    desc: "Tailored for the current season",
    tag: "New",
    bgColor: "#F7F0F8",
  },
];

const TESTIMONIALS = [
  {
    name: "Sarah M.",
    text: "Debbie made the most gorgeous wreath for my front door. Everyone who visits asks where I got it!",
    stars: 5,
  },
  {
    name: "Jennifer K.",
    text: "Ordered a coastal wreath and it's absolutely stunning. The quality is amazing.",
    stars: 5,
  },
  {
    name: "Lisa T.",
    text: "She made beautiful bows for my daughter's wedding. We couldn't have been happier!",
    stars: 5,
  },
];

function CategoryCard({
  item,
  onPress,
}: {
  item: (typeof PRODUCT_TYPES)[0];
  onPress: () => void;
}) {
  const colors = useColors();
  const scale = useRef(new Animated.Value(1)).current;

  const onPressIn = () => {
    Animated.spring(scale, { toValue: 0.96, useNativeDriver: true }).start();
  };
  const onPressOut = () => {
    Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start();
  };

  return (
    <Pressable
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={{ flex: 1 }}
      testID={`category-${item.id}`}
    >
      <Animated.View
        style={[
          styles.categoryCard,
          {
            backgroundColor: colors.card,
            borderColor: colors.border,
            transform: [{ scale }],
          },
        ]}
      >
        <View
          style={[
            styles.categoryIcon,
            { backgroundColor: item.color + "22" },
          ]}
        >
          <Ionicons name={item.icon} size={22} color={item.color} />
        </View>
        <Text
          style={[styles.categoryLabel, { color: colors.foreground }]}
          numberOfLines={1}
        >
          {item.label}
        </Text>
        <Text
          style={[styles.categoryDesc, { color: colors.mutedForeground }]}
          numberOfLines={2}
        >
          {item.desc}
        </Text>
      </Animated.View>
    </Pressable>
  );
}

function StyleCard({
  item,
  onPress,
}: {
  item: (typeof STYLES)[0];
  onPress: () => void;
}) {
  const colors = useColors();
  const scale = useRef(new Animated.Value(1)).current;

  const onPressIn = () => {
    Animated.spring(scale, { toValue: 0.97, useNativeDriver: true }).start();
  };
  const onPressOut = () => {
    Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start();
  };

  return (
    <Pressable
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      testID={`style-${item.id}`}
    >
      <Animated.View
        style={[
          styles.styleCard,
          {
            backgroundColor: item.bgColor,
            borderColor: colors.border,
            transform: [{ scale }],
          },
        ]}
      >
        <View style={styles.styleCardContent}>
          <View style={styles.styleCardLeft}>
            <View
              style={[
                styles.styleTag,
                { backgroundColor: colors.primary + "22" },
              ]}
            >
              <Text style={[styles.styleTagText, { color: colors.primary }]}>
                {item.tag}
              </Text>
            </View>
            <Text style={[styles.styleName, { color: colors.foreground }]}>
              {item.name}
            </Text>
            <Text style={[styles.styleDesc, { color: colors.mutedForeground }]}>
              {item.desc}
            </Text>
          </View>
          <View
            style={[
              styles.styleOrderBtn,
              { backgroundColor: colors.primary },
            ]}
          >
            <Text style={[styles.styleOrderText, { color: colors.primaryForeground }]}>
              Order
            </Text>
            <Ionicons
              name="arrow-forward"
              size={14}
              color={colors.primaryForeground}
            />
          </View>
        </View>
      </Animated.View>
    </Pressable>
  );
}

export default function GalleryScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 : 0;

  const handleCategoryPress = (productId: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push({ pathname: "/(tabs)/order", params: { productType: productId } });
  };

  const handleStylePress = (styleId: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push({ pathname: "/(tabs)/order", params: { wreathStyle: styleId, productType: "wreath" } });
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={{
        paddingTop: topPad,
        paddingBottom: bottomPad + 100,
      }}
      showsVerticalScrollIndicator={false}
    >
      {/* Hero */}
      <View style={styles.hero}>
        <View style={[styles.heroBadge, { backgroundColor: colors.primary + "18" }]}>
          <MaterialCommunityIcons name="flower" size={14} color={colors.primary} />
          <Text style={[styles.heroBadgeText, { color: colors.primary }]}>
            Handcrafted in Eastern NC
          </Text>
        </View>
        <Text style={[styles.heroTitle, { color: colors.foreground }]}>
          Debbie's Magical{"\n"}Wreaths
        </Text>
        <Text style={[styles.heroSub, { color: colors.mutedForeground }]}>
          Custom wreaths, bows & floral arrangements made with heart and Southern charm.
        </Text>
        <Pressable
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            router.push("/(tabs)/order");
          }}
          style={({ pressed }) => [
            styles.heroCTA,
            { backgroundColor: colors.primary, opacity: pressed ? 0.85 : 1 },
          ]}
          testID="hero-order-btn"
        >
          <Text style={[styles.heroCTAText, { color: colors.primaryForeground }]}>
            Place a Custom Order
          </Text>
          <Ionicons name="arrow-forward" size={16} color={colors.primaryForeground} />
        </Pressable>
      </View>

      {/* Categories */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          What can Debbie make for you?
        </Text>
        <View style={styles.categoryGrid}>
          {PRODUCT_TYPES.map((item, i) => (
            <View key={item.id} style={{ flex: i < 2 ? undefined : undefined, width: i < 4 ? "48%" : "100%" }}>
              <CategoryCard
                item={item}
                onPress={() => handleCategoryPress(item.id)}
              />
            </View>
          ))}
        </View>
      </View>

      {/* Styles */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Browse Wreath Styles
        </Text>
        <Text style={[styles.sectionSub, { color: colors.mutedForeground }]}>
          Tap a style to start your custom order
        </Text>
        <View style={styles.styleList}>
          {STYLES.map((item) => (
            <StyleCard
              key={item.id}
              item={item}
              onPress={() => handleStylePress(item.id)}
            />
          ))}
        </View>
      </View>

      {/* Process */}
      <View style={[styles.section, styles.processSection, { backgroundColor: colors.muted }]}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          How It Works
        </Text>
        {[
          { num: "1", title: "Place Your Order", desc: "Fill out the quick custom order form with your style preferences." },
          { num: "2", title: "Debbie Confirms", desc: "She'll reach out within 24–48 hours to finalize details." },
          { num: "3", title: "Send Payment", desc: "Pay via Venmo or CashApp before she begins crafting." },
          { num: "4", title: "Receive Your Wreath", desc: "Your handcrafted creation ships in 5–7 days." },
        ].map((step) => (
          <View key={step.num} style={styles.processStep}>
            <View style={[styles.processNum, { backgroundColor: colors.primary }]}>
              <Text style={[styles.processNumText, { color: colors.primaryForeground }]}>
                {step.num}
              </Text>
            </View>
            <View style={styles.processText}>
              <Text style={[styles.processTitle, { color: colors.foreground }]}>
                {step.title}
              </Text>
              <Text style={[styles.processDesc, { color: colors.mutedForeground }]}>
                {step.desc}
              </Text>
            </View>
          </View>
        ))}
      </View>

      {/* Testimonials */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          What Customers Say
        </Text>
        {TESTIMONIALS.map((t, i) => (
          <View
            key={i}
            style={[
              styles.testimonial,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
          >
            <View style={styles.stars}>
              {Array(t.stars)
                .fill(0)
                .map((_, si) => (
                  <Ionicons key={si} name="star" size={14} color="#F5C842" />
                ))}
            </View>
            <Text style={[styles.testimonialText, { color: colors.foreground }]}>
              "{t.text}"
            </Text>
            <Text style={[styles.testimonialName, { color: colors.mutedForeground }]}>
              — {t.name}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  hero: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 32,
  },
  heroBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 16,
  },
  heroBadgeText: {
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  heroTitle: {
    fontSize: 38,
    fontWeight: "700",
    lineHeight: 44,
    marginBottom: 12,
    fontFamily: "PlayfairDisplay_700Bold",
  },
  heroSub: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 24,
  },
  heroCTA: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    alignSelf: "flex-start",
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 30,
  },
  heroCTAText: {
    fontSize: 15,
    fontWeight: "600",
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  processSection: {
    marginHorizontal: 0,
    paddingHorizontal: 24,
    borderRadius: 0,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 6,
    fontFamily: "PlayfairDisplay_700Bold",
  },
  sectionSub: {
    fontSize: 14,
    marginBottom: 16,
  },
  categoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginTop: 16,
  },
  categoryCard: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    gap: 8,
    minHeight: 110,
  },
  categoryIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  categoryLabel: {
    fontSize: 14,
    fontWeight: "700",
  },
  categoryDesc: {
    fontSize: 12,
    lineHeight: 17,
  },
  styleList: {
    gap: 12,
    marginTop: 4,
  },
  styleCard: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: "hidden",
  },
  styleCardContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    gap: 12,
  },
  styleCardLeft: {
    flex: 1,
    gap: 4,
  },
  styleTag: {
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    marginBottom: 2,
  },
  styleTagText: {
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 0.3,
    textTransform: "uppercase",
  },
  styleName: {
    fontSize: 16,
    fontWeight: "700",
    fontFamily: "PlayfairDisplay_700Bold",
  },
  styleDesc: {
    fontSize: 13,
  },
  styleOrderBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
  },
  styleOrderText: {
    fontSize: 13,
    fontWeight: "600",
  },
  processStep: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 16,
    marginTop: 20,
  },
  processNum: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  processNumText: {
    fontSize: 15,
    fontWeight: "700",
  },
  processText: { flex: 1 },
  processTitle: {
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 3,
  },
  processDesc: {
    fontSize: 13,
    lineHeight: 19,
  },
  testimonial: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    marginTop: 12,
    gap: 8,
  },
  stars: { flexDirection: "row", gap: 2 },
  testimonialText: {
    fontSize: 14,
    lineHeight: 21,
    fontStyle: "italic",
  },
  testimonialName: {
    fontSize: 13,
    fontWeight: "600",
  },
});
