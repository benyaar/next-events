import { useRef, useContext } from 'react';
import classes from './newsletter-registration.module.css';
import NotificationContext from '../../store/notification-context';

function NewsletterRegistration() {
  const emailInputRef = useRef()
  const notificationCtx = useContext(NotificationContext)

  function registrationHandler(event) {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value

    notificationCtx.showNotification({
      title: 'Signed up',
      message: 'Registering',
      status: 'Pending'
    })

    fetch('/api/newsletter', {
      method: 'POST',
      body: JSON.stringify({ email: enteredEmail }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        if (response.ok) {
          return response.json()
        }

        return response.json().then(data => {
          throw new Error(data.message || 'error')
        })
      })
      .then((data) => {
        notificationCtx.showNotification({
          title: 'success',
          message: 'success',
          status: 'success'
        })
      })
      .catch(e => {
        notificationCtx.showNotification({
          title: 'error',
          message: e.message || 'error',
          status: 'error'
        })
      })
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type='email'
            id='email'
            placeholder='Your email'
            aria-label='Your email'
            ref={emailInputRef}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
