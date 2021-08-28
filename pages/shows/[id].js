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

export async function getServerSideProps(context) {
  console.log(`個別ページ getServerSideProps`);
  //   console.log(context);
  const id = context.params.id;
  console.log(`id: ${id}`);

  const res = await fetch(`https://api.tvmaze.com/shows/${id}`);
  const show = await res.json();
  const buildtime = new Date().toString();
  return {
    props: {
      test: "個別ページ getServerSidePropsです",
      show,
      buildtime,
    },
  };
}

export default Post;
