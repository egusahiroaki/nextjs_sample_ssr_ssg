import fetch from "isomorphic-unfetch";

const Post = (props) => {
  const click = () => {
    console.log("click");
    console.log(props.show.id);
    fetch(`https://api.tvmaze.com/shows/${props.show.id}`)
      .then((res) => res.json())
      .then(
        (result) => {
          console.log("result");
          console.log(result);
          //   this.setState({
          //     isLoaded: true,
          //     items: result.items,
          //   });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          //   this.setState({
          //     isLoaded: true,
          //     error,
          //   });
        }
      );
  };
  return (
    <div>
      <h1>{props.show.name}</h1>
      <p>{props.test}</p>
      <p>{props.buildtime}</p>
      <p>{props.show.summary}</p>
      {props.show.image ? <img src={props.show.image.medium} /> : null}
      <button onClick={click}>取得</button>
    </div>
  );
};

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
