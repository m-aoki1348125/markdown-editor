import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import styles from './Preview.module.css'

interface PreviewProps {
  content: string
}

export function Preview({ content }: PreviewProps) {
  return (
    <div className={styles.previewWrapper}>
      <div className={styles.label}>PREVIEW</div>
      <div className={styles.previewContainer}>
        <article className="prose">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
            components={{
              a: ({ href, children }) => (
                <a href={href} target="_blank" rel="noopener noreferrer">
                  {children}
                </a>
              ),
              input: ({ checked, ...props }) => (
                <input type="checkbox" checked={checked} readOnly {...props} />
              ),
              img: ({ src, alt }) => (
                <img src={src} alt={alt ?? ''} loading="lazy" className={styles.responsiveImage} />
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        </article>
      </div>
    </div>
  )
}
