export default function Quoted({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="border-l-4 border-primary pl-4 my-4 italic font-serif text-lg">
      {children}
    </blockquote>
  )
}
