import { useRouter } from "next/router"
import { getFilteredEvents } from "../../dummy-data"
import EventList from "../../components/events/event-list"
import { Fragment } from "react"
import ResultsTitle from "../../components/results-title/results-title"
import Button from "../../components/ui/button"
import ErrorAlert from "../../components/ui/error-alert"

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

    const filteredYear = filterData[0]
    const filteredMonth = filterData[1]

    if (isNaN(+filteredYear) ||
        isNaN(+filteredMonth) ||
        +filteredYear > 2030 ||
        +filteredYear < 2021 ||
        +filteredMonth < 1 ||
        +filteredMonth > 12
    ) {
        return (
             <Fragment>
                <ErrorAlert><p>Invalid filter</p></ErrorAlert>
                <div className="center">
                    <Button link='/events'>Show all events</Button>
                </div>
            </Fragment>
        )
    }
    const filteredEvents = getFilteredEvents({
        year: +filteredYear,
        month: +filteredMonth
    })
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
    const date = new Date(+filteredYear, +filteredMonth - 1)

    return (
        <Fragment>
            <ResultsTitle date={date} />
            <EventList items={filteredEvents} />
        </Fragment>
    )
}