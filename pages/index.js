import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export default function Home({ posts }) {
  console.log(posts);

  // let datefull = posts[0].date;
  // let dateformat = new Date(datefull);
  // let converdate = dateformat.toDateString();
  // console.log(converdate);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
      </Head>

      <div className="container my-5">
        <h1 className="mb-4">Pagination Experiment</h1>

        <div className="row">
          {posts.map((post) => {
            return (
              <div key={post.id} className="col-lg-6">
                <div className="card mb-4">
                  <div className="imageblock-loader">
                    {/* <Image src={`${post._links["wp:featuredmedia"][0].source_url}`} width={700} height={400} className="card-img-top" /> */}
                    <Image src={`${post.fimg_url}`}  className="card-img-top" width={700} height={400} alt={post.title.rendered} />
                  </div>
                  <div className="card-body">
                    <h3 className="card-title" dangerouslySetInnerHTML={{__html: `${post.title.rendered}`}}></h3>
                    <p>By: <strong>{post.author_meta.display_name}</strong> | Dated: <strong>{post.formatted_date}</strong></p>
                    <div className="card-text" dangerouslySetInnerHTML={{__html: `${post.excerpt.rendered.substring(0, 200)}...`}}></div>
                    <Link href={`/${post.slug}`}>
                      <a className="btn btn-primary">Know more</a>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  // const res = await fetch('https://redbytes.co.uk/wp-json/wp/v2/posts?per_page=100')
  // const res = await fetch('https://redbytes.co.uk/wp-json/wp/v2/posts?page=3')
  const res = await fetch("https://probytes.net/wp-json/wp/v2/posts");
  // const res = await fetch("https://redbytes.co.uk/wp-json/wp/v2/posts?_embed");
  // const res = await fetch(process.env.BASE_SITEURL + "wp-json/wp/v2/posts?per_page=150");
  // const res = await fetch(process.env.BASE_SITEURL + "wp-json/wp/v2/posts");
  const posts = await res.json();

  return {
    props: {
      posts,
    },
    revalidate: 10, // In seconds
  }
}
