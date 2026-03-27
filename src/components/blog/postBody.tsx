import Image from 'next/image';

export function PostBody({ body }: { body: any[] }) {
  if (!body?.length) return null;

  return (
    <div className="prose prose-lg max-w-none">
      {body.map((block, i) => {
        if (block._type === 'image') {
          return (
            <figure key={i} className="my-8">
              <Image
                src={block.asset?.url ?? ''}
                alt={block.alt ?? ''}
                width={800}
                height={450}
                className="rounded-2xl w-full object-cover"
              />
              {block.caption && (
                <figcaption className="text-center text-sm text-muted-foreground mt-2">
                  {block.caption}
                </figcaption>
              )}
            </figure>
          );
        }

        if (block._type === 'codeBlock') {
          return (
            <pre
              key={i}
              className="bg-foreground text-background rounded-2xl p-6 overflow-x-auto my-6"
            >
              <code className="text-sm font-mono">{block.code}</code>
            </pre>
          );
        }

        if (block._type === 'block') {
          const text =
            block.children?.map((child: any) => child.text ?? '').join('') ??
            '';

          switch (block.style) {
            case 'h2':
              return (
                <h2
                  key={i}
                  className="font-display font-black text-3xl uppercase tracking-tight mt-10 mb-4"
                >
                  {text}
                </h2>
              );
            case 'h3':
              return (
                <h3
                  key={i}
                  className="font-display font-bold text-2xl uppercase tracking-tight mt-8 mb-3"
                >
                  {text}
                </h3>
              );
            case 'blockquote':
              return (
                <blockquote
                  key={i}
                  className="border-l-4 border-orange pl-6 my-6 italic text-muted-foreground text-xl"
                >
                  {text}
                </blockquote>
              );
            default:
              return (
                <p
                  key={i}
                  className="text-foreground leading-relaxed mb-4 text-lg"
                >
                  {block.children?.map((child: any, j: number) => {
                    let content: React.ReactNode = child.text;
                    if (child.marks?.includes('strong'))
                      content = <strong key={j}>{content}</strong>;
                    if (child.marks?.includes('em'))
                      content = <em key={j}>{content}</em>;
                    if (child.marks?.includes('code'))
                      content = (
                        <code
                          key={j}
                          className="bg-secondary px-1.5 py-0.5 rounded text-sm font-mono"
                        >
                          {content}
                        </code>
                      );
                    return content;
                  })}
                </p>
              );
          }
        }

        return null;
      })}
    </div>
  );
}
