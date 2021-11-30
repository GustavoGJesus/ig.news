import Head from 'next/head';
import { GetStaticProps } from 'next'; 

import { SubscribeButton } from '../components/SubscribeButton';

import styles from './home.module.scss';
import { stripe } from '../services/stripe';

interface HomeProps{
  product: {
    priceId: string;
    amount: number;
  }
}

export default function Home({ product }: HomeProps) {
  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>
     
     <main className={styles.contentContainer}>
        <section className={styles.hero}>
            <span>👏🏽 Hey, welcome</span>
            <h1>News about the <span>React</span> world.</h1>
            <p>
              Get access to all the publications <br />
              <span>for {product.amount} month</span>
            </p>
            <SubscribeButton priceId={product.priceId}/>
        </section>

        <img src="/images/avatar.svg" alt="Girl Codding" />
     </main>
    </>
  )
}

//Consumindo API do stripe
export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1K1ZV9F53l06QPnGBVG4iaTu',) 

  const product = {
    priceId: price.id, 
    amount: new Intl.NumberFormat('en-US', { //Formatando o valor para dolar 
      style: 'currency',
      currency: 'USD',
    }).format(price.unit_amount / 100),
  };

  return{
    props: {
      product, 
    }, 
    revalidate: 60 * 60 * 24, //24 hours 
  }
}  

//Formas de chamar uma API no Next:

// Client-side =  Não precisa de indexsação, informação carregada atraves de alguma ação do usuario, exemplo: Post do blog, 
// Server-Side = Dados dinamicos da sessão do user, informações em tempo real do user que está acessando
// Static Site Generation = Home de um blog por exemplo 