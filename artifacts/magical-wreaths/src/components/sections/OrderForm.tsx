import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
  Palette,
  Ruler,
  Leaf,
  Sparkles,
  User,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Flower2,
  Heart,
  Lamp,
} from "lucide-react";

type ProductType = "wreath" | "bow" | "table-setting" | "funeral-grave" | "lantern-decor" | "";

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
  { id: "wreath", label: "Custom Wreath", desc: "Door wreaths in any style or theme", icon: <Flower2 className="w-6 h-6" /> },
  { id: "bow", label: "Decorative Bow", desc: "For mailboxes, lanterns, chairs, gifts & more", icon: <Leaf className="w-6 h-6" /> },
  { id: "table-setting", label: "Table or Floral Setting", desc: "Centerpieces and floral arrangements", icon: <Sparkles className="w-6 h-6" /> },
  { id: "funeral-grave", label: "Funeral or Grave Setting", desc: "Heartfelt memorial arrangements", icon: <Heart className="w-6 h-6" /> },
  { id: "lantern-decor", label: "Lantern Decor", desc: "Bow and floral arrangements for lanterns", icon: <Lamp className="w-6 h-6" /> },
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
  { id: "blush-cream", name: "Blush & Cream", color: "bg-rose-100 border-rose-300" },
  { id: "coastal-blues", name: "Coastal Blues", color: "bg-sky-200 border-sky-300" },
  { id: "sage-eucalyptus", name: "Sage & Eucalyptus", color: "bg-emerald-200 border-emerald-300" },
  { id: "bold-vibrant", name: "Bold & Vibrant", color: "bg-fuchsia-400 border-fuchsia-500" },
  { id: "autumn-harvest", name: "Autumn Harvest", color: "bg-orange-300 border-orange-400" },
  { id: "classic-holiday", name: "Classic Holiday", color: "bg-red-500 border-red-600" },
  { id: "patriotic", name: "Red, White & Blue", color: "bg-blue-600 border-blue-700" },
  { id: "neutral-natural", name: "Neutral & Natural", color: "bg-amber-100 border-amber-300" },
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

const DOT_PATTERN = `url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='12' cy='12' r='1' fill='%23c9a8a8' fill-opacity='0.13'/%3E%3C/svg%3E")`;

export function OrderForm({ preselectedStyle }: { preselectedStyle?: string }) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<OrderData>({
    ...defaultData,
    wreathStyle: preselectedStyle || "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const update = (fields: Partial<OrderData>) => setData(prev => ({ ...prev, ...fields }));

  const isWraeath = data.productType === "wreath";
  const isBow = data.productType === "bow";
  const isOther = ["table-setting", "funeral-grave", "lantern-decor"].includes(data.productType);

  const canAdvance = (): boolean => {
    if (step === 1) return !!data.productType;
    if (step === 2) {
      if (isWraeath) return !!data.wreathStyle;
      if (isBow) return !!data.bowStyle;
      return true;
    }
    if (step === 3) {
      if (isWraeath) return !!data.wreathSize && (data.wreathSize !== "custom" || !!data.wreathCustomSize);
      if (isBow) return !!data.bowSize;
      return true;
    }
    if (step === 4) return !!data.palette;
    if (step === 6) return !!data.name && !!data.email;
    return true;
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, TOTAL_STEPS));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));
  const submitOrder = async () => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const resp = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!resp.ok) {
        const err = await resp.json().catch(() => ({}));
        throw new Error((err as { error?: string }).error || "Something went wrong. Please try again.");
      }
      setIsSubmitted(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const productLabel = PRODUCT_TYPES.find(p => p.id === data.productType)?.label || "Order";

  const stepLabels = [
    { num: 1, title: "Product" },
    { num: 2, title: isWraeath ? "Style" : isBow ? "Style" : "Details" },
    { num: 3, title: "Size" },
    { num: 4, title: "Colors" },
    { num: 5, title: "Accents" },
    { num: 6, title: "Contact" },
    { num: 7, title: "Review" },
  ];

  if (isSubmitted) {
    return (
      <div className="py-24 px-6 max-w-2xl mx-auto text-center" id="order">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-primary/10 rounded-3xl p-12 flex flex-col items-center"
        >
          <div className="w-20 h-20 bg-primary/20 text-primary rounded-full flex items-center justify-center mb-6">
            <CheckCircle2 size={40} />
          </div>
          <h2 className="text-4xl font-serif text-foreground mb-4">Your Order is On Its Way!</h2>
          <p className="text-lg text-muted-foreground mb-6">
            Thank you, <span className="font-semibold text-foreground">{data.name || "friend"}</span>! Debbie will reach out within <strong>24–48 hours</strong> by email, text, or phone to confirm your order.
          </p>
          <div className="bg-white rounded-2xl p-5 text-sm text-left space-y-2 w-full mb-6">
            <p className="font-semibold text-foreground text-base mb-3">What happens next:</p>
            <p>1. Debbie confirms your order details within 24–48 hrs</p>
            <p>2. Send payment before she begins (see options below)</p>
            <p>3. Your {productLabel.toLowerCase()} is completed & shipped in <strong>5–7 days</strong></p>
            {data.confirmFirst && <p className="text-primary italic">Note: You requested to confirm details before sending payment. She'll reach out to you first.</p>}
          </div>

          {/* Payment options */}
          <div className="w-full mb-8">
            <p className="text-sm font-semibold text-foreground mb-3 text-center">Payment Options</p>
            <div className="flex flex-col sm:flex-row gap-3 w-full">
              <a
                href="https://venmo.com/code?user_id=4171770093373114764&created=1780754179"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 bg-[#3D95CE] hover:bg-[#2e80b5] text-white font-semibold rounded-2xl py-3 px-5 transition-colors text-sm"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.4 2C20.1 3.3 20.4 4.6 20.4 6.3c0 5-4.3 11.5-7.8 16H5.9L3 2.6l6.3-.6 1.5 12c1.4-2.4 3.2-6.1 3.2-8.6 0-1.4-.2-2.3-.6-3.1L19.4 2z"/>
                </svg>
                Pay with Venmo
              </a>
              <a
                href="https://cash.app/$Didiswreaths1"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 bg-[#00D632] hover:bg-[#00b82b] text-white font-semibold rounded-2xl py-3 px-5 transition-colors text-sm"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.9 7.1l-1-3.8C17.6 2.5 16.8 2 16 2H8c-.8 0-1.6.5-1.9 1.3l-1 3.8C4.4 8 5.3 9 6.4 9H7v2H6c-.6 0-1 .4-1 1s.4 1 1 1h1v2H6c-.6 0-1 .4-1 1s.4 1 1 1h1v1c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2v-1h1c.6 0 1-.4 1-1s-.4-1-1-1h-1v-2h1c.6 0 1-.4 1-1s-.4-1-1-1h-1V9h.6c1.1 0 2-1 1.7-1.9zM14 9h-4V7h4v2z"/>
                </svg>
                Pay with CashApp · $Didiswreaths1
              </a>
            </div>
          </div>

          <Button
            onClick={() => { setIsSubmitted(false); setStep(1); setData(defaultData); }}
            variant="outline"
            className="rounded-full px-8 border-primary text-primary hover:bg-primary/10"
            data-testid="button-new-order"
          >
            Place Another Order
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <section
      className="py-16 md:py-24 px-4 sm:px-6 relative overflow-hidden"
      id="order"
      style={{ backgroundImage: DOT_PATTERN, backgroundColor: "#fefcf9" }}
    >
      {/* Soft background blobs */}
      <div className="absolute top-0 left-0 w-80 h-80 rounded-full bg-primary/6 blur-[90px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-secondary/10 blur-[90px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-8 md:mb-14">
          <svg className="w-8 h-8 text-primary/40 mx-auto mb-3" viewBox="0 0 32 32" fill="currentColor">
            <path d="M16 2 C16 2 13 8 8 10 C13 12 16 18 16 18 C16 18 19 12 24 10 C19 8 16 2 16 2Z" opacity="0.6"/>
            <path d="M16 14 C16 14 14 17 11 18 C14 19 16 22 16 22 C16 22 18 19 21 18 C18 17 16 14 16 14Z"/>
          </svg>
          <span className="text-primary font-medium tracking-wider uppercase text-sm mb-2 block">Custom Orders</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-foreground mb-4">Design Your Order</h2>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-16 bg-primary/30"></div>
            <svg className="w-4 h-4 text-primary/50" viewBox="0 0 16 16" fill="currentColor"><circle cx="8" cy="8" r="3"/></svg>
            <div className="h-px w-16 bg-primary/30"></div>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg">
            Wreaths, bows, table settings, memorial arrangements, and more — made with heart.
          </p>
        </div>

        {/* Progress Bar — compact pill on mobile, full circles on sm+ */}
        <div className="mb-6 md:mb-10">
          {/* Mobile: pill progress indicator */}
          <div className="flex sm:hidden items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full border-2 border-primary bg-white flex items-center justify-center text-xs font-bold text-primary">
                {step}
              </div>
              <div>
                <p className="text-xs text-muted-foreground leading-none">Step {step} of {TOTAL_STEPS}</p>
                <p className="text-sm font-semibold text-foreground leading-snug">{stepLabels[step - 1].title}</p>
              </div>
            </div>
            <div className="text-xs text-muted-foreground">{Math.round(((step - 1) / (TOTAL_STEPS - 1)) * 100)}% done</div>
          </div>
          <div className="w-full h-1.5 bg-muted rounded-full sm:hidden overflow-hidden mb-2">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${((step - 1) / (TOTAL_STEPS - 1)) * 100}%` }}
            />
          </div>

          {/* Desktop: full step circles */}
          <div className="hidden sm:flex justify-between items-center relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-muted -z-10 rounded-full"></div>
            <div
              className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary -z-10 rounded-full transition-all duration-500"
              style={{ width: `${((step - 1) / (TOTAL_STEPS - 1)) * 100}%` }}
            ></div>
            {stepLabels.map((s) => (
              <div
                key={s.num}
                className={`flex flex-col items-center gap-1.5 transition-colors duration-300 ${step >= s.num ? "text-primary" : "text-muted-foreground"}`}
              >
                <div className={`w-9 h-9 rounded-full flex items-center justify-center border-2 text-xs font-bold transition-all duration-300 bg-white ${step >= s.num ? "border-primary text-primary shadow-sm" : "border-muted text-muted-foreground"}`}>
                  {step > s.num ? <CheckCircle2 className="w-4 h-4" /> : s.num}
                </div>
                <span className="text-[10px] font-medium">{s.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl shadow-xl shadow-primary/5 border border-primary/10 overflow-hidden min-h-[420px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.28 }}
              className="p-5 sm:p-8 md:p-12"
            >

              {/* Step 1: Product Type */}
              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-serif text-foreground mb-1">What would you like to order?</h3>
                    <p className="text-muted-foreground">Debbie creates more than just wreaths. Choose what you need.</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {PRODUCT_TYPES.map((pt) => (
                      <Card
                        key={pt.id}
                        className={`cursor-pointer transition-all duration-200 hover:shadow-md ${data.productType === pt.id ? "ring-2 ring-primary border-transparent bg-primary/5" : "hover:border-primary/40"}`}
                        onClick={() => update({ productType: pt.id as ProductType })}
                        data-testid={`product-type-${pt.id}`}
                      >
                        <CardContent className="p-5 flex items-start gap-4">
                          <div className={`mt-0.5 p-2 rounded-xl transition-colors ${data.productType === pt.id ? "bg-primary text-white" : "bg-muted text-muted-foreground"}`}>
                            {pt.icon}
                          </div>
                          <div>
                            <h4 className="font-serif text-base text-foreground mb-0.5">{pt.label}</h4>
                            <p className="text-xs text-muted-foreground">{pt.desc}</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Style */}
              {step === 2 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-serif text-foreground mb-1">
                      {isWraeath ? "Choose a Wreath Style" : isBow ? "Choose a Bow Style" : "Tell Debbie About Your Vision"}
                    </h3>
                    <p className="text-muted-foreground">
                      {isWraeath ? "What overall feel are you drawn to?" : isBow ? "What vibe should the bow have?" : "Describe what you're envisioning and she'll bring it to life."}
                    </p>
                  </div>

                  {isWraeath && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {WREATH_STYLES.map((s) => (
                        <Card
                          key={s.id}
                          className={`cursor-pointer transition-all duration-200 hover:shadow-md ${data.wreathStyle === s.id ? "ring-2 ring-primary border-transparent bg-primary/5" : "hover:border-primary/30"}`}
                          onClick={() => update({ wreathStyle: s.id })}
                          data-testid={`wreath-style-${s.id}`}
                        >
                          <CardContent className="p-5">
                            <h4 className="font-serif text-base text-foreground mb-1">{s.name}</h4>
                            <p className="text-xs text-muted-foreground">{s.desc}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}

                  {isBow && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {BOW_STYLES.map((s) => (
                        <Card
                          key={s.id}
                          className={`cursor-pointer transition-all duration-200 hover:shadow-md ${data.bowStyle === s.id ? "ring-2 ring-primary border-transparent bg-primary/5" : "hover:border-primary/30"}`}
                          onClick={() => update({ bowStyle: s.id })}
                          data-testid={`bow-style-${s.id}`}
                        >
                          <CardContent className="p-5">
                            <h4 className="font-serif text-base text-foreground mb-1">{s.name}</h4>
                            <p className="text-xs text-muted-foreground">{s.desc}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}

                  {isOther && (
                    <div className="space-y-4">
                      <Textarea
                        value={data.otherDescription}
                        onChange={(e) => update({ otherDescription: e.target.value })}
                        placeholder="Tell Debbie what you're envisioning: theme, colors, occasion, size, any special elements..."
                        className="min-h-[160px] bg-muted/30 text-base"
                        data-testid="input-other-description"
                      />
                      <p className="text-xs text-muted-foreground">She'll reach out within 24–48 hrs to discuss details and pricing.</p>
                    </div>
                  )}
                </div>
              )}

              {/* Step 3: Size */}
              {step === 3 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-serif text-foreground mb-1">
                      {isWraeath ? "Choose a Wreath Size" : isBow ? "Choose a Bow Size" : "Dimensions & Details"}
                    </h3>
                    {isWraeath && (
                      <p className="text-muted-foreground">All three standard sizes are the same price. Choose what fits your space best.</p>
                    )}
                  </div>

                  {isWraeath && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {WREATH_SIZES.map((s) => (
                        <Card
                          key={s.id}
                          className={`cursor-pointer transition-all duration-200 hover:shadow-md ${data.wreathSize === s.id ? "ring-2 ring-primary border-transparent bg-primary/5" : "hover:border-primary/30"}`}
                          onClick={() => update({ wreathSize: s.id })}
                          data-testid={`wreath-size-${s.id}`}
                        >
                          <CardContent className="p-5 flex items-center justify-between gap-4">
                            <div>
                              <h4 className="font-serif text-lg text-foreground mb-0.5">{s.label}</h4>
                              <p className="text-xs text-muted-foreground">{s.desc}</p>
                              {s.id === "custom" && <p className="text-xs text-primary font-semibold mt-1">Debbie will provide a quote</p>}
                            </div>
                            {s.id !== "custom" && (
                              <div className="shrink-0 w-12 h-12 rounded-full border-2 border-dashed border-primary flex items-center justify-center text-primary font-bold text-sm">
                                {s.id}"
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                      {data.wreathSize === "custom" && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="md:col-span-2 space-y-2"
                        >
                          <Label htmlFor="custom-size">Describe the size or event</Label>
                          <Input
                            id="custom-size"
                            value={data.wreathCustomSize}
                            onChange={(e) => update({ wreathCustomSize: e.target.value })}
                            placeholder="e.g. 28 inch for double doors at a wedding venue..."
                            className="bg-muted/30"
                            data-testid="input-custom-size"
                          />
                        </motion.div>
                      )}
                    </div>
                  )}

                  {isBow && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {BOW_SIZES.map((s) => (
                        <Card
                          key={s.id}
                          className={`cursor-pointer transition-all duration-200 hover:shadow-md ${data.bowSize === s.id ? "ring-2 ring-primary border-transparent bg-primary/5" : "hover:border-primary/30"}`}
                          onClick={() => update({ bowSize: s.id })}
                          data-testid={`bow-size-${s.id}`}
                        >
                          <CardContent className="p-5">
                            <h4 className="font-serif text-lg text-foreground mb-1">{s.label}</h4>
                            <p className="text-xs text-muted-foreground">{s.desc}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}

                  {isOther && (
                    <Textarea
                      value={data.wreathCustomSize}
                      onChange={(e) => update({ wreathCustomSize: e.target.value })}
                      placeholder="Any sizing, quantity, or dimension details you'd like Debbie to know..."
                      className="min-h-[120px] bg-muted/30"
                      data-testid="input-other-size"
                    />
                  )}
                </div>
              )}

              {/* Step 4: Colors */}
              {step === 4 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-serif text-foreground mb-1">Pick a Color Palette</h3>
                    <p className="text-muted-foreground">What hues speak to you? You can describe specifics in the notes.</p>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                    {PALETTES.map((p) => (
                      <div
                        key={p.id}
                        className="group flex flex-col items-center gap-3 cursor-pointer"
                        onClick={() => update({ palette: p.name })}
                        data-testid={`palette-${p.id}`}
                      >
                        <div className={`w-16 h-16 rounded-full border-2 shadow-inner transition-all duration-200 group-hover:scale-110 ${p.color} ${data.palette === p.name ? "ring-4 ring-offset-2 ring-primary scale-110" : ""}`}></div>
                        <span className={`text-xs font-medium text-center leading-tight ${data.palette === p.name ? "text-primary" : "text-foreground"}`}>{p.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 5: Accents & Placement */}
              {step === 5 && (
                <div className="space-y-8">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-2xl font-serif text-foreground mb-1">Accents & Extras</h3>
                      <p className="text-muted-foreground">Any special touches? Pick as many as you like.</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {ACCENTS.map((accent) => (
                        <div
                          key={accent}
                          className="flex items-center gap-3 p-3 rounded-xl border border-border hover:bg-muted/40 transition-colors cursor-pointer"
                          onClick={() => {
                            const has = data.accents.includes(accent);
                            update({ accents: has ? data.accents.filter(a => a !== accent) : [...data.accents, accent] });
                          }}
                        >
                          <Checkbox
                            id={`accent-${accent}`}
                            checked={data.accents.includes(accent)}
                            onCheckedChange={(checked) => {
                              update({ accents: checked ? [...data.accents, accent] : data.accents.filter(a => a !== accent) });
                            }}
                            data-testid={`accent-${accent.replace(/\s+/g, '-').toLowerCase()}`}
                          />
                          <Label htmlFor={`accent-${accent}`} className="cursor-pointer text-sm font-medium">{accent}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3 pt-2 border-t border-border">
                    <h4 className="font-serif text-lg text-foreground">Where will this be placed?</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {PLACEMENTS.map((p) => (
                        <div
                          key={p}
                          className={`p-3 rounded-xl border cursor-pointer transition-colors text-sm font-medium ${data.placement === p ? "bg-primary text-primary-foreground border-primary" : "hover:bg-muted border-border"}`}
                          onClick={() => update({ placement: p })}
                          data-testid={`placement-${p.replace(/[\s/()]/g, '-').toLowerCase()}`}
                        >
                          {p}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 6: Contact & Delivery */}
              {step === 6 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-serif text-foreground mb-1">Your Details & Delivery</h3>
                    <p className="text-muted-foreground">How should Debbie reach you, and how would you like to receive your order?</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name <span className="text-primary">*</span></Label>
                      <Input id="name" value={data.name} onChange={(e) => update({ name: e.target.value })} placeholder="Jane Doe" className="bg-muted/30" data-testid="input-name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address <span className="text-primary">*</span></Label>
                      <Input id="email" type="email" value={data.email} onChange={(e) => update({ email: e.target.value })} placeholder="jane@example.com" className="bg-muted/30" data-testid="input-email" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="phone">Phone / Text Number</Label>
                      <Input id="phone" type="tel" value={data.phone} onChange={(e) => update({ phone: e.target.value })} placeholder="(910) 555-0123" className="bg-muted/30" data-testid="input-phone" />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium text-foreground">Shipping Preference</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {DELIVERY_OPTIONS.map((opt) => (
                        <div
                          key={opt.id}
                          className={`p-4 rounded-xl border cursor-pointer transition-all ${data.deliveryPreference === opt.id ? "ring-2 ring-primary bg-primary/5 border-transparent" : "hover:border-primary/30 border-border"}`}
                          onClick={() => update({ deliveryPreference: opt.id })}
                          data-testid={`delivery-${opt.id}`}
                        >
                          <p className="font-semibold text-sm text-foreground">{opt.label}</p>
                          <p className="text-xs text-muted-foreground mt-1">{opt.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Special Requests or Notes</Label>
                    <Textarea
                      id="notes"
                      value={data.notes}
                      onChange={(e) => update({ notes: e.target.value })}
                      placeholder="Any specific details, color preferences, or anything else Debbie should know..."
                      className="min-h-[100px] bg-muted/30"
                      data-testid="input-notes"
                    />
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-primary/5 rounded-xl border border-primary/20">
                    <Checkbox
                      id="confirm-first"
                      checked={data.confirmFirst}
                      onCheckedChange={(checked) => update({ confirmFirst: !!checked })}
                      data-testid="checkbox-confirm-first"
                    />
                    <div>
                      <Label htmlFor="confirm-first" className="cursor-pointer font-medium text-sm">I'd like Debbie to confirm details before I send payment</Label>
                      <p className="text-xs text-muted-foreground mt-0.5">She'll reach out first. No payment needed until you're both ready.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 7: Review */}
              {step === 7 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-serif text-foreground mb-1">Review Your Order</h3>
                    <p className="text-muted-foreground">Make sure everything looks right before sending it to Debbie.</p>
                  </div>

                  <div className="bg-muted/30 rounded-2xl p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5 text-sm">
                    <div>
                      <span className="text-xs uppercase tracking-wider text-muted-foreground block mb-1">Order Type</span>
                      <p className="font-serif text-lg text-foreground">{PRODUCT_TYPES.find(p => p.id === data.productType)?.label}</p>
                    </div>
                    {isWraeath && (
                      <>
                        <div>
                          <span className="text-xs uppercase tracking-wider text-muted-foreground block mb-1">Style</span>
                          <p className="font-serif text-lg text-foreground">{WREATH_STYLES.find(s => s.id === data.wreathStyle)?.name || "—"}</p>
                        </div>
                        <div>
                          <span className="text-xs uppercase tracking-wider text-muted-foreground block mb-1">Size</span>
                          <p className="font-serif text-lg text-foreground">
                            {data.wreathSize === "custom" ? `Custom — ${data.wreathCustomSize}` : WREATH_SIZES.find(s => s.id === data.wreathSize)?.label || "—"}
                          </p>
                        </div>
                      </>
                    )}
                    {isBow && (
                      <>
                        <div>
                          <span className="text-xs uppercase tracking-wider text-muted-foreground block mb-1">Bow Style</span>
                          <p className="font-serif text-lg text-foreground">{BOW_STYLES.find(s => s.id === data.bowStyle)?.name || "—"}</p>
                        </div>
                        <div>
                          <span className="text-xs uppercase tracking-wider text-muted-foreground block mb-1">Bow Size</span>
                          <p className="font-serif text-lg text-foreground">{BOW_SIZES.find(s => s.id === data.bowSize)?.label || "—"}</p>
                        </div>
                      </>
                    )}
                    <div>
                      <span className="text-xs uppercase tracking-wider text-muted-foreground block mb-1">Color Palette</span>
                      <p className="font-serif text-lg text-foreground">{data.palette || "—"}</p>
                    </div>
                    <div>
                      <span className="text-xs uppercase tracking-wider text-muted-foreground block mb-1">Placement</span>
                      <p className="font-serif text-lg text-foreground">{data.placement || "—"}</p>
                    </div>
                    {data.accents.length > 0 && (
                      <div className="md:col-span-2">
                        <span className="text-xs uppercase tracking-wider text-muted-foreground block mb-1">Accents</span>
                        <p className="text-foreground">{data.accents.join(", ")}</p>
                      </div>
                    )}
                    <div className="md:col-span-2 pt-4 border-t border-border">
                      <span className="text-xs uppercase tracking-wider text-muted-foreground block mb-1">Contact</span>
                      <p className="text-foreground font-medium">{data.name} &bull; {data.email}</p>
                      {data.phone && <p className="text-muted-foreground">{data.phone}</p>}
                    </div>
                    <div className="md:col-span-2">
                      <span className="text-xs uppercase tracking-wider text-muted-foreground block mb-1">Delivery</span>
                      <p className="text-foreground">{DELIVERY_OPTIONS.find(o => o.id === data.deliveryPreference)?.label || "Not specified"}</p>
                    </div>
                    {data.notes && (
                      <div className="md:col-span-2">
                        <span className="text-xs uppercase tracking-wider text-muted-foreground block mb-1">Notes</span>
                        <p className="text-foreground italic">{data.notes}</p>
                      </div>
                    )}
                    {data.confirmFirst && (
                      <div className="md:col-span-2 bg-primary/10 rounded-xl p-3">
                        <p className="text-primary text-sm font-medium">Debbie will confirm details with you before you send payment.</p>
                      </div>
                    )}
                  </div>

                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-900">
                    <p className="font-semibold mb-1">After you submit:</p>
                    <ol className="space-y-1 list-decimal list-inside">
                      <li>Debbie confirms your order within <strong>24–48 hours</strong> via email, text, or phone</li>
                      <li>Payment via Venmo or CashApp ($Didiswreaths1) before she begins</li>
                      <li>Completed & shipped within <strong>5–7 days</strong> of confirmation</li>
                      <li>Eastern NC customers may arrange local delivery for multiple items</li>
                    </ol>
                  </div>
                </div>
              )}

            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="bg-muted/20 px-8 py-5 border-t border-border flex justify-between items-center">
            <Button
              variant="ghost"
              onClick={prevStep}
              disabled={step === 1}
              className={`rounded-full ${step === 1 ? "opacity-0 pointer-events-none" : ""}`}
              data-testid="button-form-prev"
            >
              <ChevronLeft className="mr-1 h-4 w-4" /> Back
            </Button>

            {step < TOTAL_STEPS ? (
              <Button
                onClick={nextStep}
                disabled={!canAdvance()}
                className="rounded-full bg-primary hover:bg-primary/90 text-white px-8 disabled:opacity-40"
                data-testid="button-form-next"
              >
                Continue <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            ) : (
              <div className="flex flex-col items-end gap-2">
                {submitError && (
                  <p className="text-sm text-red-600 text-right max-w-xs">{submitError}</p>
                )}
                <Button
                  onClick={submitOrder}
                  disabled={!data.name || !data.email || isSubmitting}
                  className="rounded-full bg-primary hover:bg-primary/90 text-white px-8 font-medium shadow-md shadow-primary/20 disabled:opacity-40"
                  data-testid="button-form-submit"
                >
                  {isSubmitting ? "Sending…" : "Send to Debbie"}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
