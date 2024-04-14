import ReactHtmlParser from "react-html-parser";
import "./global.css";

type Props = {
  post: {
    category: string;
    tittle: string;
    content: string;
    author: string;
    publishedAt: Date;
  }
}

export function Post({post}: Props){
  return (
    <div>
      <h1>{post.tittle}</h1>
      <div>{ReactHtmlParser(post.content)}</div>
    </div>
  )
}