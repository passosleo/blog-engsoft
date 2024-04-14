import ReactHtmlParser from "react-html-parser";
import "./global.css";
import { format, formatDistanceToNow } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

type Props = {
  post: {
    category: string;
    tittle: string;
    content: string;
    author: string;
    publishedAt: Date;
  };
};

export function Post({ post }: Props) {
  const publishedDateFormatted = format(
    post.publishedAt || new Date(),
    "dd 'de' MMMM 'de' yyyy 'às' HH:mm",
    { locale: ptBR }
  );

  const publishedDateRelativeToNow = formatDistanceToNow(
    post.publishedAt || new Date(),
    {
      locale: ptBR,
      addSuffix: true,
    }
  );

  return (
    <div className="bg-black-secundary py-4 px-8 my-4 rounded-lg">
      <div className="flex justify-end">
        <time
          title={publishedDateFormatted}
          dateTime={post.publishedAt?.toISOString()} 
          className="text-[#8d8d99] text-sm"
        >
          {publishedDateRelativeToNow}
        </time>
      </div>

      <div>
        <h1>{post.tittle}</h1>
        <div>{ReactHtmlParser(post.content)}</div>
      </div>

      <div className="flex gap-2 text-[#8d8d99] justify-end">
        <span>Publicado por:</span>
        <span className="font-medium">{post.author}</span>
      </div>
    </div>
  );
}
