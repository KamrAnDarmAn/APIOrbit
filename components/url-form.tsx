import * as React from 'react'
import { Input } from './ui/input'
import { Controller, useFormContext } from 'react-hook-form'
import z from 'zod'
import { Form, FormField, FormItem, FormMessage } from './ui/form'
import { Button } from './ui/button'
import { Select, SelectContent, SelectItem, SelectSeparator, SelectTrigger, SelectValue } from './ui/select'
import { Card } from './ui/card'
import { type formSchema } from '@/app/page'
import { toast } from 'sonner'
import { Spinner } from './ui/spinner'


const UrlForm = () => {
    const form = useFormContext<z.infer<typeof formSchema>>();
    const [isLoading, setIsLoading] = React.useState(false);

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            setIsLoading(true);
            console.log('VALUES: ', values)

            // Prepare request options
            const requestOptions: RequestInit = {
                method: values.method,
                headers: { ...(values.headers || {}) },
            };

            // Add body for methods that support it
            if (['POST', 'PUT', 'PATCH'].includes(values.method) && values.body) {
                requestOptions.body = values.body;
                const headers = requestOptions.headers as Record<string, string> | undefined
                if (headers) {
                    const headerKeys = Object.keys(headers)
                    const hasContentType = headerKeys.some(k => k.toLowerCase() === 'content-type')
                    if (!hasContentType) {
                        const trimmed = values.body.trim()
                        if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
                            headers['Content-Type'] = 'application/json'
                        } else if (values.body.includes('=')) {
                            headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
                        }
                    }
                }
                console.log("I'M IN!: ", values.body);
            }

            // Make the API request
            const response = await fetch(values.url, requestOptions);

            // Get response headers
            const responseHeaders: Record<string, string> = {};
            response.headers.forEach((value, key) => {
                responseHeaders[key] = value;
            });


            // Get response body as text
            const responseText = await response.text();

            // Update form with response data 
            form.setValue('status', response.status);
            form.setValue('statusText', response.statusText);
            form.setValue('responseHeaders', responseHeaders);
            form.setValue('response', responseText);
            toast.success('Request sent successfully', {
                position: 'bottom-right'
            });

            console.log(values)

        } catch (error: unknown) {
            toast.error("Something went wrong!", {
                position: 'bottom-right',
                description: 'Check the console for details.'
            });
            console.error('ERROR: ', error);

            // Store error information in form
            form.setValue('status', 0);
            form.setValue('statusText', 'Error');
            form.setValue('response', error instanceof Error ? error.message : 'Unknown error occurred');
        } finally {
            setIsLoading(false);
        }
    }



    const methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']

    return (
        <Card className="">
            {/* <CardHeader className='font-semibold'>Title</CardHeader> */}
            <Form {...form}>
                <form id="form-rhf-select" className='w-full px-2 flex flex-col  md:flex-row gap-2 items-center justify-center' onSubmit={(e) => {
                    e.preventDefault();
                    const values = form.getValues();
                    onSubmit(values);
                }} >
                    <Controller
                        name="method"
                        control={form.control}
                        render={({ field, fieldState }) => (

                            <Select
                                name={field.name}
                                value={field.value}
                                onValueChange={field.onChange}

                            >
                                <SelectTrigger

                                    id="form-rhf-select-language"
                                    aria-invalid={fieldState.invalid}
                                    className="w-full md:w-[120px]"
                                >
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent position="item-aligned">
                                    <SelectSeparator />
                                    {methods.map((method) => (
                                        <SelectItem key={method} value={method}>
                                            {method}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}
                    />



                    <FormField
                        control={form.control}
                        name="url"

                        render={({ field }) => {
                            return (
                                <FormItem className='w-full'>
                                    <Input {...field} className='w-full' placeholder='https://example.com' />
                                    <FormMessage />
                                </FormItem>
                            )
                        }}
                    />


                    <Button type='submit' className='' disabled={isLoading}>
                        {isLoading ? (
                            <span className="flex items-center gap-2">
                                <Spinner />
                                SENDING...
                            </span>
                        ) : (
                            'SEND'
                        )}
                    </Button>
                </form>
            </Form>
        </Card >
    )
}

export default UrlForm