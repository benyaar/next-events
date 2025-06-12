import { useRouter } from "next/router"
import EventList from "../../components/events/event-list"
import { Fragment } from "react"
import ResultsTitle from "../../components/results-title/results-title"
import Button from "../../components/ui/button"
import ErrorAlert from "../../components/ui/error-alert"
import { getFilteredEvents } from "../../helpers/api-util"

export default function FilteredEventPage({hasError, events, date}) {
   

    if (hasError
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

    if (!events?.length) {
        return (
            <Fragment>
                <ErrorAlert><p>Not found</p></ErrorAlert>
                <div className="center">
                    <Button link='/events'>Show all events</Button>
                </div>
            </Fragment>
        )
    }
    const filterDate = new Date(date.year, date.month - 1)

    return (
        <Fragment>
            <ResultsTitle date={filterDate} />
            <EventList items={events} />
        </Fragment>
    )
}

export async function getServerSideProps(context) {
    const { params } = context
    const filterData = params.slug
    const filteredYear = filterData[0]
    const filteredMonth = filterData[1]


    if (isNaN(+filteredYear) ||
        isNaN(+filteredMonth) ||
        +filteredYear > 2030 ||
        +filteredYear < 2021 ||
        +filteredMonth < 1 ||
        +filteredMonth > 12
    ) {
        return {
           props: {
                hasError: true
           },
           notFound: true,
        }
    }
    const filteredEvents = await getFilteredEvents({
        year: +filteredYear,
        month: +filteredMonth
    })
    return {
        props: {
            events: filteredEvents,
            date: {
                year: +filteredYear,
                month: +filteredMonth
            }
        }
    }

}