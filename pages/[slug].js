import React from "react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

export default function PostDetails({ singlepost }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  console.log(singlepost)

  return (
    <>
      <Head>
        <title>{singlepost[0].title.rendered}</title>
        <meta name="description" content="Generated by create next app" />
      </Head>

      <div className="container my-5">
        <h1 dangerouslySetInnerHTML={{__html: `${singlepost[0].title.rendered}`}}></h1>
        <p><small>By: <strong>{singlepost[0].author_meta.display_name}</strong> | Dated: <strong>{singlepost[0].formatted_date}</strong></small></p>
        <div dangerouslySetInnerHTML={{__html: `${singlepost[0].content.rendered}`}}></div>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  // const res = await fetch(process.env.BASE_SITEURL + "wp-json/wp/v2/posts?per_page=150");
  // const res = await fetch(process.env.BASE_SITEURL + "wp-json/wp/v2/posts");
  const res = await fetch("https://probytes.net/wp-json/wp/v2/posts");
  // const res = await fetch("https://redbytes.co.uk/wp-json/wp/v2/posts?page=3");
  const posts = await res.json();

  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }));

  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  // const res = await fetch(process.env.BASE_SITEURL + `wp-json/wp/v2/posts?slug=${params.slug}`);
  const res = await fetch(`https://probytes.net/wp-json/wp/v2/posts?slug=${params.slug}`);
  const singlepost = await res.json();
  return {
    props: {
      singlepost,
    },
    revalidate: 10,
  }
}
