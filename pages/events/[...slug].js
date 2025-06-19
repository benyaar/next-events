import { useRouter } from "next/router"
import EventList from "../../components/events/event-list"
import { Fragment } from "react"
import ResultsTitle from "../../components/results-title/results-title"
import Button from "../../components/ui/button"
import ErrorAlert from "../../components/ui/error-alert"

import useSWR from "swr"
import Head from "next/head"

export default function FilteredEventPage() {
    const router = useRouter()
    const filterData = router.query.slug

    if (!filterData) {
        return (
            <p className="center">
                ...Loading
            </p>
        )
    }

    const fetcher = (url) => fetch(url).then(res => res.json());
    const { data, error, isLoading } = useSWR('https://next-events-48d19-default-rtdb.europe-west1.firebasedatabase.app/events.json', fetcher)


    if (isLoading) {
        return (
            <p className="center">
                ...Loading
            </p>
        )
    }
    if (error) {
        return (
            <p className="center">
                error
            </p>
        )
    }
    const filteredYear = filterData[0]
    const filteredMonth = filterData[1]

    if (isNaN(+filteredYear) ||
        isNaN(+filteredMonth) ||
        +filteredYear > 2030 ||
        +filteredYear < 2021 ||
        +filteredMonth < 1 ||
        +filteredMonth > 12 || error) {
        return (
            <Fragment>
                <ErrorAlert><p>Invalid filter</p></ErrorAlert>
                <div className="center">
                    <Button link='/events'>Show all events</Button>
                </div>
            </Fragment>
        )
    }
    const filteredEvents = data.filter((event) => {
        const eventDate = new Date(event.date);
        return eventDate.getFullYear() === +filteredYear && eventDate.getMonth() === +filteredMonth - 1;
    });



    if (!filteredEvents?.length) {
        return (
            <Fragment>
                <ErrorAlert><p>Not found</p></ErrorAlert>
                <div className="center">
                    <Button link='/events'>Show all events</Button>
                </div>
            </Fragment>
        )
    }
    const filterDate = new Date(+filteredYear, +filteredMonth - 1)

    return (
        <Fragment>
            <Head>
                <title>Filterd Events</title>
                <meta
                    name='description'
                    content={`All events for ${filteredYear} and ${filteredMonth}`}
                />
            </Head>
            <ResultsTitle date={filterDate} />
            <EventList items={filteredEvents} />
        </Fragment>
    )
}

