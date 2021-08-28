import Link from "next/link";
import fetch from "isomorphic-unfetch";

const Index = (props) => (
  <div>
    <h1>Batman TV Shows</h1>
    <ul>
      {props.shows.map((show) => (
        <li key={show.id}>
          <Link href="/shows/[id]" as={`/shows/${show.id}`}>
            <a>{show.name}</a>
          </Link>
        </li>
      ))}
    </ul>
    <div>ビルド時間: {props.buildtime}</div>
    <div>{props.test}</div>
  </div>
);

// Index.getInitialProps = async function () {
//   console.log("getInitialProps");
//   const res = await fetch("https://api.tvmaze.com/search/shows?q=batman");
//   const data = await res.json();
//   console.log(`Show data fetched. Count: ${data.length}`);
//   const buildtime = new Date().toString();
//   return { shows: data.map((entry) => entry.show), buildtime };
// };

// export async function getStaticPaths(context) {
//   console.log(`getStaticProps`);
//   const res = await fetch("https://api.tvmaze.com/search/shows?q=batman");
//   const data = await res.json();
//   console.log(`Show data fetched. Count: ${data.length}`);
//   return { shows: data.map((entry) => entry.show) };
// }

// export async function getStaticProps() {
//   console.log(`getStaticProps`);
//   const res = await fetch("https://api.tvmaze.com/search/shows?q=batman");
//   const data = await res.json();
//   console.log(`Show data fetched. Count: ${data.length}`);
//   const buildtime = new Date().toString();
//   return {
//     props: {
//       test: "getStaticPropsです",
//       shows: data.map((entry) => entry.show),
//       buildtime,
//     },
//   };
// }

export async function getServerSideProps() {
  console.log(`getServerSideProps`);
  const res = await fetch("https://api.tvmaze.com/search/shows?q=batman");
  const data = await res.json();
  console.log(`Show data fetched. Count: ${data.length}`);
  const buildtime = new Date().toString();
  return {
    props: {
      test: "getServerSidePropsです",
      shows: data.map((entry) => entry.show),
      buildtime,
    },
  };
}

export default Index;
