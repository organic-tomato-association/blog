import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Layout from "../../components/Layout";
import { AuthorContent, getAuthor, listAuthors } from '../../lib/authors';

type Props = {
  author: AuthorContent;
}

export default function Index({ author }: Props) {
  const name = author.name;
  const introduction = author.introduction;
  return (
    <Layout>
      <div className="container">
        <div>
          <h1>{name}</h1>
          <p>{introduction}</p>
        </div>
      </div>
      <style jsx>{`
        .container {
          display: flex;
          align-items: center;
          justify-content: center;
          flex: 1 1 auto;
          padding: 0 1.5rem;
        }
        h1 {
          font-size: 2.5rem;
          margin: 0;
          font-weight: 500;
        }
        h2 {
          font-size: 1.75rem;
          font-weight: 400;
          line-height: 1.25;
        }
        .handle {
          display: inline-block;
          margin-top: 0.275em;
          color: #9b9b9b;
          letter-spacing: 0.05em;
        }

        @media (min-width: 769px) {
          h1 {
            font-size: 3rem;
          }
          h2 {
            font-size: 2.25rem;
          }
        }
      `}</style>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const authorSlug = String(params.author);
  const author = getAuthor(authorSlug);
  const props: {
    author: AuthorContent;
  } = { author };
  return {
    props
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = listAuthors().map(author => {
    return { params: { author: author.slug } }
  });
  return {
    paths: paths,
    fallback: false,
  };
};
