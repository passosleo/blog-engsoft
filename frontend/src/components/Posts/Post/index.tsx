import ReactHtmlParser from "react-html-parser";
import "./global.css";
import { format, formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import { CustomAvatar } from "@/components/CustomAvatar";
import { Post as PostType } from "@/types/post";
import { autocapitalize } from "@/utils/functions/string";

export function Post({
  title,
  content,
  category,
  authorName,
  createdAt,
}: PostType) {
  const publishedDateFormatted = format(
    createdAt || new Date(),
    "dd 'de' MMMM 'de' yyyy 'às' HH:mm",
    { locale: ptBR }
  );

  const publishedDateRelativeToNow = formatDistanceToNow(
    createdAt || new Date(),
    {
      locale: ptBR,
      addSuffix: true,
    }
  );

  return (
    <div className="bg-black-secundary py-4 px-8 my-4 rounded-lg">
      <div className="flex justify-between border-b border-[#29292E] pb-4">
        <div className="flex justify-center gap-2 items-center">
          <CustomAvatar name={authorName} />
          <span className="font-medium">{autocapitalize(authorName)}</span>
        </div>
        <div>
          <time
            title={publishedDateFormatted}
            dateTime={createdAt.toString()}
            className="text-[#8d8d99] text-sm"
          >
            {publishedDateRelativeToNow}
          </time>
        </div>
      </div>

      <div>
        <h1>{title}</h1>
        <div>{ReactHtmlParser(content)}</div>
      </div>

      <div className="flex mt-4 gap-2 border-t border-[#29292E] pt-4">
        <span className="text-[#8d8d99]">Tags:</span>
        <div
          className={`w-fit px-2 rounded text-white`}
          style={{ backgroundColor: category.color }}
        >
          <span className="font-medium text-sm">{category.name}</span>
        </div>
      </div>
    </div>
  );
}
