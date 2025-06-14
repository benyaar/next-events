import Head from 'next/head'
import EventList from '../components/events/event-list'
import { getFeaturedEvents } from '../helpers/api-util'

export default function HomePage ({events}){
    
    return(
        <div>
            <Head>
                <title>Events</title>
                <meta 
                    name='description'
                    content='Welcome to my project'
                />
            </Head> 
           <EventList items={events}/>
        </div>
    )
}

export async function getStaticProps(){
    const featuredEvents = await getFeaturedEvents()
    return {
        props: {
            events: featuredEvents
        }
    }
}