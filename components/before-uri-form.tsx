import { Input } from './ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import z from 'zod'
import { Form, FormField, FormItem, FormMessage } from './ui/form'
import { Button } from './ui/button'
import { Select, SelectContent, SelectItem, SelectSeparator, SelectTrigger, SelectValue } from './ui/select'
import { Card, CardHeader } from './ui/card'

const formSchema = z.object({
    url: z.string().url(),
    method: z.enum(['GET', 'POST', 'PUT', 'DELETE', 'PATCH']),
    headers: z.record(z.string(), z.string()),
    body: z.string(),
    response: z.string(),
    status: z.number(),
    statusText: z.string(),

})

const UrlForm = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            url: '',
            method: 'GET',
            headers: {},
            body: '',
        },
        mode: 'onChange'
    })
    function onSubmit(values: z.infer<typeof formSchema>) {

        console.log(values)
    }


    const methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']



    return (
        <Card className="">
            <CardHeader className='font-semibold'>Title</CardHeader>
            <Form {...form} >
                <form id="form-rhf-select" className='w-full px-2 flex flex-col  md:flex-row gap-2 items-center justify-center' onSubmit={form.handleSubmit(onSubmit)}>
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
                    <Button type='submit' className=''>SEND</Button>
                </form>
            </Form>
        </Card >
    )
}

export default UrlForm