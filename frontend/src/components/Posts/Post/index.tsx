import ReactHtmlParser from "react-html-parser";
import "./global.css";
import { format, formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import { CustomAvatar } from "@/components/CustomAvatar";

type Props = {
  post: {
    category: {
      categoryId: string;
      name: string;
      color: string;
    };
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
      <div className="flex justify-between border-b border-[#29292E] pb-4">
        <div className="flex justify-center gap-2 items-center">
          <CustomAvatar name={post.author} />
          <span className="font-medium">{post.author}</span>
        </div>
        <div>
          <time
            title={publishedDateFormatted}
            dateTime={post.publishedAt?.toISOString()}
            className="text-[#8d8d99] text-sm"
          >
            {publishedDateRelativeToNow}
          </time>
        </div>
      </div>

     

      <div>
        <h1>{post.tittle}</h1>
        <div>{ReactHtmlParser(post.content)}</div>
      </div>

      <div className="flex mt-4 gap-2 border-t border-[#29292E] pt-4">
        <span className="text-[#8d8d99]">Tags:</span>
        <div className={`w-fit px-2 rounded text-white bg-[${post.category.color}]`}>
          <span className="font-medium text-sm">{post.category.name}</span>
        </div>
      </div>
    </div>
  );
}
