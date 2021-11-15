
import axios from 'axios'
import React, {useState} from 'react'
import { Comment,  Button, Header, Icon, Modal } from 'semantic-ui-react'
import './style.css'



//const date = new Date()

function Comments({ listComment }) {
  const token = localStorage.getItem("token")
  const [open, setOpen] = useState(false)
  
  

  const handleReportComment = async (commentId) => {
    setOpen(true)
    try {
       await axios.patch(`https://kidozanges.herokuapp.com/api/user/reportcomment`, {report:'true'}, {
          params: {
              id: commentId
          },
          headers: {
              authorization: `Bearer ${token}`,
          },
      })
      
      
  } catch (error) {
      console.error(error)
  }
  setTimeout(()=>setOpen(false),2000)
  }

  return (
    <>
    
      <Comment.Group
        size='large'
        id="chat"
      >
        {
          listComment.map((com, index) => {
            return (
              
              <Comment key={index}  >
                <div id="commentairebg">
                  <Comment.Content>
                    <Comment.Author id="author" as='a'>{com.nickname}</Comment.Author>
                    <Comment.Metadata>
                      {/*<span>{date.getDate()}/{date.getMonth()}/{date.getFullYear()}</span>*/}
                    </Comment.Metadata>
                    <Comment.Text>{com.description} <Icon title="signaler ce commentaire" color="red" onClick={()=>handleReportComment(com.id)}  className="exclamation triangle" size="small" ></Icon></Comment.Text>
                  </Comment.Content>
                </div>
                
              </Comment>
            )
          })
        }
        
      </Comment.Group>
      <Modal
      closeIcon
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    >
      
      <Modal.Content>
        <p id="alert__modal">
         Merci, ce commentaire a bien été signalé.
        </p>
      </Modal.Content>
    </Modal>
    </>
  )
}
export default Comments
