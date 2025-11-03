"use client"

import React, { useState } from 'react'
// removed unused import: Form
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Plus, Trash2 } from 'lucide-react'
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { useFormContext } from 'react-hook-form'
import { formSchema } from '@/app/page'
import z from 'zod'

interface QueryParam {
    key: string
    value: string
}

const Body = ({ onParamsChange }: { changeUri?: (uri: string) => void; onParamsChange?: (params: QueryParam[]) => void }) => {
    type FormValues = z.infer<typeof formSchema>
    const form = useFormContext<FormValues>();
    console.log(form.getValues());

    // form.setValue()
    const [fields, setFields] = useState<QueryParam[]>([
        { key: '', value: '' }
    ])
    const [bodyType, setBodyType] = useState<'none' | 'form-data' | 'x-www-form-urlencoded' | 'raw' | 'binary'>('none')
    const [rawMode, setRawMode] = useState<'json' | 'text'>('json')
    const [rawText, setRawText] = useState<string>('')
    const [binaryFile, setBinaryFile] = useState<File | null>(null)

    const handleAddField = () => {
        setFields([...fields, { key: '', value: '' }])
    }

    const handleRemoveField = (index: number) => {
        const newFields = fields.filter((_, i) => i !== index)
        setFields(newFields)
        if (onParamsChange)
            onParamsChange(newFields)

    }

    const handleFieldChange = (index: number, field: 'key' | 'value', value: string) => {
        const newFields = fields.map((param, i) =>
            i === index ? { ...param, [field]: value } : param
        )
        setFields(newFields)
        if (onParamsChange) {
            onParamsChange(newFields)
        }
        const nonEmpty = newFields.filter(f => f.key.trim().length > 0)
        if (bodyType === 'x-www-form-urlencoded') {
            const params = new URLSearchParams()
            nonEmpty.forEach(({ key, value }) => params.append(key, value))
            form.setValue('body', params.toString())
            // Ensure correct content type so servers can parse the body
            const currentHeaders = form.getValues('headers') || {}
            const hasContentType = Object.keys(currentHeaders).some(k => k.toLowerCase() === 'content-type')
            if (!hasContentType) {
                form.setValue('headers', { ...currentHeaders, 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' })
            }
        } else if (bodyType === 'form-data') {
            const obj = {} as Record<string, string>
            nonEmpty.forEach(({ key, value }) => { obj[key] = value })
            form.setValue('body', JSON.stringify(obj))
        }

    }

    return (
        <div className='w-full mt-3'>
            <Card>
                <CardHeader>
                    <CardTitle className='text-neutral-400'>Body</CardTitle>
                </CardHeader>
                <CardContent>
                    <Tabs value={bodyType} onValueChange={(v) => setBodyType(v as typeof bodyType)}>
                        <TabsList className='flex-wrap'>
                            <TabsTrigger value='none' className='font-medium transition-all text-blue-300 hover:bg-neutral-800 rounded-md px-2 py-1'>None</TabsTrigger>
                            <TabsTrigger value='form-data' className='font-medium transition-all text-blue-300 hover:bg-neutral-800 rounded-md px-2 py-1'>form-data</TabsTrigger>
                            <TabsTrigger value='x-www-form-urlencoded' className='font-medium transition-all text-blue-300 hover:bg-neutral-800 rounded-md px-2 py-1'>x-www-form-urlencoded</TabsTrigger>
                            <TabsTrigger value='raw' className='font-medium transition-all text-blue-300 hover:bg-neutral-800 rounded-md px-2 py-1'>Raw</TabsTrigger>
                            <TabsTrigger value='binary' className='font-medium transition-all text-blue-300 hover:bg-neutral-800 rounded-md px-2 py-1'>Binary</TabsTrigger>
                        </TabsList>

                        <TabsContent value='none'>
                            <div className='text-sm text-neutral-400'>This request has no body.</div>
                        </TabsContent>

                        <TabsContent value='form-data'>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className='w-[40%]'>Key</TableHead>
                                        <TableHead className='w-[40%]'>Value</TableHead>
                                        <TableHead className='w-[20%]'>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {fields.map((param, index) => (
                                        <TableRow key={index}>
                                            <TableCell>
                                                <Input
                                                    placeholder='Name'
                                                    value={param.key}
                                                    onChange={(e) => handleFieldChange(index, 'key', e.target.value)}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Input
                                                    placeholder='Value'
                                                    value={param.value}
                                                    onChange={(e) => handleFieldChange(index, 'value', e.target.value)}
                                                />
                                            </TableCell>
                                            <TableCell className='space-x-2'>
                                                <Button size='sm' onClick={handleAddField}><Plus className='h-4 w-4' /></Button>
                                                <Button size='sm' variant='destructive' onClick={() => handleRemoveField(index)}><Trash2 className='h-4 w-4' /></Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TabsContent>

                        <TabsContent value='x-www-form-urlencoded'>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className='w-[40%]'>Key</TableHead>
                                        <TableHead className='w-[40%]'>Value</TableHead>
                                        <TableHead className='w-[20%]'>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {fields.map((param, index) => (
                                        <TableRow key={index}>
                                            <TableCell>
                                                <Input
                                                    placeholder='Name'
                                                    value={param.key}
                                                    onChange={(e) => handleFieldChange(index, 'key', e.target.value)}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Input
                                                    placeholder='Value'
                                                    value={param.value}
                                                    onChange={(e) => handleFieldChange(index, 'value', e.target.value)}
                                                />
                                            </TableCell>
                                            <TableCell className='space-x-2'>
                                                <Button size='sm' onClick={handleAddField}><Plus className='h-4 w-4' /></Button>
                                                <Button size='sm' variant='destructive' onClick={() => handleRemoveField(index)}><Trash2 className='h-4 w-4' /></Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TabsContent>

                        <TabsContent value='raw'>
                            <div className='flex items-center gap-2 mb-2'>
                                <span className='text-sm text-neutral-400'>Type</span>
                                <Select value={rawMode} onValueChange={(v) => setRawMode(v as typeof rawMode)}>
                                    <SelectTrigger className='w-40'>
                                        <SelectValue placeholder='Select type' />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value='json'>JSON</SelectItem>
                                        <SelectItem value='text'>Text</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <textarea
                                className='w-full h-48 rounded-md bg-neutral-900 border border-neutral-800 p-3 text-sm outline-none'
                                placeholder={rawMode === 'json' ? '{\n  "key": "value"\n}' : 'Enter text body'}
                                value={rawText}
                                onChange={(e) => {
                                    const next = e.target.value
                                    setRawText(next)
                                    form.setValue('body', next)
                                    // Auto-set Content-Type to help backend parse
                                    const currentHeaders = form.getValues('headers') || {}
                                    const hasContentType = Object.keys(currentHeaders).some(k => k.toLowerCase() === 'content-type')
                                    if (!hasContentType) {
                                        if (rawMode === 'json') {
                                            form.setValue('headers', { ...currentHeaders, 'Content-Type': 'application/json' })
                                        } else {
                                            form.setValue('headers', { ...currentHeaders, 'Content-Type': 'text/plain;charset=UTF-8' })
                                        }
                                    }
                                }}
                            />
                        </TabsContent>

                        <TabsContent value='binary'>
                            <input
                                type='file'
                                onChange={(e) => setBinaryFile(e.target.files && e.target.files[0] ? e.target.files[0] : null)}
                                className='text-sm'
                            />
                            {binaryFile && (
                                <div className='mt-2 text-sm text-neutral-400'>Selected: {binaryFile.name}</div>
                            )}
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    )
}

export default Body