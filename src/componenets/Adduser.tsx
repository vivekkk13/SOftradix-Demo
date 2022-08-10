import React ,{useState}from "react"
import { Form, Modal } from "react-bootstrap"

export default function Adduser(){
    

  


return (
  <div>

   <Modal > 
    <Form>
           <input type="email" name="email" />
          
           <input type="password" name="password" />
         
           <button>
             Submit
           </button>
         </Form>
     </Modal>
  </div>
        
    
    )

}