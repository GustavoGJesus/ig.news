import styles from './styles.module.scss';


//Price ID strip
interface SubscribeButtonProps{
    priceId: string;
}

export function SubscribeButton({ priceId}: SubscribeButtonProps){
    return (
        <button
            type="button"
            className={styles.subscribeButton}
        >   
            Subscribe Now
        </button>
    )
}