"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Check, ChevronDown, Edit, Eye, Filter, 
MoreHorizontal, PlusCircle, Search, Trash, X, Zap } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, 
SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, 
CardTitle } from "@/components/ui/card"

// Mock data for coins
const coinsData = [
  {
    id: 1,
    name: "Memereum",
    symbol: "MEME",
    logo: "/placeholder.svg?height=32&width=32",
    price: 0.000001,
    change24h: 15.7,
    marketCap: "$1.2M",
    volume: "$450K",
    network: "Ethereum",
    votes: 12500,
    category: "Meme",
    status: "active",
    promoted: true,
    featured: true,
    kyc: true,
    audit: true,
    dateAdded: "2024-03-01",
  },
  {
    id: 2,
    name: "DogeMoon",
    symbol: "DOGM",
    logo: "/placeholder.svg?height=32&width=32",
    price: 0.0000023,
    change24h: 8.3,
    marketCap: "$3.5M",
    volume: "$780K",
    network: "BSC",
    votes: 9800,
    category: "Meme",
    status: "active",
    promoted: false,
    featured: true,
    kyc: true,
    audit: true,
    dateAdded: "2024-03-02",
  },
  {
    id: 3,
    name: "SafeFinance",
    symbol: "SAFE",
    logo: "/placeholder.svg?height=32&width=32",
    price: 0.0045,
    change24h: -2.1,
    marketCap: "$8.7M",
    volume: "$1.2M",
    network: "Solana",
    votes: 7500,
    category: "DeFi",
    status: "active",
    promoted: true,
    featured: false,
    kyc: true,
    audit: true,
    dateAdded: "2024-03-03",
  },
]

export default function CoinsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedNetwork, setSelectedNetwork] = useState("all")
  const [sortBy, setSortBy] = useState("votes")

  // Filter and sort coins
  const filteredCoins = coinsData
    .filter((coin) => {
      const matchesSearch =
        coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory =
        selectedCategory === "all" || coin.category.toLowerCase() === selectedCategory.toLowerCase()
      const matchesNetwork =
        selectedNetwork === "all" || coin.network.toLowerCase() === selectedNetwork.toLowerCase()
      return matchesSearch && matchesCategory && matchesNetwork
    })
    .sort((a, b) => {
      if (sortBy === "votes") return b.votes - a.votes
      if (sortBy === "newest") return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
      if (sortBy === "marketCap") {
        return (
          parseFloat(b.marketCap.replace(/[^0-9.-]+/g, "")) -
          parseFloat(a.marketCap.replace(/[^0-9.-]+/g, ""))
        )
      }
      return 0
    })

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="flex-1">
          <h1 className="text-3xl font-bold">Cryptocurrency Listings</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Discover new and trending cryptocurrency tokens
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/coins/add">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Submit Coin
            </Button>
          </Link>
          <Link href="/advertise">
            <Button variant="outline">
              <Zap className="mr-2 h-4 w-4" />
              Advertise
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_250px] gap-6">
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input
                placeholder="Search coins by name or symbol..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-2.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="votes">Most Voted</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="marketCap">Market Cap</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge
              variant={selectedCategory === "all" ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setSelectedCategory("all")}
            >
              All Categories
            </Badge>
            <Badge
              variant={selectedCategory === "meme" ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setSelectedCategory("meme")}
            >
              Meme
            </Badge>
            <Badge
              variant={selectedCategory === "defi" ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setSelectedCategory("defi")}
            >
              DeFi
            </Badge>
            <Badge
              variant={selectedCategory === "gaming" ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setSelectedCategory("gaming")}
            >
              Gaming
            </Badge>
            <Badge
              variant={selectedCategory === "ai" ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setSelectedCategory("ai")}
            >
              AI
            </Badge>
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge
              variant={selectedNetwork === "all" ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setSelectedNetwork("all")}
            >
              All Networks
            </Badge>
            <Badge
              variant={selectedNetwork === "ethereum" ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setSelectedNetwork("ethereum")}
            >
              Ethereum
            </Badge>
            <Badge
              variant={selectedNetwork === "bsc" ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setSelectedNetwork("bsc")}
            >
              BSC
            </Badge>
            <Badge
              variant={selectedNetwork === "solana" ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setSelectedNetwork("solana")}
            >
              Solana
            </Badge>
            <Badge
              variant={selectedNetwork === "arbitrum" ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setSelectedNetwork("arbitrum")}
            >
              Arbitrum
            </Badge>
          </div>

          <div className="space-y-4">
            {filteredCoins.map((coin) => (
              <div
                key={coin.id}
                className="border rounded-lg p-4 bg-white dark:bg-gray-950 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-4">
                  <div className="relative w-12 h-12 flex-shrink-0">
                    <Image
                      src={coin.logo}
                      alt={coin.name}
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-lg truncate">
                        {coin.name} <span className="text-gray-500">({coin.symbol})</span>
                      </h3>
                      <div className="flex gap-1">
                        {coin.promoted && (
                          <Badge variant="secondary" className="text-xs">
                            Promoted
                          </Badge>
                        )}
                        {coin.featured && (
                          <Badge variant="secondary" className="text-xs">
                            Featured
                          </Badge>
                        )}
                        {coin.kyc && (
                          <Badge variant="outline" className="text-xs border-green-500 text-green-500">
                            KYC
                          </Badge>
                        )}
                        {coin.audit && (
                          <Badge variant="outline" className="text-xs border-blue-500 text-blue-500">
                            Audit
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-500 dark:text-gray-400 mt-1">
                      <div>Price: ${coin.price.toFixed(8)}</div>
                      <div
                        className={
                          coin.change24h >= 0 ? "text-green-500" : "text-red-500"
                        }
                      >
                        {coin.change24h >= 0 ? "+" : ""}
                        {coin.change24h}%
                      </div>
                      <div>Market Cap: {coin.marketCap}</div>
                      <div>Volume: {coin.volume}</div>
                      <div>Network: {coin.network}</div>
                      <div>Added: {coin.dateAdded}</div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="text-center">
                      <div className="font-bold text-xl">{coin.votes.toLocaleString()}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Votes</div>
                    </div>
                    <Button size="sm" className="w-full">
                      Vote
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Promoted Coins</CardTitle>
              <CardDescription>Sponsored listings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {coinsData
                .filter((coin) => coin.promoted)
                .map((coin) => (
                  <div key={`promo-${coin.id}`} className="flex items-center gap-3">
                    <div className="relative w-8 h-8 flex-shrink-0">
                      <Image
                        src={coin.logo}
                        alt={coin.name}
                        fill
                        className="rounded-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">
                        {coin.name} <span className="text-gray-500">({coin.symbol})</span>
                      </div>
                      <div
                        className={
                          coin.change24h >= 0
                            ? "text-xs text-green-500"
                            : "text-xs text-red-500"
                        }
                      >
                        {coin.change24h >= 0 ? "+" : ""}
                        {coin.change24h}%
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      Vote
                    </Button>
                  </div>
                ))}
              <Link href="/promoted" className="text-sm text-blue-600 hover:underline block text-center mt-2">
                View all promoted
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Latest Airdrops</CardTitle>
              <CardDescription>Free token opportunities</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="relative w-8 h-8 flex-shrink-0 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  <Zap className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">ArbiDrop Token</div>
                  <div className="text-xs text-gray-500">Ends in 3 days</div>
                </div>
                <Button size="sm" variant="outline">
                  Join
                </Button>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative w-8 h-8 flex-shrink-0 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                  <Zap className="h-4 w-4 text-green-600 dark:text-green-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">SolStarter</div>
                  <div className="text-xs text-gray-500">Ends in 5 days</div>
                </div>
                <Button size="sm" variant="outline">
                  Join
                </Button>
              </div>
              <Link href="/airdrops" className="text-sm text-blue-600 hover:underline block text-center mt-2">
                View all airdrops
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Community</CardTitle>
              <CardDescription>Join our channels</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full">
                Telegram
              </Button>
              <Button variant="outline" className="w-full">
                Discord
              </Button>
              <Button variant="outline" className="w-full">
                Twitter
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
