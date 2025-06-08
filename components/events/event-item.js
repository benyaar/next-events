import ArrowRightIcon from '../icons/arrow-right-icon'
import AddressIcon from '../icons/address-icon'
import DateIcon from '../icons/date-icon'
import styles from  './event-item.module.css'
import Button from "../ui/button";
export default function EventItem(props){
    const {title, image, date, location, id} = props;
    const humanReadableData = new Date(date).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    })
    const formattedAddress = location.replace(', ', '\n');
    const exploreLink = `/events/${id}`
    return (
        <li className={styles.item}>
            <img src={'/' + image} alt={title}/>
            <div className={styles.content} >
                <div className={styles.summary}>
                    <h2>{title}</h2>
                    <div className={styles.date}>
                        <DateIcon/>
                        <time>{humanReadableData}</time>
                    </div>
                    <div className={styles.address}>
                        <AddressIcon/>
                        <adress>{formattedAddress}</adress>
                    </div>
                </div>
                <div className={styles.actions}>
                   <span> <Button link={exploreLink}>Explore link</Button></span>
                   <span className={styles.icon}><ArrowRightIcon/></span>
                </div>
            </div>
        </li>
    )
}