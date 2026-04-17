import React from 'react'
import styles from '../../../styles/styles'
import EventCard from "./EventCard";
function Event() {
  return (
    <div>
        <div className={`${styles.section}`}>
            <div className={`${styles.heading}`}>
                <h1>Popular Events</h1>
            </div>
            <div className='full grid'>
                <EventCard/>
            </div>
        </div>
    </div>
  )
}

export default Event