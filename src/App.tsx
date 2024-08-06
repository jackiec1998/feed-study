import snapshot from "./assets/snapshot.json";
import "./styles.css";

function kFormatter(n: number): string {
  if (n < 0) {
    throw new Error("To format a number, it needs to be positive.");
  }

  return Math.abs(n) > 999 ? (n / 1_000).toFixed(1) + "K" : n.toString();
}

function PostAttributes({
  score,
  num_comments,
}: {
  score: number;
  num_comments: number;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "end",
        gap: 10,
      }}
    >
      <span>
        <span>⬆️</span>
        <span>{kFormatter(score)}</span>
        <span>⬇️</span>
      </span>
      <span>💬 {kFormatter(num_comments)}</span>
    </div>
  );
}

function PostPreview({
  content_type,
}: {
  content_type: "image" | "text" | "link" | "video";
}) {
  if (content_type == "text") {
    return (
      <p
        style={{
          color: "grey",
          margin: "0",
          overflow: "hidden",
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: 6,
          textOverflow: "ellipsis",
          lineHeight: "20px",
        }}
      >
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem
        accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab
        illo inventore veritatis et quasi architecto beatae vitae dicta sunt
        explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut
        odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
        voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum
        quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam
        eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat
        voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam
        corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?
        Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse
        quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo
        voluptas nulla pariatur?
      </p>
    );
  } else if (content_type == "link") {
    return (
      <a
        style={{
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          textOverflow: "ellipsis",
          overflow: "hidden",
          WebkitLineClamp: 1,
          textDecoration: "none",
          color: "blue",
        }}
        href="https://google.com"
      >
        https://apnews.com/a-look-at-how-settlements-have-grown-in-the-west-bank-over-the-years-0000019079d8d0f6a3da79dcbd0a0000
      </a>
    );
  }

  return <></>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Post(props: { post: any; retrieved_utc: number }) {
  const post = props.post;

  const content_type = Math.random() < 0.5 ? "text" : "link";

  return (
    <div
      key={post.id}
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 20,
        margin: 10,
        width: 550,
      }}
    >
      <div>{post.rank}</div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 5,
        }}
      >
        <span
          style={{
            color: "grey",
            display: "flex",
            flexDirection: "row",
            gap: "5px",
          }}
        >
          <div
            style={{
              height: "20px",
              width: "20px",
              borderRadius: "50%",
              backgroundColor: "green",
            }}
          ></div>
          <div>
            <span>r/{post.subreddit}</span>
            <span> • </span>
            <span>
              {Math.round((props.retrieved_utc - post.created_utc) / (60 * 60))}{" "}
              hr. ago
            </span>
          </div>
        </span>
        <b>{post.title}</b>
        <PostPreview content_type={content_type} />
        <PostAttributes score={post.score} num_comments={post.num_comments} />
      </div>
    </div>
  );
}

function Header() {
  return (
    <div
      style={{
        width: "100%",
        top: 0,
        backgroundColor: "white",
        position: "sticky",
        borderBottom: "2px solid grey",
        padding: "10px 0",
        margin: "10px 0",
      }}
    >
      <span>Reddit</span>
    </div>
  );
}

function App() {
  return (
    <div
      style={{
        fontFamily: "sans-serif",
      }}
    >
      <Header />
      <span>{new Date(snapshot.retrieved_utc * 1_000).toLocaleString()}</span>

      {/* <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        {snapshot.posts.map((post) => (
          <>
            <Post post={post} retrieved_utc={snapshot.retrieved_utc} />
          </>
        ))}
      </div> */}
    </div>
  );
}

export default App;
