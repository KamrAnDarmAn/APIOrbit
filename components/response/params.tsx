"use client"

import React, { useMemo, useState, useEffect } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Plus, Trash2 } from 'lucide-react'
import { Checkbox } from '../ui/checkbox'
import { useFormContext } from 'react-hook-form'
import { ModeToggle } from '../theme-toggle'

interface QueryParam {
    key: string
    value: string
    enabled?: boolean
}

const Params = ({ onParamsChange }: { onParamsChange?: (params: QueryParam[]) => void }) => {
    const [params, setParams] = useState<QueryParam[]>([
        { key: '', value: '', enabled: true }
    ])

    const { setValue, getValues } = useFormContext();


    const handleAddParam = () => {
        const next = [...params, { key: '', value: '', enabled: true }]
        setParams(next)
        if (onParamsChange) onParamsChange(next)
    }

    const handleRemoveParam = (index: number) => {
        const newParams = params.filter((_, i) => i !== index)
        setParams(newParams)
        if (onParamsChange) onParamsChange(newParams)
    }

    const handleParamChange = (index: number, field: 'key' | 'value', value: string) => {
        const newParams = params.map((param, i) =>
            i === index ? { ...param, [field]: value } : param
        )
        setParams(newParams)

        if (onParamsChange) onParamsChange(newParams)
    }

    const handleToggleEnabled = (index: number, checked: boolean) => {
        const newParams = params.map((param, i) =>
            i === index ? { ...param, enabled: checked } : param
        )
        setParams(newParams)
        if (onParamsChange) onParamsChange(newParams)
    }


    const queryString = useMemo(() => {
        const validParams = params.filter(p => (p.enabled ?? true) && p.key.trim() !== '')
        return validParams
            .map(p => `${encodeURIComponent(p.key)}=${encodeURIComponent(p.value)}`)
            .join('&')
    }, [params])

    // Update the URL field whenever query params change
    useEffect(() => {
        const currentUrl = getValues('url') || ''
        // Extract base URL (without existing query params)
        const baseUrl = currentUrl.split('?')[0]

        // Update URL with new query string if there are valid params
        if (queryString) {
            setValue('url', `${baseUrl}?${queryString}`)
        } else if (baseUrl) {
            setValue('url', baseUrl)
        }
    }, [queryString, setValue, getValues])

    return (
        <div className='w-full mt-3'>
            <Card>
                <CardHeader>
                    <CardTitle className='text-neutral-400'>Query Parameters</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className='flex items-center justify-between mb-2'>
                        <div className='text-xs text-neutral-400 truncate'>
                            {queryString ? `?${queryString}` : 'No query parameters'}
                        </div>
                        <Button size='sm' onClick={handleAddParam}><Plus className='h-4 w-4' /></Button>
                    </div>
                    <div className="space-y-4">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[5%]">On</TableHead>
                                    <TableHead className="w-[35%]">Key</TableHead>
                                    <TableHead className="w-[40%]">Value</TableHead>
                                    <TableHead className="w-[20%]">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {params.map((param, index) => (
                                    <TableRow key={index}>
                                        <TableCell>
                                            <Checkbox
                                                checked={param.enabled ?? true}
                                                onCheckedChange={(v) => handleToggleEnabled(index, Boolean(v))}
                                                aria-label='Toggle parameter'
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Input
                                                placeholder="Name"
                                                value={param.key}
                                                onChange={(e) => handleParamChange(index, 'key', e.target.value)}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Input
                                                placeholder="Value"
                                                value={param.value}
                                                onChange={e => handleParamChange(index, 'value', e.target.value)}
                                            />
                                        </TableCell>
                                        <TableCell className='space-x-2'>
                                            <Button size='sm' variant='destructive' onClick={() => handleRemoveParam(index)}><Trash2 className='h-4 w-4' /></Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>

                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default Params