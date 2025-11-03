"use client"
import React, { useState, useRef, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Plus, Trash2 } from 'lucide-react'
import { useFormContext } from 'react-hook-form'

interface HeaderItem {
    key: string
    value: string
}

const Header = ({ onChange }: { onChange?: (headers: Record<string, string>) => void }) => {
    const form = useFormContext()
    const formHeaders = form.watch('headers') as Record<string, string> | undefined
    const isInternalUpdate = useRef(false)

    // Convert form headers record to HeaderItem array
    const headersRecordToArray = (record: Record<string, string> | undefined): HeaderItem[] => {
        if (!record || Object.keys(record).length === 0) {
            return [{ key: '', value: '' }]
        }
        return Object.entries(record).map(([key, value]) => ({ key, value }))
    }

    // Derive initial headers from form state
    const formHeadersArray = useMemo(() => headersRecordToArray(formHeaders), [formHeaders])

    const [headers, setHeaders] = useState<HeaderItem[]>(formHeadersArray)

    // Update local state when form headers change externally (not from our updates)
    React.useEffect(() => {
        if (!isInternalUpdate.current) {
            setHeaders(formHeadersArray)
        }
        isInternalUpdate.current = false
    }, [formHeadersArray])

    const emitChange = (items: HeaderItem[]) => {
        const record: Record<string, string> = {}
        for (const item of items) {
            const trimmedKey = item.key.trim()
            if (trimmedKey.length === 0) continue
            record[trimmedKey] = item.value
        }

        // Mark as internal update to avoid syncing back
        isInternalUpdate.current = true

        // Update form value so headers are included in the request
        form.setValue('headers', record, { shouldValidate: true })

        // Also call onChange callback if provided (for backwards compatibility)
        if (onChange) {
            onChange(record)
        }
    }

    const handleAdd = () => {
        const next = [...headers, { key: '', value: '' }]
        setHeaders(next)
        emitChange(next)
    }

    const handleRemove = (index: number) => {
        const next = headers.filter((_, i) => i !== index)
        // If we removed the last header and there are none left, add an empty one
        if (next.length === 0) {
            next.push({ key: '', value: '' })
        }
        setHeaders(next)
        emitChange(next)
    }

    const handleChange = (index: number, field: 'key' | 'value', value: string) => {
        const next = headers.map((h, i) => (i === index ? { ...h, [field]: value } : h))
        setHeaders(next)
        emitChange(next)
    }

    return (
        <div className='w-full mt-3'>
            <Card>

                <CardHeader>
                    <CardTitle className='text-neutral-400'>Headers</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className='w-[40%]'>Key</TableHead>
                                <TableHead className='w-[40%]'>Value</TableHead>
                                <TableHead className='w-[20%]'>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {headers.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell>
                                        <Input
                                            placeholder='Header name'
                                            value={item.key}
                                            onChange={(e) => handleChange(index, 'key', e.target.value)}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Input
                                            placeholder='Header value'
                                            value={item.value}
                                            onChange={(e) => handleChange(index, 'value', e.target.value)}
                                        />
                                    </TableCell>
                                    <TableCell className='space-x-2'>
                                        <Button size='sm' onClick={handleAdd}><Plus className='h-4 w-4' /></Button>
                                        <Button size='sm' variant='destructive' onClick={() => handleRemove(index)}><Trash2 className='h-4 w-4' /></Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}

export default Header