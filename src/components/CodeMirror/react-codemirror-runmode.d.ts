//

declare module 'react-codemirror-runmode' {
  export interface HighlighterProps {
    value: string;
    codeMirror: any;
    theme: string;
    language: string;
  }

  function Highlighter(props): React.FC<HighlighterProps, any>;

  export default Highlighter;
}
