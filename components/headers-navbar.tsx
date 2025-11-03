'use client'

import { Card, CardContent } from './ui/card'
import {
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent,
} from '@/components/ui/tabs'
import Params from './response/params'
import Authorization from './response/authorization'
import Header from './response/headers'
import Body from './response/body'

const navItems = [
    { title: 'Params', component: <Params /> },
    { title: 'Authorization', component: <Authorization /> },
    { title: 'Headers', component: <Header /> },
    { title: 'Body', component: <Body /> },
    { title: 'Scripts', component: <div className="text-sm text-neutral-500 p-4">No scripts yet.</div> },
    { title: 'Tests', component: <div className="text-sm text-neutral-500 p-4">No tests yet.</div> },
    { title: 'Settings', component: <div className="text-sm text-neutral-500 p-4">Settings coming soon.</div> },
]

export default function HeadersNavbar() {
    return (
        <Card className="mt-3 border border-neutral-800 bg-neutral-900/50 shadow-lg rounded-2xl">
            <CardContent className="p-3">
                <Tabs defaultValue="Params" className="w-full">
                    {/* Tab Buttons */}
                    <TabsList className="flex flex-wrap justify-start gap-2 bg-transparent">
                        {navItems.map((nav) => (
                            <TabsTrigger
                                key={nav.title}
                                value={nav.title}
                                className="text-sm font-medium px-3 py-1.5 rounded-md border border-transparent  hover:bg-neutral-800 hover:text-blue-400  data-[state=active]:bg-neutral-800  data-[state=active]:border-blue-500  data-[state=active]:text-blue-400  transition-all"
                            >
                                {nav.title}
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    {/* Tab Content */}
                    <section className="mt-4">
                        {navItems.map((nav) => (
                            <TabsContent key={nav.title} value={nav.title}>

                                {nav.component}
                            </TabsContent>
                        ))}
                    </section>
                </Tabs>
            </CardContent>
        </Card>
    )
}
