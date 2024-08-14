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
import { Button } from "./ui/button";

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
  contentType: "link" | "text" | "image";
  url?: string;
  selftext?: string;
};

function VotingButtons({ post }: { post: Post }) {
  const buttonConfig = "h-8 w-8 p-0 hover:bg-gray-300";
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

function TextPreview({ post }: { post: Post }) {
  return <p className="line-clamp-4">{post.selftext}</p>;
}

function LinkPreview({ post }: { post: Post }) {
  return (
    <Button variant="link" className="px-0 text-blue-500">
      {post.url}
    </Button>
  );
}

function ImagePreview({ post }: { post: Post }) {
  return (
    <div className="flex justify-center py-2">
      <img src={post.url} className="max-h-96" />
    </div>
  );
}

function ContentPreview({ post }: { post: Post }) {
  if (post.contentType === "text") {
    return <TextPreview post={post} />;
  } else if (post.contentType === "link") {
    return <LinkPreview post={post} />;
  } else if (post.contentType === "image") {
    return <ImagePreview post={post} />;
  }

  return <></>;
}

function displayHoursAgo(seconds: number): string {
  // Convert seconds to hours
  const hours = Math.floor(seconds / 3600);

  // Handle singular and plural cases
  const hourText = hours === 1 ? "hr." : "hrs.";

  // Return the formatted string
  return `${hours} ${hourText} ago`;
}

function Post(post: Post) {
  const { currentUTC } = useContext(Context);

  // TODO: How do I preview video posts?

  return (
    <div className="w-7/12">
      <div className="my-1 py-2 hover:bg-gray-100 rounded-lg">
        <div className="px-4">
          <div className="flex flex-row gap-2 items-center text-xs font-semibold">
            <span className="">r/{post.subreddit}</span>
            <span>•</span>
            <span>{displayHoursAgo(currentUTC - post.createdUTC)}</span>
          </div>
          <h2 className="text-lg font-bold">{post.title}</h2>
          <ContentPreview post={post} />
          <Interactions post={post} />
        </div>
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
    {
      title: "Stuck on a train for 12 hours, alone.",
      subreddit: "pics",
      createdUTC: 1674613717,
      author: "GodofAeons",
      score: 19409,
      numComments: 1107,
      contentType: "image",
      url: "https://i.redd.it/ih64wvqc65ea1.jpg",
      // url: "https://mrwallpaper.com/images/hd/falling-stars-cell-phone-picture-6ate0hpx8kktsegm.jpg",
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
