// import Editor from '../components/write/Editor'
// import TagBox from '../components/write/TagBox'
// import WriteActionButtons from '../components/write/WriteActionButtions'
import Responsive from '../components/common/Responsive'
import EditorContainer from '../containers/write/EditorContainer'
import TagBoxContainer from '../containers/write/TagBoxContainer'
import WriteActionButtonsContainer from '../containers/write/WriteActionButtonsContainer'
const WritePage = () => {
  return (
    <Responsive>
      <EditorContainer/>
      <TagBoxContainer/>
      <WriteActionButtonsContainer/>
      {/* <Editor/> */}
      {/* <TagBox/> */}
      {/* <WriteActionButtons/> */}
    </Responsive>
  )
}

export default WritePage
