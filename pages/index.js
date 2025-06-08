import EventList from '../components/events/event-list'
import {getFeaturedEvents} from '../dummy-data'
export default function HomePage (){
    const featuredEvents = getFeaturedEvents()
    console.log(featuredEvents);
    
    return(
        <div>
           <EventList items={featuredEvents}/>
        </div>
    )
}