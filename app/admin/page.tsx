"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import type { Coin } from "@/lib/db"

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    totalCoins: 0,
    pendingSubmissions: 0,
    totalVotes: 0,
    totalUsers: 0,
  })
  const [chartData, setChartData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        
        // Fetch coins
        const coinsResponse = await fetch("/api/coins")
        const coinsData = await coinsResponse.json()
        
        // Fetch pending submissions
        const submissionsResponse = await fetch("/api/submissions")
        const submissionsData = await submissionsResponse.json()
        
        // Calculate stats
        const coins = coinsData.coins || []
        const submissions = submissionsData.submissions || []
        
        const totalVotes = coins.reduce((sum: number, coin: Coin) => sum + coin.votes, 0)
        
        setStats({
          totalCoins: coins.length,
          pendingSubmissions: submissions.length,
          totalVotes,
          totalUsers: 1250, // Mock data
        })
        
        // Prepare chart data
        const last7Days = Array.from({ length: 7 }, (_, i) => {
          const date = new Date()
          date.setDate(date.getDate() - (6 - i))
          return {
            date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            coins: Math.floor(Math.random() * 10),
            votes: Math.floor(Math.random() * 500),
          }
        })
        
        setChartData(last7Days)
      } catch (error) {
        console.error("Error fetching dashboard data:", error)
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchData()
  }, [])

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Total Coins
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{isLoading ? "..." : stats.totalCoins}</div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              +12% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Pending Submissions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{isLoading ? "..." : stats.pendingSubmissions}</div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Requires review
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Total Votes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{isLoading ? "..." : stats.totalVotes.toLocaleString()}</div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              +18% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Registered Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{isLoading ? "..." : stats.totalUsers.toLocaleString()}</div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              +5% from last month
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Analytics Overview</CardTitle>
          <CardDescription>Platform activity for the last 7 days</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="votes">
            <TabsList className="mb-4">
              <TabsTrigger value="votes">Votes</TabsTrigger>
              <TabsTrigger value="coins">New Coins</TabsTrigger>
            </TabsList>
            <TabsContent value="votes" className="h-[300px]">
              {!isLoading && (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="votes" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </TabsContent>
            <TabsContent value="coins" className="h-[300px]">
              {!isLoading && (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="coins" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Submissions</CardTitle>
            <CardDescription>Latest coin submissions awaiting approval</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              <div className="space-y-4">
                <div className="border rounded-lg p-3 bg-gray-50 dark:bg-gray-900">
                  <div className="font-medium">MoonRocket (MOON)</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Submitted 2 hours ago</div>
                </div>
                <div className="border rounded-lg p-3 bg-gray-50 dark:bg-gray-900">
                  <div className="font-medium">CryptoKitty (KITTY)</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Submitted 5 hours ago</div>
                </div>
                <div className="border rounded-lg p-3 bg-gray-50 dark:bg-gray-900">
                  <div className="font-medium">ElonDoge (EDOGE)</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Submitted 8 hours ago</div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Coins</CardTitle>
            <CardDescription>Coins with the most votes in the last 24 hours</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              <div className="space-y-4">
                <div className="border rounded-lg p-3 bg-gray-50 dark:bg-gray-900">
                  <div className="font-medium">Memereum (MEME)</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">1,245 votes today</div>
                </div>
                <div className="border rounded-lg p-3 bg-gray-50 dark:bg-gray-900">
                  <div className="font-medium">DogeMoon (DOGM)</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">987 votes today</div>
                </div>
                <div className="border rounded-lg p-3 bg-gray-50 dark:bg-gray-900">
                  <div className="font-medium">SafeFinance (SAFE)</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">756 votes today</div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
