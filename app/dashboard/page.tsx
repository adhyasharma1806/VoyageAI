'use client'

import * as React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  MapPin,
  Calendar,
  Users,
  Plus,
  ArrowRight,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { GlassCard } from '@/components/glass-card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'


/* ---------------- TYPES ---------------- */

type Activity = {
  time?: string
  title: string
  description: string
  location?: string
  duration?: string
}

type Day = {
  day: number
  activities: Activity[]
}

type Trip = {
  id?: string
  _id?: string
  destination: string
  startDate: string
  endDate?: string
  travelers: number
  image: string
  status?: string
  days: Day[]
}


/* ---------------- COMPONENT ---------------- */

export default function DashboardPage() {

  const router = useRouter()

  const [mounted,setMounted] = React.useState(false)
  const [trips,setTrips] = React.useState<Trip[]>([])
  const [selectedTrip,setSelectedTrip] = React.useState<Trip | null>(null)


  /* mount fix */

  React.useEffect(()=>{
    setMounted(true)
  },[])


  /* protect route */

  React.useEffect(()=>{

    const token = localStorage.getItem("token")

    if(!token){
      router.push("/auth/signin")
    }

  },[])


  /* fetch trips */

  React.useEffect(()=>{

    const fetchTrips = async () =>{

      try{

        const token = localStorage.getItem("token")

        const res = await fetch("http://localhost:5000/api/trips",{
          headers:{
            Authorization:`Bearer ${token}`
          }
        })

        if(!res.ok){
          console.log("Trip fetch failed")
          return
        }

        const data = await res.json()

        if(data.length > 0){

          const normalizedTrips = data.map((trip:Trip)=>({
            ...trip,
            id: trip._id
          }))

          setTrips(normalizedTrips)
          setSelectedTrip(normalizedTrips[0])

        }

      }catch(err){
        console.log("Trip fetch error",err)
      }

    }

    fetchTrips()

  },[])


  if(!mounted) return null


  return (

    <div className="relative min-h-screen overflow-hidden">

      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-cyan-900/20" />

      <div className="relative py-12 px-4 sm:px-6 lg:px-8">

        <div className="max-w-7xl mx-auto">


          {/* HEADER */}

          <motion.div
            initial={{ opacity:0,y:20 }}
            animate={{ opacity:1,y:0 }}
            transition={{ duration:0.6 }}
            className="flex justify-between items-center mb-8"
          >

            <div>

              <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                My Trips
              </h1>

              <p className="text-lg text-gray-600 dark:text-gray-300">
                Manage and explore your travel itineraries
              </p>

            </div>

            <Link href="/planner">
              <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white gap-2">
                <Plus className="h-5 w-5"/>
                New Trip
              </Button>
            </Link>

          </motion.div>


          {/* TABS */}

          <Tabs defaultValue="all" className="mb-8">
            <TabsList className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl">
              <TabsTrigger value="all">All Trips</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="planning">Planning</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
          </Tabs>


          {/* GRID */}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">


            {/* LEFT PANEL */}

            <div className="lg:col-span-1 space-y-4">

              {trips.length === 0 && (
                <p className="text-gray-500 text-center">
                  No trips yet. Create your first trip ✨
                </p>
              )}

              {trips.map((trip:Trip,index:number)=>(
                <motion.div
                  key={trip.id || index}
                  initial={{opacity:0,x:-20}}
                  animate={{opacity:1,x:0}}
                  transition={{duration:0.6,delay:index*0.1}}
                  onClick={()=>setSelectedTrip(trip)}
                >

                  <GlassCard
                    className={`cursor-pointer transition-all ${
                      selectedTrip?.id === trip.id
                        ? 'ring-2 ring-blue-500 dark:ring-cyan-500'
                        : ''
                    }`}
                    hover
                  >

                    <div
                      className="h-32 rounded-lg mb-4 bg-cover bg-center"
                      style={{backgroundImage:`url(${trip.image})`}}
                    >

                      <div className="h-full w-full bg-gradient-to-t from-black/60 to-transparent rounded-lg flex items-end p-4">

                        <h3 className="text-white font-semibold text-lg">
                          {trip.destination}
                        </h3>

                      </div>

                    </div>

                    <div className="space-y-2">

                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">

                        <Calendar className="h-4 w-4"/>

                        <span>
                          {new Date(trip.startDate).toLocaleDateString()}
                        </span>

                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">

                        <Users className="h-4 w-4"/>

                        <span>{trip.travelers} travelers</span>

                      </div>

                      <Badge className="mt-2">
                        {trip.status || "trip"}
                      </Badge>

                    </div>

                  </GlassCard>

                </motion.div>
              ))}

            </div>


            {/* RIGHT PANEL */}

            <div className="lg:col-span-2">

              {selectedTrip && (

                <motion.div
                  key={selectedTrip.id}
                  initial={{opacity:0,y:20}}
                  animate={{opacity:1,y:0}}
                  transition={{duration:0.6}}
                >

                  <GlassCard className="p-8">

                    <div
                      className="h-64 rounded-xl mb-6 bg-cover bg-center"
                      style={{backgroundImage:`url(${selectedTrip.image})`}}
                    >

                      <div className="h-full w-full bg-gradient-to-t from-black/70 to-transparent rounded-xl flex items-end p-6">

                        <h2 className="text-white text-3xl font-bold">
                          {selectedTrip.destination}
                        </h2>

                      </div>

                    </div>


                    <div className="flex gap-4 mb-6">

                      <Link href="/map" className="flex-1">
                        <Button variant="outline" className="w-full gap-2">
                          <MapPin className="h-4 w-4"/>
                          View on Map
                        </Button>
                      </Link>

                      <Button className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 text-white gap-2">
                        Edit Trip
                        <ArrowRight className="h-4 w-4"/>
                      </Button>

                    </div>


                    {/* ITINERARY */}

                    <div className="mt-8">

                      <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                        Daily Itinerary
                      </h3>

                      <Accordion type="single" collapsible defaultValue="day-1">

                        {selectedTrip.days?.map((day:Day)=>(
                          <AccordionItem key={day.day} value={`day-${day.day}`}>

                            <AccordionTrigger className="text-lg font-semibold">
                              Day {day.day}
                            </AccordionTrigger>

                            <AccordionContent>

                              <div className="ml-6 space-y-4">

                                {day.activities?.map((activity:Activity,index:number)=>(

                                  <motion.div
                                    key={index}
                                    initial={{opacity:0,x:-10}}
                                    animate={{opacity:1,x:0}}
                                    transition={{delay:index*0.1}}
                                    className="flex gap-4"
                                  >

                                    <div className="flex-shrink-0 w-20 text-sm font-medium text-blue-600 dark:text-blue-400">
                                      {activity.time || "09:00"}
                                    </div>

                                    <div className="flex-1 pb-6 border-l-2 border-gray-200 dark:border-gray-700 pl-6 relative">

                                      <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500"/>

                                      <h4 className="font-semibold mb-1">
                                        {activity.title}
                                      </h4>

                                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                                        {activity.description}
                                      </p>

                                      <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">

                                        <div className="flex items-center gap-1">
                                          <MapPin className="h-3 w-3"/>
                                          {activity.location || "City Center"}
                                        </div>

                                        <div>
                                          {activity.duration || "2 hours"}
                                        </div>

                                      </div>

                                    </div>

                                  </motion.div>

                                ))}

                              </div>

                            </AccordionContent>

                          </AccordionItem>
                        ))}

                      </Accordion>

                    </div>

                  </GlassCard>

                </motion.div>

              )}

            </div>

          </div>

        </div>

      </div>

    </div>

  )
}