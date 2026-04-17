import React from 'react'
import Header from '../components/Layout/Header'
import EventCard from '../components/Route/Event/EventCard'
import Footer from '../components/Layout/Footer'

function EventPage() {
  return (
    <div>
        <Header activeHeading={4}/>
        <EventCard active={true}/>
        <EventCard active={true}/>
        <Footer/>
    </div>
  )
}

export default EventPage