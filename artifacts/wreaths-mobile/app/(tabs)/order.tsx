import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Linking,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useColors } from "@/hooks/useColors";

type ProductType =
  | "wreath"
  | "bow"
  | "table-setting"
  | "funeral-grave"
  | "lantern-decor"
  | "";

type OrderData = {
  productType: ProductType;
  wreathStyle: string;
  bowStyle: string;
  otherDescription: string;
  wreathSize: string;
  wreathCustomSize: string;
  bowSize: string;
  palette: string;
  accents: string[];
  placement: string;
  deliveryPreference: string;
  name: string;
  email: string;
  phone: string;
  notes: string;
  confirmFirst: boolean;
};

const PRODUCT_TYPES = [
  { id: "wreath", label: "Custom Wreath", desc: "Door wreaths in any style or theme", icon: "flower-outline" as const },
  { id: "bow", label: "Decorative Bow", desc: "For mailboxes, lanterns, chairs, gifts & more", icon: "ribbon-outline" as const },
  { id: "table-setting", label: "Table or Floral Setting", desc: "Centerpieces and floral arrangements", icon: "leaf-outline" as const },
  { id: "funeral-grave", label: "Funeral or Grave Setting", desc: "Heartfelt memorial arrangements", icon: "heart-outline" as const },
  { id: "lantern-decor", label: "Lantern Decor", desc: "Bow and floral arrangements for lanterns", icon: "sunny-outline" as const },
];

const WREATH_STYLES = [
  { id: "full-floral", name: "Full Floral", desc: "Lush and bursting with blooms" },
  { id: "everyday-greenery", name: "Everyday Greenery", desc: "Classic, timeless, and elegant" },
  { id: "seasonal", name: "Seasonal", desc: "Tailored for the current season" },
  { id: "coastal", name: "Coastal", desc: "Seashells, driftwood & ocean hues" },
  { id: "holiday", name: "Holiday", desc: "Festive and bright for celebrations" },
  { id: "farmhouse", name: "Farmhouse", desc: "Rustic charm with burlap & gingham" },
];

const BOW_STYLES = [
  { id: "coastal", name: "Coastal", desc: "Starfish, stripes & sea glass" },
  { id: "patriotic", name: "Patriotic / Americana", desc: "Stars, stripes & American pride" },
  { id: "floral", name: "Floral Garden", desc: "Florals, polka dots & garden hues" },
  { id: "farmhouse", name: "Farmhouse", desc: "Burlap, gingham & rustic charm" },
  { id: "holiday", name: "Holiday", desc: "Festive ribbons for any celebration" },
  { id: "custom", name: "Custom / Other", desc: "Describe your vision in notes" },
];

const WREATH_SIZES = [
  { id: "16", label: "16 inch", desc: "Cozy and charming. Great for smaller doors or indoors." },
  { id: "18", label: "18 inch", desc: "The most popular size. Perfect for standard doors." },
  { id: "20", label: "20 inch", desc: "A large statement piece. Hard to miss and easy to love." },
  { id: "custom", label: "Special / Event Size", desc: "Larger sizes for events or double doors. Debbie will quote you." },
];

const BOW_SIZES = [
  { id: "standard", label: "Standard", desc: "Great for mailboxes, gifts & small lanterns" },
  { id: "large", label: "Large", desc: "Perfect for chairs, pew ends & most doors" },
  { id: "xl", label: "Extra Large", desc: "Grand bows for oversized lanterns or special events" },
];

const PALETTES = [
  { id: "blush-cream", name: "Blush & Cream", hex: "#F5C6D0" },
  { id: "coastal-blues", name: "Coastal Blues", hex: "#90CAF9" },
  { id: "sage-eucalyptus", name: "Sage & Eucalyptus", hex: "#A5C8B0" },
  { id: "bold-vibrant", name: "Bold & Vibrant", hex: "#CE93D8" },
  { id: "autumn-harvest", name: "Autumn Harvest", hex: "#FFCC80" },
  { id: "classic-holiday", name: "Classic Holiday", hex: "#EF9A9A" },
  { id: "patriotic", name: "Red, White & Blue", hex: "#90CAF9" },
  { id: "neutral-natural", name: "Neutral & Natural", hex: "#D7CCC8" },
];

const ACCENTS = [
  "Wired Ribbon Bow", "Burlap Bow", "Seashells", "Dried Florals",
  "Pinecones", "Berries", "Small Lantern", "Monogram Letter",
  "Cotton Stems", "Faux Citrus / Lemon", "Butterfly Accent", "Sunflower",
];

const PLACEMENTS = [
  "Front Door (Everyday)", "Indoor Decor", "Mailbox", "Chair / Pew End",
  "Lantern", "Gift Packaging", "Wedding / Special Event", "Grave or Memorial",
];

const DELIVERY_OPTIONS = [
  { id: "ship", label: "Ship to Me", desc: "Standard shipping, with additional costs" },
  { id: "local", label: "Local Delivery (Eastern NC)", desc: "Available for multiple items. Debbie will arrange with you." },
];

const defaultData: OrderData = {
  productType: "",
  wreathStyle: "",
  bowStyle: "",
  otherDescription: "",
  wreathSize: "",
  wreathCustomSize: "",
  bowSize: "",
  palette: "",
  accents: [],
  placement: "",
  deliveryPreference: "",
  name: "",
  email: "",
  phone: "",
  notes: "",
  confirmFirst: false,
};

const TOTAL_STEPS = 7;

function SelectCard({
  selected,
  onPress,
  children,
  testID,
}: {
  selected: boolean;
  onPress: () => void;
  children: React.ReactNode;
  testID?: string;
}) {
  const colors = useColors();
  const scale = useRef(new Animated.Value(1)).current;

  const onPressIn = () =>
    Animated.spring(scale, { toValue: 0.97, useNativeDriver: true }).start();
  const onPressOut = () =>
    Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start();

  return (
    <Pressable
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      testID={testID}
    >
      <Animated.View
        style={[
          styles.selectCard,
          {
            backgroundColor: selected ? colors.primary + "14" : colors.card,
            borderColor: selected ? colors.primary : colors.border,
            borderWidth: selected ? 2 : 1,
            transform: [{ scale }],
          },
        ]}
      >
        {children}
      </Animated.View>
    </Pressable>
  );
}

function SuccessScreen({
  data,
  onReset,
}: {
  data: OrderData;
  onReset: () => void;
}) {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 : 0;

  const productLabel =
    PRODUCT_TYPES.find((p) => p.id === data.productType)?.label || "Order";

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={{
        paddingTop: topPad + 16,
        paddingHorizontal: 24,
        paddingBottom: bottomPad + 100,
        alignItems: "center",
      }}
      showsVerticalScrollIndicator={false}
    >
      <View
        style={[
          styles.successIcon,
          { backgroundColor: colors.primary + "20" },
        ]}
      >
        <Ionicons name="checkmark-circle" size={56} color={colors.primary} />
      </View>
      <Text style={[styles.successTitle, { color: colors.foreground }]}>
        Your Order is On Its Way!
      </Text>
      <Text style={[styles.successSub, { color: colors.mutedForeground }]}>
        Thank you,{" "}
        <Text style={{ fontWeight: "700", color: colors.foreground }}>
          {data.name || "friend"}
        </Text>
        ! Debbie will reach out within{" "}
        <Text style={{ fontWeight: "700" }}>24–48 hours</Text> by email, text,
        or phone to confirm your order.
      </Text>

      <View
        style={[
          styles.nextStepsCard,
          { backgroundColor: colors.card, borderColor: colors.border },
        ]}
      >
        <Text style={[styles.nextStepsTitle, { color: colors.foreground }]}>
          What happens next:
        </Text>
        {[
          "Debbie confirms your order details within 24–48 hrs",
          "Send payment before she begins (see options below)",
          `Your ${productLabel.toLowerCase()} is completed & shipped in 5–7 days`,
        ].map((step, i) => (
          <View key={i} style={styles.nextStep}>
            <View
              style={[
                styles.nextStepNum,
                { backgroundColor: colors.primary },
              ]}
            >
              <Text
                style={[
                  styles.nextStepNumText,
                  { color: colors.primaryForeground },
                ]}
              >
                {i + 1}
              </Text>
            </View>
            <Text
              style={[styles.nextStepText, { color: colors.mutedForeground }]}
            >
              {step}
            </Text>
          </View>
        ))}
        {data.confirmFirst && (
          <Text style={[styles.confirmFirstNote, { color: colors.primary }]}>
            Note: You requested to confirm details before sending payment. She'll
            reach out first.
          </Text>
        )}
      </View>

      <Text style={[styles.paymentTitle, { color: colors.foreground }]}>
        Payment Options
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
        testID="venmo-btn"
      >
        <Ionicons name="logo-venmo" size={20} color="#fff" />
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
            marginTop: 10,
          },
        ]}
        testID="cashapp-btn"
      >
        <Ionicons name="cash-outline" size={20} color="#fff" />
        <Text style={styles.payBtnText}>Pay with CashApp · $Didiswreaths1</Text>
      </Pressable>

      <Pressable
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          onReset();
        }}
        style={({ pressed }) => [
          styles.newOrderBtn,
          {
            borderColor: colors.primary,
            opacity: pressed ? 0.7 : 1,
            marginTop: 20,
          },
        ]}
        testID="new-order-btn"
      >
        <Text style={[styles.newOrderText, { color: colors.primary }]}>
          Place Another Order
        </Text>
      </Pressable>
    </ScrollView>
  );
}

export default function OrderScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{
    productType?: string;
    wreathStyle?: string;
  }>();

  const [step, setStep] = useState(1);
  const [data, setData] = useState<OrderData>({
    ...defaultData,
    productType: (params.productType as ProductType) || "",
    wreathStyle: params.wreathStyle || "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 : 0;

  useEffect(() => {
    if (params.productType) {
      setData((prev) => ({
        ...prev,
        productType: (params.productType as ProductType) || "",
        wreathStyle: params.wreathStyle || prev.wreathStyle,
      }));
      setStep(params.wreathStyle ? 3 : 2);
    }
  }, [params.productType, params.wreathStyle]);

  const update = (fields: Partial<OrderData>) =>
    setData((prev) => ({ ...prev, ...fields }));

  const isWreath = data.productType === "wreath";
  const isBow = data.productType === "bow";
  const isOther = ["table-setting", "funeral-grave", "lantern-decor"].includes(
    data.productType
  );

  const canAdvance = (): boolean => {
    if (step === 1) return !!data.productType;
    if (step === 2) {
      if (isWreath) return !!data.wreathStyle;
      if (isBow) return !!data.bowStyle;
      return true;
    }
    if (step === 3) {
      if (isWreath)
        return (
          !!data.wreathSize &&
          (data.wreathSize !== "custom" || !!data.wreathCustomSize)
        );
      if (isBow) return !!data.bowSize;
      return true;
    }
    if (step === 4) return !!data.palette;
    if (step === 6) return !!data.name && !!data.email;
    return true;
  };

  const nextStep = () => {
    if (canAdvance()) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      setStep((prev) => Math.min(prev + 1, TOTAL_STEPS));
    }
  };

  const prevStep = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const submitOrder = async () => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const domain = process.env.EXPO_PUBLIC_DOMAIN;
      const url = domain ? `https://${domain}/api/orders` : "/api/orders";
      const resp = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!resp.ok) {
        const err = await resp.json().catch(() => ({}));
        throw new Error(
          (err as { error?: string }).error ||
            "Something went wrong. Please try again."
        );
      }
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      setIsSubmitted(true);
    } catch (err) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <SuccessScreen
        data={data}
        onReset={() => {
          setIsSubmitted(false);
          setStep(1);
          setData(defaultData);
        }}
      />
    );
  }

  const productLabel =
    PRODUCT_TYPES.find((p) => p.id === data.productType)?.label || "Order";
  const stepLabels = [
    "Product",
    isWreath ? "Style" : isBow ? "Style" : "Details",
    "Size",
    "Colors",
    "Accents",
    "Contact",
    "Review",
  ];

  const progressPct = ((step - 1) / (TOTAL_STEPS - 1)) * 100;

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <View style={styles.stepContent}>
            <Text style={[styles.stepTitle, { color: colors.foreground }]}>
              What would you like to order?
            </Text>
            <Text style={[styles.stepSub, { color: colors.mutedForeground }]}>
              Debbie creates more than just wreaths.
            </Text>
            <View style={styles.cardList}>
              {PRODUCT_TYPES.map((pt) => (
                <SelectCard
                  key={pt.id}
                  selected={data.productType === pt.id}
                  onPress={() =>
                    update({ productType: pt.id as ProductType })
                  }
                  testID={`product-type-${pt.id}`}
                >
                  <View style={styles.cardRow}>
                    <View
                      style={[
                        styles.cardIcon,
                        {
                          backgroundColor:
                            data.productType === pt.id
                              ? colors.primary + "22"
                              : colors.muted,
                        },
                      ]}
                    >
                      <Ionicons
                        name={pt.icon}
                        size={22}
                        color={
                          data.productType === pt.id
                            ? colors.primary
                            : colors.mutedForeground
                        }
                      />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text
                        style={[styles.cardLabel, { color: colors.foreground }]}
                      >
                        {pt.label}
                      </Text>
                      <Text
                        style={[
                          styles.cardDesc,
                          { color: colors.mutedForeground },
                        ]}
                      >
                        {pt.desc}
                      </Text>
                    </View>
                    {data.productType === pt.id && (
                      <Ionicons
                        name="checkmark-circle"
                        size={22}
                        color={colors.primary}
                      />
                    )}
                  </View>
                </SelectCard>
              ))}
            </View>
          </View>
        );

      case 2:
        return (
          <View style={styles.stepContent}>
            <Text style={[styles.stepTitle, { color: colors.foreground }]}>
              {isWreath
                ? "Choose a Wreath Style"
                : isBow
                ? "Choose a Bow Style"
                : "Tell Debbie About Your Vision"}
            </Text>
            <Text style={[styles.stepSub, { color: colors.mutedForeground }]}>
              {isWreath
                ? "What overall feel are you drawn to?"
                : isBow
                ? "What vibe should the bow have?"
                : "Describe what you're envisioning."}
            </Text>
            {isWreath && (
              <View style={styles.cardList}>
                {WREATH_STYLES.map((s) => (
                  <SelectCard
                    key={s.id}
                    selected={data.wreathStyle === s.id}
                    onPress={() => update({ wreathStyle: s.id })}
                    testID={`wreath-style-${s.id}`}
                  >
                    <Text
                      style={[styles.cardLabel, { color: colors.foreground }]}
                    >
                      {s.name}
                    </Text>
                    <Text
                      style={[
                        styles.cardDesc,
                        { color: colors.mutedForeground },
                      ]}
                    >
                      {s.desc}
                    </Text>
                  </SelectCard>
                ))}
              </View>
            )}
            {isBow && (
              <View style={styles.cardList}>
                {BOW_STYLES.map((s) => (
                  <SelectCard
                    key={s.id}
                    selected={data.bowStyle === s.id}
                    onPress={() => update({ bowStyle: s.id })}
                    testID={`bow-style-${s.id}`}
                  >
                    <Text
                      style={[styles.cardLabel, { color: colors.foreground }]}
                    >
                      {s.name}
                    </Text>
                    <Text
                      style={[
                        styles.cardDesc,
                        { color: colors.mutedForeground },
                      ]}
                    >
                      {s.desc}
                    </Text>
                  </SelectCard>
                ))}
              </View>
            )}
            {isOther && (
              <TextInput
                value={data.otherDescription}
                onChangeText={(v) => update({ otherDescription: v })}
                placeholder="Tell Debbie what you're envisioning: theme, colors, occasion, size, any special elements..."
                placeholderTextColor={colors.mutedForeground}
                multiline
                numberOfLines={6}
                style={[
                  styles.textarea,
                  {
                    backgroundColor: colors.muted,
                    borderColor: colors.border,
                    color: colors.foreground,
                  },
                ]}
                testID="input-other-description"
              />
            )}
          </View>
        );

      case 3:
        return (
          <View style={styles.stepContent}>
            <Text style={[styles.stepTitle, { color: colors.foreground }]}>
              {isWreath
                ? "Choose a Wreath Size"
                : isBow
                ? "Choose a Bow Size"
                : "Dimensions & Details"}
            </Text>
            {isWreath && (
              <Text
                style={[styles.stepSub, { color: colors.mutedForeground }]}
              >
                All three standard sizes are the same price.
              </Text>
            )}
            {isWreath && (
              <View style={styles.cardList}>
                {WREATH_SIZES.map((s) => (
                  <SelectCard
                    key={s.id}
                    selected={data.wreathSize === s.id}
                    onPress={() => update({ wreathSize: s.id })}
                    testID={`wreath-size-${s.id}`}
                  >
                    <View style={styles.sizeRow}>
                      <View style={{ flex: 1 }}>
                        <Text
                          style={[
                            styles.cardLabel,
                            { color: colors.foreground },
                          ]}
                        >
                          {s.label}
                        </Text>
                        <Text
                          style={[
                            styles.cardDesc,
                            { color: colors.mutedForeground },
                          ]}
                        >
                          {s.desc}
                        </Text>
                        {s.id === "custom" && (
                          <Text
                            style={[
                              styles.quoteNote,
                              { color: colors.primary },
                            ]}
                          >
                            Debbie will provide a quote
                          </Text>
                        )}
                      </View>
                      {s.id !== "custom" && (
                        <View
                          style={[
                            styles.sizeBadge,
                            { borderColor: colors.primary },
                          ]}
                        >
                          <Text
                            style={[
                              styles.sizeBadgeText,
                              { color: colors.primary },
                            ]}
                          >
                            {s.id}"
                          </Text>
                        </View>
                      )}
                    </View>
                  </SelectCard>
                ))}
                {data.wreathSize === "custom" && (
                  <TextInput
                    value={data.wreathCustomSize}
                    onChangeText={(v) => update({ wreathCustomSize: v })}
                    placeholder='e.g. "24 inch for double doors"'
                    placeholderTextColor={colors.mutedForeground}
                    style={[
                      styles.input,
                      {
                        backgroundColor: colors.muted,
                        borderColor: colors.border,
                        color: colors.foreground,
                      },
                    ]}
                    testID="input-custom-size"
                  />
                )}
              </View>
            )}
            {isBow && (
              <View style={styles.cardList}>
                {BOW_SIZES.map((s) => (
                  <SelectCard
                    key={s.id}
                    selected={data.bowSize === s.id}
                    onPress={() => update({ bowSize: s.id })}
                    testID={`bow-size-${s.id}`}
                  >
                    <Text
                      style={[styles.cardLabel, { color: colors.foreground }]}
                    >
                      {s.label}
                    </Text>
                    <Text
                      style={[
                        styles.cardDesc,
                        { color: colors.mutedForeground },
                      ]}
                    >
                      {s.desc}
                    </Text>
                  </SelectCard>
                ))}
              </View>
            )}
            {isOther && (
              <Text style={[styles.stepSub, { color: colors.mutedForeground }]}>
                Debbie will discuss dimensions with you after she receives your
                order.
              </Text>
            )}
          </View>
        );

      case 4:
        return (
          <View style={styles.stepContent}>
            <Text style={[styles.stepTitle, { color: colors.foreground }]}>
              Choose a Color Palette
            </Text>
            <Text style={[styles.stepSub, { color: colors.mutedForeground }]}>
              What colors should your creation feature?
            </Text>
            <View style={styles.paletteGrid}>
              {PALETTES.map((p) => (
                <Pressable
                  key={p.id}
                  onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    update({ palette: p.id });
                  }}
                  style={[
                    styles.paletteCard,
                    {
                      borderColor:
                        data.palette === p.id ? colors.primary : colors.border,
                      borderWidth: data.palette === p.id ? 2 : 1,
                      backgroundColor: colors.card,
                    },
                  ]}
                  testID={`palette-${p.id}`}
                >
                  <View
                    style={[
                      styles.paletteSwatch,
                      { backgroundColor: p.hex },
                    ]}
                  />
                  <Text
                    style={[
                      styles.paletteName,
                      {
                        color:
                          data.palette === p.id
                            ? colors.primary
                            : colors.foreground,
                        fontWeight: data.palette === p.id ? "700" : "500",
                      },
                    ]}
                    numberOfLines={2}
                  >
                    {p.name}
                  </Text>
                  {data.palette === p.id && (
                    <Ionicons
                      name="checkmark-circle"
                      size={18}
                      color={colors.primary}
                      style={{ position: "absolute", top: 8, right: 8 }}
                    />
                  )}
                </Pressable>
              ))}
            </View>
          </View>
        );

      case 5:
        return (
          <View style={styles.stepContent}>
            <Text style={[styles.stepTitle, { color: colors.foreground }]}>
              Any Special Accents?
            </Text>
            <Text style={[styles.stepSub, { color: colors.mutedForeground }]}>
              Select any extras you'd love included (optional).
            </Text>
            <View style={styles.accentGrid}>
              {ACCENTS.map((a) => {
                const checked = data.accents.includes(a);
                return (
                  <Pressable
                    key={a}
                    onPress={() => {
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                      update({
                        accents: checked
                          ? data.accents.filter((x) => x !== a)
                          : [...data.accents, a],
                      });
                    }}
                    style={[
                      styles.accentChip,
                      {
                        backgroundColor: checked
                          ? colors.primary + "18"
                          : colors.muted,
                        borderColor: checked ? colors.primary : colors.border,
                        borderWidth: checked ? 1.5 : 1,
                      },
                    ]}
                    testID={`accent-${a.replace(/\s+/g, "-").toLowerCase()}`}
                  >
                    {checked && (
                      <Ionicons
                        name="checkmark"
                        size={13}
                        color={colors.primary}
                      />
                    )}
                    <Text
                      style={[
                        styles.accentText,
                        {
                          color: checked
                            ? colors.primary
                            : colors.mutedForeground,
                          fontWeight: checked ? "600" : "400",
                        },
                      ]}
                    >
                      {a}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            <Text
              style={[
                styles.subsectionTitle,
                { color: colors.foreground, marginTop: 20 },
              ]}
            >
              Where will it go?
            </Text>
            <View style={styles.cardList}>
              {PLACEMENTS.map((pl) => (
                <SelectCard
                  key={pl}
                  selected={data.placement === pl}
                  onPress={() => update({ placement: pl })}
                >
                  <Text
                    style={[styles.cardLabel, { color: colors.foreground }]}
                  >
                    {pl}
                  </Text>
                </SelectCard>
              ))}
            </View>
          </View>
        );

      case 6:
        return (
          <View style={styles.stepContent}>
            <Text style={[styles.stepTitle, { color: colors.foreground }]}>
              Your Contact Info
            </Text>
            <Text style={[styles.stepSub, { color: colors.mutedForeground }]}>
              So Debbie can reach you to confirm your order.
            </Text>
            <View style={styles.formFields}>
              <View>
                <Text style={[styles.fieldLabel, { color: colors.foreground }]}>
                  Full Name *
                </Text>
                <TextInput
                  value={data.name}
                  onChangeText={(v) => update({ name: v })}
                  placeholder="Your name"
                  placeholderTextColor={colors.mutedForeground}
                  style={[
                    styles.input,
                    {
                      backgroundColor: colors.muted,
                      borderColor: colors.border,
                      color: colors.foreground,
                    },
                  ]}
                  testID="input-name"
                />
              </View>
              <View>
                <Text style={[styles.fieldLabel, { color: colors.foreground }]}>
                  Email *
                </Text>
                <TextInput
                  value={data.email}
                  onChangeText={(v) => update({ email: v })}
                  placeholder="your@email.com"
                  placeholderTextColor={colors.mutedForeground}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  style={[
                    styles.input,
                    {
                      backgroundColor: colors.muted,
                      borderColor: colors.border,
                      color: colors.foreground,
                    },
                  ]}
                  testID="input-email"
                />
              </View>
              <View>
                <Text style={[styles.fieldLabel, { color: colors.foreground }]}>
                  Phone
                </Text>
                <TextInput
                  value={data.phone}
                  onChangeText={(v) => update({ phone: v })}
                  placeholder="(555) 000-0000"
                  placeholderTextColor={colors.mutedForeground}
                  keyboardType="phone-pad"
                  style={[
                    styles.input,
                    {
                      backgroundColor: colors.muted,
                      borderColor: colors.border,
                      color: colors.foreground,
                    },
                  ]}
                  testID="input-phone"
                />
              </View>
              <View>
                <Text style={[styles.fieldLabel, { color: colors.foreground }]}>
                  Delivery Preference
                </Text>
                {DELIVERY_OPTIONS.map((d) => (
                  <SelectCard
                    key={d.id}
                    selected={data.deliveryPreference === d.id}
                    onPress={() => update({ deliveryPreference: d.id })}
                  >
                    <Text
                      style={[styles.cardLabel, { color: colors.foreground }]}
                    >
                      {d.label}
                    </Text>
                    <Text
                      style={[
                        styles.cardDesc,
                        { color: colors.mutedForeground },
                      ]}
                    >
                      {d.desc}
                    </Text>
                  </SelectCard>
                ))}
              </View>
              <View>
                <Text style={[styles.fieldLabel, { color: colors.foreground }]}>
                  Additional Notes
                </Text>
                <TextInput
                  value={data.notes}
                  onChangeText={(v) => update({ notes: v })}
                  placeholder="Any other details, special requests, or questions for Debbie..."
                  placeholderTextColor={colors.mutedForeground}
                  multiline
                  numberOfLines={4}
                  style={[
                    styles.textarea,
                    {
                      backgroundColor: colors.muted,
                      borderColor: colors.border,
                      color: colors.foreground,
                    },
                  ]}
                  testID="input-notes"
                />
              </View>
              <Pressable
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  update({ confirmFirst: !data.confirmFirst });
                }}
                style={styles.checkboxRow}
                testID="checkbox-confirm-first"
              >
                <View
                  style={[
                    styles.checkbox,
                    {
                      backgroundColor: data.confirmFirst
                        ? colors.primary
                        : colors.muted,
                      borderColor: data.confirmFirst
                        ? colors.primary
                        : colors.border,
                    },
                  ]}
                >
                  {data.confirmFirst && (
                    <Ionicons name="checkmark" size={14} color="#fff" />
                  )}
                </View>
                <Text
                  style={[
                    styles.checkboxLabel,
                    { color: colors.mutedForeground },
                  ]}
                >
                  I'd like Debbie to confirm details with me before I send
                  payment
                </Text>
              </Pressable>
            </View>
          </View>
        );

      case 7:
        return (
          <View style={styles.stepContent}>
            <Text style={[styles.stepTitle, { color: colors.foreground }]}>
              Review Your Order
            </Text>
            <Text style={[styles.stepSub, { color: colors.mutedForeground }]}>
              Everything look right? Tap submit to send to Debbie.
            </Text>
            <View
              style={[
                styles.reviewCard,
                { backgroundColor: colors.muted, borderColor: colors.border },
              ]}
            >
              {[
                { label: "Product", value: productLabel },
                data.wreathStyle
                  ? {
                      label: "Style",
                      value: WREATH_STYLES.find(
                        (s) => s.id === data.wreathStyle
                      )?.name,
                    }
                  : null,
                data.bowStyle
                  ? {
                      label: "Bow Style",
                      value: BOW_STYLES.find((s) => s.id === data.bowStyle)
                        ?.name,
                    }
                  : null,
                data.wreathSize
                  ? {
                      label: "Size",
                      value:
                        data.wreathSize === "custom"
                          ? `Custom: ${data.wreathCustomSize}`
                          : WREATH_SIZES.find((s) => s.id === data.wreathSize)
                              ?.label,
                    }
                  : null,
                data.bowSize
                  ? {
                      label: "Bow Size",
                      value: BOW_SIZES.find((s) => s.id === data.bowSize)
                        ?.label,
                    }
                  : null,
                data.palette
                  ? {
                      label: "Palette",
                      value: PALETTES.find((p) => p.id === data.palette)?.name,
                    }
                  : null,
                data.accents.length > 0
                  ? { label: "Accents", value: data.accents.join(", ") }
                  : null,
                data.placement
                  ? { label: "Placement", value: data.placement }
                  : null,
                { label: "Name", value: data.name },
                { label: "Email", value: data.email },
                data.phone ? { label: "Phone", value: data.phone } : null,
                data.deliveryPreference
                  ? {
                      label: "Delivery",
                      value: DELIVERY_OPTIONS.find(
                        (d) => d.id === data.deliveryPreference
                      )?.label,
                    }
                  : null,
                data.notes
                  ? { label: "Notes", value: data.notes }
                  : null,
              ]
                .filter(Boolean)
                .map((row, i) => (
                  <View
                    key={i}
                    style={[
                      styles.reviewRow,
                      i > 0 && {
                        borderTopWidth: 1,
                        borderTopColor: colors.border,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.reviewLabel,
                        { color: colors.mutedForeground },
                      ]}
                    >
                      {row!.label}
                    </Text>
                    <Text
                      style={[
                        styles.reviewValue,
                        { color: colors.foreground },
                      ]}
                    >
                      {row!.value || "—"}
                    </Text>
                  </View>
                ))}
            </View>
            {submitError && (
              <Text style={[styles.errorText, { color: colors.destructive }]}>
                {submitError}
              </Text>
            )}
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View
        style={[
          styles.header,
          {
            backgroundColor: colors.background,
            borderBottomColor: colors.border,
            paddingTop: topPad + 12,
          },
        ]}
      >
        <Text style={[styles.headerTitle, { color: colors.foreground }]}>
          Custom Order
        </Text>
        <Text style={[styles.headerStep, { color: colors.mutedForeground }]}>
          {step} of {TOTAL_STEPS} — {stepLabels[step - 1]}
        </Text>
        <View
          style={[styles.progressBar, { backgroundColor: colors.muted }]}
        >
          <View
            style={[
              styles.progressFill,
              {
                backgroundColor: colors.primary,
                width: `${progressPct}%`,
              },
            ]}
          />
        </View>
      </View>

      {/* Step content */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingBottom: bottomPad + 100,
          paddingTop: 16,
        }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {renderStep()}
      </ScrollView>

      {/* Bottom nav */}
      <View
        style={[
          styles.bottomNav,
          {
            backgroundColor: colors.background,
            borderTopColor: colors.border,
            paddingBottom: Platform.OS === "web" ? 34 : insets.bottom + 8,
          },
        ]}
      >
        {step > 1 && (
          <Pressable
            onPress={prevStep}
            style={({ pressed }) => [
              styles.backBtn,
              { borderColor: colors.border, opacity: pressed ? 0.7 : 1 },
            ]}
            testID="btn-back"
          >
            <Ionicons
              name="arrow-back"
              size={18}
              color={colors.mutedForeground}
            />
          </Pressable>
        )}
        {step < TOTAL_STEPS ? (
          <Pressable
            onPress={nextStep}
            disabled={!canAdvance()}
            style={({ pressed }) => [
              styles.nextBtn,
              {
                backgroundColor: canAdvance()
                  ? colors.primary
                  : colors.muted,
                flex: 1,
                opacity: pressed ? 0.85 : 1,
              },
            ]}
            testID="btn-next"
          >
            <Text
              style={[
                styles.nextBtnText,
                {
                  color: canAdvance()
                    ? colors.primaryForeground
                    : colors.mutedForeground,
                },
              ]}
            >
              Continue
            </Text>
            <Ionicons
              name="arrow-forward"
              size={18}
              color={canAdvance() ? colors.primaryForeground : colors.mutedForeground}
            />
          </Pressable>
        ) : (
          <Pressable
            onPress={submitOrder}
            disabled={isSubmitting}
            style={({ pressed }) => [
              styles.nextBtn,
              {
                backgroundColor: colors.primary,
                flex: 1,
                opacity: isSubmitting ? 0.7 : pressed ? 0.85 : 1,
              },
            ]}
            testID="btn-submit"
          >
            {isSubmitting ? (
              <ActivityIndicator color={colors.primaryForeground} />
            ) : (
              <>
                <Text
                  style={[
                    styles.nextBtnText,
                    { color: colors.primaryForeground },
                  ]}
                >
                  Submit Order
                </Text>
                <Ionicons
                  name="send"
                  size={16}
                  color={colors.primaryForeground}
                />
              </>
            )}
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 12,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    fontFamily: "PlayfairDisplay_700Bold",
  },
  headerStep: {
    fontSize: 13,
    marginTop: 2,
    marginBottom: 10,
  },
  progressBar: {
    height: 4,
    borderRadius: 2,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 2,
  },
  stepContent: {
    gap: 16,
  },
  stepTitle: {
    fontSize: 20,
    fontWeight: "700",
    fontFamily: "PlayfairDisplay_700Bold",
    lineHeight: 26,
  },
  stepSub: {
    fontSize: 14,
    lineHeight: 20,
  },
  cardList: {
    gap: 10,
  },
  selectCard: {
    padding: 14,
    borderRadius: 14,
  },
  cardRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  cardIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  cardLabel: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 2,
  },
  cardDesc: {
    fontSize: 13,
    lineHeight: 18,
  },
  sizeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  sizeBadge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  sizeBadgeText: {
    fontSize: 13,
    fontWeight: "700",
  },
  quoteNote: {
    fontSize: 12,
    fontWeight: "600",
    marginTop: 2,
  },
  paletteGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 4,
  },
  paletteCard: {
    width: "47%",
    padding: 12,
    borderRadius: 14,
    gap: 8,
    position: "relative",
  },
  paletteSwatch: {
    height: 40,
    borderRadius: 10,
  },
  paletteName: {
    fontSize: 12,
    lineHeight: 16,
    textAlign: "center",
  },
  accentGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 4,
  },
  accentChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  accentText: {
    fontSize: 13,
  },
  subsectionTitle: {
    fontSize: 16,
    fontWeight: "700",
  },
  formFields: {
    gap: 16,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
  },
  textarea: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    textAlignVertical: "top",
    minHeight: 120,
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    marginTop: 1,
  },
  checkboxLabel: {
    flex: 1,
    fontSize: 13,
    lineHeight: 19,
  },
  reviewCard: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: "hidden",
  },
  reviewRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  reviewLabel: {
    fontSize: 13,
    fontWeight: "500",
    flexShrink: 0,
    width: 80,
  },
  reviewValue: {
    fontSize: 13,
    flex: 1,
    textAlign: "right",
    fontWeight: "500",
  },
  errorText: {
    fontSize: 14,
    textAlign: "center",
    fontWeight: "500",
  },
  bottomNav: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingTop: 12,
    borderTopWidth: 1,
    gap: 10,
  },
  backBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
  },
  nextBtn: {
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
  },
  nextBtnText: {
    fontSize: 16,
    fontWeight: "600",
  },
  successIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    marginTop: 16,
  },
  successTitle: {
    fontSize: 26,
    fontWeight: "700",
    textAlign: "center",
    fontFamily: "PlayfairDisplay_700Bold",
    marginBottom: 12,
  },
  successSub: {
    fontSize: 15,
    textAlign: "center",
    lineHeight: 23,
    marginBottom: 24,
  },
  nextStepsCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    width: "100%",
    marginBottom: 24,
    gap: 12,
  },
  nextStepsTitle: {
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 4,
  },
  nextStep: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  nextStepNum: {
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  nextStepNumText: {
    fontSize: 12,
    fontWeight: "700",
  },
  nextStepText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
  confirmFirstNote: {
    fontSize: 13,
    fontStyle: "italic",
    marginTop: 4,
  },
  paymentTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 12,
    alignSelf: "flex-start",
  },
  payBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    width: "100%",
    paddingVertical: 14,
    borderRadius: 30,
  },
  payBtnText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
  newOrderBtn: {
    borderWidth: 1.5,
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: 30,
  },
  newOrderText: {
    fontSize: 15,
    fontWeight: "600",
  },
});
