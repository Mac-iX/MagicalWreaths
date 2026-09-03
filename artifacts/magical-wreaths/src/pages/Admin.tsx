import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const SESSION_KEY = "admin_pw";

interface Order {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  productType: string | null;
  status: string;
  orderData: Record<string, unknown>;
  createdAt: string;
}

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

async function fetchOrders(password: string): Promise<Order[]> {
  const res = await fetch(`${BASE}/api/admin/orders`, {
    headers: { "x-admin-password": password },
  });
  if (res.status === 401) throw new Error("Unauthorized");
  if (!res.ok) throw new Error("Failed to fetch orders");
  return res.json();
}

async function updateStatus(
  id: number,
  status: string,
  password: string,
): Promise<void> {
  const res = await fetch(`${BASE}/api/admin/orders/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "x-admin-password": password,
    },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error("Failed to update");
}

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
  confirmed: "bg-blue-100 text-blue-800 border-blue-300",
  complete: "bg-green-100 text-green-800 border-green-300",
};

const NEXT_STATUS: Record<string, string> = {
  pending: "confirmed",
  confirmed: "complete",
  complete: "pending",
};

const STATUS_LABEL: Record<string, string> = {
  pending: "Mark Confirmed",
  confirmed: "Mark Complete",
  complete: "Reset to Pending",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function OrderCard({
  order,
  password,
}: {
  order: Order;
  password: string;
}) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (status: string) => updateStatus(order.id, status, password),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["orders"] }),
  });

  const d = order.orderData as Record<string, unknown>;
  const style = String(d.wreathStyle || d.bowStyle || d.otherDescription || "—");
  const size =
    d.wreathSize === "custom"
      ? `Custom — ${d.wreathCustomSize}`
      : String(d.wreathSize || d.bowSize || d.wreathCustomSize || "—");
  const accents =
    Array.isArray(d.accents) && d.accents.length > 0
      ? (d.accents as string[]).join(", ")
      : "None";

  return (
    <Card className="border border-[#e8d5c4] shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div>
            <CardTitle className="text-[#9b5e52] text-lg font-semibold">
              {order.name}
            </CardTitle>
            <p className="text-sm text-gray-500 mt-0.5">{formatDate(order.createdAt)}</p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={`text-xs font-semibold px-2.5 py-1 rounded-full border capitalize ${STATUS_COLORS[order.status] ?? "bg-gray-100 text-gray-700 border-gray-300"}`}
            >
              {order.status}
            </span>
            <Button
              size="sm"
              variant="outline"
              className="text-xs border-[#9b5e52] text-[#9b5e52] hover:bg-[#fdf6f0]"
              disabled={mutation.isPending}
              onClick={() => mutation.mutate(NEXT_STATUS[order.status] ?? "pending")}
            >
              {mutation.isPending ? "Saving…" : STATUS_LABEL[order.status] ?? "Update"}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-sm mb-3">
          <div>
            <span className="font-medium text-[#9b5e52]">Email: </span>
            <a href={`mailto:${order.email}`} className="text-blue-600 hover:underline">
              {order.email}
            </a>
          </div>
          {order.phone && (
            <div>
              <span className="font-medium text-[#9b5e52]">Phone: </span>
              {order.phone}
            </div>
          )}
          <div>
            <span className="font-medium text-[#9b5e52]">Product: </span>
            {order.productType || "—"}
          </div>
          <div>
            <span className="font-medium text-[#9b5e52]">Style: </span>
            {style}
          </div>
          <div>
            <span className="font-medium text-[#9b5e52]">Size: </span>
            {size}
          </div>
          <div>
            <span className="font-medium text-[#9b5e52]">Accents: </span>
            {accents}
          </div>
          {!!d.palette && (
            <div>
              <span className="font-medium text-[#9b5e52]">Palette: </span>
              {String(d.palette)}
            </div>
          )}
          {!!d.deliveryPreference && (
            <div>
              <span className="font-medium text-[#9b5e52]">Delivery: </span>
              {d.deliveryPreference === "ship"
                ? "Ship to Customer"
                : d.deliveryPreference === "local"
                  ? "Local Delivery (Eastern NC)"
                  : String(d.deliveryPreference)}
            </div>
          )}
        </div>
        {!!d.notes && (
          <p className="text-sm bg-[#fdf6f0] rounded-lg px-3 py-2 text-gray-700 italic border border-[#e8d5c4]">
            "{String(d.notes)}"
          </p>
        )}
        {!!d.confirmFirst && (
          <p className="text-xs mt-2 text-[#9b5e52] font-semibold">
            ⚠️ Customer requested to confirm details before payment
          </p>
        )}
      </CardContent>
    </Card>
  );
}

function Dashboard({ password }: { password: string }) {
  const [filter, setFilter] = useState<string>("all");

  const { data: orders, isLoading, error, refetch } = useQuery({
    queryKey: ["orders", password],
    queryFn: () => fetchOrders(password),
    retry: false,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <p className="text-gray-500 text-sm">Loading orders…</p>
      </div>
    );
  }

  if (error) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <div className="text-center">
          <p className="text-red-500 text-sm font-medium">{msg}</p>
          <Button variant="outline" size="sm" className="mt-3" onClick={() => refetch()}>
            Retry
          </Button>
        </div>
      </div>
    );
  }

  const statuses = ["all", "pending", "confirmed", "complete"];
  const filtered =
    filter === "all" ? (orders ?? []) : (orders ?? []).filter((o) => o.status === filter);

  const counts = (orders ?? []).reduce<Record<string, number>>((acc, o) => {
    acc[o.status] = (acc[o.status] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <div>
      {/* Filter tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {statuses.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors capitalize ${
              filter === s
                ? "bg-[#9b5e52] text-white border-[#9b5e52]"
                : "bg-white text-[#9b5e52] border-[#9b5e52] hover:bg-[#fdf6f0]"
            }`}
          >
            {s === "all" ? `All (${orders?.length ?? 0})` : `${s} (${counts[s] ?? 0})`}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-4xl mb-3">🌿</p>
          <p className="text-sm">No {filter === "all" ? "" : filter + " "}orders yet</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {filtered.map((order) => (
            <OrderCard key={order.id} order={order} password={password} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function Admin() {
  const [input, setInput] = useState("");
  const [password, setPassword] = useState(
    () => sessionStorage.getItem(SESSION_KEY) ?? "",
  );
  const [authError, setAuthError] = useState(false);

  if (!password) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fdf6f0]">
        <div className="w-full max-w-sm p-8 bg-white rounded-2xl shadow-md border border-[#e8d5c4]">
          <div className="text-center mb-6">
            <p className="text-3xl mb-2">🌿</p>
            <h1 className="text-xl font-semibold text-[#9b5e52]">Debbie's Order Dashboard</h1>
            <p className="text-sm text-gray-500 mt-1">Enter your admin password to continue</p>
          </div>
          {authError && (
            <p className="text-red-500 text-sm text-center mb-3">Incorrect password</p>
          )}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              // We'll validate by attempting a fetch; just store for now
              sessionStorage.setItem(SESSION_KEY, input);
              setPassword(input);
              setAuthError(false);
            }}
            className="flex flex-col gap-3"
          >
            <Input
              type="password"
              placeholder="Admin password"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              autoFocus
            />
            <Button
              type="submit"
              className="bg-[#9b5e52] hover:bg-[#7a4a40] text-white"
              disabled={!input}
            >
              Sign In
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fdf6f0]">
      <header className="bg-white border-b border-[#e8d5c4] px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl">🌿</span>
          <h1 className="text-lg font-semibold text-[#9b5e52]">Order Dashboard</h1>
        </div>
        <button
          onClick={() => {
            sessionStorage.removeItem(SESSION_KEY);
            setPassword("");
          }}
          className="text-sm text-gray-400 hover:text-gray-600"
        >
          Sign out
        </button>
      </header>
      <main className="max-w-3xl mx-auto px-4 py-8">
        <Dashboard
          password={password}
          key={password}
        />
      </main>
    </div>
  );
}
