import EventItem from './event-item'
import styles from './event-list.module.css'
export default function EventList(props) {
    const { items } = props;
    return (
        <ul className={styles.list}>
            {items.map(event => {

                const { title, image, date, location, id } = event
                return (
                    <EventItem
                        key={id}
                        title={title}
                        image={image}
                        date={date}
                        location={location}
                        id={id}
                    />
                )
            }
            )}
        </ul>
    )
}