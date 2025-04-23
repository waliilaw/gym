"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { QrCode, Scan, Download, Copy, Check, RefreshCw } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { QRCodeSVG } from "qrcode.react"
import { motion, AnimatePresence } from "framer-motion"

export default function QRSystem() {
  const [activeTab, setActiveTab] = useState<'generate' | 'scan'>('generate')
  const [qrValue, setQrValue] = useState("https://fitness-hub.com/member/123456")
  const [qrType, setQrType] = useState("membership")
  const [copied, setCopied] = useState(false)
  const [scanning, setScanning] = useState(false)
  const [scanResult, setScanResult] = useState<string | null>(null)

  const handleCopy = () => {
    navigator.clipboard.writeText(qrValue)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    const canvas = document.getElementById("qr-code") as HTMLCanvasElement
    if (canvas) {
      const pngUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream")
      const downloadLink = document.createElement("a")
      downloadLink.href = pngUrl
      downloadLink.download = `${qrType}-qrcode.png`
      document.body.appendChild(downloadLink)
      downloadLink.click()
      document.body.removeChild(downloadLink)
    }
  }

  const startScanning = () => {
    setScanning(true)
    // Simulate scanning process
    setTimeout(() => {
      setScanning(false)
      setScanResult("Member: John Doe\nID: 123456\nMembership: Premium\nExpires: 12/31/2024")
    }, 2000)
  }

  return (
    <div className="container mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
          QR Code System
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Generate and scan QR codes for memberships and equipment
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="border-0 shadow-lg bg-white dark:bg-gray-900">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-2">
                <QrCode className="h-6 w-6 text-white" />
              </div>
              <CardTitle>Generate QR Code</CardTitle>
              <CardDescription>
                Create QR codes for memberships and equipment
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="qr-type">QR Code Type</Label>
                <Select value={qrType} onValueChange={setQrType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="membership">Membership Card</SelectItem>
                    <SelectItem value="equipment">Equipment Tutorial</SelectItem>
                    <SelectItem value="class">Class Pass</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="qr-value">QR Code Value</Label>
                <div className="flex gap-2">
                  <Input
                    id="qr-value"
                    value={qrValue}
                    onChange={(e) => setQrValue(e.target.value)}
                    className="flex-1"
                  />
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={handleCopy}
                    className="shrink-0"
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 flex items-center justify-center">
                <QRCodeSVG
                  id="qr-code"
                  value={qrValue || "https://fitness-hub.com"}
                  size={200}
                  level="H"
                  includeMargin={true}
                  className="rounded-lg"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={handleDownload}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500"
              >
                <Download className="mr-2 h-4 w-4" /> Download QR Code
              </Button>
            </CardFooter>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="border-0 shadow-lg bg-white dark:bg-gray-900">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-2">
                <Scan className="h-6 w-6 text-white" />
              </div>
              <CardTitle>Scan QR Code</CardTitle>
              <CardDescription>
                Scan and verify QR codes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 min-h-[300px] flex items-center justify-center relative">
                {scanning ? (
                  <div className="text-center">
                    <RefreshCw className="h-12 w-12 text-blue-500 animate-spin mx-auto mb-4" />
                    <p className="text-sm text-gray-500 dark:text-gray-400">Scanning...</p>
                  </div>
                ) : scanResult ? (
                  <div className="w-full">
                    <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
                      <pre className="whitespace-pre-wrap text-sm text-gray-700 dark:text-gray-300">
                        {scanResult}
                      </pre>
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <Scan className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Click "Start Scanning" to begin
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={() => {
                  if (scanResult) {
                    setScanResult(null)
                  } else {
                    startScanning()
                  }
                }}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500"
              >
                {scanResult ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4" /> Scan Another Code
                  </>
                ) : (
                  <>
                    <Scan className="mr-2 h-4 w-4" /> Start Scanning
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
