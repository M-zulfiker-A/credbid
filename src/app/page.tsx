import Head from "next/head"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "CredBid - Buy Amazon Products with Others' Credit Cards",
  description:
    "CredBid connects credit card holders with people who need products from Amazon. Post your desired product and get it purchased by a willing credit card holder.",
  keywords: "credit card, Amazon, product purchasing, online shopping, credit bidding",
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-dark via-dark to-violet-dark text-white">
      <Head>
        <link rel="canonical" href="https://www.credbid.com" />
      </Head>

      <main className="container mx-auto px-4 py-12">
        {/* Attention */}
        <section className="text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-violet-light to-violet">
            Get Your Amazon Wishlist Fulfilled
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-gray-300">
            Connect with credit card holders willing to purchase your desired products
          </p>
          <Button
            size="lg"
            className="bg-violet hover:bg-violet-dark text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
          >
            Start Shopping Now
          </Button>
        </section>

        {/* Interest */}
        <section className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="bg-dark-light bg-opacity-20 p-8 rounded-2xl shadow-xl backdrop-blur-sm">
            <h2 className="text-2xl font-semibold mb-4 text-violet-light">Post Your Wishlist</h2>
            <p className="text-gray-300">
              Share the Amazon products you want and let credit card holders bid to purchase them for you.
            </p>
          </div>
          <div className="bg-dark-light bg-opacity-20 p-8 rounded-2xl shadow-xl backdrop-blur-sm">
            <h2 className="text-2xl font-semibold mb-4 text-violet-light">Secure Transactions</h2>
            <p className="text-gray-300">
              Our platform ensures safe and secure transactions between buyers and credit card holders.
            </p>
          </div>
          <div className="bg-dark-light bg-opacity-20 p-8 rounded-2xl shadow-xl backdrop-blur-sm">
            <h2 className="text-2xl font-semibold mb-4 text-violet-light">Earn Rewards</h2>
            <p className="text-gray-300">
              Credit card holders can earn cashback or points while helping others get their desired products.
            </p>
          </div>
        </section>

        {/* Desire */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-10 text-center text-violet-light">What Our Users Say</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-dark-light bg-opacity-20 p-8 rounded-2xl shadow-xl backdrop-blur-sm">
              <p className="mb-4 text-gray-300">
                "I got my dream gadget without waiting to save up. CredBid is a game-changer!"
              </p>
              <p className="font-semibold text-violet-light">- Alex S., Happy Shopper</p>
            </div>
            <div className="bg-dark-light bg-opacity-20 p-8 rounded-2xl shadow-xl backdrop-blur-sm">
              <p className="mb-4 text-gray-300">
                "I maximized my credit card rewards by helping others. It's a win-win!"
              </p>
              <p className="font-semibold text-violet-light">- Jamie T., Credit Card Holder</p>
            </div>
          </div>
        </section>

        {/* Action */}
        <section className="text-center">
          <h2 className="text-3xl font-bold mb-6 text-violet-light">Ready to Get Started?</h2>
          <p className="text-xl mb-10 text-gray-300">Join CredBid today and start fulfilling your Amazon wishlist!</p>
          <div className="space-x-6">
            <Button
              size="lg"
              className="bg-violet hover:bg-violet-dark text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
            >
              Sign Up Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-violet text-violet hover:bg-violet hover:text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              Learn More
            </Button>
          </div>
        </section>
      </main>

      <footer className="bg-dark-dark bg-opacity-50 text-gray-300 py-8 mt-20">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2023 CredBid. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

