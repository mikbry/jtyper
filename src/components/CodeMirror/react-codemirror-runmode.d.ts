//

declare module 'react-codemirror-runmode' {
  export interface HighlighterProps {
    value: string;
    codeMirror: object;
    theme: string;
    language: string;
  }

  function Highlighter(props): React.FC<HighlighterProps, React.ElementType>;

  export default Highlighter;
}
