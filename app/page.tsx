"use client";
import ResponseAndRequest from '@/components/request-and-response';
import { NavbarComponent } from '@/components/navbar'
import UrlForm from '@/components/url-form';
import { useForm } from 'react-hook-form';
import { FormProvider } from '@/components/ui/form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

export const formSchema = z.object({
  url: z.string()?.url(),
  method: z.enum(['GET', 'POST', 'PUT', 'DELETE', 'PATCH']),
  headers: z.record(z.string(), z.string()),
  responseHeaders: z.record(z.string(), z.string()).optional(),
  body: z.string(),
  response: z.string(),
  status: z.number(),
  statusText: z.string(),

})


export default function Page() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: '',
      method: 'GET',
      headers: {},
      responseHeaders: {},
      body: '',
      status: 200,
      response: '',
      statusText: ''
    },
  })
  return (
    <div>
      <NavbarComponent />
      <FormProvider<z.infer<typeof formSchema>> {...form}>
        <UrlForm />
        <ResponseAndRequest />
      </FormProvider>
    </div>
  )
}