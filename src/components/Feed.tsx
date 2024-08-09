import { Context } from "@/App";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Separator } from "./ui/separator";
import { kFormatter } from "@/utils";
import { Toggle } from "./ui/toggle";
import {
  ArrowUpIcon,
  ArrowDownIcon,
  ChatBubbleIcon,
} from "@radix-ui/react-icons";

function Header() {
  const { passcode } = useContext(Context);

  return (
    <div className="flex justify-between p-2 ">
      <span>{new Date().toLocaleString()}</span>
      <span>
        <b>Passcode:</b> {passcode}
      </span>
    </div>
  );
}

type Post = {
  title: string;
  subreddit: string;
  createdUTC: number;
  author: string;
  score: number;
  numComments: number;
  contentType: "link" | "text";
  url?: string;
  selftext?: string;
};

function VotingButtons({ post }: { post: Post }) {
  const buttonConfig = "h-6 w-6 p-0";
  const [vote, setVote] = useState<"up" | "down" | null>(null);

  return (
    <div className="flex flex-row items-center gap-2">
      <Toggle
        className={buttonConfig}
        pressed={vote === "up" ? true : false}
        onClick={() => setVote("up")}
        variant="upvote"
      >
        <ArrowUpIcon />
      </Toggle>
      <span>{kFormatter(post.score)}</span>
      <Toggle
        className={buttonConfig}
        pressed={vote === "down" ? true : false}
        onClick={() => setVote("down")}
        variant="downvote"
      >
        <ArrowDownIcon />
      </Toggle>
    </div>
  );
}

function Interactions({ post }: { post: Post }) {
  return (
    <div className="flex flex-row gap-4 pt-2">
      <VotingButtons post={post} />
      <div className="flex flex-row items-center gap-2">
        <ChatBubbleIcon />
        <span>{kFormatter(post.numComments)}</span>
      </div>
    </div>
  );
}

function Post(post: Post) {
  return (
    <div className="w-7/12">
      <div className="px-4 py-2">
        <span className="text-xs font-semibold">r/{post.subreddit}</span>
        <h2 className="text-lg font-bold">{post.title}</h2>
        <Interactions post={post} />
      </div>
      <Separator />
    </div>
  );
}

function Content() {
  const posts: Post[] = [
    {
      title:
        "Boys be brutally honest , what makes a girl attractive instantly?",
      subreddit: "AskReddit",
      createdUTC: 1674584954,
      author: "Las_ogna",
      score: 17576,
      numComments: 15625,
      contentType: "text",
      selftext:
        "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure.",
    },
    {
      title: "Classified documents found at Pence's Indiana home",
      subreddit: "politics",
      createdUTC: 1674580060,
      author: "quipd",
      score: 40829,
      numComments: 3710,
      contentType: "link",
      url: "https://www.cnn.com/2023/01/24/politics/pence-classified-documents-fbi/",
    },
    {
      title:
        "TIFU when I (19m) missed all the signs that my roommate (22f) was interested in me",
      subreddit: "tifu",
      createdUTC: 1674557703,
      author: "NakedTitan",
      score: 18221,
      numComments: 2218,
      contentType: "text",
      selftext:
        "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure.",
    },
  ];

  return (
    <div className="flex flex-col items-center min-h-screen ">
      {posts.map((post) => Post(post))}
    </div>
  );
}

export function Feed() {
  const { passcode, debug } = useContext(Context);
  const navigate = useNavigate();

  // Check if the user provided a passcode.
  useEffect(() => {
    if (passcode === "" && !debug) {
      navigate("/feed-study/");
    }
  });

  return (
    <div>
      <Header />
      <Separator />
      <Content />
    </div>
  );
}
