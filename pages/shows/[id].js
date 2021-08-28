import fetch from "isomorphic-unfetch";

const Post = (props) => (
  <div>
    <h1>{props.show.name}</h1>
    <p>{props.test}</p>
    <p>{props.buildtime}</p>
    <p>{props.show.summary}</p>
    {props.show.image ? <img src={props.show.image.medium} /> : null}
  </div>
);

// Post.getInitialProps = async function (context) {
//   const { id } = context.query;
//   const res = await fetch(`https://api.tvmaze.com/shows/${id}`);
//   const show = await res.json();
//   console.log(`Fetched show: ${show.name}`);
//   return { show };
// };

export async function getStaticProps(context) {
  console.log(`個別ページ getStaticProps`);
  console.log(context);
  const id = context.params.id;
  console.log(`id: ${id}`);

  const res = await fetch(`https://api.tvmaze.com/shows/${id}`);
  const show = await res.json();
  console.log(show);
  const buildtime = new Date().toString();
  return {
    props: {
      test: "個別ページ getStaticPropsです",
      show,
      buildtime,
    },
  };
}

export async function getStaticPaths() {
  const res = await fetch("https://api.tvmaze.com/search/shows?q=batman");
  const data = await res.json();

  const paths = data.map((d) => `/shows/${d.show.id}`);
  return { paths, fallback: false };
}

export default Post;
