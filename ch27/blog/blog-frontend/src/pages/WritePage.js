// import Editor from '../components/write/Editor'
// import TagBox from '../components/write/TagBox'
// import WriteActionButtons from '../components/write/WriteActionButtions'
import Responsive from '../components/common/Responsive'
import EditorContainer from '../containers/write/EditorContainer'
import TagBoxContainer from '../containers/write/TagBoxContainer'
import WriteActionButtonsContainer from '../containers/write/WriteActionButtonsContainer'
import { Helmet } from 'react-helmet-async'

const WritePage = () => {
  return (
    <Responsive>
      <Helmet>
        <title>글 작성하기 - REACTERS</title>
      </Helmet>
      <EditorContainer />
      <TagBoxContainer />
      <WriteActionButtonsContainer />
      {/* <Editor/> */}
      {/* <TagBox/> */}
      {/* <WriteActionButtons/> */}
    </Responsive>
  )
}

export default WritePage
