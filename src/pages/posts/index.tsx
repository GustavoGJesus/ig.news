import { GetStaticProps } from 'next';
import Head from 'next/head';
import Prismic from '@prismicio/client'
import { getPrismicClient } from '../../services/prismic';
import styles from './styles.module.scss';

export default function Post(){

    return(
        <>
            <Head>
                <title>Posts | Ignews</title>
            </Head>
            <main className={styles.container}>
                <div className={styles.posts}>
                    <a href="#">
                        <time>13 de Novembro</time>
                        <strong>Titulo do Post</strong>
                        <p>Breve Paragrafo</p>
                    </a>
                    <a href="#">
                        <time>13 de Novembro</time>
                        <strong>Titulo do Post</strong>
                        <p>Breve Paragrafo</p>
                    </a>
                    <a href="#">
                        <time>13 de Novembro</time>
                        <strong>Titulo do Post</strong>
                        <p>Breve Paragrafo</p>
                    </a>
                </div>
            </main>
        </>
    )
}

//Consumindo API do Prismic 
export const getStaticProps: GetStaticProps = async () => {
    const prismic =  getPrismicClient();

    const response = await prismic.query([
        Prismic.predicates.at('document.type', 'post')
    ], {
        fetch: ['Post.title', 'post.content'],
        pageSize: 20,
    }
    )

    console.log(JSON.stringify(response, null, 2))

    return{ 
        props: {}
    }
}