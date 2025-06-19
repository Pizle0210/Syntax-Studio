import NavigationHeader from "@/components/navigation-header";
import { api } from "@/convex/_generated/api";
import { currentUser } from "@clerk/nextjs/server";
import { ConvexHttpClient } from "convex/browser";
import { Star } from "lucide-react";
import ProPlanView from "./_components/ProPlanView";
import { ENTERPRISE_FEATURES, FEATURES } from "./_constants";
import FeatureCategory from "./_components/FeatureCategory";
import FeatureItem from "./_components/FeatureItem";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import UpgradeButton from "./_components/UpgradeButton";
import LoginButton from "@/components/LoginButton";

export default async function PricingPage() {
  const user = await currentUser();
  const convex = new ConvexHttpClient(
    process.env.NEXT_PUBLIC_CONVEX_URL! || "",
  );
  const convexUser = await convex.query(api.users.getUser, {
    userId: user?.id ?? "",
  });

  // if user has subscribed
  if (convexUser?.isPro) return <ProPlanView />;

  return (
    <div className="relative min-h-screen bg-[#0a0a0f] selection:bg-blue-500/20 selection:text-blue-200">
      <NavigationHeader />

      {/* main content */}

      <main className="relative px-4 pb-24 pt-32">
        <div className="mx-auto max-w-7xl">
          {/* Hero   */}
          <div className="mb-24 text-center">
            <div className="relative inline-block">
              <div className="absolute -inset-px bg-gradient-to-r from-blue-500 to-purple-500 opacity-10 blur-xl" />
              <h1 className="relative mb-8 bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-5xl font-semibold text-transparent md:text-6xl lg:text-7xl">
                Elevate Your <br />
                Development Experience
              </h1>
            </div>
            <p className="mx-auto max-w-3xl text-xl text-gray-400">
              Step into the next era of development with our all-in-one toolkit.
            </p>
          </div>

          {/* Enterprise Features */}
          <div className="mb-24 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {ENTERPRISE_FEATURES.map((feature) => (
              <div
                key={feature.label}
                className="group relative rounded-2xl bg-gradient-to-b from-[#12121a] to-[#0a0a0f] p-6 transition-all duration-300 hover:scale-[1.02] hover:transform"
              >
                <div className="relative">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 ring-1 ring-gray-800/60 group-hover:ring-blue-500/20">
                    <feature.icon className="h-6 w-6 text-blue-400" />
                  </div>

                  <h3 className="mb-2 text-lg font-medium text-white">
                    {feature.label}
                  </h3>
                  <p className="text-gray-400">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Pricing Card */}

          <div className="relative mx-auto max-w-4xl">
            <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 opacity-10 blur" />
            <div className="relative rounded-2xl bg-[#12121a]/90 backdrop-blur-xl">
              <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
              <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />

              <div className="relative p-8 md:p-12">
                {/* header */}
                <div className="mb-12 text-center">
                  <div className="mb-6 inline-flex rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 p-3 ring-1 ring-gray-800/60">
                    <Star className="h-8 w-8 text-blue-400" />
                  </div>
                  <h2 className="mb-4 text-3xl font-semibold text-white">
                    One-Time Payment. Lifetime Power.
                  </h2>
                  <div className="mb-4 flex items-baseline justify-center gap-2">
                    <span className="text-2xl text-gray-400">$</span>
                    <span className="bg-amber-500 bg-clip-text text-6xl font-semibold text-transparent">
                      90
                    </span>
                    <span className="text-xl text-gray-400">one-time</span>
                  </div>
                  <p className="text-lg text-gray-400">
                    Go Beyond with SyntaxStudio
                  </p>
                </div>

                {/* Features grid */}
                <div className="mb-12 grid gap-12 md:grid-cols-3">
                  <FeatureCategory label="Development">
                    {FEATURES.development.map((feature, idx) => (
                      <FeatureItem key={idx}>{feature}</FeatureItem>
                    ))}
                  </FeatureCategory>

                  <FeatureCategory label="Collaboration">
                    {FEATURES.collaboration.map((feature, idx) => (
                      <FeatureItem key={idx}>{feature}</FeatureItem>
                    ))}
                  </FeatureCategory>

                  <FeatureCategory label="Deployment">
                    {FEATURES.deployment.map((feature, idx) => (
                      <FeatureItem key={idx}>{feature}</FeatureItem>
                    ))}
                  </FeatureCategory>
                </div>

                {/* CTA */}
                <div className="flex justify-center">
                  <SignedIn>
                    <UpgradeButton />
                  </SignedIn>

                  <SignedOut>
                    <LoginButton />
                  </SignedOut>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
