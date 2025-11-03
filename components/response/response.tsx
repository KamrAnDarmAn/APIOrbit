"use client"

import * as React from "react"
import { useFormContext } from "react-hook-form"
import { Clock, Database, FileText, Globe, CheckCircle2, XCircle, AlertCircle, Copy, Check } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { formSchema } from "@/app/page"
import { toast } from "sonner"
import z from "zod"

export default function Response() {
    const form = useFormContext<z.infer<typeof formSchema>>()
    const [copied, setCopied] = React.useState(false)

    const status = form.watch('status')
    const statusText = form.watch('statusText')
    const response = form.watch('response')
    const headers = form.watch('responseHeaders') || {}

    const getStatusColor = (status: number) => {
        if (status >= 200 && status < 300) return 'text-green-400'
        if (status >= 300 && status < 400) return 'text-blue-400'
        if (status >= 400 && status < 500) return 'text-yellow-400'
        if (status >= 500) return 'text-red-400'
        return 'text-neutral-400'
    }

    const getStatusIcon = (status: number) => {
        if (status >= 200 && status < 300) return <CheckCircle2 className="h-5 w-5 text-green-400" />
        if (status >= 300 && status < 400) return <Globe className="h-5 w-5 text-blue-400" />
        if (status >= 400 && status < 500) return <AlertCircle className="h-5 w-5 text-yellow-400" />
        if (status >= 500) return <XCircle className="h-5 w-5 text-red-400" />
        return null
    }

    const getStatusBadgeVariant = (status: number): "default" | "destructive" => {
        if (status >= 200 && status < 400) return 'default'
        return 'destructive'
    }

    const parseJSON = (text: string) => {
        try {
            return JSON.parse(text)
        } catch {
            return text
        }
    }

    const formatJSON = (obj: unknown) => {
        if (typeof obj === 'string') return obj
        return JSON.stringify(obj, null, 2)
    }

    const copyToClipboard = () => {
        if (!response) return
        navigator.clipboard.writeText(response)
        setCopied(true)
        toast.success('Response copied to clipboard')
        setTimeout(() => setCopied(false), 2000)
    }

    const hasResponse = response && response.trim() !== ''

    console.log(response);

    return (
        <div className="w-full mt-3">
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-neutral-400">Response</CardTitle>
                        {hasResponse && (
                            <Badge
                                variant={getStatusBadgeVariant(status)}
                                className="flex items-center gap-1"
                            >
                                {getStatusIcon(status)}
                                {status} {statusText}
                            </Badge>
                        )}
                    </div>
                </CardHeader>
                <CardContent>
                    {!hasResponse ? (
                        <div className="text-center py-12 text-neutral-500">
                            <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                            <p className="text-sm">No response yet. Send a request to see the response here.</p>
                        </div>
                    ) : (
                        <>
                            {/* Response Meta Information */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                <div className="flex items-center gap-2 p-3 rounded-lg bg-neutral-900 border border-neutral-800">
                                    <CheckCircle2 className="h-4 w-4 text-green-400" />
                                    <div>
                                        <p className="text-xs text-neutral-500">Status</p>
                                        <p className={`text-sm font-semibold ${getStatusColor(status)}`}>
                                            {status}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 p-3 rounded-lg bg-neutral-900 border border-neutral-800">
                                    <Clock className="h-4 w-4 text-blue-400" />
                                    <div>
                                        <p className="text-xs text-neutral-500">Time</p>
                                        <p className="text-sm font-semibold text-neutral-300">-</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 p-3 rounded-lg bg-neutral-900 border border-neutral-800">
                                    <Database className="h-4 w-4 text-purple-400" />
                                    <div>
                                        <p className="text-xs text-neutral-500">Size</p>
                                        <p className="text-sm font-semibold text-neutral-300">
                                            {response ? `${(response.length / 1024).toFixed(2)} KB` : '-'}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 p-3 rounded-lg bg-neutral-900 border border-neutral-800">
                                    <FileText className="h-4 w-4 text-yellow-400" />
                                    <div>
                                        <p className="text-xs text-neutral-500">Type</p>
                                        <p className="text-sm font-semibold text-neutral-300">
                                            {(headers as Record<string, string>)['content-type']?.split(';')[0] || (headers as Record<string, string>)['Content-Type']?.split(';')[0] || '-'}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <Separator className="mb-4 bg-neutral-800" />

                            {/* Tabs for Headers and Body */}
                            <Tabs defaultValue="body" className="w-full">
                                <TabsList className="flex-wrap h-auto bg-transparent">
                                    <TabsTrigger
                                        value="body"
                                        className="text-sm font-medium px-3 py-1.5 rounded-md border border-transparent hover:bg-neutral-800 hover:text-blue-400 data-[state=active]:bg-neutral-800 data-[state=active]:border-blue-500 data-[state=active]:text-blue-400 transition-all"
                                    >
                                        Body
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="headers"
                                        className="text-sm font-medium px-3 py-1.5 rounded-md border border-transparent hover:bg-neutral-800 hover:text-blue-400 data-[state=active]:bg-neutral-800 data-[state=active]:border-blue-500 data-[state=active]:text-blue-400 transition-all"
                                    >
                                        Headers
                                    </TabsTrigger>
                                </TabsList>

                                <TabsContent value="body" className="mt-4">
                                    <Card className="bg-neutral-950 border-neutral-800">
                                        <CardHeader className="pb-3">
                                            <div className="flex items-center justify-between">
                                                <CardTitle className="text-sm text-neutral-400">Response Body</CardTitle>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={copyToClipboard}
                                                    className="h-8 w-8 p-0"
                                                >
                                                    {copied ? (
                                                        <Check className="h-4 w-4 text-green-400" />
                                                    ) : (
                                                        <Copy className="h-4 w-4" />
                                                    )}
                                                </Button>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="pt-0">
                                            <ScrollArea className="h-[400px] w-full rounded-md border border-neutral-800">
                                                <pre className="p-4 text-sm font-mono text-neutral-300 whitespace-pre-wrap wrap-break-word">
                                                    {formatJSON(parseJSON(response))}
                                                </pre>
                                            </ScrollArea>
                                        </CardContent>
                                    </Card>
                                </TabsContent>

                                <TabsContent value="headers" className="mt-4">
                                    <Card className="bg-neutral-950 border-neutral-800">
                                        <CardHeader className="pb-3">
                                            <CardTitle className="text-sm text-neutral-400">Response Headers</CardTitle>
                                        </CardHeader>
                                        <CardContent className="pt-0">
                                            {Object.keys(headers).length > 0 ? (
                                                <Table>
                                                    <TableHeader>
                                                        <TableRow className="border-neutral-800 hover:bg-neutral-900">
                                                            <TableHead className="text-neutral-400 w-[40%]">Name</TableHead>
                                                            <TableHead className="text-neutral-400">Value</TableHead>
                                                        </TableRow>
                                                    </TableHeader>
                                                    <TableBody>
                                                        {Object.entries(headers).map(([key, value]) => (
                                                            <TableRow key={key} className="border-neutral-800 hover:bg-neutral-900">
                                                                <TableCell className="font-medium text-neutral-300">{key}</TableCell>
                                                                <TableCell className="text-neutral-400 break-all">{value.split(';')[0]}</TableCell>
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                            ) : (
                                                <div className="text-center py-8 text-neutral-500 text-sm">
                                                    No headers available
                                                </div>
                                            )}
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                            </Tabs>
                        </>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
